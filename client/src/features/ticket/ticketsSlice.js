import { createSlice } from '@reduxjs/toolkit';
import { createTicket, fetchTickets } from '../../api/tickets';

const initialState = {
  tickets: [],
  newlyCreatedTicket: {},
  status: 'idle', // 'loadding' | 'success' | 'failed'
  error: null,
};

export const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchTickets.pending]: state => {
      state.status = 'loading';
    },
    [fetchTickets.fulfilled]: (state, action) => {
      state.status = 'success';
      state.tickets = action.payload;
    },
    [fetchTickets.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    [createTicket.fulfilled]: (state, action) => {
      const responseError =
        action.payload === 'Request failed with status code 400' ||
        action.payload === 'Request failed with status code 500';
      if (!responseError) {
        state.status = 'success';
        state.newlyCreatedTicket = action.payload;
      }
    },
  },
});

export const fetchNewlyCreatedTicket = state =>
  state.tickets.newlyCreatedTicket;
export const fetchAllTickets = state => state.tickets.tickets;
export const getTicketsListStatus = state => state.tickets.status;
export const getTicketsListError = state => state.tickets.error;
export const getTicketById = (state, ticketId) =>
  state.tickets.tickets.find(ticket => ticket.id === ticketId);

export default ticketsSlice.reducer;
// export const { someAction1, someAction1 } = ticketSlice.actions
