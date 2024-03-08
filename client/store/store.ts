import {configureStore} from "@reduxjs/toolkit";
import {actionSlotsSlice} from "../components/Game/reduxSlices/actionSlots";
import {freePawnsSlice} from "../components/Game/reduxSlices/freePawns";
import {globalCostModifiersSlice} from "../components/Game/reduxSlices/globalCostModifiers";
import {phaseSlice} from "../components/Game/reduxSlices/phase";
import {alertSlice} from "../components/Game/reduxSlices/alert";

export const store = configureStore({
    reducer: {
        [actionSlotsSlice.name]: actionSlotsSlice.reducer,
        [freePawnsSlice.name]: freePawnsSlice.reducer,
        [globalCostModifiersSlice.name]: globalCostModifiersSlice.reducer,
        [phaseSlice.name]: phaseSlice.reducer,
        [alertSlice.name]: alertSlice.reducer,
    },
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
