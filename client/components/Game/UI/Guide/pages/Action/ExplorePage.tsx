import ResizableImage from "../../../../../ResizableImage/ResizableImage";
import { insertIcon } from "../../Guide";
import styles from "../../Guide.module.css";
import { ImgListItem } from "../../ImgList.tsx/ImgListItem";

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
				<div className={styles.flexBlock}>
					<div className={styles.exampleImg}>
						<ResizableImage
							src={"/UI/map/tiles/8.png"}
							alt={"kafelek"}
						/>
					</div>
					<div className={styles.exampleGif}>
						<ResizableImage
							src={"/UI/guide/pawn-assignment-explore.gif"}
							alt={"przydzielanie pionka"}
						/>
					</div>
				</div>
				<ul className={styles.list}>
					<ImgListItem
						imgElement={() => (
							<>
								<ResizableImage
									src={"/UI/misc/parrot.png"}
									alt={"źródło pożywienia"}
									style={{scale: "0.9"}}
								/>
							</>
						)}
						textElement={() => (
							<strong>
								Żródło surowca (w tym przypadku jedzenia {insertIcon("$food$")})
							</strong>
						)}
					/>
					<ImgListItem
						imgElement={() => (
							<ResizableImage
								src={"/UI/misc/beast.png"}
								alt="bestia"
								style={{ scale: "0.9" }}
							/>
						)}
						textElement={() => (
							<>
								<strong>Bestia</strong> - losowa karta bestii dodawna do talii
								polowania po udanej exploracji.
							</>
						)}
					/>
					<ImgListItem
						imgElement={() => (
							<ResizableImage
								src={"/UI/misc/discovery-token.png"}
								alt="żeton odkryć"
								style={{scale: "0.9"}}
							/>
						)}
						textElement={() => (
							<>
								<strong>Żetony odkryć</strong> - dodawane do
								przyszłych surowców po udanej exploracji.
							</>
						)}
					/>
					<ImgListItem
						imgElement={() => (
							<ResizableImage
								src={"/UI/misc/natural-shelter.png"}
								alt="żeton odkryć"
							/>
						)}
						textElement={() => (
							<>
								<strong>Naturalne schronienie</strong> -
								posiadanie obozu na tym kafelku działa podobnie
								jak posiadanie wybudowanego schronienia lecz z
								istotnymi różnicami.
							</>
						)}
					/>

					<ImgListItem
						imgElement={() => (
							<ResizableImage
								src={"/UI/misc/totem.png"}
								alt="żeton odkryć"
							/>
						)}
						textElement={() => (
							<>
								<strong>Totem</strong> - efekt opisany w karcie
								scenariusza.
							</>
						)}
					/>
					<ImgListItem
						imgElement={() => (
							<ResizableImage
								src={"/UI/misc/terrain.png"}
								alt="rodzaj terenu"
							/>
						)}
						textElement={() => (
							<>
								<strong>Rodzaj terenu</strong> - niektóre akcje
								wymagają posiadanie odkrytego kafelka z
								konkretnym rodzajem terenu (np. budowa karty
								pomysłu "Nóż" wymaga posiadania odkrytego
								kafelka z terenem gór).
							</>
						)}
					/>
				</ul>
			</section>
		</>
	);
}
