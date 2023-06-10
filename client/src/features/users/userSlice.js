import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    userId: 0,
    userName: 'William Adams',
    role: 'Security Guard',
  },
  {
    userId: 2,
    userName: 'Samson John',
    role: 'Security Guard',
  },
  {
    userId: 1,
    userName: 'Abba Sani',
    role: 'Admin',
  },
  {
    userId: 3,
    userName: 'Lawal Bala',
    role: 'Super Admin',
  },
];

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
});

export const selectAllUsers = state => state.users;
export default usersSlice.reducer;
// export { someAction } = usersSlice.actions
