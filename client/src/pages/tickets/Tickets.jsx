import DataTable from '../../components/DataTable';
import { useSelector } from 'react-redux';
import { selectAllTickets } from '../../features/ticket/ticketsSlice';
import PageHeading from '../../components/PageHeading';
import { selectAllUsers } from '../../features/users/userSlice';
import { selectAllGates } from '../../features/gate/gateSlice';
import { Flex } from '@chakra-ui/react';

const Tickets = () => {
  const allAppOperators = useSelector(selectAllUsers);
  const allGates = useSelector(selectAllGates);
  const parkingTicketsArray = useSelector(selectAllTickets);

  const rowData = parkingTicketsArray.map(
    ({ ticketId, plateNumber, userId, gateId, date, time }) => ({
      'Ticket Id': ticketId,
      'Plate Numbers': plateNumber,
      'Entry Gate': allGates
        .filter(gate => gate.gateId === Number(gateId))
        .map(data => data.gateName),
      Time: time,
      Date: date,
      'Personnel ID': allAppOperators
        .filter(user => user.userId === userId)
        .map(data => data.userName),
    })
  );

  const columnDefs = [
    { field: 'Ticket Id' },
    { field: 'Plate Numbers', filter: true },
    { field: 'Entry Gate', filter: true },
    { field: 'Time' },
    { field: 'Date', filter: true },
    { field: 'Personnel ID', filter: true },
  ];

  return (
    <div>
      <PageHeading
        title={'Tickets Information'}
        subTitle={'View all tickets information'}
      />
      <Flex mx={'auto'} justify={'center'}>
        <DataTable rowData={rowData} columnDefs={columnDefs} />
      </Flex>
    </div>
  );
};

export default Tickets;
