import React, { useState } from 'react';
import DataTable from '../../components/DataTable';
// import { ticketRows, ticketCols } from '../../database/db';
import { useSelector } from 'react-redux';

const Tickets = () => {
  const tickets = useSelector(state => state.ticket);
  const [rowData] = useState(tickets.ticketRows);
  const [columnDefs] = useState(tickets.ticketCols);

  return (
    <div>
      <DataTable rowData={rowData} columnDefs={columnDefs} />
    </div>
  );
};

export default Tickets;
