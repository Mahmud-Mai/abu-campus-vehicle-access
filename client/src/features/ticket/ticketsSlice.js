import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    ticketId: '8pPV5Owt4DOo26xEIpZGe',
    plateNumber: 'ABC-123AA',
    userId: 0,
    gateId: 0,
    date: '10/06/2023',
    time: '10:22:03',
  },
  {
    ticketId: 'p6mdfI44AuIhGDZaansc4',
    plateNumber: 'DEC-123DC',
    userId: 2,
    gateId: '2',
    date: '10/06/2023',
    time: '11:51:29',
  },
  {
    ticketId: 'BXvA0bgWqwvMicHX5eeTA',
    plateNumber: 'ADE-012AD',
    userId: 0,
    gateId: '3',
    date: '10/06/2023',
    time: '11:51:46',
  },
  {
    ticketId: '08Gdp3_n1dp-hzucGcku-',
    plateNumber: 'AEF-345AE',
    userId: 1,
    gateId: '4',
    date: '10/06/2023',
    time: '11:51:58',
  },
];

export const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    ticketAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(ticketId, plateNumber, userId, gateId) {
        return {
          payload: {
            ticketId: ticketId,
            plateNumber: plateNumber,
            userId,
            gateId,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
          },
        };
      },
    },
  },
});

export const selectAllTickets = state => state.tickets;
export default ticketsSlice.reducer;
export const { ticketAdded } = ticketsSlice.actions;
// export const { someAction1, someAction1 } = ticketSlice.actions
