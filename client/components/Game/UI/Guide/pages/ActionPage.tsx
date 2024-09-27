import { kebabCase } from "lodash";
import ResizableImage from "../../../../ResizableImage/ResizableImage";
import styles from "../Guide.module.css";

import { ACTION } from "@shared/types/Game/ACTION";
import ActionSlot from "../../ActionSlot";

export function ActionPage() {
	return (
		<>
			<section>
				<div className={styles.flexBlock}>
					<div className={styles.titleImg}>
						<ResizableImage
							src={"/UI/phase/action.png"}
							alt="action"
						/>
					</div>
					<h2 className={styles.title}>Faza Akcji</h2>
					<div className={styles.titleImg}>
						<ResizableImage
							src={"/UI/phase/action.png"}
							alt="action"
						/>
					</div>
				</div>
				<p className={styles.p}>
					Jest to najważniejsza faza gry i składa się z dwóch etapów:
					Planowania i Rozpatrywania Akcji.
				</p>
				<h3 className={styles.subTitle}>Planowanie</h3>
				<p className={styles.p}>
					Podczas planowania Akcji gracze nie rozgrywają
					indywidualnych tur, ale wspólnie decydują, które Akcje chcą
					wykonać w danej rundzie. Następnie zaznaczają swój wybór,
					przypisując swoje pionki do określonych Akcji.
				</p>
				<p className={styles.p}>
					Pionki reprezentują aktywność Postaci na wyspie, więc
					dysponując dwoma pionkami, każdy gracz może podjąć do dwóch
					akcji. Jednakże, niejedna Akcja wymaga przypisania więcej
					niż jednego pionka, aby ją wykonać.
				</p>
				<p className={styles.p}>
					Każdy rodzaj Akcji (z wyjątkiem Akcji Zagrożenia) może być
					podejmowany wielokrotnie w tej samej rundzie i przez różnych
					graczy.
				</p>
				<p className={styles.p}>Dostępne są następujące Akcje:</p>
				<ul className={styles.list}>
					{Object.values(ACTION).map((action, i) => {
						return (
							<li className={styles.li} key={i}>
								<div className={styles.listItemImg}>
									<ResizableImage
										src={`/UI/actions/${kebabCase(action)}.png`} alt={""}									/>
								</div>
								<div className={styles.listItemDescription}>
									{actionDesription[action]}
								</div>
							</li>
						);
					})}
				</ul>
			</section>
			<section>
				<p>Aby zaplanować akcję przeciągnij pionek na miejsce akcji.</p>
				<div className={styles.flexBlock}>
					<div className={styles.pawnAssignmentImg}>
					<ResizableImage
							src={"/gif/pawn-assignment.gif"}
							alt="przeciąganie pionka"
						/>
					</div>
				</div>
				<ul className={styles.list}>
					<li className={styles.li}>
						<div className={styles.listItemImg}>
							<ActionSlot
								type={"leader"}
								action={ACTION.EXPLORE}
								uniqueAction={ACTION.EXPLORE}
								id={""}
								static={true}
							/>
						</div>
						<div className={styles.listItemDescription}>
							- umieszczenie pionka w tym slocie oznacza, że dana
							postać wykonuje daną akcję.
						</div>
					</li>
					<li className={styles.li}>
						<div className={styles.listItemImg}>
							<ActionSlot
								type={"helper"}
								action={ACTION.EXPLORE}
								uniqueAction={ACTION.EXPLORE}
								id={""}
								static={true}
							/>
						</div>
						<div className={styles.listItemDescription}>
							- jest to slot pomocniczy. Pionki na tym miejscu
							tylko asystują i nie ponoszą żadnych konsekwencji za
							tą akcję.
						</div>
					</li>
				</ul>
			</section>
		</>
	);
}

const actionDesription = {
	[ACTION.THREAT]: (
		<span>
			<strong>Akcja Zagrożenia</strong> - akcja ta jest podejmowana, aby
			zapobiec wprowadzeniu w życie efektu Zagrożenia przedstawionego na
			kon- kretnej karcie Wydarzenia znajdującej się na planszy w polu
			Akcji Zagrożenia. Za wykonanie tej Akcji gracz otrzymuje korzyści
			przed- stawione na karcie (np. żetony Determinacji lub inne zasoby).
		</span>
	),
	[ACTION.HUNT]: (
		<span>
			<strong>Polowanie</strong> - pozwala graczowi uzyskać większą ilość
			pożywienia i skór, ale zwykle wiąże się z otrzymaniem Ran.
		</span>
	),
	[ACTION.BUILD]: (
		<span>
			<strong>Budowa</strong> – pozwala graczom budować Schronienie, Dach,
			Palisadę lub Broń oraz przekształcać Pomysły w Przedmioty.
		</span>
	),
	[ACTION.GATHER]: (
		<span>
			<strong>Zbieranie Surowców</strong> - pozwala graczom zdobywać
			zasoby dostępne na odkrytych kafelkach Wyspy.
		</span>
	),
	[ACTION.EXPLORE]: (
		<span>
			<strong>Eksploracja</strong> - pozwala graczom odkrywać wyspę.
		</span>
	),
	[ACTION.ARRANGE_CAMP]: (
		<span>
			<strong>Porządkowanie Obozu</strong> – pozwala graczowi otrzymać 2
			żeto- ny Determinacji i zwiększyć o 1 poziom Morale (w grze
			4-osobowej, gracz wybiera czy otrzymuje żetony Determinacji, czy
			zwiększa Mo- rale).
		</span>
	),
    [ACTION.REST]: (
		<span>
			<strong>Odpoczynek</strong> – pozwala uleczyć 1 Ranę
		</span>
	),
};
