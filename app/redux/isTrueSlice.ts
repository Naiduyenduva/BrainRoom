"use client"
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IsTrueState {
  value: boolean;
}

const initialState: IsTrueState = { value: true };

const isTrueSlice = createSlice({
  name: "isTrue",
  initialState,
  reducers: {
    setIsTrue: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
    toggleIsTrue: (state) => {
      state.value = !state.value;
    },
  },
});

export const { setIsTrue, toggleIsTrue } = isTrueSlice.actions;
export default isTrueSlice.reducer;
