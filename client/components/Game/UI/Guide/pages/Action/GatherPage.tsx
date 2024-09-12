import ResizableImage from "../../../../../ResizableImage/ResizableImage";
import styles from "../../Guide.module.css";

export function GatherPage() {
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
							src={"/UI/actions/gather.png"}
							alt="action"
						/>
					</div>
					<h2 className={styles.subTitle}>Zbieranie Surowców</h2>
					<div className={styles.titleImg}>
						<ResizableImage
							src={"/UI/actions/gather.png"}
							alt="action"
						/>
					</div>
				</div>
				<ul className={styles.list}>
					<li>Zbieranie Surowców wymaga użycia 1 lub 2 pionków.</li>
					<li>
						Używając tylko 1 pionka, podczas rozpatrywania Akcji,
						gracz będzie musiał rzucić kośćmi Zbierania Surowców,
						aby sprawdzić czy będzie ona udana, czy otrzyma Rany lub
						czy spotka go Przygoda
					</li>
					<li>
						Przypisując do Akcji 2 pionki, będzie ona na pewno udana
						i gracz nie będzie musiał wykonywać rzutu żadnymi kośćmi
					</li>
					<li>
						W ramach jednej Akcji gracz zbiera surowiec tylko z
						jednego, wybra- nego Źródła. Każde Źródło dostarcza
						jedną sztukę surowca (ilość ta może być modyfikowana
						przez efekty działania niektórych Przedmio- tów, Przygód
						lub Wydarzeń itp.).
					</li>
                    <li>
						Im dalej kafelek znajduje się od obozu, tym więcej akcja na nim będzie wymagała pionków.
					</li>
				</ul>
			</section>
		</>
	);
}
