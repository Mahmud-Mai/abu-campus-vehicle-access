import { configureStore } from '@reduxjs/toolkit';
import ticketsReducer from '../features/ticket/ticketsSlice';
import vehiclesReducer from '../features/vehicle/vehicleSlice';
import usersReducer from '../features/users/userSlice';
import gatesReducer from '../features/gate/gateSlice';

export const store = configureStore({
  reducer: {
    tickets: ticketsReducer,
    vehicles: vehiclesReducer,
    users: usersReducer,
    gates: gatesReducer,
  },
});
