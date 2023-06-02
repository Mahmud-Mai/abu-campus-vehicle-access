import React, { useCallback, useRef, useState } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Heading,
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

  return (
    <Box>
      {picture === '' ? (
        <Box>
          <CardComponent
            title={'SNAP PLATE NUMBER'}
            btnAction={capture}
            btnText={'Snap'}
          >
            <CamComponent
              webcamRef={webcamRef}
              videoConstraints={videoConstraints}
            />
          </CardComponent>
        </Box>
      ) : (
        // <Card mx={'auto'} maxW="xl" variant={'elevated'} align={'center'} p={5}>
        //   <Heading as={'h2'}>SNAP PLATE NUMBER</Heading>
        //   <CardBody>
        //     <CamComponent
        //       webcamRef={webcamRef}
        //       videoConstraints={videoConstraints}
        //     />
        //   </CardBody>
        //   <CardFooter>
        //     <Button onClick={capture}>Snap Picture</Button>
        //   </CardFooter>
        // </Card>
        <Card
          mx={'auto'}
          maxW={'xl'}
          variant={'elevated'}
          align={'center'}
          sx={{ transition: 0.4 }}
          p={5}
        >
          <Heading as={'h2'}>IMAGE PREVIEW</Heading>
          <CardBody>
            <img src={picture} alt="plate number img" />
          </CardBody>
          <CardFooter>
            <ButtonGroup>
              <Button
                onClick={() => {
                  setPicture('');
                }}
              >
                Retake Picture
              </Button>
              <Button>Generate Ticket</Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
      )}
    </Box>
  );
};
export default CheckIn;
