import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  vehicleId: '',
  vehiclePlateNo: '',
  blacklistStatus: '',
  firstEntry: '',
};

const vehicleSlice = createSlice({
  name: 'vehicle',
  initialState,
});

export default vehicleSlice.reducer;
