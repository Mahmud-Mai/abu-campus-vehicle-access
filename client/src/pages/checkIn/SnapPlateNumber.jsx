import React from 'react';
import CardComponent from '../../components/CardComponent';
import CamComponent from '../../components/CamComponent';
import { Button } from '@chakra-ui/react';

const SnapPlateNumber = ({ capture, videoConstraints, webcamRef }) => {
  return (
    <CardComponent title={'SNAP PLATE NUMBER'}>
      <CamComponent webcamRef={webcamRef} videoConstraints={videoConstraints} />
      <Button mt={2} onClick={capture}>
        Capture
      </Button>
    </CardComponent>
  );
};

export default SnapPlateNumber;
