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
    setDeleteNote: (state, action) => {
      state.notes = [
        ...state.notes.filter((note) => {
          return note.id !== action.payload;
        }),
      ];
    },
  },
});

//Actions Creators
export const { setNotes, setDeleteNote } = noteSlice.actions;

export default noteSlice.reducer;
