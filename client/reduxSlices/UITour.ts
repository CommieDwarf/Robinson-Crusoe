import { UIStates } from "../types/UITour/UIStates";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Entries from "@shared/types/Entries";
import { steps } from "components/Game/UITour/steps";

export interface UITourState {
	stepIndex: number;
	tourInProgress: boolean;
	UiStates: UIStates;
	tourRefused: false,
}

const initialState: UITourState = {
	stepIndex: 0,
	tourInProgress: false,
	tourRefused: false,
	UiStates: {
		phaseListOpen: false,
		scenarioOpen: false,
	},
};



export const UITourSlice = createSlice({
	name: "UITour",
	initialState,
	reducers: {
		UITourInitialStateSet() {
			return initialState;
		}, 
		stepIndexUpdated(state, action) {
			state.stepIndex = action.payload;
		},
		tourInProgressUpdated(state, action) {
			state.tourInProgress = action.payload;
		},
		UIStateUpdated<K extends keyof UIStates>(
			state: UITourState,
			action: PayloadAction<[key: K, value: UIStates[K] ]>
		) {
			const [key, value ] = action.payload;
			state.UiStates[key] = value;
		},
        UIStateToggled<K extends keyof UIStates>(
			state: UITourState,
			action: PayloadAction<K>
		) {
            const key = action.payload;
            const currentValue = state.UiStates[key];
            if (typeof currentValue !== 'boolean') {
                throw  new Error(`Value for ${key} is not a boolean! Cannot toggle.`);
            }
			state.UiStates[action.payload] = !state.UiStates[action.payload];
		},
		UITourRefusedUpdated(state, action) {
			state.tourRefused = action.payload;
		}
	},
});

export const {
	stepIndexUpdated,
	tourInProgressUpdated,
	UIStateUpdated,
	UIStateToggled,
	UITourRefusedUpdated,
	UITourInitialStateSet
} = UITourSlice.actions;



