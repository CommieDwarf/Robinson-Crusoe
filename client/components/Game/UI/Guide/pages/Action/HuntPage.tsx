import ResizableImage from "../../../../../ResizableImage/ResizableImage";
import styles from "../../Guide.module.css";

export function HuntPage() {
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
							src={"/UI/actions/hunt.png"}
							alt="action"
						/>
					</div>
					<h2 className={styles.subTitle}>Polowanie</h2>
					<div className={styles.titleImg}>
						<ResizableImage
							src={"/UI/actions/hunt.png"}
							alt="action"
						/>
					</div>
				</div>
				<ul className={styles.list}>
					<li>Polowanie zawsze wymaga użycia 2 pionków.</li>
					<li>
						Polowanie jest możliwe tylko, jeśli na planszy znajduje
						się talia Polowa- nia składająca się z przynajmniej
						jednej karty Bestii. Jedna karta Bestii umożliwia jedno
						polowanie.
					</li>
					<li>Można polować nawet, jeśli poziom Broni wynosi 0</li>
				</ul>
			</section>
		</>
	);
}
