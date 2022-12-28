import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notes: [],
};

const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
  },
});

//Actions Creators
export const { setNotes } = noteSlice.actions;

export default noteSlice.reducer;
