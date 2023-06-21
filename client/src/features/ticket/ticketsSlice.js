import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// const initialState = [];

const initialState = {
  tickets: [],
  status: 'idle', // 'loadding' | 'success' | 'failed'
  error: null,
};

const url = 'http://localhost:5001/api/v1/tickets';

export const fetchTickets = createAsyncThunk(
  'ticket/fetchTickets',
  async () => {
    try {
      const response = await axios.get(url);
      console.log(`🚀 ~ fetchTickets ~ response.data:`, response.data);
      return [...response.data];
    } catch (error) {
      return error.message;
    }
  }
);

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
  },
});

export const fetchAllTickets = state => state.tickets;
export const getTicketsStatus = state => state.tickets.status;
export const getTicketsError = state => state.tickets.error;
export const getTicketById = (state, ticketId) =>
  state.tickets.tickets.find(ticket => ticket.id === ticketId);

export default ticketsSlice.reducer;
export const { ticketAdded } = ticketsSlice.actions;
// export const { someAction1, someAction1 } = ticketSlice.actions
