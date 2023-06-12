import React from 'react';
import { Box } from '@chakra-ui/react';
import PageHeading from '../../components/PageHeading';
import CardComponent from '../../components/CardComponent';
import CamComponent from '../../components/CamComponent';

const CheckOut = () => {
  return (
    <Box height={'100vh'}>
      <PageHeading
        title={'Vehicle Check-Out'}
        subTitle={'Scan Vehicle Plate Numbers and Grant them exit'}
      />
      <Box height={'85vh'}>
        <CardComponent btnText={'Scan QrCode'}>
          <CamComponent />
        </CardComponent>
      </Box>
    </Box>
  );
};

export default CheckOut;
