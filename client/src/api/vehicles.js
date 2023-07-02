import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL;
const url = `${baseUrl}/vehicles`;

export const fetchVehicles = createAsyncThunk(
  'vehicle/fetchVehicles',
  async () => {
    try {
      const response = await axios.get(`${url}/by-plate-number`);
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
      `${url}/by-plate-number/?plateNumber=${plateNumber}`
    );

    return response.data;
  }
);

export const createVehicleByPlateNumber = createAsyncThunk(
  'vehicles/createVehicleByPlateNumber',
  async plateNumber => {
    try {
      const response = await axios.post(
        `${url}/by-plate-number/?plateNumber=${plateNumber}`
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
