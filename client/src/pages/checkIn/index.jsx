// React-related imports
import React, { useCallback, useEffect, useRef, useState } from 'react';

// External library imports
import { createWorker } from 'tesseract.js';

// Chakra UI imports:
import { Box, Button, Select, useToast } from '@chakra-ui/react';

// Custom constants imports
import { randomPlateNos } from '../../common/Constants';
import { videoConstraints } from '../../common/Constants';

// Redux-related imports
import { useDispatch, useSelector } from 'react-redux';

// Components
import PageHeading from '../../components/PageHeading';
import TicketToBePrinted from './TicktetToBePrinted';
import SnapPlateNumber from './SnapPlateNumber';
import PreviewPlateNumber from './PreviewPlateNumber';

// Assets
// import MalayPlate from '../../assets/GWA-946GG.jpg';
import img1 from '../../assets/plate-numbers/1.png';
import img2 from '../../assets/plate-numbers/2.png';
import img3 from '../../assets/plate-numbers/3.png';
import img4 from '../../assets/plate-numbers/4.png';
import img5 from '../../assets/plate-numbers/5.png';
import img6 from '../../assets/plate-numbers/6.png';

// Redux slices and API imports
import {
  fetchTGatesStatus,
  fetchAllGates,
} from '../../features/gate/gateSlice';
import { selectAllUsers } from '../../features/users/userSlice';
import { createTicket } from '../../api/tickets';
import { fetchGates } from '../../api/gates';
import {
  createVehicleByPlateNumber,
  fetchVehicleByPlateNumber,
} from '../../api/vehicles';

const CheckIn = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const gateStatus = useSelector(fetchTGatesStatus);
  const allUser = useSelector(selectAllUsers);
  const userId = allUser[0].userId; // temporarily
  const gates = useSelector(fetchAllGates);

  const [gateName, setGateName] = useState('');
  const [plateNumberImage, setPlateNumberImage] = useState(''); // to be used to call doOCR()
  const [plateNumber, setPlateNumber] = useState(''); // to be used in validatePlateNo() and displayed to UI
  const [isTicketGenerated, setIsTicketGenerated] = useState(false); // will be used to render Ticket component
  const [isPlateNumberValid, setIsPlateNumberValid] = useState(false); // To display plate number to UI
  const webcamRef = useRef(null);

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
    const worker = await createWorker();
    if (plateNumberImage) {
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      const {
        data: { text },
      } = await worker.recognize(plateNumberImage);
      await worker.terminate();
      setPlateNumber(text);
      console.log(`🚀 ~ doOCR ~ text:`, text);
      toast({
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
  const testPlateNumber = testSubject => {
    const regex = /^[A-Z]{3}-\d{3}[A-Z]{2}$/;
    return regex.test(testSubject);
  };

  // Choose a random Dummy Plate Number from a curated list
  const generateRandomPlateNumber = () => {
    const plateNumber =
      randomPlateNos[Math.floor(Math.random() * randomPlateNos.length)];
    setIsPlateNumberValid(testPlateNumber(plateNumber));
    setPlateNumber(plateNumber);
  };

  // Random Dummy Plate number Image logic
  const imagePaths = [img1, img2, img3, img4, img5, img6];

  const randomImagePath =
    imagePaths[Math.floor(Math.random() * imagePaths.length)];

  // Run doOCR either on image capture or when a dummy plateNumberImage is provided
  useEffect(() => {
    doOCR(plateNumberImage);
  }, [doOCR, plateNumberImage]);

  // Run the validatePlateNumber function defined above
  useEffect(() => {
    setIsPlateNumberValid(testPlateNumber(plateNumber));
  }, [isPlateNumberValid, plateNumber]);

  // Function to create a ticket for a given vehicle ID
  const createTicketForVehicle = async vehicleId => {
    try {
      const ticketFields = {
        plateNumber: vehicleId,
        ticketStatus: 'Inbound',
        gate: gateName,
        user: user.userName,
      };
      await dispatch(createTicket(ticketFields)).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  // Function to ensure the the scanned vehicles exists before creating a new ticket
  const onGenerateTicketClicked = async () => {
    if (!isPlateNumberValid) {
      toast({
        position: 'top',
        render: () => (
          <Box color="white" mt={12} p={3} bg="red.500">
            {!isPlateNumberValid && 'Please Provide a valid Plate Number'}
          </Box>
        ),
        duration: 5000,
        isClosable: true,
      });
    } else if (!gateName) {
      toast({
        position: 'top',
        render: () => (
          <Box color="white" mt={12} p={3} bg="red.500">
            {!gateName && 'Please select an entry gate'}
          </Box>
        ),
        duration: 5000,
        isClosable: true,
      });
    } else {
      try {
        let vehicleExists = await dispatch(
          fetchVehicleByPlateNumber(plateNumber)
        ).unwrap();

        if (
          !vehicleExists ||
          vehicleExists === 'Request failed with status code 400'
        ) {
          let newVehicleExist = await dispatch(
            createVehicleByPlateNumber(plateNumber)
          ).unwrap();
          vehicleExists = newVehicleExist;
        }

        await createTicketForVehicle(vehicleExists._id);
      } catch (error) {
        console.log('An error occurred:', error);
      }

      setIsTicketGenerated(true);
      setPlateNumberImage('');
    }
  };

  // Fetch gates list on page load
  useEffect(() => {
    const fetchGatesData = async () => {
      if (gateStatus === 'idle') {
        await dispatch(fetchGates()).unwrap();
      }
    };

    fetchGatesData();
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

  const gatesData =
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
    content = <TicketToBePrinted />;
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
            {gatesData}
          </Select>
        </Box>
        <Button
          m={5}
          onClick={() => {
            setPlateNumberImage(randomImagePath);
            console.log(`🚀 ~ CheckIn ~ randomImagePath:`, randomImagePath);
          }}
        >
          Fetch Dummy PlateNumber Image
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
