import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  vehicles: [],
  status: 'idle',
  error: null,
};

const url = 'http://localhost:5001/api/v1/vehicles/by-plate-number';

export const fetchVehicles = createAsyncThunk(
  'vehicle/fetchVehicles',
  async () => {
    try {
      const response = await axios.get(url);
      console.log(`🚀 ~ fetchVehicles ~ response:`, response);
      return [...response.data];
    } catch (error) {
      return error.message;
    }
  }
);

export const fetchVehicleByPlateNumber = createAsyncThunk(
  'vehicles/fetchVehicleByPlateNumber',
  async plateNumber => {
    const response = await axios.get(
      `http://localhost:5001/api/v1/vehicles/by-plate-number/?plateNumber=${plateNumber}`
    );

    return response.data;
  }
);

export const createVehicleByPlateNumber = createAsyncThunk(
  'vehicles/createVehicleByPlateNumber',
  async plateNumber => {
    try {
      const response = await axios.post(
        `http://localhost:5001/api/v1/vehicles/by-plate-number/?plateNumber=${plateNumber}`
      );
      console.log(
        `🚀 ~ createVehicleByPlateNumber ~ response.data:`,
        response.data
      );
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

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
