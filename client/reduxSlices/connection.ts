import { RootState } from "./../store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData, UserPreferencesData } from "@shared/types/UserData/UserData";

type State = {
	user: UserData | null;
	socketConnected: boolean;
	socketConnectionLost: boolean;
	latency: number;
	avatar: string;
	fetchError: boolean;
};

const initialState: State = {
	user: null,
	socketConnected: false,
	socketConnectionLost: false,
	latency: Infinity,
	avatar: "",
	fetchError: false,
};

export const connectionSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		userUpdated(state, action) {
			return {
				...state,
				user: action.payload,
			};
		},
		userPreferencesUpdated(
			state: State,
			action: PayloadAction<Partial<UserPreferencesData>>
		) {
			if (!state.user) {
				console.error("User is null");
				return;
			}
			state.user.preferences = {
				...state.user.preferences,
				...action.payload,
			};
		},
		connectedUpdated(state, action) {
			state.socketConnected = action.payload;
			if (action.payload === true) {
				state.socketConnectionLost = false;
			}
		},
		latencyUpdated(state, action) {
			state.latency = action.payload;
		},
		fetchErrorUpdated(state, action) {
			state.fetchError = action.payload;
		},
		connectionLostUpdated(state, action) {
			state.socketConnectionLost = action.payload;
			state.socketConnected = !action.payload;
		},
	},
});

export const {
	userUpdated,
	connectedUpdated,
	latencyUpdated,
	fetchErrorUpdated,
	connectionLostUpdated,
	userPreferencesUpdated,
} = connectionSlice.actions;

export function selectUserPreferences(state: RootState) {
	return state.connection.user?.preferences;
}
