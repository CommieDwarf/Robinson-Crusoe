import {createSlice} from "@reduxjs/toolkit";
import {ACTION} from "../../../../interfaces/ACTION";
import {IGlobalCostModifierRenderData} from "../../../../interfaces/ActionService/GlobalCostModifier";


const initialState: { modifiers: Record<ACTION, IGlobalCostModifierRenderData[]> } = {
    modifiers: {
        [ACTION.THREAT]: [],
        [ACTION.HUNT]: [],
        [ACTION.BUILD]: [],
        [ACTION.GATHER]: [],
        [ACTION.EXPLORE]: [],
        [ACTION.ARRANGE_CAMP]: [],
        [ACTION.REST]: []
    }
}

export const globalCostModifiersSlice = createSlice({
    name: "globalCostModifiers",
    initialState,
    reducers: {
        globalCostModified(state, action) {
            state.modifiers = action.payload;
        },
    },
});

export const {globalCostModified} =
    globalCostModifiersSlice.actions;

export const selectModifiersByAction = (state: typeof initialState, action: ACTION) => {
    return state.modifiers[action];
}

export default globalCostModifiersSlice.reducer;

