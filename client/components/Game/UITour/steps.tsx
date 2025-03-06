import { Step } from "react-joyride";
import { insertIconsIntoText } from "utils/insertIconsIntoText/insertIconsIntoText";
import { insertIcon } from "../UI/Guide/Guide";
import { UIState } from "types/UITour/UIStates";
import { UI_TOUR_STEP_ID } from "types/UITour/UI_TOUR_STEP_ID";
import { useAppDispatch } from "store/hooks";
import { UIStateUpdated } from "reduxSlices/UITour";
import { CSSProperties } from "react";
import { StyledHr } from "components/StyledHr/StyledHr";

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
	delay?: number
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
	stepDelay: number = defaultDelay
): GetUpdateUIStateHandle {
	return function UpdateUiStateHandle(
		dispatch: ReturnType<typeof useAppDispatch>,
		uiStates: UIState,
		customDelay: number = stepDelay
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

export const steps: CustomStep[] = [
	{
		target: ".tour-phase",
		content: (
			<span>
				Tutaj wyświetlana jest aktualna faza. Kliknij w{" "}
				<strong>
					<em>&quot;Kolejność&quot;</em>
				</strong>{" "}
				aby kontynuować.
			</span>
		),
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
		content: (
			<span>
				Każda runda składa się z <strong>6 faz.</strong>, które są
				rozpatrywane w kolejności przedstawionej na tej liście.
			</span>
		),
		data: {
			id: UI_TOUR_STEP_ID.PHASE_LIST,
			toolTipStyle: {
				maxWidth: "40vw",
			},
			getUpdateUIStateHandle: createUIHandlerGetter(
				(states) => states.scenarioOpen || !states.phaseListOpen,
				(dispatch) => dispatch(UIStateUpdated(["scenarioOpen", false]))
			),
		},
		spotlightPadding: 30,
	},
	{
		target: ".tour-morale",
		title: "Morale",
		content: (
			<span>
				Ten panel przedstawia aktualny poziom <em>morali</em> (
				{insertIconsIntoText("morale-arrow")}) oraz powiązaną z nim
				ilość otrzymywanej bądź traconej <em>determinacji</em> (
				{insertIconsIntoText("determination")}). Jest ona wymagana do
				posługiwania się umiejętnościami postaci.
			</span>
		),
		spotlightClicks: false,
		data: {
			id: UI_TOUR_STEP_ID.MORALE,
			toolTipStyle: {
				maxWidth: "40%",
			},
			getUpdateUIStateHandle: (
				dispatch,
				uiStates,
				delay = defaultDelay
			) => {
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
		content: (
			<span>
				Mapa wyspy składa się z sześciokątnych kafelków, z których każdy
				reprezentuje inny fragment terenu. Tutaj możesz przeciągać
				pionki w celu zbierania surowców i/lub eksploracji.
				<ul>
					<li>
						<strong>Przybliżanie i oddalanie</strong> – aby
						dostosować widok mapy, używaj kółka myszy lub przycisków
						„+” i „-”.
					</li>
					<li>
						<strong>Przesuwanie mapy</strong> – aby zobaczyć inne
						części wyspy, przytrzymaj lewy przycisk myszy i
						przeciągnij mapę w wybranym kierunku.
					</li>
				</ul>
			</span>
		),
		placement: "right",
		data: {
			id: UI_TOUR_STEP_ID.MAP,
			toolTipStyle: {
				maxWidth: "50vw",
				backgroundColor: "blue",
			},
			getUpdateUIStateHandle: createUIHandlerGetter(
				(uiStates) => uiStates.scenarioOpen,
				(dispatch) => dispatch(UIStateUpdated(["scenarioOpen", false]))
			),
		},

		spotlightClicks: true,
	},
	{
		target: ".tour-resources",
		title: "Surowce",
		content: (
			<span>
				Tutaj możesz śledzić należące do Twojej drużyny surowce. Są one
				podzielone na 2 kategorie.
				<ul>
					<li>
						<strong>Surowce przyszłe</strong> (na górze) - surowce
						które zdobyliście w aktualnej Fazie Akcji, ale ich
						jeszcze nie macie. Przechodzą one do{" "}
						<strong>posiadanych surowców</strong> po rozpatrzeniu
						wszystkich akcji.
					</li>
					<li>
						<strong>Surowce posiadane</strong> (na dole) - są w
						waszym posiadaniu i możecie ich używać.
					</li>
				</ul>
			</span>
		),
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
		content: (
			<span>
				Aby przetrwać na bezludnej wyspie, musicie zadbać o odpowiednie
				schronienie oraz broń. Ich budowa wymaga określonej ilości
				jednego z surowców widocznych przy danej konstrukcji. Jeśli
				posiadasz oba rodzaje wymaganych surowców, możesz wybrać,
				którego chcesz użyć, klikając na jego ikonę.
				<ul>
					<li>
						<strong>Schronienie</strong> (
						{insertIconsIntoText("$shelter$")}) - chroni graczy
						podczas snu, co sprawia, że nie otrzymują obrażeń za
						spanie pod gołym niebem. Można zbudować tylko 1 poziom.
					</li>
					<li>
						<strong>Dach</strong> ({insertIconsIntoText("$roof$")})
						- chroni graczy i zasoby przed warunkami
						atmosferycznymi.
					</li>
					<li>
						<strong>Palisada</strong> (
						{insertIconsIntoText("$palisade$")}) - chroni graczy
						przed dzikimi zwierzętami.
					</li>
					<li>
						<strong>Broń</strong> ({insertIconsIntoText("$weapon$")}
						) - Służy do polowań na bestie. Im groźniejsza bestia
						tym potrzebny jest wyższy poziom broni, aby wybrnąć bez
						szwanku.
					</li>
				</ul>
			</span>
		),
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
		content: (
			<span>
				Tutaj mieszczą się 3 rodzaje kart
				<ul>
					<li>Karty pomysłów</li>
					<li>Karty tajemnic</li>
					<li>Przedmioty</li>
				</ul>
				Przełączaj się miedzy nimi klikając w zakładki.
			</span>
		),
		placement: "left",
		data: {
			id: UI_TOUR_STEP_ID.CARDS,
		},
	},
	{
		target: ".tour-threat",
		title: "Akcje Zagrożenia",
		content: (
			<span>
				Na początku każdej rundy w pierwszej fazie umieszczana jest
				tutaj Nowa Karta wydarzenia.
				<br />
				Wykonuj związane z nimi akcje, aby otrzymywać nagrody i uniknać
				negatywnych konsekwencji.
			</span>
		),

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
		content: (
			<span>
				Te miejsca służą do planowania akcji odpoczynku i porzadkowania
				obozu.
				<ul>
					<li>
						Do każdej z tych akcji można przypisać nieskończona
						ilośc pionków
					</li>
					<li>Każda akcja kończy się sukcesem</li>
				</ul>
			</span>
		),
		placement: "left",
		data: {
			id: UI_TOUR_STEP_ID.ARRANGE_REST,
		},
	},
	{
		target: ".tour-character",
		title: "Karta Postaci",
		content: (
			<span>
				Tutaj mieszczą się informacje o Twojej postaci oraz postaciach
				pobocznych.
			</span>
		),
		placement: "left",
		data: {
			id: UI_TOUR_STEP_ID.CHARACTER,
		},
	},
	{
		target: ".tour-character-img",
		title: "Postać",
		content: (
			<span>
				Tak wygląda twoja postać.
				<br />W jej obrębie będą wyświetlane otrzymywane przez nią rany
				dla konkretnych części ciała.
			</span>
		),
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
		content: (
			<span>
				Twoja postać posiada zasoby które mogą być użyte tylko przez
				nią.
				<ul>
					<li>
						Poziom broni ({insertIcon("$weapon$")}) - wykorzystywany
						podczas polowania.{" "}
					</li>
					<li>
						Żetony determinacji ({insertIcon("$determination$")}) -
						potrzebne do używania umiejętności
					</li>
				</ul>
			</span>
		),
		placement: "left",
		data: {
			id: UI_TOUR_STEP_ID.CHARACTER_EXPENDABLES,
		},
	},
	{
		target: ".tour-character-pawns",
		title: "Pionki",
		content: (
			<span>
				Pionki służą do planowania akcji. Reprezentują one czas, który
				Twoja postać poświęca na wykonanie określonego zadania. W fazie
				akcji przeciągnij je na odpowiednie pola, aby zaplanować kolejne
				działania.
			</span>
		),
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
		title: "Umiejetnosci",
		content: (
			<span>
				Tutaj znajdują się lista umiejetności Twojej postaci.
				<ul>
					<li>
						Niektórych umiejetności da się użyć tylko w określonych
						sytuacjach.
					</li>
					<li>
						Umiejętności związane z przerzutem kości używa się
						bezpośrednio w oknie rozpatrywana akcji.
					</li>
				</ul>
			</span>
		),
		data: {
			id: UI_TOUR_STEP_ID.CHARACTER_ABILITIES,
		},
	},
	{
		target: ".tour-character-side-characters",
		title: "Postaci poboczne",
		content: (
			<span>
				Tutaj znajdują się postaci poboczne i ich pionki.
				<ul>
					<li>Każdy gracz ma do nich dostęp i kontrolę.</li>
					<li>Pies nie posiada zdrowia i nie otrzymuje obrażeń.</li>
					<li>
						Psa można używać tylko jako pomocnika do akcji polowania
						lub eksploracji.
					</li>
				</ul>
			</span>
		),
		placement: "left",
		data: {
			id: UI_TOUR_STEP_ID.CHARACTER_SIDE_CHARACTERS,
		},
	},
	{
		target: ".tour-health",
		title: "Zdrowie",
		content: (
			<span>
				Tutaj znajduje się zdrowie Twojej postaci.
				<ul>
					<li>
						Za każdy otrzymany punkt obrażeń wskaźnik zdrowia
						przesuwa się w prawo
					</li>
					<li>
						Jeśli wskaźnik zdrowia przejdzie przez strzałkę{" "}
						{insertIconsIntoText("$morale-arrow$")}, morale drużyny
						spadają o 1.
					</li>
					<li>
						Gdy wskażnik dojdzie do końca, postać umiera i gracze
						przegrywają.
					</li>
				</ul>
			</span>
		),
		placement: "left",
		data: {
			id: UI_TOUR_STEP_ID.HEALTH,
		},
	},
	{
		target: ".tour-scenario-button",
		title: "Karta Scenariusza",
		content: (
			<span>
				Tutaj znajduje się przycisk który wysuwa kartę scenariusza.
				<br />
				Kliknij go aby kontynuować.
			</span>
		),
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
		content: (
			<span>
				Tutaj zawarte są informacje o przebiegu rozgrywki oraz warunkach
				zwycięstwa danego scenariusza.
				<br />
			</span>
		),
		placement: "right",
		data: {
			id: UI_TOUR_STEP_ID.SCENARIO,
			toolTipStyle: {
				maxWidth: "40vw",
			},
			getUpdateUIStateHandle: createUIHandlerGetter(
				(states) => !states.scenarioOpen,
				(dispatch) => dispatch(UIStateUpdated(["scenarioOpen", true]))
			),
		},
	},
	{
		target: ".tour-scenario-rounds",
		title: "Pogoda",
		content: (
			<span>
				Gra składa się maksymalnie z 12 rund, a nad nimi znajdują się
				kości, które będą rzucane w fazie Pogody. W każdej rundzie wynik
				rzutu tymi kośćmi będzie wpływał na warunki pogodowe z którymi
				będziecie musieli się mierzyć.
			</span>
		),
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
		content: (
			<span>
				Przed rozpoczęciem gry nie zapomnij zapoznać się z informacjami
				o scenariuszu i jego mechanikami.
			</span>
		),
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
		content: (
			<span>
				Tutaj będą umieszczane tymczasowe żetony, które będą zliczane w
				fazie Pogody.
			</span>
		),
		placement: "top",
		data: {
			id: UI_TOUR_STEP_ID.WEATHER,
			getUpdateUIStateHandle: createUIHandlerGetter(
				(state) => state.scenarioOpen,
				(dispatch) => dispatch(UIStateUpdated(["scenarioOpen", false]))
			),
		},
	},
	{
		target: ".tour-discovery-tokens",
		content: (
			<span>
				Tutaj będą umieszczane żetony odkryć otrzymywane podczas
				eksploracji mapy.
			</span>
		),
		placement: "top",
		data: {
			id: UI_TOUR_STEP_ID.DISCOVERY_TOKENS,
		},
	},
	{
		target: ".tour-next-phase",
		content: (
			<span>
				To jest główny przycisk który steruje przebiegiem rozgrywki.
				Klikniecie go spowoduje przejście do kolejnej fazy.
			</span>
		),
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
		content: (
			<span>
				Ten przycisk otwiera okno z informacją o postaciach innych
				graczy.
			</span>
		),
		placement: "top",
		data: {
			id: UI_TOUR_STEP_ID.MENU_PLAYERS,
			getUpdateUIStateHandle: createUIHandlerGetter(
				(states) => !states.menuOpen,
				(dispatch) => dispatch(UIStateUpdated(["menuOpen", true])),
				200
			),
		},
	},
	{
		target: ".tour-menu-options",
		content: (
			<span>
				W ustawieniach możesz zrestartować, zapisać lub cofnąc grę do
				lobby.
			</span>
		),
		placement: "top",
		data: {
			id: UI_TOUR_STEP_ID.MENU_SETTINGS,
		},
	},
	{
		target: ".tour-menu-guide",
		content: (
			<span>Poradnik dostarcza bardziej szczegółowy opis zasad gry.</span>
		),
		placement: "top",
		data: {
			id: UI_TOUR_STEP_ID.MENU_GUIDE,
		},
	},
	{
		target: ".tour-menu-exit",
		content: (
			<span>
				W opcjach w menu głównym możesz zresetować przewodnik po UI.
				<br />
			</span>
		),
		title: "Miłej Rozgrywki!",
		placement: "top",
		data: {
			id: UI_TOUR_STEP_ID.MENU_EXIT,
		},
	},
];
