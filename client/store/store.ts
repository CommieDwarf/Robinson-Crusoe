import {configureStore, Store} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import {Context, createWrapper} from 'next-redux-wrapper';
import {alertSlice} from '../reduxSlices/alert';
import {authSlice} from '../reduxSlices/auth';
import {gameSessionSlice} from '../reduxSlices/gameSession';
import socketMiddleware from '../middleware/socketMiddleware';
import createSocketClient from '../pages/api/socket';

export const socket = createSocketClient();

// Reducery
const rootReducer = combineReducers({
    alert: alertSlice.reducer,
    auth: authSlice.reducer,
    gameSession: gameSessionSlice.reducer,
});

// Typy
export type RootState = ReturnType<typeof rootReducer>;

// Konfiguracja store
const makeStore = (context: Context): Store<RootState> => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(socketMiddleware(socket)),
        devTools: process.env.NODE_ENV !== 'production',
    });
};


export const store = makeStore({});
export const wrapper = createWrapper(makeStore, {debug: true});
