import { createSlice } from '@reduxjs/toolkit';
import { createTicket, fetchTickets } from '../../api/tickets';

const initialState = {
  tickets: [],
  newlyCreatedTicket: [],
  status: 'idle', // 'loadding' | 'success' | 'failed'
  error: null,
};

export const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTickets.pending, state => {
        if (state.status === 'idle') {
          state.status = 'loading';
        }
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.status = 'success';
        state.tickets = action.payload;
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createTicket.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.status = 'success';
        state.newlyCreatedTicket.push(action.payload);
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
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
