import React from 'react';
import CardComponent from '../../components/CardComponent';
import { Box, Button, Flex, Stack, StackDivider, Text } from '@chakra-ui/react';
import QrcodeComponent from '../../components/QrcodeComponent';

const TicktetToBePrinted = ({ ticketId, ticket, gate, user }) => {
  return (
    <CardComponent
      customStyles={{ backgroundColor: 'white', color: 'black' }}
      colorScheme="teal"
      title={'ABU VEHICLE GATE PASS'}
    >
      <Stack divider={<StackDivider />} width={'24rem'} spacing="5">
        <Flex justify={'space-between'}>
          <Box>Vehicle Plate Number:</Box>
          <Text> {ticket.plateNumber}</Text>
        </Flex>
        <Flex justify={'space-between'}>
          <Box>Gate Used:</Box>
          <Text>{gate.gateName}</Text>
        </Flex>
        <Flex justify={'space-between'}>
          <Box>Date & Time:</Box>
          <Text>
            {ticket.time} | {ticket.date}
          </Text>
        </Flex>
        <Flex justify={'space-between'}>
          <Box>Personnel on Duty:</Box>
          <Text>{user.userName}</Text>
        </Flex>
        <Flex justify={'center'}>
          <QrcodeComponent ticketId={ticketId} />
        </Flex>
      </Stack>
      <Button onClick={e => window.print()} colorScheme="teal" mt={4}>
        Print Ticket
      </Button>
    </CardComponent>
  );
};

export default TicktetToBePrinted;
