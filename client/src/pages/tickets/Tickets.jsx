import React, { useEffect } from 'react';
import DataTable from '../../components/DataTable';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTickets,
  // getTicketsError,
  getTicketsStatus,
  fetchAllTickets,
} from '../../features/ticket/ticketsSlice';
import PageHeading from '../../components/PageHeading';
import { Flex, Spinner, Text } from '@chakra-ui/react';

const Tickets = () => {
  const dispatch = useDispatch();

  const ticketsList = useSelector(fetchAllTickets);
  const ticketsStatus = useSelector(getTicketsStatus);
  // const ticketsError = useSelector(getTicketsError);

  const rowData = ticketsList.tickets.map(
    ({ _id, plateNumber, user, gate, ticketStatus }) => ({
      'Ticket Id': _id || null,
      'Plate Number': plateNumber || null,
      'Entry Gate': gate,
      PassageType: ticketStatus,
      'Personnel InCharge': user,
    })
  );

  const columnDefs = [
    { field: 'Ticket Id' },
    { field: 'Plate Number', filter: true },
    { field: 'Entry Gate', filter: true },
    { field: 'PassageType' },
    { field: 'Personnel InCharge', filter: true },
  ];

  useEffect(() => {
    // fetch tickets only if ticketsStatus is 'idle'
    ticketsStatus === 'idle' && dispatch(fetchTickets());
  }, [dispatch, ticketsStatus]);

  // Decide content to display
  let content;
  if (ticketsStatus === 'loading') {
    content = (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    );
  } else if (ticketsStatus === 'success') {
    content = <DataTable rowData={rowData} columnDefs={columnDefs} />;
  } else if (ticketsStatus === 'failed') {
    content = <Text>Could not fetch Tickets from the Backend</Text>;
  }

  return (
    <>
      <PageHeading
        title={'Tickets Information'}
        subTitle={'View all tickets information'}
      />
      <Flex mx={'auto'} justify={'center'}>
        {content}
      </Flex>
    </>
  );
};

export default Tickets;
