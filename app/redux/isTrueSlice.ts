"use client"
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

interface IsTrueState {
  value: boolean;
  testId: number | null;
  questions: Question[];
}

const initialState: IsTrueState = { value: true, testId: null, questions: [] };

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
    setTestId: (state,action: PayloadAction<number>)=> {
      state.testId = action.payload;
    },
    setQuestions: (state, action: PayloadAction<Question[]>) => {
      state.questions = action.payload;
    },
  },
});

export const { setIsTrue, toggleIsTrue, setTestId, setQuestions } = isTrueSlice.actions;
export default isTrueSlice.reducer;
