import ResizableImage from "../../../../../DynamicImage/DynamicImage";
import styles from "../../Guide.module.css";

export function ArrangeCampPage() {
	return (
		<>
			<section>
				<div className={styles.flexBlock}>
					<div className={styles.titleImg}>
						<ResizableImage
							src={"/UI/phase/action.webp"}
							alt="action"
						/>
					</div>
					<h2 className={styles.title}>Faza Akcji</h2>
					<div className={styles.titleImg}>
						<ResizableImage
							src={"/UI/phase/action.webp"}
							alt="action"
						/>
					</div>
				</div>
				<div className={styles.flexBlock}>
					<div className={styles.titleImg}>
						<ResizableImage
							src={"/UI/actions/arrange-camp.webp"}
							alt="action"
						/>
					</div>
					<h2 className={styles.subTitle}>PorzĄdkowanie Obozu</h2>
					<div className={styles.titleImg}>
						<ResizableImage
							src={"/UI/actions/arrange-camp.webp"}
							alt="action"
						/>
					</div>
				</div>
				<ul className={styles.list}>
					<li>Porządkowanie Obozu wymaga użycia 1 pionka.</li>
					<li>
						Porządkowanie Obozu pozwala graczowi uzyskać 2 żetony
						Determi- nacji oraz zwiększyć Morale o 1 poziom (w
						przypadku rozgrywki 4-osobowej gracz musi zdecydować czy
						wybiera jedno, czy drugie).
					</li>
					<li>
						Każdego pionka gracza, który jest przypisany do
						Porządkowania Obo- zu rozpatruje się oddzielnie, co
						oznacza, że jeśli jeden gracz przypisze oba swoje pionki
						do Porządkowania Obozu, to będzie rozpatrywał tę Akcję
						dwukrotnie i w rezultacie otrzyma 4 żetony Determinacji
						oraz zwiększy Morale o 2 poziomy.
					</li>
				</ul>
				<div className={styles.flexBlock}>
					<div className={styles.exampleGif}>
						<ResizableImage
							src={"/UI/guide/pawn-assignment-arrange-camp.gif"}
							alt={"przydzielanie pionka"}
						/>
					</div>
				</div>
			</section>
		</>
	);
}
