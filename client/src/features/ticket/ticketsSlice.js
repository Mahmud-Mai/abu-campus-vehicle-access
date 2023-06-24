import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// const initialState = [];

const initialState = {
  tickets: [],
  newlyCreatedTicket: {},
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

export const createTicket = createAsyncThunk(
  'ticket/createTicket',
  async ticketObject => {
    // const { plateNumber, ticketStatus, gate, user } = ticketObject;
    try {
      const response = await axios.post(url, ticketObject);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

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
