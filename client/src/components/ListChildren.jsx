import { Box, Button, HStack } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ListChildren = ({ icon, text, link }) => {
  const navigate = useNavigate();
  return (
    <HStack as="li" spacing={'1.25rem'}>
      <Box>{icon}</Box>
      <Button
        bg={'none'}
        onClick={() => {
          navigate(link);
        }}
      >
        {text}
      </Button>
    </HStack>
  );
};

export default ListChildren;
