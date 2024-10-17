import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AlphabetState {
  selectedLetter: string;
}

const initialState: AlphabetState = {
  selectedLetter: "ا",
};

export const alphabetSlice = createSlice({
  name: "alphabet",
  initialState,
  reducers: {
    setSelectedLetter: (state, action: PayloadAction<string>) => {
      state.selectedLetter = action.payload;
    },
  },
});

export const { setSelectedLetter } = alphabetSlice.actions;

export default alphabetSlice.reducer;
