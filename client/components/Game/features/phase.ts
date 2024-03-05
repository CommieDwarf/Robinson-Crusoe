import {createSlice} from "@reduxjs/toolkit";
import {Phase} from "../../../../server/src/types/PhaseService/PhaseService";

type State = {
    current: Phase
}

const initialState = {
    current: "event"
}
export const phaseSlice = createSlice({
    name: "phase",
    initialState,
    reducers: {
        phaseUpdated(state, action) {
            state.current = action.payload
        }
    }

});

export const {phaseUpdated} = phaseSlice.actions
