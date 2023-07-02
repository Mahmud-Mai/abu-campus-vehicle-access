import { createSlice } from '@reduxjs/toolkit';
import { fetchGates } from '../../api/gates';

const initialState = {
  gates: [],
  status: 'idle',
};

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
