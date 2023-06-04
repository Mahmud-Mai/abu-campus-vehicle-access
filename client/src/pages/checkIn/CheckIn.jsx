import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Box, Button, ButtonGroup, Text } from '@chakra-ui/react';
import CamComponent from '../../components/CamComponent';
import CardComponent from '../../components/CardComponent';
import { createWorker } from 'tesseract.js';

const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: 'environment',
};

const worker = await createWorker();

const CheckIn = () => {
  const [plateNumberImage, setPlateNumberImage] = useState('');
  const [plateNumber, setPlateNumber] = useState('');
  const [isDummy, setIsDummy] = useState(false);
  const [isPlateNumberValid, setIsPlateNumberValid] = useState(false); // for plate number validation
  const webcamRef = useRef(null);

  // const regex =
  //   /^([A-Z]{3})(-)([0-9]{3})([A-Z]{2})$|^([0-9]{3})(-)([A-Z]{2})(-)([A-Z]{3})$/;

  const validatePlateNumber = testSubject => {
    const regex = /^[A-Z]{3}-[0-9]{3}[A-Z]{2}$/;
    // const regex = /^([A-Z]{3})([0-9]{3})([A-Z]{2}|-)$/;
    return regex.test(testSubject);
  };
  const capture = useCallback(() => {
    const pictureSrc = webcamRef.current.getScreenshot();
    setPlateNumberImage(pictureSrc);
  }, [webcamRef]);

  const reCapture = () => {
    setPlateNumberImage('');
    setIsDummy(false);
  };

  const btnArray = [
    {
      key: 0,
      btnText: 'Recapture',
      btnAction: reCapture,
    },
    {
      key: 1,
      btnText: 'Generate Ticket',
    },
  ];

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

  const dummyPlateImage = () => {
    const dummyUrl =
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Nigerian_number_plate_Lagos_2014.jpg/800px-Nigerian_number_plate_Lagos_2014.jpg?20180519114758';

    if (dummyUrl !== undefined) doOCR(dummyUrl);
  };

  // Use A Dummy Plate Number
  const dummyPlateNo = () => {
    const plateNumber = 'YLA-291AP';
    setIsPlateNumberValid(validatePlateNumber(plateNumber));
    setPlateNumber(plateNumber);
  };

  // Recognize characters from image
  useEffect(() => {
    doOCR(plateNumberImage);
  }, [doOCR, plateNumberImage]);

  // Check if Input Matches a Plate Number Format
  useEffect(() => {
    setIsPlateNumberValid(validatePlateNumber(plateNumber));
  }, [isPlateNumberValid, plateNumber]);

  return (
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
            {!isDummy ? (
              <ButtonGroup>
                <Button onClick={() => setIsDummy(true)}>Use Dummy Data</Button>
              </ButtonGroup>
            ) : (
              <ButtonGroup>
                <Button onClick={dummyPlateImage}>Use Dummy PN Image</Button>
                <Button onClick={dummyPlateNo}>Use Dummy Plate Number</Button>
              </ButtonGroup>
            )}
          </CardComponent>
        </Box>
      )}
    </Box>
  );
};

export default CheckIn;
