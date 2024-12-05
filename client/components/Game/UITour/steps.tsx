import { Step } from "react-joyride";
import { insertIconsIntoText } from "utils/insertIconsIntoText/insertIconsIntoText";
import { insertIcon } from "../UI/Guide/Guide";

export const steps: Step[] = [
	// {
	// 	target: ".tour-phase",
	// 	content: (
	// 		<span>
	// 			Tutaj wyświetlana jest aktualna faza. Każda runda składa się
	// 			z <strong>6 faz. </strong> Ich kolejność możesz podejrzeć
	// 			rozwijając listę klikając na przycisk "Kolejność"
	// 		</span>
	// 	),
	// },
	// {
	// 	target: ".tour-morale",
	// 	title: "Morale",
	// 	content: (
	// 		<span>
	// 			Ten panel przedstawia aktualny poziom <em>morali</em> (
	// 			{insertIconsIntoText("morale-arrow")}) oraz powiązaną z nim
	// 			ilość otrzymywanej bądź traconej <em>determinacji</em> (
	// 			{insertIconsIntoText("determination")}). Jest  ona wymagana do
	// 			posługiwania się umiejętnościami postaci.
	// 		</span>
	// 	),
	// },
	// {
	// 	target: ".tour-map",
	// 	title: "Mapa",
	// 	content: (
	// 		<span>
	// 			Mapa wyspy składa się z sześciokątnych kafelków, z których
	// 			każdy reprezentuje inny fragment terenu. Tutaj możesz przeciągać
	// 			pionki w celu zbierania surowców i/lub eksploracji.
	// 			<ul>
	// 				<li>
	// 					<strong>Przybliżanie i oddalanie</strong> – aby
	// 					dostosować widok mapy, używaj kółka myszy lub
	// 					przycisków „+” i „-”.
	// 				</li>
	// 				<li>
	// 					<strong>Przesuwanie mapy</strong> – aby zobaczyć
	// 					inne części wyspy, przytrzymaj lewy przycisk myszy i
	// 					przeciągnij mapę w wybranym kierunku.
	// 				</li>
	// 			</ul>
	// 		</span>
	// 	),
	// 	placement: "right",
	// },
	// {
	// 	target: ".tour-resources",
	// 	title: "Surowce",
	// 	content: (
	// 		<span>
	// 			Tutaj możesz śledzić należące do Twojej drużyny surowce. Są
	// 			one podzielone na 2 kategorie.
	// 			<ul>
	// 				<li>
	// 					<strong>Surowce przyszłe</strong> (na górze) -
	// 					surowce które zdobyliście w aktualnej Fazie Akcji,
	// 					ale ich jeszcze nie macie. Przechodzą one do{" "}
	// 					<strong>posiadanych surowców</strong> po
	// 					rozpatrzeniu wszystkich akcji.
	// 				</li>
	// 				<li>
	// 					<strong>Surowce posiadane</strong> (na dole) - są w
	// 					waszym posiadaniu i możecie ich używać.
	// 				</li>
	// 			</ul>
	// 		</span>
	// 	),
	// 	placement: "left",
	// 	styles: {
	// 		tooltipContainer: {
	// 			maxHeight: "100px",
	// 		},
	// 		tooltip: {
	// 			maxHeight: "100px",
	// 		},
	// 	},
	// },
	// {
	// 	target: ".tour-cards",
	// 	title: "Posiadane Karty",
	// 	content: (
	// 		<span>
	// 			Tutaj mieszczą się 3 rodzaje kart
	// 			<ul>
	// 				<li>Karty pomysłów</li>
	// 				<li>Karty tajemnic</li>
	// 				<li>Przedmioty</li>
	// 			</ul>
	// 				Przełączaj się miedzy nimi klikając w zakładki.
	// 		</span>
	// 	),
	// 	placement: "left",
	// 	styles: {
	// 		tooltipContainer: {
	// 			maxHeight: "100px",
	// 		},
	// 		tooltip: {
	// 			maxHeight: "100px",
	// 		},
	// 	},
	// },
	// {
	// 	target: ".tour-threat",
	// 	title: "Akcje Zagrożenia",
	// 	content: (
	// 		<span>
	// 			Tutaj mieszczą się miejsca na 2 karty wydarzeń.
	// 			<br/>
	// 			Wykonuj związane z nimi akcje, żeby uniknąć negatywnych konsekwencji.
	// 		</span>
	// 	),
	// 	placement: "left",
	// 	styles: {
	// 		tooltipContainer: {
	// 			maxHeight: "100px",
	// 		},
	// 		tooltip: {
	// 			maxHeight: "100px",
	// 		},
	// 	},
	// },
	// {
	// 	target: ".tour-arrange-rest",
	// 	title: "Odpoczynek i Porzadkowanie Obozu",
	// 	content: (
	// 		<span>
	// 			Tutaj można planować akcje odpoczynku lub/i porzadkowania obozu.
	// 			<ul>
	// 				<li>Do każdej z tych akcji można przypisać nieskończona ilośc pionków</li>
	// 				<li>Każda akcja kończy się sukcesem</li>
	// 			</ul>
	// 		</span>
	// 	),
	// 	placement: "left",
	// 	styles: {
	// 		tooltipContainer: {
	// 			maxHeight: "100px",
	// 		},
	// 		tooltip: {
	// 			maxHeight: "100px",
	// 		},
	// 	},
	// },
	// {
	// 	target: ".tour-character",
	// 	title: "Karta Postaci",
	// 	content: (
	// 		<span>
	// 			Tutaj mieszczą się informacje o Twojej postaci oraz postaci pobocznych.
	// 		</span>
	// 	),
	// 	placement: "left",
	// 	styles: {
	// 		tooltipContainer: {
	// 			maxHeight: "100px",
	// 		},
	// 		tooltip: {
	// 			maxHeight: "100px",
	// 		},
	// 	},
	// },
	// {
	// 	target: ".tour-character-img",
	// 	title: "Postać",
	// 	content: (
	// 		<span>
	// 			Tak wygląda twoja postać.
	// 			<br/>
	// 			W jej obrębie będą wyświetlane otrzymywane przez nią rany
	// 			dla konkretnych części ciała.
	// 		</span>
	// 	),
	// 	placement: "left",
	// 	styles: {
	// 		tooltipContainer: {
	// 			maxHeight: "100px",
	// 		},
	// 		tooltip: {
	// 			maxHeight: "100px",
	// 		},
	// 	},
	// },
	// {
	// 	target: ".tour-character-expendables",
	// 	title: "Zasoby osobiste",
	// 	content: (
	// 		<span>
	// 			Twoja postać posiada zasoby które mogą użyte tylko przez nią.
	// 			<ul>
	// 				<li>Poziom broni {insertIcon("$weapon$")} - używany podczas polowania. </li>
	// 				<li>Żetony determinacji {insertIcon("$determination$")} - potrzebne do wykorzystywania umiejętności</li>
	// 			</ul>
	// 		</span>
	// 	),
	// 	placement: "left",
	// 	styles: {
	// 		tooltipContainer: {
	// 			maxHeight: "100px",
	// 		},
	// 		tooltip: {
	// 			maxHeight: "100px",
	// 		},
	// 	},
	// },
	// {
	// 	target: ".tour-character-pawns",
	// 	title: "Pionki",
	// 	content: (
	// 		<span>
	// 			Tutaj znajdują się pionki Twojej postaci oraz należące do Ciebie pionki pomocnicze.
	// 			W fazie akcji przeciągaj je na odpowiednie pola, aby zaplanować działania.
	// 		</span>
	// 	),
	// 	placement: "left",
	// 	styles: {
	// 		tooltipContainer: {
	// 			maxHeight: "100px",
	// 		},
	// 		tooltip: {
	// 			maxHeight: "100px",
	// 		},
	// 	},
	// },
	// {
	// 	target: ".tour-character-abilities",
	// 	title: "Umiejetnosci",
	// 	content: (
	// 		<span>
	// 			Tutaj znajdują się lista umiejetności Twojej postaci.
	// 			<ul>
	// 				<li>Kliknięcie powoduje wysunięcie menu umiejętności.</li>
	// 				<li>
	// 					Niektórych umiejetności da się użyć tylko w
	// 					określonych sytuacjach.
	// 				</li>
	// 				<li>
	// 					Umiejętności związane z przerzutem kości używa się
	// 					bezpośrednio w oknie rozpatrywana akcji.
	// 				</li>
	// 			</ul>
	// 		</span>
	// 	),
	// 	placement: "left",
	// 	styles: {
	// 		tooltipContainer: {
	// 			maxHeight: "100px",
	// 		},
	// 		tooltip: {
	// 			maxHeight: "100px",
	// 		},
	// 	},
	// },
	// {
	// 	target: ".tour-character-side-characters",
	// 	title: "Postaci poboczne",
	// 	content: (
	// 		<span>
	// 			Tutaj znajdują się postaci poboczne i ich pionki.
	// 			<ul>
	// 				<li>Każdy gracz ma do nich dostęp i kontrolę.</li>
	// 				<li>
	// 					Pies nie posiada zdrowia i nie może otrzymać obrażeń.
	// 				</li>
	// 				<li>Psa można używać tylko jako pomocnika do akcji polowania lub eksploracji.</li>
	// 			</ul>
	// 		</span>
	// 	),
	// 	placement: "left",
	// 	styles: {
	// 		tooltipContainer: {
	// 			maxHeight: "100px",
	// 		},
	// 		tooltip: {
	// 			maxHeight: "100px",
	// 		},
	// 	},
	// },
	// {
	// 	target: ".tour-health",
	// 	title: "Zdrowie",
	// 	content: (
	// 		<span>
	// 			Tutaj znajduje się zdrowie Twojej postaci.
	// 			<ul>
	// 				<li>Za każdy otrzymany punkt obrażeń wskaźnik zdrowia przesuwa się w prawo</li>
	// 				<li>Jeśli wskaźnik zdrowia przejdzie przez strzałkę {insertIconsIntoText("$morale-arrow$")},
	// 					morale drużyny spadają o 1.
	// 				</li>
	// 				<li>Gdy wskażnik dojdzie do końca, postać umiera i gracze przegrywają.</li>
	// 			</ul>
	// 		</span>
	// 	),
	// 	placement: "left",
	// 	styles: {
	// 		tooltipContainer: {
	// 			maxHeight: "100px",
	// 		},
	// 		tooltip: {
	// 			maxHeight: "100px",
	// 		},
	// 	},
	// },
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
                overflow: "none"
            }
		},
		disableBeacon: true, // Zapobiega automatycznemu przejściu do następnego kroku
		spotlightClicks: true, // Pozwala na interakcję z komponentem pod spotlightem
        hideFooter: true,
	},
    {
		target: ".tour-scenario",
		title: "Karta Scenariusza",
		content: (
			<span>
				asdasfsafasfa
				<br />
			afsfsafgas
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
	},
    {
		target: ".tour-scenario-rounds",
		title: "Karta Scenariusza",
		content: (
			<span>
				KEKEKKEKEE
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
	},
];
