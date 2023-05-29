import { AbsoluteCenter, Heading, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useRouteError } from 'react-router-dom';

const RouterError = () => {
  const error = useRouteError();

  useEffect(() => {
    console.log('🚀 ~ file: routeError.jsx:7 ~ routerError ~ error:', error);
  });
  return (
    <AbsoluteCenter textAlign={'center'}>
      <Heading as={'h1'}>Sorry!!!</Heading>
      <Heading as={'h3'}>{error.data}</Heading>
      <Text>
        <i>{error.statusText || error.message}</i>
      </Text>
    </AbsoluteCenter>
  );
};

export default RouterError;
