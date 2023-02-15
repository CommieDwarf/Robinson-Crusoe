import { configureStore } from "@reduxjs/toolkit";
import { actionSlotsSlice } from "./actionSlots";

export const store = configureStore({
  reducer: {
    [actionSlotsSlice.name]: actionSlotsSlice.reducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
