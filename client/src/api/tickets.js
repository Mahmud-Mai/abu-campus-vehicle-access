import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL;
const url = `${baseUrl}/tickets`;

export const fetchTickets = createAsyncThunk(
  'ticket/fetchTickets',
  async () => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const createTicket = createAsyncThunk(
  'ticket/createTicket',
  async ticketFields => {
    try {
      const response = await axios.post(url, ticketFields);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
