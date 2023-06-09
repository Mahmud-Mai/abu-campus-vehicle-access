import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Select,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';
import CamComponent from '../../components/CamComponent'; // component to provide camera to UI
import CardComponent from '../../components/CardComponent';
import { createWorker } from 'tesseract.js';
import { randomPlateNos } from '../../common/Constants'; // personally curated list of dummy plate Nos
import { videoConstraints } from '../../common/Constants'; // for webcam config
import { useDispatch, useSelector } from 'react-redux';
import {
  ticketAdded,
  selectAllTickets,
} from '../../features/ticket/ticketsSlice';
import { selectAllGates } from '../../features/gate/gateSlice';
import { selectAllUsers } from '../../features/users/userSlice';
import { nanoid } from '@reduxjs/toolkit';
import QRCodeComponent from '../../components/QrcodeComponent';

const worker = await createWorker(); // needed by tesseract

const CheckIn = () => {
  const gates = useSelector(selectAllGates);
  const allUser = useSelector(selectAllUsers);
  const userId = allUser[0].userId;
  const [gateId, setGateId] = useState(gates.length > 0 ? gates[0].gateId : '');
  const [ticketId, setTicketId] = useState('');
  const dispatch = useDispatch();

  const [plateNumberImage, setPlateNumberImage] = useState(''); // to be used to call doOCR()
  const [plateNumber, setPlateNumber] = useState(''); // to be used in validatePlateNo() and displayed to UI
  const [isTicketGenerated, setIsTicketGenerated] = useState(false); // will be used to render Ticket component
  const [isPlateNumberValid, setIsPlateNumberValid] = useState(false); // To display plate number to UI
  const webcamRef = useRef(null);

  // Fetch the missing data to populate ticket
  const allTickets = useSelector(selectAllTickets);
  const ticket = allTickets.find(ticket => ticket.ticketId === ticketId);
  const user = allUser.find(user => user.userId === userId);
  const gate = gates.find(gate => gate.gateId === Number(gateId));

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

  // Choose a random Dummy Plate Number from a curated list
  const useDummyPlateNo = () => {
    const plateNumber =
      randomPlateNos[Math.floor(Math.random() * randomPlateNos.length)];
    setIsPlateNumberValid(validatePlateNumber(plateNumber));
    setPlateNumber(plateNumber);
  };

  // Run doOCR either on image capture or when a dummy plateNumberImage is provided
  useEffect(() => {
    doOCR(plateNumberImage);
  }, [doOCR, plateNumberImage]);

  // Check if Input Matches a Plate Number Format
  useEffect(() => {
    setIsPlateNumberValid(validatePlateNumber(plateNumber));
  }, [isPlateNumberValid, plateNumber]);

  const validatePlateNumber = testSubject => {
    const regex = /^[A-Z]{3}-[0-9]{3}[A-Z]{2}$/;
    return regex.test(testSubject);
  };

  const onGenerateTicketClicked = () => {
    // Check if plateNumber is defined
    if (plateNumber) {
      // Generate a unique ticketId
      const ticketId = nanoid();

      // Set the value of the ticketId state variable
      setTicketId(ticketId);
      setIsTicketGenerated(true);

      // Dispatch the ticketAdded action creator
      dispatch(ticketAdded(ticketId, plateNumber, userId, gateId));
    }
    setPlateNumberImage('');
    // setIsTicketGenerated(false)
  };

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

  const gateOptions = gates.map(gate => (
    <option key={gate.gateId} value={gate.gateId}>
      {gate.gateName}
    </option>
  ));

  return (
    <Box>
      {isTicketGenerated ? (
        <Box>
          <CardComponent
            customStyles={{ backgroundColor: 'white', color: 'black' }}
            title={'ABU VEHICLE GATE PASS'}
            btnAction={() => console.log('Generated Ticket Successfully')}
            btnText={'Print Ticket'}
          >
            <Stack divider={<StackDivider />} width={'24rem'} spacing="5">
              <Flex justify={'space-between'}>
                <Box>Vehicle Plate Number:</Box>
                <Text> {ticket.plateNumber}</Text>
              </Flex>
              <Flex justify={'space-between'}>
                <Box>Gate Used:</Box>
                <Text>{gate.gateName}</Text>
              </Flex>
              <Flex justify={'space-between'}>
                <Box>Date & Time:</Box>
                <Text>
                  {ticket.time} | {ticket.date}
                </Text>
              </Flex>
              <Flex justify={'space-between'}>
                <Box>Personnel on Duty:</Box>
                <Text>{user.userName}</Text>
              </Flex>
              <Flex
                justify={'center'}
                // mt={3}
              >
                <QRCodeComponent ticketId={ticketId} />
              </Flex>
            </Stack>
          </CardComponent>
        </Box>
      ) : (
        <Box>
          {plateNumberImage === '' ? (
            // If plateNumberImage is empty: Show Video-Camera Component
            <Box>
              <CardComponent
                title={'SNAP PLATE NUMBER'}
                btnAction={capture}
                btnText={'Capture'}
              >
                <CamComponent
                  webcamRef={webcamRef}
                  videoConstraints={videoConstraints}
                />
              </CardComponent>
            </Box>
          ) : (
            // If plateNumberImage is not empty: Show Preview Component
            <Box>
              <CardComponent title={'PREVIEW PLATE NUMBER'} props={btnArray}>
                <Box>
                  <img src={plateNumberImage} alt="plate number img" />
                </Box>
                <Text m={3}>
                  {isPlateNumberValid
                    ? `Recognized Plate Number: ${plateNumber}`
                    : `Valid Nigerian Plate Number not detected`}
                </Text>

                <Box>
                  <label htmlFor="selectGate"></label>
                  <Select
                    id="selectGate"
                    value={gateId}
                    placeholder="Select gate"
                    onChange={e => setGateId(e.target.value)}
                  >
                    {gateOptions}
                  </Select>
                </Box>

                <ButtonGroup mt={5}>
                  <Button onClick={useDummyPlateNo}>
                    Use Dummy Plate Number
                  </Button>
                </ButtonGroup>
              </CardComponent>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default CheckIn;
