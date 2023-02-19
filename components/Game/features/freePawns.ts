import { createSlice } from "@reduxjs/toolkit";
import { IPawnRenderData } from "../../../interfaces/Pawns/Pawn";

export interface freePawnsState {
  localCharacter: IPawnRenderData[];
  friday: IPawnRenderData[];
  dog: IPawnRenderData[];
}

const initialState: freePawnsState = {
  localCharacter: [],
  friday: [],
  dog: [],
};

export const freePawnsSlice = createSlice({
  name: "freePawns",
  initialState,
  reducers: {
    localCharacterPawnsUpdated(state, action) {
      state.localCharacter = action.payload;
    },
    fridayPawnsUpdated(state, action) {
      state.friday = action.payload;
    },
    dogPawnsUpdated(state, action) {
      state.dog = action.payload;
    },
  },
});

export const {
  localCharacterPawnsUpdated,
  fridayPawnsUpdated,
  dogPawnsUpdated,
} = freePawnsSlice.actions;

export default freePawnsSlice.reducer;
