import { SOCKET_EVENT_CLIENT } from "@shared/types/Requests/Socket";
import {
	CustomStep,
	UpdateUIStateHandle,
} from "./../../components/Game/UITour/steps";
import { steps } from "components/Game/UITour/steps";
import { socketEmit } from "middleware/socketMiddleware";
import { useState, useRef, useCallback, useEffect } from "react";
import { userPreferencesUpdated } from "reduxSlices/connection";
import {
	stepIndexUpdated,
	tourInProgressUpdated,
} from "reduxSlices/UITour";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { UIStates } from "types/UITour/UIStates";
import { batch } from "react-redux";

export function useUITourControl() {
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const [animationInProgress, setAnimationInProgress] = useState(false);
	const dispatch = useAppDispatch();
	const currentStep = useAppSelector(
		(state) => steps[state.UITour.stepIndex]
	);

	const uiStates = useAppSelector((state) => state.UITour.UiStates);
	const currentStepIndex = useAppSelector((state) => state.UITour.stepIndex);

	const handleNextStep = useCallback(() => {
		const nextStepIndex = calculateNextStepIndex(
			currentStepIndex,
			uiStates
		);
		const nextStep = steps[nextStepIndex];
		if (!nextStep) {
			handleTourDone();
			return;
		}
		if (nextStep.data.getUpdateUIStateHandle) {
			const [delay, updateUI] = nextStep.data.getUpdateUIStateHandle(
				dispatch,
				uiStates
			);
			updateUI();
			if (delay) {
				setAnimationInProgress(true);
				handleNextStepWithDelay(nextStepIndex, delay);
				return;
			}
		}
		dispatch(stepIndexUpdated(nextStepIndex));
	}, [dispatch, uiStates, currentStepIndex]);

	function handleTourDone() {
		batch(() => {
			dispatch(tourInProgressUpdated(false));
			dispatch(userPreferencesUpdated({ skipUITour: true }));
			dispatch(
				socketEmit(SOCKET_EVENT_CLIENT.CHANGE_USER_PREFERENCES, {
					preferences: { skipUITour: true },
				})
			);
		});
	}

	const handleNextStepWithDelay = useCallback(
		(nextStepIndex: number, delay: number) => {
			timeoutRef.current = setTimeout(() => {
				dispatch(stepIndexUpdated(nextStepIndex));
				setAnimationInProgress(false);
				cleanupTimeout();
			}, delay);
		},
		[dispatch]
	);

	const cleanupTimeout = useCallback(() => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
			setAnimationInProgress(false);
		}
	}, []);

	return {
		cleanupTimeout,
		animationInProgress,
		currentStep,
		handleNextStep,
	};
}

export function calculateNextStepIndex(stepIndex: number, UiState: UIStates) {
	do {
		stepIndex++;
	} while (shouldSkipStep(stepIndex, UiState));

	return stepIndex;
}

function shouldSkipStep(stepIndex: number, UiStates: UIStates) {
	const step = steps[stepIndex];
	if (step && step.data.shouldSkip) {
		return step.data.shouldSkip(UiStates);
	}
	return false;
}
