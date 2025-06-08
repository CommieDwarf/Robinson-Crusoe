import { Step } from "react-joyride";
import { insertIconsIntoText } from "../../../../utils/insertIconsIntoText/insertIconsIntoText";
import { insertIcon } from "../../UI/Guide/Guide";
import { UIState } from "../../../../types/UITour/UIStates";
import { UI_TOUR_STEP_ID } from "../../../../types/UITour/UI_TOUR_STEP_ID";
import { useAppDispatch } from "../../../../store/hooks";
import { UIStateUpdated } from "../../../../reduxSlices/UITour";
import React, { CSSProperties } from "react";
import { TFunction } from "i18next";
import { Trans } from "react-i18next";

const defaultDelay = 520;

/**
 * @interface StepData
 * @description Represents the state and utility functions for managing a step-based process.
 * @property {UI_TOUR_STEP_ID} id - A unique identifier for a step.
 * @property {boolean} [hideNextButton] - Optional. Hides the "Next" button and prevents advancing to the next step
 *                                        from a tooltip level.
 * @property {(uiState: UIState) => boolean} [shouldSkip] - Optional. Determines if the given step should be skipped.
 *                                                          Runs before transitioning to the step.
 * @property {GetUpdateUIStateHandle} [getUpdateUIStateHandle] - Optional. A function that returns a UI state handler.
 * @property {CSSProperties} [toolTipStyle] - Optional. Custom styles for the tooltip.
 */

interface StepData {
  id: UI_TOUR_STEP_ID;
  hideNextButton?: boolean;
  shouldSkip?: (uiState: UIState) => boolean;
  getUpdateUIStateHandle?: GetUpdateUIStateHandle;
  toolTipStyle?: CSSProperties;
}

/**
 * @typedef {Object} CustomStep
 * @property {StepData} data - Data associated with the step.
 */
export interface CustomStep extends Step {
  data: StepData;
}

export type Delay = number;

/**
 * @function UpdateUIStateHandle
 * @description A function that dispatches a UI state change.
 * @returns {void}
 */

export type UpdateUIStateHandle = () => void;
/**
 * @function GetUpdateUIStateHandle
 * @description A function that provides a delay (in milliseconds) and a UI state update handler.
 * @argument {ReturnType<typeof useAppDispatch>} dispatch - Redux dispatch function.
 * @argument {UIState} uiState - The current UI state from Redux.
 * @argument {number} [delay] - Optional. A delay in milliseconds.
 * @returns {[Delay, UpdateUIStateHandle]} - A tuple containing:
 *                                           - Delay (in milliseconds).
 *                                           - A function to update the UI state.
 */

export type GetUpdateUIStateHandle = (
  dispatch: ReturnType<typeof useAppDispatch>,
  uiState: UIState,
  delay?: number,
) => [Delay, UpdateUIStateHandle];

/**
 * @function createUIHandlerGetter
 * @description Creates a handler getter for controlling step UI state.
 * @argument {(uiState: UIState) => boolean} shouldDelay - A function that determines whether a delay is necessary
 *                                                         based on the current UI state.
 * @argument {(dispatch: ReturnType<typeof useAppDispatch>) => void} changeUI - A function to immediately update the UI state before delayed step change.
 * @argument {number} [customDelay=defaultDelay] - Optional. A custom delay in milliseconds. Defaults to `defaultDelay`.
 * @returns {GetUpdateUIStateHandle} - A function that provides a delay and a handler for updating the UI state.
 */

function createUIHandlerGetter(
  shouldDelay: (states: UIState) => boolean,
  changeUI: (dispatch: ReturnType<typeof useAppDispatch>) => void,
  stepDelay: number = defaultDelay,
): GetUpdateUIStateHandle {
  return function UpdateUiStateHandle(
    dispatch: ReturnType<typeof useAppDispatch>,
    uiStates: UIState,
    customDelay: number = stepDelay,
  ): [Delay, UpdateUIStateHandle] {
    const delay = shouldDelay(uiStates) ? customDelay : 0;
    return [
      delay,
      function UIHandle() {
        if (shouldDelay(uiStates)) {
          changeUI(dispatch);
        }
      },
    ];
  };
}

type StepConfig = Omit<CustomStep, "content">;

