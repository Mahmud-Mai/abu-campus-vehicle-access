import React, { useEffect } from 'react';
import DataTable from '../../components/DataTable';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTicketsListStatus,
  fetchAllTickets,
} from '../../features/ticket/ticketsSlice';
import PageHeading from '../../components/PageHeading';
import { Flex } from '@chakra-ui/react';
import { fetchTickets } from '../../api/tickets';

const Tickets = () => {
  const dispatch = useDispatch();

  const ticketsList = useSelector(fetchAllTickets);
  const ticketsStatus = useSelector(getTicketsListStatus);

  const rowData =
    typeof ticketsList === 'object' && ticketsList?.length
      ? ticketsList.map(({ _id, plateNumber, user, gate, ticketStatus }) => ({
          'Ticket Id': _id || null,
          'Plate Number': plateNumber || null,
          'Entry Gate': gate,
          PassageType: ticketStatus,
          'Personnel InCharge': user,
        }))
      : null;

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

  return (
    <>
      <PageHeading
        title={'Tickets Information'}
        subTitle={'View all tickets information'}
      />
      <Flex mx={'auto'} justify={'center'}>
        <DataTable rowData={rowData} columnDefs={columnDefs} />;
      </Flex>
    </>
  );
};

export default Tickets;
