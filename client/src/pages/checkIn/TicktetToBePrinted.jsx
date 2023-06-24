import React from 'react';
import CardComponent from '../../components/CardComponent';
import { Box, Button, Flex, Stack, StackDivider, Text } from '@chakra-ui/react';
import QrcodeComponent from '../../components/QrcodeComponent';
import { useSelector } from 'react-redux';
import { fetchNewlyCreatedTicket } from '../../features/ticket/ticketsSlice';

const TicktetToBePrinted = ({ ticketId, plateNumber }) => {
  const ticket = useSelector(fetchNewlyCreatedTicket);
  console.log(`🚀 ~ TicktetToBePrinted ~ ticket:`, ticket);

  return (
    <CardComponent
      customStyles={{ backgroundColor: 'white', color: 'black' }}
      colorScheme="teal"
      title={'ABU VEHICLE GATE PASS'}
    >
      <Stack divider={<StackDivider />} width={'24rem'} spacing="5">
        <Flex justify={'space-between'}>
          <Box>Ticket Id:</Box>
          <Text> {ticket._id}</Text>
        </Flex>
        <Flex justify={'space-between'}>
          <Box>Vehicle Plate Number:</Box>
          <Text> {ticket.plateNumber}</Text>
        </Flex>
        <Flex justify={'space-between'}>
          <Box>Passage Type</Box>
          <Text> {ticket.ticketStatus}</Text>
        </Flex>
        <Flex justify={'space-between'}>
          <Box>Gate Used:</Box>
          <Text>{ticket.gate}</Text>
        </Flex>
        <Flex justify={'space-between'}>
          <Box>Time:</Box>
          <Text>{ticket.createdAt}</Text>
        </Flex>
        <Flex justify={'space-between'}>
          <Box>Security Personnel:</Box>
          <Text>{ticket.user}</Text>
        </Flex>
        <Flex justify={'center'}>
          <QrcodeComponent ticketId={ticket._id} />
        </Flex>
      </Stack>
      <Button onClick={e => window.print()} colorScheme="teal" mt={4}>
        Print Ticket
      </Button>
    </CardComponent>
  );
};

export default TicktetToBePrinted;
