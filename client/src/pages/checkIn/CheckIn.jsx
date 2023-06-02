import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import CamComponent from '../../components/CamComponent';
import CardComponent from '../../components/CardComponent';
import { createWorker } from 'tesseract.js';

const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: 'environment',
};

const worker = await createWorker({
  logger: m => console.log(m),
});

const CheckIn = () => {
  const [picture, setPicture] = useState('');
  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const pictureSrc = webcamRef.current.getScreenshot();
    setPicture(pictureSrc);
  }, [webcamRef]);

  const reCapture = () => {
    setPicture('');
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

  const doOCR = async picture => {
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const {
      data: { text },
    } = await worker.recognize(picture);
    setOcr(text);
  };

  const [ocr, setOcr] = useState('Recognizing...');
  useEffect(() => {
    doOCR(picture);
  }, [picture]);

  // useEffect(() => {
  //   Tesseract.recognize(picture, 'eng', { logger: m => console.log(m) }).then(
  //     ({ data: { text } }) => {
  //       console.log('🚀 ~ file: CheckIn.jsx:44 ~ ).then ~ text:', text);
  //       setOcr(text);
  //     }
  //   );
  // }, [picture]);

  return (
    <Box>
      {picture === '' ? (
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
        <Box>
          <CardComponent title={'PREVIEW PLATE NUMBER'} props={btnArray}>
            <img src={picture} alt="plate number img" />
            <Text>Recognized Text: {ocr}</Text>
          </CardComponent>
        </Box>
      )}
    </Box>
  );
};
export default CheckIn;
