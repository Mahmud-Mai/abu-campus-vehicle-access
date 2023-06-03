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
  const [isPNValid, setIsPNValid] = useState(false); // for plate number validation
  const webcamRef = useRef(null);

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
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const {
      data: { text },
    } = await worker.recognize(plateNumberImage);
    setPlateNumber(text);
  }, [plateNumberImage]);

  const dummyPlateOcr = () => {
    const dummyUrl = process.env.local.DUMMY_URL;
    doOCR(dummyUrl);
  };

  const dummyPlateTicket = () => {
    setPlateNumber('YLA-291AP');
  };

  useEffect(() => {
    doOCR();
  }, [doOCR, plateNumberImage]);

  const validatePlateNumber = plateNumber => {
    const regex = /^([A-Z]{3})(\d{1,2})([A-Z]{1,3})(\d{1,4})$/;
    return regex.test(plateNumber);
  };

  const handleChange = event => {
    const plateNumber = event.target.value;
    isPNValid(validatePlateNumber(plateNumber));

    if (isPNValid) {
      console.log('The plate number matches a Nigerian plate number format.');
    } else {
      console.log(
        'The plate number does not match a Nigerian plate number format.'
      );
    }
  };
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
            <Text m={3} onChange={handleChange}>
              Recognized Text: {plateNumber}
            </Text>
            {!isDummy ? (
              <ButtonGroup>
                <Button onClick={() => setIsDummy(true)}>Use Dummy Data</Button>
              </ButtonGroup>
            ) : (
              <ButtonGroup>
                <Button onClick={dummyPlateOcr}>Dummy Plate for OCR</Button>
                <Button onClick={dummyPlateTicket}>
                  Dummy Plate for ticket
                </Button>
              </ButtonGroup>
            )}
          </CardComponent>
        </Box>
      )}
    </Box>
  );
};

export default CheckIn;
