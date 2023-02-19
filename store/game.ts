// import { createSelector, createSlice } from "@reduxjs/toolkit";
// import { IGameRenderData } from "../interfaces/Game";
// import { IInventionRenderData } from "../interfaces/InventionService/Invention";
// import { RootState } from "./store";
//
// export interface GameState {
//   data: IGameRenderData | null;
// }
//
// const initialState: GameState = {
//   data: null,
// };
//
// export const gameSlice = createSlice({
//   name: "game",
//   initialState,
//   reducers: {
//     gameUpdated(state, action) {
//       state.data = action.payload;
//     },
//   },
// });
//
// export const selectInventions = (state: RootState) => {
//   if (state.game.data) {
//     return state.game.data.inventionService.inventions;
//   } else {
//     return null;
//   }
// };
//
// export const selectInventionByName = createSelector(
//   [
//     selectInventions,
//     (state: RootState, inventionName: string) => inventionName,
//   ],
//   (inventions, inventionName: string) => {
//     if (!inventions) {
//       return null;
//     }
//     return inventions.find((inv) => inv.name === inventionName);
//   }
// );
//
// export const { gameUpdated } = gameSlice.actions;
//
// export default gameSlice.reducer;
