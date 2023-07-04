// React-related imports
import React from 'react';

// Chakra UI imports:
import CardComponent from '../../components/CardComponent';
import {
  Box,
  Button,
  Flex,
  Spinner,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';

// Components
import QrcodeComponent from '../../components/QrcodeComponent';

// Redux-related imports
import { useSelector } from 'react-redux';

// Redux slices and API imports
import {
  fetchNewlyCreatedTicket,
  getTicketsListStatus,
} from '../../features/ticket/ticketsSlice';

const TicktetToBePrinted = () => {
  const NewTicket = useSelector(fetchNewlyCreatedTicket);
  const lastTicket = NewTicket?.slice(-1)[0];
  console.log('🚀 ~ TicktetToBePrinted ~ lastTicket:', lastTicket);

  let content;
  if (getTicketsListStatus !== 'loading') {
    content = (
      <Stack divider={<StackDivider />} width={'24rem'} spacing="5">
        <Flex justify={'space-between'}>
          <Box>Ticket Id:</Box>
          <Text> {lastTicket._id}</Text>
        </Flex>
        <Flex justify={'space-between'}>
          <Box>Vehicle Plate Number:</Box>
          <Text> {lastTicket.plateNumber}</Text>
        </Flex>
        <Flex justify={'space-between'}>
          <Box>Passage Type</Box>
          <Text> {lastTicket.ticketStatus}</Text>
        </Flex>
        <Flex justify={'space-between'}>
          <Box>Gate Used:</Box>
          <Text>{lastTicket.gate}</Text>
        </Flex>
        <Flex justify={'space-between'}>
          <Box>Time:</Box>
          <Text>{lastTicket.createdAt}</Text>
        </Flex>
        <Flex justify={'space-between'}>
          <Box>Security Personnel:</Box>
          <Text>{lastTicket.user}</Text>
        </Flex>
        <Flex justify={'center'}>
          <QrcodeComponent ticketId={lastTicket._id} />
        </Flex>
      </Stack>
    );
  } else {
    content = (
      <Flex mx="auto" align={'center'} height={200}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Flex>
    );
  }

  return (
    <CardComponent
      customStyles={{ backgroundColor: 'white', color: 'black' }}
      colorScheme="teal"
      title={'ABU VEHICLE GATE PASS'}
    >
      {content}
      <Button onClick={e => window.print()} colorScheme="teal" mt={4}>
        Print Ticket
      </Button>
    </CardComponent>
  );
};

export default TicktetToBePrinted;
