import ReactJoyride from "react-joyride";
import dynamic from "next/dynamic";
import { useState } from "react";

import styles from "./UITour.module.css";
import { CustomTooltip } from "./CustomToolTip/CustomToolTip";
import { insertIconsIntoText } from "utils/insertIconsIntoText/insertIconsIntoText";
import toolTipStyles from "./CustomToolTip/CustomToolTip.module.css";
import { Step } from "react-joyride";

const JoyRideNoSSR = dynamic(() => import("react-joyride"), { ssr: false });
export function UITour() {
	const [run, setRun] = useState(true);
	const steps: Step[] = [
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
		{
			target: ".tour-resources",
			title: "Surowce",
			content: (
				<span>
					Tutaj możesz śledzić należące do Twojej drużyny surowce. Są one
					podzielone na 2 kategorie.
					<ul>
						<li>
							<strong>Surowce posiadane</strong> (na dole) - są w waszym
							posiadaniu i możecie ich używać.
						</li>
						<li>
							<strong>Surowce przyszłe</strong> (na górze) - surowce które zdobyliście w aktualnej Fazie Akcji, 
							ale ich jeszcze nie macie. Przechodzą one do <strong>posiadanych surowców</strong> po rozpatrzeniu wszystkich akcji.
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
		},
		{
			target: ".tour-cards",
			title: "Karty",
			content: (
				<span>
					Tutaj możesz śledzić należące do Twojej drużyny surowce. Są one
					podzielone na 2 kategorie.
					<ul>
						<li>
							<strong>Surowce posiadane</strong> (na dole) - są w waszym
							posiadaniu i możecie ich używać.
						</li>
						<li>
							<strong>Surowce przyszłe</strong> (na górze) - surowce które zdobyliście w aktualnej Fazie Akcji, 
							ale ich jeszcze nie macie. Przechodzą one do <strong>posiadanych surowców</strong> po rozpatrzeniu wszystkich akcji.
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
		},

		// {
		// 	target: ".tour-health",
		// 	content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
		// 	Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.`,
		// },
	];

	return (
		<div className={styles.container}>
			<JoyRideNoSSR
				steps={steps}
				run={run}
				debug={true}
				floaterProps={{
					styles: {
						wrapper: {
							zIndex: 1000,
						},
					},
				}}
				styles={{
					options: {
						zIndex: 1000,
					},
				}}
				callback={(data) => {
					const { status } = data;
					const finishedStatuses = ["finished", "skipped"];
					if (finishedStatuses.includes(status)) {
						setRun(false);
						setTimeout(() => setRun(true), 0); // resetuj stan po zakończeniu
					}
				}}
				continuous
				tooltipComponent={CustomTooltip}
			/>
		</div>
	);
}
