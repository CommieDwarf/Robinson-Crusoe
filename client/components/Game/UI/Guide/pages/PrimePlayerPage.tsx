import ResizableImage from "../../../../ResizableImage/ResizableImage";
import styles from "../Guide.module.css";
import { ClickNextPhaseSection } from "./ClickNextPhaseSection";


export function PrimPlayerPage() {
	return (
		<>
			<div className={styles.flexBlock}>
				<div className={styles.titleImg}>
					<ResizableImage src="/UI/icons/star.png" alt="star" />
				</div>
				<h2 className={styles.title}>Pierwszy gracz</h2>
				<div className={styles.titleImg}>
					<ResizableImage src="/UI/icons/star.png" alt="star" />
				</div>
			</div>
			<div>
				<section>
					<p className={styles.p}>
						Pierwszy gracz jest graczem który:
					</p>
					<ul style={{ textAlign: "left" }}>
						<li>
							Odrzuca/dobiera żetony Determinacji w fazie morali.
						</li>
						<li>Decyduje o przejściu do kolejnej fazy.</li>
						<li>
							Jeśli gracze dobiorą kartę z talii Wydarzeń
							nakazującą Walkę z Bestią, to walkę rozpatruje
							Pierwszy Gracz i tylko on otrzymuje ewentualne Rany
							wynikające z tej walki.
						</li>
					</ul>
				</section>
				<section>
					<p className={styles.p}>
						Zmiana pierwszego gracza następuje na początku każdej
						kolejnej rundy.
					</p>
				</section>
			</div>
		</>
	);
}
