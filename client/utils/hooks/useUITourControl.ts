import { SOCKET_EVENT_CLIENT } from "@shared/types/Requests/Socket";
import { steps } from "components/Game/UITour/steps";
import { socketEmit } from "middleware/socketMiddleware";
import { useState, useRef, useCallback, useEffect } from "react";
import { userPreferencesUpdated } from "reduxSlices/connection";
import { stepIndexUpdated, tourInProgressUpdated } from "reduxSlices/UITour";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { UIState } from "types/UITour/UIStates";
import { batch } from "react-redux";

/**
 * Custom hook: useUITourControl
 *
 * @description Provides control over a UI Tour at the component level.
 * It manages delays and step transitions, offering a streamlined approach to UI state management.
 *
 * - For a delay, the `getUpdateUIStateHandle` method must be provided in the `CustomStep` object.
 * - For a step skip, the `shouldSkip` method must be provided in the `CustomStep` object.
 *
 * @returns {Object} - An object containing utility functions and state for managing a step-based process.
 * @property {Function} cleanupTimeout - A function to clean up any timeouts used in the process.
 * @property {boolean} delayInProgress - A flag indicating whether a delay is currently in progress.
 * @property {CustomStep} currentStep - The current step of the process.
 * @property {() => void} handleNextStep - A function to advance to the next step in the process.
 * Handles delay and UI control when `getUpdateUIStateHandle` is provided in `CustomStep`.
 * Use instead of standard UI state management in a component.
 *
 * @example
 * const { delayInProgress, currentStep, handleNextStep } = useUITourControl();
 *
 * function handleMenuButtonClick() {
 *     if (delayInProgress) {
 *         return;
 *     }
 *     if (currentStep.data.id === UI_TOUR_STEP_ID.MENU) {
 *         handleNextStep();
 *     } else {
 *         dispatch(UIStateToggled("menuOpen"));
 *     }
 * }
 */

export function useUITourControl() {
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const [delayInProgress, setDelayInProgress] = useState(false);
	const dispatch = useAppDispatch();
	const currentStep = useAppSelector(
		(state) => steps[state.UITour.stepIndex]
	);

	const uiStates = useAppSelector((state) => state.UITour.UiStates);
	const currentStepIndex = useAppSelector((state) => state.UITour.stepIndex);

	const handleNextStep = useCallback(() => {
		// Gets the next step index skipping unnecessary steps.
		const nextStepIndex = calculateNextStepIndex(
			currentStepIndex,
			uiStates
		);
		const nextStep = steps[nextStepIndex];
		// Stops when tour is at end.
		if (!nextStep) {
			handleTourDone();
			return;
		}

		// getUpdateUIStateHandle in step.data means UI needs some time to change.
		if (nextStep.data.getUpdateUIStateHandle) {
			// We get delay and handle from a next step.
			const [delay, updateUI] = nextStep.data.getUpdateUIStateHandle(
				dispatch,
				uiStates
			);
			// 2. We immedately update UI for animation to start.
			updateUI();
			// 3. delay !== 0 means timeout should be applied.
			if (delay) {
				setDelayInProgress(true);
				// 3. We setup a timeout with delay for a step to change.
				// When step changes, animation is already done.
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
				setDelayInProgress(false);
				cleanupTimeout();
			}, delay);
		},
		[dispatch]
	);

	const cleanupTimeout = useCallback(() => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
			setDelayInProgress(false);
		}
	}, []);

	useEffect(() => {
		return cleanupTimeout;
	}, []);

	return {
		cleanupTimeout,
		delayInProgress,
		currentStep,
		handleNextStep,
	};
}

export function calculateNextStepIndex(stepIndex: number, UiState: UIState) {
	do {
		stepIndex++;
	} while (shouldSkipStep(stepIndex, UiState));

	return stepIndex;
}

function shouldSkipStep(stepIndex: number, UiStates: UIState) {
	const step = steps[stepIndex];
	if (step && step.data.shouldSkip) {
		return step.data.shouldSkip(UiStates);
	}
	return false;
}
