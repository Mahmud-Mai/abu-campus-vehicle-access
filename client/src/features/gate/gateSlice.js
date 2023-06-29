import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  gates: [],
  status: 'idle',
};

const baseUrl = process.env.REACT_APP_BASE_URL;
const url = `${baseUrl}/gates`;

export const fetchGates = createAsyncThunk('gates/fetchGates', async () => {
  try {
    const response = await axios.get(url);
    return [...response.data];
  } catch (error) {
    return error.message;
  }
});

export const gatesSlice = createSlice({
  name: 'gates',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchGates.pending]: state => {
      state.status = 'loading';
    },
    [fetchGates.fulfilled]: (state, action) => {
      state.status = 'success';
      state.gates = action.payload;
    },
    [fetchGates.rejected]: state => {
      state.status = 'failed';
    },
  },
});

export default gatesSlice.reducer;
export const fetchAllGates = state => state.gates.gates;
export const fetchTGatesStatus = state => state.gates.status;
