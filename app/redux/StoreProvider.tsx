"use client";
// store/StoreProvider.tsx
import React, { ReactNode } from "react";
import { store } from "./store";
import { Provider } from "react-redux";

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  return <Provider store={store}> {children} </Provider>;
};