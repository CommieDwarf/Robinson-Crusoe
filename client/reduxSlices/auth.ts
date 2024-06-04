import {createSlice} from "@reduxjs/toolkit";
import {UserData} from "@shared/types/User/User";

type State = {
    user: UserData | null;
    connected: boolean;
}

const initialState: State = {
    user: null,
    connected: false,
}
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userUpdated(state, action) {
            console.log("userUpdated")
            return {
                ...state,
                user: action.payload
            }
        },
        connectedUpdated(state, action) {
            state.connected = action.payload
        }
    }
});

export const {userUpdated, connectedUpdated} = authSlice.actions
