import { createSlice } from "@reduxjs/toolkit";

//Initial States
const initialState = {
  user: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

//Actions creators
export const { setUser } = userSlice.actions;

export default userSlice.reducer;
