import ResizableImage from "../../../../DynamicImage/DynamicImage";
import styles from "../Guide.module.css";



export function EventPage() {
    return <>
			<section>
				<div className={styles.flexBlock}>
					<div className={styles.titleImg}>
						<ResizableImage
							src={"/UI/phase/event.webp"}
							alt="event"
						/>
					</div>
					<h2 className={styles.title}>Faza Wydarzenia</h2>
					<div className={styles.titleImg}>
						<ResizableImage
							src={"/UI/phase/event.webp"}
							alt="event"
						/>
					</div>
				</div>
				<p className={styles.p}>
					W tej fazie dobierana jest karta wydarzenia i kładziona na
					polu zagrożenia.
				</p>
			</section>
			<section>
				<div className={styles.flexBlock}>
					<div className={styles.cardExampleImg}>
						<ResizableImage
							src="/UI/guide/event/event-card-example.webp"
							alt="event card example"
						/>
					</div>
					<div className={styles.cardExampleImg2}>
						<ResizableImage
							src={"/UI/guide/event/threat.webp"}
							alt="event"
						/>
					</div>
				</div>
				<ul className={styles.list}>
					<li className={styles.li}>
						<div className={styles.listItemImg}>
							<ResizableImage
								src={"/UI/tokens/adventure/explore.webp"}
								alt="token"
							/>
						</div>
						<span className={styles.listItemDescription}>
							<strong>Ikona przygody</strong> oznacza, że przy
							kolejnej akcji typu odpowiadającemu kolorowi ikony
							zostanie rozpatrzona karta przygody (w tym przypadku
							exploracji).
						</span>
					</li>
					<li className={styles.li}>
						<div className={styles.listItemImg}>
							<ResizableImage
								src={"/UI/scenarios/book.webp"}
								alt="token"
							/>
						</div>
						<span className={styles.listItemDescription}>
							<strong>Ikona księgi</strong> wywołuje efekt
							odpowiedni dla konkretnego scenariusza (opisany w
							karcie scenariusza).
						</span>
					</li>
					<li className={styles.li}>
						<span className={styles.listItemDescription}>
							<strong>Efekt Wydarzenia</strong> wywołuje efekt
							(przeważnie negatywny) przy dobieraniu karty.
						</span>
					</li>
					<li className={styles.li}>
						<span className={styles.listItemDescription}>
							<strong>Akcja Zagrożenia</strong> jest to akcja
							która gracze muszą wykonać, żeby usunąć kartę z pola
							zagrożenia.
						</span>
					</li>
					<li className={styles.li}>
						<span className={styles.listItemDescription}>
							<strong>Efekt Zagrożenia</strong> jest to efekt
							który zostanie wywołany jeśli karta zostanie
							wypchnięta z pól zagrożenia.
						</span>
					</li>
				</ul>
			</section>
			<section>
				<p className={styles.p}>
					Jeśli przy dobieraniu karty wydarzenia, na polu leży już
					karta, nowa karta zajmuje jej miejsce, a ta przesuwana jest
					na pole po lewej i wypycha kartę lężącą na lewym polu. Jeśli
					karta lewego pola zostanie wypchnięta, znika i wywoływany
					jest jej efekt zagrożenia.
				</p>
			</section>
		</>
}