import { configureStore } from "@reduxjs/toolkit";
import { actionSlotsSlice } from "../components/Game/features/actionSlots";
import { freePawnsSlice } from "../components/Game/features/freePawns";

export const store = configureStore({
  reducer: {
    [actionSlotsSlice.name]: actionSlotsSlice.reducer,
    [freePawnsSlice.name]: freePawnsSlice.reducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
