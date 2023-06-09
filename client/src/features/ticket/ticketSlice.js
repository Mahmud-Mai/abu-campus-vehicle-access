import { createSlice, nanoid } from '@reduxjs/toolkit';
// import { ticketRows } from '../../database/db';

const initialState = [];

export const ticketSlice = createSlice({
  name: 'ticketSlice',
  initialState,
  reducers: {
    ticketAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(plateNumber) {
        return {
          payload: {
            id: nanoid(),
            plateNumber: plateNumber,
            Date: new Date().toLocaleDateString(),
            Time: new Date().toLocaleTimeString(),
          },
        };
      },
    },
  },
});

export const selectAllTickets = state => state.ticket;
export default ticketSlice.reducer;
export const { ticketAdded } = ticketSlice.actions;
// export const { someAction1, someAction1 } = ticketSlice.actions
