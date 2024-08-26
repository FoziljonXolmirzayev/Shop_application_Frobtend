import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { token: "", user: {} },
  reducers: {
    auth(state, action) {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
  },
});

export const { auth } = userSlice.actions;
export default userSlice.reducer;
