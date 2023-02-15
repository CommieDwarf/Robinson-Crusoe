import { createSlice } from "@reduxjs/toolkit";
import { IPawn } from "../interfaces/Pawns/Pawn";

export interface ActionSlots {
  [key: string]: IPawn;
}

export interface ActionSlotsState {
  slots: ActionSlots;
  markedActionSlot: string | null;
}

const initialState: ActionSlotsState = {
  slots: {},
  markedActionSlot: null,
};

export const actionSlotsSlice = createSlice({
  name: "actionSlots",
  initialState,
  reducers: {
    setActionSlots(state, action) {
      state.slots = action.payload;
    },
    setMarkedActionSlot(state, action) {
      state.markedActionSlot = action.payload;
    },
  },
});

export const { setActionSlots, setMarkedActionSlot } = actionSlotsSlice.actions;

export default actionSlotsSlice.reducer;
