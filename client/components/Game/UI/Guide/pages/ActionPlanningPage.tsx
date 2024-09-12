import { ACTION } from "@shared/types/Game/ACTION";
import ResizableImage from "../../../../ResizableImage/ResizableImage";
import ActionSlot from "../../ActionSlot";
import styles from "../Guide.module.css";

export function ActionPlanningPage() {
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
				<p>Aby zaplanować akcję przeciągnij pionek na miejsce akcji.</p>
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
