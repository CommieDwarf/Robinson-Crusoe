import {configureStore} from "@reduxjs/toolkit";
import {actionSlotsSlice} from "../reduxSlices/actionSlots";
import {freePawnsSlice} from "../reduxSlices/freePawns";
import {globalCostModifiersSlice} from "../reduxSlices/globalCostModifiers";
import {phaseSlice} from "../reduxSlices/phase";
import {alertSlice} from "../reduxSlices/alert";
import {authSlice} from "../reduxSlices/auth";

export const store = configureStore({
    reducer: {
        [actionSlotsSlice.name]: actionSlotsSlice.reducer,
        [freePawnsSlice.name]: freePawnsSlice.reducer,
        [globalCostModifiersSlice.name]: globalCostModifiersSlice.reducer,
        [phaseSlice.name]: phaseSlice.reducer,
        [alertSlice.name]: alertSlice.reducer,
        [authSlice.name]: authSlice.reducer,
    },
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
