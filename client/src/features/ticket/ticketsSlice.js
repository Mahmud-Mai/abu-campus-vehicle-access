import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = [
  {
    ticketId: '8pPV5Owt4DOo26xEIpZGe',
    plateNumber: 'ABC-123AA',
    userId: 0,
    gateId: 0,
    date: '10/06/2023',
    time: '10:22:03',
  },
];

// const initialState = {
//   tickets: [],
//   status: 'idle',
//   error: null,
//   isLoading: true,
// };

const url = 'http://localhost:5001/api/v1/tickets';

export const getTicketsList = createAsyncThunk(
  'ticket/getTicketsList',
  async thunkAPI => {
    try {
      const resp = await axios(url);
      console.log(`🚀 ~ getTicketsList ~ resp:`, resp);
      return resp;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
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
    [getTicketsList.pending]: state => {
      state.isLoading = true;
    },
    [getTicketsList.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.tickets = action.payload;
    },
    [getTicketsList.rejected]: state => {
      state.isLoading = false;
    },
  },
});

export const selectAllTickets = state => state.tickets;
export const getTicketById = (state, ticketId) =>
  state.tickets.tickets.find(ticket => ticket.id === ticketId);

export default ticketsSlice.reducer;
export const { ticketAdded } = ticketsSlice.actions;
// export const { someAction1, someAction1 } = ticketSlice.actions
