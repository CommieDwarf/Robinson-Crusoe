import { PHASE } from "@shared/types/Game/PhaseService/Phase";
import styles from "../Guide.module.css";
import ResizableImage from "../../../../DynamicImage/DynamicImage";
import capitalize from "@shared/utils/capitalize";
import i18next from "i18next";

export function IntroductionPage() {
	return (
		<>
			<section>
				<h2 className={styles.title}>Cel gry</h2>
				<p className={styles.p}>
					Robinson Crusoe to gra kooperacyjna. Gracze albo razem
					odniosą zwycięstwo (jeśli uda im się przetrwać i zrealizować
					cel określony przez Scenariusz), albo razem poniosą porażkę
					(jeśli przynajmniej jedna z Postaci gracza zginie lub jeśli
					nie spełnią celu Scenariusza w określonej liczbie rund)
				</p>
			</section>
			<section>
				<h2 className={styles.title}>Przebieg Rundy</h2>
				<p className={styles.p}>
					Gra trwa kilka rund, których liczba określona jest na karcie
					każdego Scenariuza. Każda runda jest podzielona na fazy,
					które są rozpatrywane w następujący sposób:
				</p>
				<ul className={styles.list}>
					{Object.values(PHASE).map((phase, i) => {
						return (
							<li key={phase} className={styles.li}>
								<div className={styles.listItemImg}>
									<ResizableImage
										src={"/UI/phase/" + phase + ".webp"}
										alt={phase}
									/>
								</div>

								<span className={styles.listItemDescription}>
									{i + 1}.{" "}
									<strong>
										{capitalize(
											// @ts-ignore
											i18next.t("phase." + phase, {
												context: "genitive",
											})
										)}{" "}
										-{" "}
									</strong>
									{
										phaseDescription[
											phase as keyof typeof phaseDescription
										]
									}
								</span>
							</li>
						);
					})}
				</ul>
			</section>
		</>
	);
}

const phaseDescription = {
	[PHASE.EVENT]: `podczas niej dociągana jest i rozpatrywana wierzchnia kartę z talii Wydarzenia.`,
	[PHASE.MORALE]: `rozpatruje ją tylko Pierwszy Gracz, który od-
rzuca lub otrzymuje żetony Determinacji zgodnie ze wskazaniem
na torze Morale.`,
	[PHASE.PRODUCTION]: `gracze otrzymują surowce, których źródła
znajdują się na kafelku Wyspy, na którym mieści się Obóz graczy.`,
	[PHASE.ACTION]: `jest to najważniejsza faza w rundzie, podczas któ-
rej gracze najpierw wspólnie planują swoje działania, a następnie
je realizują`,
	[PHASE.WEATHER]: ` gracze muszą zmierzyć się z pogodą określoną
przez rzut kośćmi i/lub żetony Pogody.`,
	[PHASE.NIGHT]: `w której gracze będą m.in. musieli się wyżywić,
a także będą cierpieć, jeśli nie będą posiadać Schronienia`,
};
