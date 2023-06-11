import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Box, Button, Flex, Select, Text } from '@chakra-ui/react';
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
import PageHeading from '../../components/PageHeading';
import TicketToBePrinted from './TicktetToBePrinted';

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

  const availableGates = gates.map(({ gateId, gateName }) => (
    <option key={gateId} value={gateId}>
      {gateName}
    </option>
  ));

  return (
    <Box height={'100vh'}>
      <PageHeading
        title={'Vehicle Check-In'}
        subTitle={'Scan Vehicle Plate Numbers and Print their Gate Pass'}
      />
      {/* Page Body to Display 3 UIs: 1) Snap plate no, 2) Ticket Builder/Previewer, 3) Print Ticket  */}
      <Box height={'85vh'}>
        {isTicketGenerated ? (
          /* If isTicketGenerated is True: Display Ticket to be printed: UI 3 */
          <Box>
            <TicketToBePrinted
              ticketId={ticketId}
              ticket={ticket}
              gate={gate}
              user={user}
            />
          </Box>
        ) : (
          <Box>
            {plateNumberImage === '' ? (
              // If plateNumberImage is empty: Show Video-Camera Component: UI 1
              <Box>
                <CardComponent title={'SNAP PLATE NUMBER'}>
                  <CamComponent
                    webcamRef={webcamRef}
                    videoConstraints={videoConstraints}
                  />
                  <Button onClick={capture}>Capture</Button>
                </CardComponent>
              </Box>
            ) : (
              // If plateNumberImage is not empty: Show Preview Component
              <Box>
                <CardComponent title={'PREVIEW PLATE NUMBER'} props={btnArray}>
                  <Box>
                    {/* Conditionally display either the plateNumberImage Or an empty Box */}
                    {plateNumberImage ? (
                      <img
                        sx={{ width: '250px', height: '300px' }}
                        src={plateNumberImage}
                        alt="plate number img"
                      />
                    ) : (
                      <Flex
                        sx={{
                          width: '500px',
                          height: '300px',
                          border: '2px solid #f3f3f3',
                        }}
                        mx="auto"
                        align="center"
                        justify="center"
                      >
                        PLEASE SNAP A PLATE NUMBER!!
                      </Flex>
                    )}
                  </Box>
                  {/* Text box to display the recognized characters from the picture provided   */}
                  <Text m={3}>
                    {isPlateNumberValid
                      ? `Recognized Plate Number: ${plateNumber}`
                      : `Valid Nigerian Plate Number not detected`}
                  </Text>
                  {/* Options to choose Entry gates  */}
                  <Box>
                    <label htmlFor="selectGate"></label>
                    <Select
                      id="selectGate"
                      value={gateId}
                      placeholder="Select gate"
                      onChange={e => setGateId(e.target.value)}
                    >
                      {availableGates}
                    </Select>
                  </Box>
                  {/* Button To generate a dummy plate number for demonstration */}
                  <Button mt={3} onClick={generateRandomPlateNumber}>
                    Generate Random Plate Number
                  </Button>
                </CardComponent>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CheckIn;
