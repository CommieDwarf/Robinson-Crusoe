import {configureStore} from "@reduxjs/toolkit";
import {alertSlice} from "../reduxSlices/alert";
import {authSlice} from "../reduxSlices/auth";
import {gameSessionSlice} from "../reduxSlices/gameSession";
import socketMiddleware from "../middleware/socketMiddleware";
import createSocketClient from "../pages/api/socket";

export const socket = createSocketClient();


export const store = configureStore({
    reducer: {
        [alertSlice.name]: alertSlice.reducer,
        [authSlice.name]: authSlice.reducer,
        [gameSessionSlice.name]: gameSessionSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(socketMiddleware(socket))
    },
    devTools: true,
});

export type MyStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
