import ResizableImage from "../../../../../ResizableImage/ResizableImage";
import styles from "../../Guide.module.css";

export function ExplorePage() {
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
				<div className={styles.flexBlock}>
					<div className={styles.titleImg}>
						<ResizableImage
							src={"/UI/actions/explore.png"}
							alt="action"
						/>
					</div>
					<h2 className={styles.subTitle}>Exploracja</h2>
					<div className={styles.titleImg}>
						<ResizableImage
							src={"/UI/actions/explore.png"}
							alt="action"
						/>
					</div>
				</div>
				<ul className={styles.list}>
					<li>Eksploracja wymaga użycia 1 lub 2 pionków.</li>
					<li>
						Używając tylko 1 pionka, podczas rozpatrywania Akcji,
						gracz będzie musiał rzucić kośćmi Eksploracji ( ), aby
						sprawdzić czy będzie ona udana, czy otrzyma Rany lub czy
						spotka go Przygoda.
					</li>
					<li>
						Im dalej kafelek znajduje się od obozu, tym więcej akcja
						na nim będzie wymagała pionków.
					</li>
				</ul>
			</section>
		</>
	);
}
