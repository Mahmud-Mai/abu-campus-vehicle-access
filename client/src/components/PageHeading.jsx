import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';

const PageHeading = ({ title, subTitle }) => {
  return (
    <Box sx={{ margin: '2rem 0 1rem 4rem', height: '15vh' }} textAlign={'left'}>
      <Heading as={'h1'}>{title}</Heading>
      <Text>{subTitle}</Text>
    </Box>
  );
};

export default PageHeading;
