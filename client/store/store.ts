import {configureStore} from "@reduxjs/toolkit";
import {actionSlotsSlice} from "../components/Game/features/actionSlots";
import {freePawnsSlice} from "../components/Game/features/freePawns";
import {globalCostModifiersSlice} from "../components/Game/features/globalCostModifiers";
import {phaseSlice} from "../components/Game/features/phase";

export const store = configureStore({
    reducer: {
        [actionSlotsSlice.name]: actionSlotsSlice.reducer,
        [freePawnsSlice.name]: freePawnsSlice.reducer,
        [globalCostModifiersSlice.name]: globalCostModifiersSlice.reducer,
        [phaseSlice.name]: phaseSlice.reducer,

    },
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
