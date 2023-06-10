import React, { useState } from 'react';
import DataTable from '../../components/DataTable';
import { useSelector } from 'react-redux';
import { selectAllTickets } from '../../features/ticket/ticketsSlice';

const Tickets = () => {
  const tickets = useSelector(selectAllTickets);
  const [rowData] = useState(tickets.ticketRows);
  const [columnDefs] = useState(tickets.ticketCols);

  return (
    <div>
      <DataTable rowData={rowData} columnDefs={columnDefs} />
    </div>
  );
};

export default Tickets;
