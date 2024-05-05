import {createSlice} from "@reduxjs/toolkit";
import {store} from "../store/store";
import {IPawnRenderData} from "@shared/types/Game/Pawns/Pawn";
import {SessionRenderData} from "@shared/types/Session/Session";
import {IGameRenderData} from "@shared/types/Game/Game";
import {IActionSlotServiceRenderData} from "@shared/types/Game/ActionSlots";

export interface SessionDataSlice {
    data: SessionRenderData | null,
    actionSlots: IActionSlotServiceRenderData | null,
}


const initialState: SessionDataSlice = {
    data: null,
    actionSlots: null,
};

export const gameSessionSlice = createSlice({
    name: "gameSession",
    initialState,
    reducers: {
        gameSessionUpdated(state, action) {
            state.data = action.payload
        },

        actionSlotUpdated(state, action) {
            state.actionSlots = action.payload;
        }
    },
});

export const {
    gameSessionUpdated,
    actionSlotUpdated,
} = gameSessionSlice.actions;

export const selectActionSlotById = (state: ReturnType<typeof store.getState>, actionSlotId: string): IPawnRenderData<any> | null => {
    const slots = state.gameSession.actionSlots!;
    return actionSlotId in slots ? (slots[actionSlotId as keyof typeof slots] as unknown as IPawnRenderData<any>) : null;
}

export const selectGame = (state: ReturnType<typeof store.getState>): IGameRenderData => {
    return state.gameSession.data?.game!;
}
