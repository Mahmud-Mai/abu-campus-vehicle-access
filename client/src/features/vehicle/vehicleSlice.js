import { createSlice } from '@reduxjs/toolkit';
import {
  createVehicleByPlateNumber,
  fetchVehicleByPlateNumber,
  fetchVehicles,
} from '../../api/vehicles';

const initialState = {
  vehicles: [],
  status: 'idle',
  error: null,
};

export const vehiclesSlice = createSlice({
  name: 'vehicles',
  initialState,
  reducers: {
    createVehicle: {
      reducer(state, action) {
        state.vehicles = action.payload;
      },
      prepare(plateNumber, blacklistStatus) {
        return {
          payload: { plateNumber, blacklistStatus },
        };
      },
    },
  },
  extraReducers: {
    [fetchVehicles.pending]: state => {
      state.status = 'loading';
    },
    [fetchVehicles.fulfilled]: (state, action) => {
      state.status = 'success';
      state.vehicles = action.payload;
    },
    [fetchVehicles.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    [fetchVehicleByPlateNumber.fulfilled]: (state, action) => {
      state.status = 'success';
      const responseError =
        action.payload === 'Request failed with status code 400' ||
        action.payload === 'Request failed with status code 500';
      if (!responseError) {
        state.vehicles.push(action.payload);
      }
    },
    [createVehicleByPlateNumber.fulfilled]: (state, action) => {
      state.status = 'success';
      const responseError =
        action.payload === 'Request failed with status code 400' ||
        action.payload === 'Request failed with status code 500';
      if (!responseError) {
        state.vehicles.push(action.payload);
      }
    },
  },
});

export const fetchAllVehicles = state => state.vehicles.vehicles;
export const vehicleListStatus = state => state.vehicles.status;
export const { createVehicle } = vehiclesSlice.actions;
export default vehiclesSlice.reducer;
