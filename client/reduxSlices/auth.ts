import {createSlice} from "@reduxjs/toolkit";
import {UserData} from "@shared/types/User/User";

type State = {
    user: UserData | null;
}

const initialState: State = {
    user: null
}
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userUpdated(state, action) {
            state.user = action.payload
        }
    }
});

export const {userUpdated} = authSlice.actions
