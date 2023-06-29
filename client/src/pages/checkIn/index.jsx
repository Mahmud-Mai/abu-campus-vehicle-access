import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Box, Button, Select, useToast } from '@chakra-ui/react';
import { createWorker } from 'tesseract.js';
import { randomPlateNos } from '../../common/Constants'; // personally curated list of dummy plate Nos
import { videoConstraints } from '../../common/Constants'; // for webcam config
import { useDispatch, useSelector } from 'react-redux';
import PageHeading from '../../components/PageHeading';
import TicketToBePrinted from './TicktetToBePrinted';
import SnapPlateNumber from './SnapPlateNumber';
import PreviewPlateNumber from './PreviewPlateNumber';
import MalayPlate from '../../assets/ABC-471JP.jpg';
import { selectAllUsers } from '../../features/users/userSlice';
import { createTicket } from '../../features/ticket/ticketsSlice';
import {
  fetchGates,
  fetchTGatesStatus,
  fetchAllGates,
} from '../../features/gate/gateSlice';
import {
  createVehicleByPlateNumber,
  fetchVehicleByPlateNumber,
} from '../../features/vehicle/vehicleSlice';

const worker = await createWorker(); // needed by tesseract

const CheckIn = () => {
  const toast = useToast();
  const gates = useSelector(fetchAllGates);
  const gateStatus = useSelector(fetchTGatesStatus);
  const allUser = useSelector(selectAllUsers);
  const userId = allUser[0].userId;
  const dispatch = useDispatch();

  const [gateName, setGateName] = useState(null);
  // const [ticketId, setTicketId] = useState('');
  const [plateNumberImage, setPlateNumberImage] = useState(''); // to be used to call doOCR()
  const [plateNumber, setPlateNumber] = useState(''); // to be used in validatePlateNo() and displayed to UI
  const [isTicketGenerated, setIsTicketGenerated] = useState(false); // will be used to render Ticket component
  const [isPlateNumberValid, setIsPlateNumberValid] = useState(false); // To display plate number to UI
  const webcamRef = useRef(null);

  const ticket = null;
  // const ticket = allTickets.find(ticket => ticket.ticketId === ticketId)

  const user = allUser.find(user => user.userId === userId || null);

  // Take picture
  const capture = useCallback(() => {
    const pictureSrc = webcamRef.current.getScreenshot();
    setPlateNumberImage(pictureSrc);
  }, [webcamRef]);

  // ReTake picture
  const reCapture = () => {
    setPlateNumberImage('');
  };

  // Define function to run character recognition on an image
  const doOCR = useCallback(async () => {
    if (plateNumberImage) {
      await worker.load();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      const {
        data: { text },
      } = await worker.recognize(plateNumberImage);
      setPlateNumber(text);
      console.log(`🚀 ~ doOCR ~ text:`, text);
      console.log(MalayPlate);
      toast({
        title: 'Account created.',
        position: 'top',
        render: () => (
          <Box color="white" mt={12} p={3} bg="blue.500">
            Detected text: {text}
          </Box>
        ),
        duration: 5000,
        isClosable: true,
      });
    }
  }, [plateNumberImage, toast]);

  // Define function to check for Nigerian plate Number formats
  const validatePlateNumber = testSubject => {
    const regex = /^[A-Z]{3}-\d{3}[A-Z]{2}$/;
    return regex.test(testSubject);
  };

  // Choose a random Dummy Plate Number from a curated list
  const generateRandomPlateNumber = () => {
    const plateNumber =
      randomPlateNos[Math.floor(Math.random() * randomPlateNos.length)];
    setIsPlateNumberValid(validatePlateNumber(plateNumber));
    setPlateNumber(plateNumber);
  };

  // Run doOCR either on image capture or when a dummy plateNumberImage is provided
  useEffect(() => {
    doOCR(plateNumberImage);
  }, [doOCR, plateNumberImage]);

  // Run the validatePlateNumber function defined above
  useEffect(() => {
    setIsPlateNumberValid(validatePlateNumber(plateNumber));
  }, [isPlateNumberValid, plateNumber]);

  const onGenerateTicketClicked = async () => {
    // Check if plateNumber is provided, fetch the associated Vehicle Then Create a ticket for the vehicle
    if (plateNumber) {
      // Check if vahicle exists and get the id
      let vehicleExists = await dispatch(
        fetchVehicleByPlateNumber(plateNumber)
      ).unwrap();

      // Else create the vehicle and get the Id
      if (
        !vehicleExists ||
        vehicleExists === 'Request failed with status code 400'
      ) {
        let newVehicleExist;
        // Create Vehicle
        newVehicleExist = await dispatch(
          createVehicleByPlateNumber(plateNumber)
        ).unwrap();
        vehicleExists = newVehicleExist;

        return vehicleExists;
      }

      // Dispatch the generateTicket action creator
      const ticketObject = {
        plateNumber: vehicleExists._id,
        ticketStatus: 'Inbound',
        gate: gateName,
        user: user.userName,
      };
      dispatch(createTicket(ticketObject));
    }

    // setIsTicketGenerated(false)
    setIsTicketGenerated(true);
    setPlateNumberImage('');
  };

  // Fetch gates list on page load
  useEffect(() => {
    gateStatus === 'idle' && dispatch(fetchGates());
  }, [dispatch, gateStatus]);

  // This step is to ensure CardComponent becomes reusable
  const btnArray = [
    {
      key: 0,
      btnText: 'Recapture',
      btnAction: reCapture,
    },
    {
      key: 1,
      btnText: 'Generate Ticket',
      btnAction: onGenerateTicketClicked,
    },
  ];

  const availableGates =
    typeof gates === 'object' ? (
      gates.map(({ _id, gateName }) => (
        <option key={_id} value={gateName}>
          {gateName}
        </option>
      ))
    ) : (
      <option>Loading...</option>
    );

  // Decide on UI to display
  let content;
  if (isTicketGenerated) {
    content = <TicketToBePrinted ticket={ticket} gate={gateName} user={user} />;
  } else if (plateNumberImage) {
    content = (
      <PreviewPlateNumber
        btnArray={btnArray}
        plateNumber={plateNumber}
        isPlateNumberValid={isPlateNumberValid}
        plateNumberImage={plateNumberImage}
        generateRandomPlateNumber={generateRandomPlateNumber}
      >
        {/* Options to choose Entry gates  */}
        <Box>
          <label htmlFor="selectGate"></label>
          <Select
            id="selectGate"
            value={gateName}
            placeholder="Select gate"
            onChange={e => setGateName(e.target.value)}
          >
            {availableGates}
          </Select>
        </Box>
        <Button
          m={5}
          onClick={() => {
            setPlateNumberImage(MalayPlate);
          }}
        >
          Use Dummy PlateNumber
        </Button>
      </PreviewPlateNumber>
    );
  } else {
    content = (
      <SnapPlateNumber
        capture={capture}
        videoConstraints={videoConstraints}
        webcamRef={webcamRef}
      />
    );
  }

  return (
    <Box maxHeight={'100vh'}>
      <PageHeading
        title={'Vehicle Check-In'}
        subTitle={'Scan Vehicle Plate Numbers and Print their Gate Pass'}
      />
      {/* Page Body to Display 3 UIs: 1) Snap plate no, 2) Ticket Builder/Previewer, 3) Print Ticket  */}
      <Box height={'80vh'}>{content}</Box>
    </Box>
  );
};

export default CheckIn;
