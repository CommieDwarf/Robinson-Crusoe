import { createSlice } from "@reduxjs/toolkit";

export interface AlertState {
	text: string;
}

const initialState: AlertState = {
	text: "",
};

export const alertSlice = createSlice({
	name: "alert",
	initialState,
	reducers: {
		alertUpdated(state, action) {
			state.text = action.payload;
		},
	},
});

export const { alertUpdated } = alertSlice.actions;
