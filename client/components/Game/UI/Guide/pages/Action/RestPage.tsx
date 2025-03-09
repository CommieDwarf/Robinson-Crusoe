import DynamicImage from "../../../../../DynamicImage/DynamicImage";
import styles from "../../Guide.module.css";

export function RestPage() {
	return (
		<>
			<section>
				<div className={styles.flexBlock}>
					<div className={styles.titleImg}>
						<DynamicImage
							src={"/UI/phase/action.webp"}
							alt="action"
						/>
					</div>
					<h2 className={styles.title}>Faza Akcji</h2>
					<div className={styles.titleImg}>
						<DynamicImage
							src={"/UI/phase/action.webp"}
							alt="action"
						/>
					</div>
				</div>
				<div className={styles.flexBlock}>
					<div className={styles.titleImg}>
						<DynamicImage
							src={"/UI/actions/rest.webp"}
							alt="action"
						/>
					</div>
					<h2 className={styles.subTitle}>Odpoczynek</h2>
					<div className={styles.titleImg}>
						<DynamicImage
							src={"/UI/actions/rest.webp"}
							alt="action"
						/>
					</div>
				</div>
				<ul className={styles.list}>
					<li>Odpoczynek wymaga użycia 1 pionka.</li>
					<li>Odpoczynek pozwala graczowi uleczyć 1 Ranę.</li>
					<li>
						Każdego pionka gracza, który jest przypisany do
						Odpoczynku roz- patruje się oddzielnie, co oznacza, że
						jeśli jeden gracz przypisze oba swoje pionki do
						Odpoczynku, to będzie rozpatrywał go dwukrotnie i w
						rezultacie otrzyma uleczy 2 Rany.
					</li>
				</ul>
				<div className={styles.flexBlock}>
					<div className={styles.exampleGif}>
						<DynamicImage
							src={"/UI/guide/pawn-assignment-rest.gif"}
							alt={"przydzielanie pionka"}
						/>
					</div>
				</div>
			</section>
		</>
	);
}