export const steps: CustomStep[] = [
  {
    target: ".tour-phase",
    content: <span></span>,
    data: {
      id: UI_TOUR_STEP_ID.PHASE,
      shouldSkip: (uiStates) => {
        return uiStates.phaseListOpen;
      },
      hideNextButton: true,
    },
    disableBeacon: true,
  },
  {
    target: ".tour-phase-list",
    content: <span></span>,
    data: {
      id: UI_TOUR_STEP_ID.PHASE_LIST,
      toolTipStyle: {
        maxWidth: "40vw",
      },
      getUpdateUIStateHandle: createUIHandlerGetter(
        (states) => states.scenarioOpen || !states.phaseListOpen,
        (dispatch) => dispatch(UIStateUpdated(["scenarioOpen", false])),
      ),
    },
    spotlightPadding: 30,
  },
  {
    target: ".tour-morale",
    title: "Morale",
    content: <span></span>,
    spotlightClicks: false,
    data: {
      id: UI_TOUR_STEP_ID.MORALE,
      getUpdateUIStateHandle: (dispatch, uiStates, delay = defaultDelay) => {
        return [
          delay,
          () => {
            if (uiStates.phaseListOpen) {
              dispatch(UIStateUpdated(["phaseListOpen", false]));
            }
          },
        ];
      },
    },
  },
  {
    target: ".tour-map",
    title: "Mapa",
    content: <span></span>,
    placement: "right",
    data: {
      id: UI_TOUR_STEP_ID.MAP,
      toolTipStyle: {
        maxWidth: "50vw",
        backgroundColor: "blue",
      },
      getUpdateUIStateHandle: createUIHandlerGetter(
        (uiStates) => uiStates.scenarioOpen,
        (dispatch) => dispatch(UIStateUpdated(["scenarioOpen", false])),
      ),
    },

    spotlightClicks: true,
  },
  {
    target: ".tour-resources",
    title: "Surowce",
    content: <span></span>,
    data: {
      toolTipStyle: {
        maxWidth: "50vw",
      },
      id: UI_TOUR_STEP_ID.RESOURCES,
    },
    placement: "bottom",
  },
  {
    target: ".tour-constructions",
    title: "Konstrukcje i broń",
    content: <span></span>,
    placement: "left",
    data: {
      toolTipStyle: {
        maxWidth: "45vw",
      },
      id: UI_TOUR_STEP_ID.CONSTRUCTIONS,
    },
  },
  {
    target: ".tour-cards",
    title: "Posiadane Karty",
    content: <span></span>,
    placement: "left",
    data: {
      id: UI_TOUR_STEP_ID.CARDS,
    },
  },
  {
    target: ".tour-threat",
    title: "Akcje Zagrożenia",
    content: <span></span>,

    placement: "left",
    data: {
      id: UI_TOUR_STEP_ID.THREAT,
      toolTipStyle: {
        maxWidth: "30vw",
      },
    },
  },
  {
    target: ".tour-arrange-rest",
    title: "Odpoczynek i Porzadkowanie Obozu",
    content: <span></span>,
    placement: "left",
    data: {
      id: UI_TOUR_STEP_ID.ARRANGE_REST,
    },
  },
  {
    target: ".tour-character",
    title: "Karta Postaci",
    content: <span></span>,
    placement: "left",
    data: {
      id: UI_TOUR_STEP_ID.CHARACTER,
    },
  },
  {
    target: ".tour-character-img",
    title: "Postać",
    content: <span></span>,
    placement: "left",
    data: {
      toolTipStyle: {
        maxWidth: "30vw",
      },
      id: UI_TOUR_STEP_ID.CHARACTER_IMG,
    },
  },
  {
    target: ".tour-character-expendables",
    title: "Zasoby osobiste",
    content: <span></span>,
    placement: "left",
    data: {
      id: UI_TOUR_STEP_ID.CHARACTER_EXPENDABLES,
    },
  },
  {
    target: ".tour-character-pawns",
    title: "Pionki",
    content: <span></span>,
    placement: "left",
    data: {
      toolTipStyle: {
        maxWidth: "40vw",
      },
      id: UI_TOUR_STEP_ID.CHARACTER_PAWNS,
    },
  },
  {
    target: ".tour-character-abilities",
    title: "Umiejętnosci",
    content: <span></span>,
    data: {
      id: UI_TOUR_STEP_ID.CHARACTER_ABILITIES,
    },
  },
  {
    target: ".tour-character-side-characters",
    title: "Postaci poboczne",
    content: <span></span>,
    placement: "left",
    data: {
      id: UI_TOUR_STEP_ID.CHARACTER_SIDE_CHARACTERS,
    },
  },
  {
    target: ".tour-health",
    title: "Zdrowie",
    content: <span></span>,
    placement: "left",
    data: {
      id: UI_TOUR_STEP_ID.HEALTH,
    },
  },
  {
    target: ".tour-scenario-button",
    title: "Karta Scenariusza",
    content: <span></span>,
    placement: "top",
    spotlightClicks: true, // Pozwala na interakcję z komponentem pod spotlightem,
    data: {
      id: UI_TOUR_STEP_ID.SCENARIO_BUTTON,
      hideNextButton: true,
      shouldSkip: (uiStates: UIState) => uiStates.scenarioOpen,
    },
  },
  {
    target: ".tour-scenario",
    title: "Karta Scenariusza",
    content: <span></span>,
    placement: "right",
    data: {
      id: UI_TOUR_STEP_ID.SCENARIO,
      toolTipStyle: {
        maxWidth: "40vw",
      },
      getUpdateUIStateHandle: createUIHandlerGetter(
        (states) => !states.scenarioOpen,
        (dispatch) => dispatch(UIStateUpdated(["scenarioOpen", true])),
      ),
    },
  },
  {
    target: ".tour-scenario-rounds",
    title: "Pogoda",
    content: <span></span>,
    placement: "right",
    data: {
      toolTipStyle: {
        maxWidth: "40vw",
      },
      id: UI_TOUR_STEP_ID.SCENARIO_ROUNDS,
    },
  },
  {
    target: ".tour-scenario-info",
    title: "Opis scenariusza",
    content: <span></span>,
    placement: "right",
    data: {
      toolTipStyle: {
        maxWidth: "40vw",
      },
      id: UI_TOUR_STEP_ID.SCENARIO_INFO,
    },
  },
  {
    target: ".tour-weather",
    content: <span></span>,
    placement: "top",
    data: {
      id: UI_TOUR_STEP_ID.WEATHER,
      getUpdateUIStateHandle: createUIHandlerGetter(
        (state) => state.scenarioOpen,
        (dispatch) => dispatch(UIStateUpdated(["scenarioOpen", false])),
      ),
    },
  },
  {
    target: ".tour-discovery-tokens",
    content: <span></span>,
    placement: "top",
    data: {
      id: UI_TOUR_STEP_ID.DISCOVERY_TOKENS,
    },
  },
  {
    target: ".tour-next-phase",
    content: <span></span>,
    placement: "top",
    data: {
      id: UI_TOUR_STEP_ID.NEXT_PHASE,
    },
  },
  {
    target: ".tour-menu",
    content: <span>Kliknij aby rozwinąć menu.</span>,
    placement: "top",
    data: {
      id: UI_TOUR_STEP_ID.MENU,
      shouldSkip: (uiStates) => !!uiStates.menuOpen,
      hideNextButton: true,
    },
  },

  {
    target: ".tour-menu-players",
    content: <span></span>,
    placement: "top",
    data: {
      id: UI_TOUR_STEP_ID.MENU_PLAYERS,
      getUpdateUIStateHandle: createUIHandlerGetter(
        (states) => !states.menuOpen,
        (dispatch) => dispatch(UIStateUpdated(["menuOpen", true])),
        200,
      ),
    },
  },
  {
    target: ".tour-menu-options",
    content: <span></span>,
    placement: "top",
    data: {
      id: UI_TOUR_STEP_ID.MENU_SETTINGS,
    },
  },
  {
    target: ".tour-menu-guide",
    content: <span></span>,
    placement: "top",
    data: {
      id: UI_TOUR_STEP_ID.MENU_GUIDE,
    },
  },
  {
    target: ".tour-menu-exit",
    content: <span></span>,
    title: "Miłej Rozgrywki!",
    placement: "top",
    data: {
      id: UI_TOUR_STEP_ID.MENU_EXIT,
    },
  },
  {
    target: "",
    content: <span></span>,
    title: "",
    placement: "top",
    data: {
      id: UI_TOUR_STEP_ID.DONE,
    },
  },
];
