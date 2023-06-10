import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    gateId: 0,
    gateName: 'Main Gate',
  },
  {
    gateId: 2,
    gateName: 'North Gate',
  },
  {
    gateId: 3,
    gateName: 'Police Gate',
  },
  {
    gateId: 4,
    gateName: 'Nuga Gate',
  },
];

export const gatesSlice = createSlice({
  name: 'gates',
  initialState,
  reducers: {},
});

export default gatesSlice.reducer;
export const selectAllGates = state => state.gates;
