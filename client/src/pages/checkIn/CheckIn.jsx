import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';
import CamComponent from '../../components/CamComponent'; // component to provide camera to UI
import CardComponent from '../../components/CardComponent';
import { createWorker } from 'tesseract.js';
import { randomPlateNos } from '../../common/Constants'; // personally curated list of dummy plate Nos
import { videoConstraints } from '../../common/Constants'; // for webcam config
import { useDispatch } from 'react-redux';
import { ticketAdded } from '../../features/ticket/ticketSlice';

const worker = await createWorker(); // needed by tesseract

const CheckIn = () => {
  const userId = 'SECURITY-001';

  const dispatch = useDispatch();
  const [plateNumberImage, setPlateNumberImage] = useState(''); // to be used to call doOCR()
  const [plateNumber, setPlateNumber] = useState(''); // to be used in validatePlateNo() and displayed to UI
  const [isTicketGenerated, setIsTicketGenerated] = useState(false); // will be used to render Ticket component
  const [isPlateNumberValid, setIsPlateNumberValid] = useState(false); // To display plate number to UI
  const webcamRef = useRef(null);

  // Take picture
  const capture = useCallback(() => {
    const pictureSrc = webcamRef.current.getScreenshot();
    setPlateNumberImage(pictureSrc);
  }, [webcamRef]);

  // ReTake picture
  const reCapture = () => {
    setPlateNumberImage('');
  };

  const validatePlateNumber = testSubject => {
    const regex = /^[A-Z]{3}-[0-9]{3}[A-Z]{2}$/;
    return regex.test(testSubject);
  };

  const onGenerateTicketClicked = () => {
    setIsTicketGenerated(true);
    if (plateNumber) {
      dispatch(ticketAdded(plateNumber, userId));
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
    console.log('🚀  Random Dummy Plate No:', plateNumber);
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
                <Text> {plateNumber}</Text>
              </Flex>
              <Flex justify={'space-between'}>
                <Box>Gate Used:</Box>
                <Text>North Gate</Text>
              </Flex>
              <Flex justify={'space-between'}>
                <Box>Date & Time:</Box>
                <Text>16:43:30 | 06/06/2023</Text>
              </Flex>
              <Flex justify={'space-between'}>
                <Box>Personnel on Duty:</Box>
                <Text> Sambo Hamisu</Text>
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

                <ButtonGroup>
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
