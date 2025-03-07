import ResizableImage from "../../../../../DynamicImage/DynamicImage";
import styles from "../../Guide.module.css";

export function ThreatPage() {
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
							src={"/UI/actions/threat.webp"}
							alt="action"
						/>
					</div>
					<h2 className={styles.subTitle}>Zagrożenie</h2>
					<div className={styles.titleImg}>
						<ResizableImage
							src={"/UI/actions/threat.webp"}
							alt="action"
						/>
					</div>
				</div>
				<div className={styles.flexBlock}>
					<div className={styles.cardExampleImg}>
						<ResizableImage
							src="/UI/guide/event/event-card-example.webp"
							alt="event card example"
						/>
					</div>
					<div className={styles.cardExampleImg2} style={{aspectRatio: 339 / 265}}>
						<ResizableImage
							src="/UI/guide/pawn-assignment-threat.gif"
							alt="przydzielanie pionka"
						/>
					</div>
				</div>
				<ul className={styles.list}>
					<li>
						Na początku każdej rundy dobierana jest nowa karta
						Wydarzenia, któ- ra zawiera określoną Akcję Zagrożenia.
						Gracze mogą ją wykonać, aby zapobiec późniejszemu
						wprowadzeniu efektu Zagrożenia danej karty
					</li>
					<li>
						Każda Akcja Zagrożenia jest jednorazową Akcją dostępną
						na określo- nej karcie i po jej rozpatrzeniu karta
						zostaje odrzucona
					</li>
					<li>
						Do wykonania Akcji Zagrożenia trzeba przypisać
						przedstawioną na karcie liczbę pionków (1 lub 2) i
						spełnić pewne dodatkowe wymaga- nia (na przykład:
						posiadać pożywienie lub drewno potrzebne do od-
						rzucenia, posiadać minimalny poziom broni, itp.).{" "}
					</li>
				</ul>
				<p className={styles.p}>
					Możliwe wymagania do podjęcia Akcji Zagrożenia:
				</p>
				<ul className={styles.list}>
					<li className={styles.li}>
						<div className={styles.listItemImg}>
							<ResizableImage
								src="/UI/characters/pawns/helper.webp"
								alt="pionek"
							/>
						</div>
						<div className={styles.listItemDescription}>
							Akcja wymaga przypisania 1 pionka
						</div>
					</li>
					<li className={styles.li}>
						<div className={styles.listItemImg}>
							<ResizableImage
								src="/UI/icons/weapon.webp"
								alt="broń"
							/>
						</div>
						<div className={styles.listItemDescription}>
							wykonanie Akcji wymaga posiadania Broni na poziomie
							1 (lub wyż- szym). W momencie rozpatrywania Akcji
							nie obniża się poziomu Broni o wskazaną wartość.
							Jeśli gracze nie dysponują określonym poziomem
							Broni, nie mogą podjąć takiej Akcji;
						</div>
					</li>
					<li className={styles.li}>
						<div className={styles.listItemImg}>
							<ResizableImage
								src="/UI/icons/wood.webp"
								alt="broń"
							/>
						</div>
						<div className={styles.listItemDescription}>
							wykonanie Akcji wymaga posiadania (i odrzucenia w
							momencie rozpatrywania) 1 przedstawionego surowca;
						</div>
					</li>
					<li className={styles.li}>
						<div className={styles.listItemImg}>
							<ResizableImage
								src="/UI/icons/shovel.webp"
								alt="broń"
							/>
						</div>
						<div className={styles.listItemDescription}>
							wykonanie Akcji wymaga posiadania przedstawionego
							wytworzo- nego Przedmiotu. Przedmiot ten nie jest
							tracony.
						</div>
					</li>
				</ul>
			</section>
		</>
	);
}
