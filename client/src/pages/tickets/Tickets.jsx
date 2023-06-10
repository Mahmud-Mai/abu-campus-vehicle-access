import DataTable from '../../components/DataTable';
import { useSelector } from 'react-redux';
import { selectAllTickets } from '../../features/ticket/ticketsSlice';

// const camelCase = str => {
//   if (typeof str !== 'string') {
//     return '';
//   }

//   return str.replace(/[_-]/g, '');
// };

const Tickets = () => {
  const parkingTicketsArray = useSelector(selectAllTickets);

  const rowData = parkingTicketsArray.map(
    ({ ticketId, plateNumber, userId, gateId, date, time }) => ({
      'Ticket Id': ticketId,
      'Plate Numbers': plateNumber,
      'Entry Gate': Number(gateId),
      Time: time,
      Date: date,
      'Personnel ID': userId,
    })
  );
  console.log('🚀 ~ file: Tickets.jsx:26 ~ Tickets ~ rowData:', rowData);

  // const parkingTicketTableColumns = Object.keys(parkingTicketsArray[0]);

  // const columnDefs = parkingTicketTableColumns.map(item => {
  //   const fieldName = item;
  //   return {
  //     field: fieldName,
  //   };
  // });

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
      <DataTable rowData={rowData} columnDefs={columnDefs} />
    </div>
  );
};

export default Tickets;
