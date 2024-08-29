import { createSlice } from '@reduxjs/toolkit';
import userService from '../services/login'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser: (state, action) => ({
      username: action.payload.username,
      password: action.payload.password,
    }),
    clearUser: () => null,
  },
});

export const { setUser, clearUser } = userSlice.actions



export default userSlice.reducer;
