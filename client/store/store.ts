import { configureStore, Store } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { createWrapper } from "next-redux-wrapper";
import { alertSlice } from "../reduxSlices/alert";
import { gameSessionSlice } from "../reduxSlices/gameSession";
import socketMiddleware from "../middleware/socketMiddleware";
import createSocketClient from "../pages/api/socket";
import { connectionSlice } from "../reduxSlices/connection";
import { UITourSlice } from "reduxSlices/UITour";

export const socket = createSocketClient();

// Reducery
const rootReducer = combineReducers({
	alert: alertSlice.reducer,
	connection: connectionSlice.reducer,
	gameSession: gameSessionSlice.reducer,
	UITour: UITourSlice.reducer,
});

// Typy
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

// Konfiguracja store
const makeStore = (): Store<RootState> => {
	return configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(socketMiddleware(socket)),
		devTools: process.env.NODE_ENV !== "production",
	});
};

export const store = makeStore();
export const wrapper = createWrapper(makeStore, { debug: true });
