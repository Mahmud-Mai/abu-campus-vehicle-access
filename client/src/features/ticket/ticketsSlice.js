import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

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
