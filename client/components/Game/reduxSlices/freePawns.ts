import {createSlice} from "@reduxjs/toolkit";
import {IPawnRenderData} from "@shared/types/Game/Pawns/Pawn";
import {ICharacterRenderData} from "@shared/types/Game/Characters/Character";

export interface freePawnsState {
    localCharacter: IPawnRenderData<ICharacterRenderData>[];
    friday: IPawnRenderData<ICharacterRenderData>[];
    dog: IPawnRenderData<ICharacterRenderData>[];
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
