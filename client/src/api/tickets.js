import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL;
const url = `${baseUrl}/tickets`;

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
    // const stringifiedTicketObject = JSON.stringify(ticketObject);
    try {
      const response = await axios.post(url, ticketObject);
      console.log(`🚀 ~ ticketObject:`, ticketObject);

      return response.data;
    } catch (error) {
      console.log(error.toJSON());
    }
  }
);
