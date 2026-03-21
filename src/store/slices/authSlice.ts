import { createSlice } from "@reduxjs/toolkit";

type authState = {
  user: { email: string } | null;
};

const initialState: authState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log("setuser action", action);
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      console.log("logout state", state);
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
