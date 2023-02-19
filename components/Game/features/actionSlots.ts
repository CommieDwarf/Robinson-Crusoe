import { createSlice } from "@reduxjs/toolkit";
import { IPawnRenderData } from "../../../interfaces/Pawns/Pawn";
import { RootState } from "../../../store/store";

export interface ActionSlots {
  [key: string]: IPawnRenderData;
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
    actionSlotsUpdated(state, action) {
      state.slots = action.payload;
    },
    markedSlotUpdated(state, action) {
      state.markedActionSlot = action.payload;
    },
  },
});

export const getActionSlotByDropId = (
  state: RootState,
  droppableId: string
) => {
  return state.actionSlots.slots[droppableId];
};

export const { actionSlotsUpdated, markedSlotUpdated } =
  actionSlotsSlice.actions;

export default actionSlotsSlice.reducer;
