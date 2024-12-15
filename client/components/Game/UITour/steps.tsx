import { Step } from "react-joyride";
import { insertIconsIntoText } from "utils/insertIconsIntoText/insertIconsIntoText";
import { insertIcon } from "../UI/Guide/Guide";
import { UIStates } from "types/UITour/UIStates";
import { UI_TOUR_STEP_ID } from "types/UITour/UI_TOUR_STEP_ID";
import { useAppDispatch } from "store/hooks";
import { UIStateUpdated } from "reduxSlices/UITour";

const defaultDelay = 520;

export interface CustomStep extends Step {
	data: StepData
}

interface StepData {
	id: UI_TOUR_STEP_ID;
	hideNextButton?: boolean;
	shouldSkip?: (uiStates: UIStates) => boolean;
	getUpdateUIStateHandle?: GetUpdateUIStateHandle;

}

export type Delay = number;
export type UpdateUIStateHandle = () => void;

export type GetUpdateUIStateHandle = (
	dispatch: ReturnType<typeof useAppDispatch>,
	uiStates: UIStates,
	delay?: number
) => [Delay, UpdateUIStateHandle];



function createUIHandler(
	shouldDelay: (states: UIStates) => boolean,
	changeUI: (dispatch: ReturnType<typeof useAppDispatch>) => void,
	stepDelay: number = defaultDelay
): GetUpdateUIStateHandle {
	return function UpdateUiStateHandle(
		dispatch: ReturnType<typeof useAppDispatch>,
		uiStates: UIStates,
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
			getUpdateUIStateHandle: createUIHandler(
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
		data: {
			id: UI_TOUR_STEP_ID.MAP,
			getUpdateUIStateHandle: createUIHandler(
				(uiStates) => uiStates.scenarioOpen,
				(dispatch) => dispatch(UIStateUpdated(["scenarioOpen", false]))
			),
		},

		placement: "right",
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
			id: UI_TOUR_STEP_ID.RESOURCES,
		},
		placement: "left",
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
		styles: {
			tooltipContainer: {
				maxHeight: "100px",
			},
			tooltip: {
				maxHeight: "100px",
			},
		},
		data: {
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
		styles: {
			tooltipContainer: {
				maxHeight: "100px",
			},
			tooltip: {
				maxHeight: "100px",
			},
		},
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
		styles: {
			tooltipContainer: {
				maxHeight: "100px",
			},
			tooltip: {
				maxHeight: "100px",
			},
		},
		data: {
			id: UI_TOUR_STEP_ID.THREAT,
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
		styles: {
			tooltipContainer: {
				maxHeight: "100px",
			},
			tooltip: {
				maxHeight: "100px",
			},
		},
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
		styles: {
			tooltipContainer: {
				maxHeight: "100px",
			},
			tooltip: {
				maxHeight: "100px",
			},
		},
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
		styles: {
			tooltipContainer: {
				maxHeight: "100px",
			},
			tooltip: {
				maxHeight: "100px",
			},
		},
		data: {
			id: UI_TOUR_STEP_ID.CHARACTER_IMG,
		},
	},
	{
		target: ".tour-character-expendables",
		title: "Zasoby osobiste",
		content: (
			<span>
				Twoja postać posiada zasoby które mogą użyte tylko przez nią.
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
		styles: {
			tooltipContainer: {
				maxHeight: "100px",
			},
			tooltip: {
				maxHeight: "100px",
			},
		},
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
		styles: {
			tooltipContainer: {
				maxHeight: "100px",
			},
			tooltip: {
				maxHeight: "100px",
			},
		},
		data: {
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
		placement: "left",
		styles: {
			tooltipContainer: {
				maxHeight: "100px",
			},
			tooltip: {
				maxHeight: "100px",
			},
		},
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
		styles: {
			tooltipContainer: {
				maxHeight: "100px",
			},
			tooltip: {
				maxHeight: "100px",
			},
		},
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
		styles: {
			tooltipContainer: {
				maxHeight: "100px",
			},
			tooltip: {
				maxHeight: "100px",
			},
		},
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
		placement: "left",
		styles: {
			tooltipContainer: {
				maxHeight: "100px",
			},
			tooltip: {
				maxHeight: "100px",
			},
			tooltipFooter: {
				display: "none",
				overflow: "none",
			},
		},
		spotlightClicks: true, // Pozwala na interakcję z komponentem pod spotlightem,
		data: {
			id: UI_TOUR_STEP_ID.SCENARIO_BUTTON,
			hideNextButton: true,
			shouldSkip: (uiStates: UIStates) => uiStates.scenarioOpen,
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
		styles: {
			tooltipContainer: {
				maxHeight: "100px",
			},
			tooltip: {
				maxHeight: "100px",
			},
		},
		data: {
			id: UI_TOUR_STEP_ID.SCENARIO,
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
		styles: {
			tooltipContainer: {
				maxHeight: "100px",
			},
			tooltip: {
				maxHeight: "100px",
			},
		},
		data: {
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
		styles: {
			tooltipContainer: {
				maxHeight: "100px",
			},
			tooltip: {
				maxHeight: "100px",
			},
		},
		data: {
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
		styles: {
			tooltipContainer: {
				maxHeight: "100px",
			},
			tooltip: {
				maxHeight: "100px",
			},
		},
		data: {
			id: UI_TOUR_STEP_ID.WEATHER,
			getUpdateUIStateHandle: createUIHandler(
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
		styles: {
			tooltipContainer: {
				maxHeight: "100px",
			},
			tooltip: {
				maxHeight: "100px",
			},
		},
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
		styles: {
			tooltipContainer: {
				maxHeight: "100px",
			},
			tooltip: {
				maxHeight: "100px",
			},
		},
		data: {
			id: UI_TOUR_STEP_ID.NEXT_PHASE,
		},
	},
	{
		target: ".tour-guide",
		content: (
			<span>
				Aby dowiedzieć się więcej o zasadach rozgrywki, możesz otworzyć
				poradnik klikając ikonę księgi.
			</span>
		),
		placement: "top",
		styles: {
			tooltipContainer: {
				maxHeight: "100px",
			},
			tooltip: {
				maxHeight: "100px",
			},
		},
		data: {
			id: UI_TOUR_STEP_ID.GUIDE,
		},
	},
	{
		target: ".tour-settings",
		content: (
			<span>
				W opcjach możesz zresetować przewodnik po interfejsie gry.
				<h4>Miłej rozgrywki!</h4>
			</span>
		),
		placement: "top",
		styles: {
			tooltipContainer: {
				maxHeight: "100px",
			},
			tooltip: {
				maxHeight: "100px",
			},
		},
		data: {
			id: UI_TOUR_STEP_ID.SETTINGS,
		},
	},
];

// getUpdateUIStateHandle: (dispatch, uiStates, delay = defaultDelay) => {
// 	return [
// 		delay,
// 		() => {
// 			if (uiStates.phaseListOpen) {
// 				dispatch(UIStateUpdated(["phaseListOpen", false]));
// 			}
// 		},
// 	];
// },

