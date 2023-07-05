import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL;
const url = `${baseUrl}/gates`;

export const fetchGates = createAsyncThunk('gates/fetchGates', async () => {
  try {
    const response = await axios.get(url);
    console.log(`🚀 ~ fetchGates ~ url:`, url);
    console.log(`🚀 ~ fetchGates ~ response:`, response);
    return response.data;
  } catch (error) {
    console.log(error.toJSON());
  }
});
