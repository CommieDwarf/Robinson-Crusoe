import DynamicImage from "../../../../../DynamicImage/DynamicImage";
import { insertIcon } from "../../Guide";
import styles from "../../Guide.module.css";
import { ImgListItem } from "../../ImgList.tsx/ImgListItem";

export function ExplorePage() {
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
							src={"/UI/actions/explore.webp"}
							alt="action"
						/>
					</div>
					<h2 className={styles.subTitle}>Exploracja</h2>
					<div className={styles.titleImg}>
						<DynamicImage
							src={"/UI/actions/explore.webp"}
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
						<DynamicImage
							src={"/UI/map/tiles/8.webp"}
							alt={"kafelek"}
						/>
					</div>
					<div className={styles.exampleGif}>
						<DynamicImage
							src={"/UI/guide/pawn-assignment-explore.gif"}
							alt={"przydzielanie pionka"}
						/>
					</div>
				</div>
				<ul className={styles.list}>
					<ImgListItem
						imgElement={() => (
							<>
								<DynamicImage
									src={"/UI/misc/parrot.webp"}
									alt={"źródło pożywienia"}
									style={{ scale: "0.9" }}
								/>
							</>
						)}
						textElement={() => (
							<strong>
								Żródło surowca (w tym przypadku jedzenia{" "}
								{insertIcon("$food$")})
							</strong>
						)}
					/>
					<ImgListItem
						imgElement={() => (
							<DynamicImage
								src={"/UI/misc/beast.webp"}
								alt="bestia"
								style={{ scale: "0.9" }}
							/>
						)}
						textElement={() => (
							<>
								<strong>Bestia</strong> - losowa karta bestii
								dodawna do talii polowania po udanej exploracji.
							</>
						)}
					/>
					<ImgListItem
						imgElement={() => (
							<DynamicImage
								src={"/UI/misc/discovery-token.webp"}
								alt="żeton odkryć"
								style={{ scale: "0.9" }}
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
							<DynamicImage
								src={"/UI/misc/natural-shelter.webp"}
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
							<DynamicImage
								src={"/UI/misc/totem.webp"}
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
							<DynamicImage
								src={"/UI/misc/terrain.webp"}
								alt="rodzaj terenu"
							/>
						)}
						textElement={() => (
							<>
								<strong>Rodzaj terenu</strong>
								{` - niektóre akcje
								wymagają posiadanie odkrytego kafelka z
								konkretnym rodzajem terenu (np. budowa karty
								pomysłu "Nóż" wymaga posiadania odkrytego
								kafelka z terenem gór).`}
							</>
						)}
					/>
				</ul>
			</section>
		</>
	);
}
