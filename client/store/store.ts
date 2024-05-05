import {configureStore} from "@reduxjs/toolkit";
import {alertSlice} from "../reduxSlices/alert";
import {authSlice} from "../reduxSlices/auth";
import {gameSessionSlice} from "../reduxSlices/gameSession";

export const store = configureStore({
    reducer: {
        [alertSlice.name]: alertSlice.reducer,
        [authSlice.name]: authSlice.reducer,
        [gameSessionSlice.name]: gameSessionSlice.reducer
    },
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
