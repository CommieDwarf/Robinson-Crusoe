import { insertIconsIntoText } from "../../../../../../utils/insertIconsIntoText/insertIconsIntoText";
import ResizableImage from "../../../../../ResizableImage/ResizableImage";
import styles from "../../Guide.module.css";
import { ImgListItem } from "../../ImgList.tsx/ImgListItem";

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
					<li>Polowanie zawsze kończy się sukcesem (z wyjątkiem kiedy postać polująca zginie od ran).</li>
				</ul>
				<div className={styles.flexBlock}>
					<div className={styles.card}>
						<ResizableImage
							src={"/UI/cards/beasts/tiger.png"}
							alt="karta bestii"
						/>
					</div>
					<div className={styles.exampleGif}>
						<ResizableImage
							src={"/UI/guide/pawn-assignment-hunt.gif"}
							alt={"przydzielanie pionka"}
						/>
					</div>
				</div>
				<ul className={styles.list}>
					<ImgListItem
						imgElement={() => (
							<ResizableImage
								src={"/UI/misc/black-skull.png"}
								alt={"siła"}
							/>
						)}
						textElement={() => (
							<>
								<strong>Siła bestii</strong>- jeśli jest większa
								od poziomu broni{" "}
								{insertIconsIntoText("$weapon$", styles.icon)}{" "}
								gracz dostaje obrażenia za każdy brakujący
								poziom.
							</>
						)}
					/>
					<ImgListItem
						imgElement={() => (
							<ResizableImage
								src={"/UI/icons/weapon.png"}
								alt={"spadek poziomu broni"}
							/>
						)}
						textElement={() => (
							<>
								<strong>Spadek poziomu broni</strong>- liczba o jaką 
								spada poziom broni po polowaniu. Za każdy brakujący poziom 
								gracz dostaje obrażenia.
							</>
						)}
					/>
					<ImgListItem
						imgElement={() => (
							<ResizableImage
								src={"/UI/icons/food.png"}
								alt={"jedzenie"}
							/>
						)}
						textElement={() => (
							<>
								<strong>Zdobyte pożywienie</strong>- dodawane jest do przyszłych surowców.
							</>
						)}
					/>
					<ImgListItem
						imgElement={() => (
							<ResizableImage
								src={"/UI/resources/leather.png"}
								alt={"jedzenie"}
							/>
						)}
						textElement={() => (
							<>
								<strong>Zdobyta skóra</strong>- dodawana jest do przyszłych surowców.
							</>
						)}
					/>
				</ul>
			</section>
		</>
	);
}
