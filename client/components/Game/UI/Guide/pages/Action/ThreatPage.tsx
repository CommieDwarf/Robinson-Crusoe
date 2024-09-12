import ResizableImage from "../../../../../ResizableImage/ResizableImage";
import styles from "../../Guide.module.css";

export function ThreatPage() {
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
							src={"/UI/actions/threat.png"}
							alt="action"
						/>
					</div>
					<h2 className={styles.subTitle}>Zagrożenie</h2>
					<div className={styles.titleImg}>
						<ResizableImage
							src={"/UI/actions/threat.png"}
							alt="action"
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
								src="/UI/characters/pawns/helper.png"
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
								src="/UI/icons/weapon.png"
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
								src="/UI/icons/wood.png"
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
								src="/UI/icons/shovel.png"
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
