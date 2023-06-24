import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Box, Select } from '@chakra-ui/react';
import { createWorker } from 'tesseract.js';
import { randomPlateNos } from '../../common/Constants'; // personally curated list of dummy plate Nos
import { videoConstraints } from '../../common/Constants'; // for webcam config
import { useDispatch, useSelector } from 'react-redux';
import { createTicket } from '../../features/ticket/ticketsSlice';
import {
  fetchGates,
  fetchTGatesStatus,
  fetchAllGates,
} from '../../features/gate/gateSlice';
import { selectAllUsers } from '../../features/users/userSlice';
import PageHeading from '../../components/PageHeading';
import TicketToBePrinted from './TicktetToBePrinted';
import SnapPlateNumber from './SnapPlateNumber';
import PreviewPlateNumber from './PreviewPlateNumber';
import {
  createVehicleByPlateNumber,
  fetchVehicleByPlateNumber,
} from '../../features/vehicle/vehicleSlice';

const worker = await createWorker(); // needed by tesseract

const CheckIn = () => {
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

  // Fetch the missing data to populate ticket
  // const allTickets = useSelector(fetchAllTickets);
  // const gatesList = useSelector(fetchAllGates);

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
      console.log('🚀 ~ file: CheckIn.jsx:54 ~ doOCR ~ text:', text);
    }
  }, [plateNumberImage]);

  // Define function to check for Nigerian plate Number formats
  const validatePlateNumber = testSubject => {
    const regex = /^[A-Z]{3}-[0-9]{3}[A-Z]{2}$/;
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
    // Check if plateNumber is proovided, fetch the associated Vehicle Then Create a ticket for the vehicle
    if (plateNumber) {
      // Check if vahicle exists and get the id
      let vehicleExists = await dispatch(
        fetchVehicleByPlateNumber(plateNumber)
      ).unwrap();

      // Else create the vehicle and get the Id
      if (vehicleExists === 'Request failed with status code 400') {
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
    typeof gates === 'object'
      ? gates.map(({ _id, gateName }) => (
          <option key={_id} value={gateName}>
            {gateName}
          </option>
        ))
      : undefined;

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
