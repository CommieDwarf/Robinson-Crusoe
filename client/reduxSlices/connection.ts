import {createSlice} from "@reduxjs/toolkit";
import {UserData} from "@shared/types/UserData/UserData";

type State = {
    user: UserData | null;
    connected: boolean;
    latency: number;
    avatar: string;
}

const initialState: State = {
    user: null,
    connected: false,
    latency: Infinity,
    avatar: "",
}


export const connectionSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userUpdated(state, action) {
            return {
                ...state,
                user: action.payload
            }
        },
        connectedUpdated(state, action) {
            state.connected = action.payload
        },
        latencyUpdated(state, action) {
            state.latency = action.payload
        }
    }
});

export const {userUpdated, connectedUpdated, latencyUpdated} = connectionSlice.actions
