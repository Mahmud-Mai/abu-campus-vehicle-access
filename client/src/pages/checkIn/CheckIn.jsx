import React, { useCallback, useRef, useState } from 'react';
import {
  Box,
  // Button,
  // ButtonGroup,
  // Card,
  // CardBody,
  // CardFooter,
  // Heading,
} from '@chakra-ui/react';
import CamComponent from '../../components/CamComponent';
import CardComponent from '../../components/CardComponent';

const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: 'environment',
};

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
          </CardComponent>
        </Box>
      )}
    </Box>
  );
};
export default CheckIn;
