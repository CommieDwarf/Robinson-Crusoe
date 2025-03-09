import DynamicImage from "../../../../../DynamicImage/DynamicImage";
import styles from "../../Guide.module.css";

export function BuildPage() {
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
							src={"/UI/actions/build.webp"}
							alt="action"
						/>
					</div>
					<h2 className={styles.subTitle}>Budowanie</h2>
					<div className={styles.titleImg}>
						<DynamicImage
							src={"/UI/actions/build.webp"}
							alt="action"
						/>
					</div>
				</div>
				<ul className={styles.list}>
					<li>Budowa wymaga użycia 1 lub 2 pionków.</li>
					<li>
						Używając tylko 1 pionka, podczas rozpatrywania Akcji,
						gracz będzie musiał rzucić kośćmi Budowy, aby sprawdzić
						czy będzie ona udana, czy otrzyma Rany lub czy spotka go
						Przygoda.
					</li>
					<li>
						Przypisując do Akcji 2 pionki, będzie ona na pewno udana
						i gracz nie będzie musiał wykonywać rzutu żadnymi
						kośćmi.
					</li>
					<li>
						Akcja pozwala zbudować Schronienie, Dach, Palisadę czy
						Broń lub przekształcać Pomysły w Przedmioty.
					</li>
				</ul>
			</section>
			<section>
				<ul className={styles.list}>
					<li className={styles.li}>
						<div className={styles.listItemImg}>
							<DynamicImage
								src={"/UI/constructions/shelter-icon.webp"}
								alt="action"
							/>
						</div>
						<div className={styles.listItemDescription}>
							<strong>Schronienie</strong> <br />W fazie Nocy
							chroni przed otrzymywaniem Ran za spanie pod gołym
							niebem. Schronienie umożliwia budowę Dachu i
							Palisady. Raz zbudowane Schronienie nie może zostać
							utracone (chyba że zasady Scenariusza mówią
							inaczej). Należy zwrócić uwagę na to, że niektóre
							kafelki Wyspy mogą posiadać naturalne Schronienie.
						</div>
					</li>
					<li className={styles.li}>
						<div className={styles.listItemImg}>
							<DynamicImage
								src={"/UI/constructions/roof-icon.webp"}
								alt="action"
							/>
						</div>
						<div className={styles.listItemDescription}>
							<strong>Dach</strong> <br />
							Chroni przed warunkami atmosferycznymi podczas fazy
							Pogody. Aby budować Dach, trzeba najpierw posiadać
							Schronienie – musi być ono albo wybudowane, albo
							Obóz graczy musi znajdować się na kafelku Wyspy z
							naturalnym Schronieniem.
						</div>
					</li>
					<li className={styles.li}>
						<div className={styles.listItemImg}>
							<DynamicImage
								src={"/UI/constructions/palisade-icon.webp"}
								alt="action"
							/>
						</div>
						<div className={styles.listItemDescription}>
							<strong>Palisada</strong> <br />
							Chroni przed skutkami Sztormu i innymi efektami w
							trakcie gry (np. atakami dzikich zwierząt). Aby
							budować Palisadę, trzeba najpierw posiadać
							Schronienie – musi być ono albo wybudowane, albo
							Obóz graczy musi znajdować się na kafelku Wyspy z
							naturalnym Schronieniem.
						</div>
					</li>
					<li className={styles.li}>
						<div className={styles.listItemImg}>
							<DynamicImage
								src={"/UI/constructions/weapon-icon.webp"}
								alt="action"
							/>
						</div>
						<div className={styles.listItemDescription}>
							<strong>Broń</strong> <br />
							Potrzebna głównie podczas Polowania. Im wyższy
							poziom Broni, tym mniejsze prawdopodobieństwo, że
							gracz otrzyma Rany podczas Walki z Bestią.
						</div>
					</li>
					<li className={styles.li}>
						<div className={styles.listItemImg}>
							<div style={{ aspectRatio: 0.7 }}>
								<DynamicImage
									src={"/UI/inventions/normal/moat.webp"}
									alt="action"
								/>
							</div>
						</div>
						<div className={styles.listItemDescription}>
							<strong>Przedmioty</strong> <br />
							Wytworzenie niektórych Przedmiotów zazwyczaj
							przynosi dodat- kowy efekt, który może okazać się
							dla graczy bardzo przydatny (np. „Mapa” zapewnia
							dodatkowy pionek do wykorzystania podczas Akcji
							Eksploracji).
						</div>
					</li>
				</ul>
				<p>
					W przypadku konstrukcji (schronienia, dachu i palisady)
					możesz zmieniać rodzaj surowca którego chcesz użyć.
				</p>
				<div className={styles.flexBlock}>
					<div className={styles.exampleGif}>
						<DynamicImage
							src={"/UI/guide/pawn-assignment-build.gif"}
							alt="przydzielanie pionka"
						/>
					</div>
				</div>
			</section>
		</>
	);
}
