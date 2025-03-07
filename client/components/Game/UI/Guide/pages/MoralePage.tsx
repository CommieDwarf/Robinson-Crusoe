import { insertIconsIntoText } from "../../../../../utils/insertIconsIntoText/insertIconsIntoText";
import ResizableImage from "../../../../DynamicImage/DynamicImage";
import Morale from "../../Morale/Morale";
import { insertIcon } from "../Guide";
import styles from "../Guide.module.css";
import { ClickNextPhaseSection } from "./ClickNextPhaseSection";




export function MoralePage() {
    return (
        
		<>
        <div className={styles.flexBlock}>
            <div className={`${styles.titleImg} ${styles.moraleIcon}`}>
                <ResizableImage src={"/UI/phase/morale.webp"} alt="event" />
            </div>
            <h2 className={styles.title}>Faza Morali</h2>
            <div className={`${styles.titleImg} ${styles.moraleIcon}`}>
                <ResizableImage src={"/UI/phase/morale.webp"} alt="event" />
            </div>
        </div>
        <section>
            <p className={styles.p}>
                W tej fazie sprawdzany jest poziom morali. Na jego podstawie
                przydzialane/zabierane są żetony determinacji{" "}
                {insertIcon("$determination$")}
                <strong>pierwszemu </strong>{" "}
                {insertIcon("$star$")}
                graczowi.
            </p>
            <p className={styles.p}>Determinacja {insertIcon("$determination")} jest potrzebna do 
                używania umiejętności przez postać.</p>
            <div className={styles.moraleBlock}>
                <Morale />
            </div>
            <ul className={styles.list}>
                <li>Gracz odrzuca/otrzymuje ilość żetonów determinacji ${insertIcon("$determiantion$")} odpowiadającą poziomowi morali</li>
                <li>
                    Jeśli poziom morali{" "}
                    {insertIconsIntoText(
                        "$morale-arrow$",
                        `${styles.icon} ${styles.iconMorale}`
                    )}{" "}
                    jest ujemny, pierwszemu graczowi{" "}
                    {insertIcon("$star$")} są
                    zabierane żetony determinacji.
                </li>
                <li>
                    Jeśli graczowi brakuje żetonów do odrzucenia otrzymuje
                    ranę zgodnie z zasadą{" "}
                    <strong>niespełnionych wymagań</strong> za każdy
                    brakujący żeton.
                </li>
                <li>
                    Jeśli morale wynosi 3, gracz dostaje 3 żetony
                    determinacji{" "}
                    {insertIcon("$determination$")}
                    oraz leczy 1 ranę{" "}
                    {insertIcon("$heart$")} .
                </li>
            </ul>
        </section>
        <section>
            <h2 className={styles.title}>Niespełnione wymagania</h2>
            <p className={styles.p}>
                Jeśli gra każe odrzucić przez gracza jakiś zasób,
                a ten jego nie posiada, otrzymuje ranę za każdy brakujący
                zasób. Np.
            </p>
            <ul className={styles.list}>
                <li>
                    Wymagane jest wybranie 2 zasobów z jedzeniem {insertIcon("$food$")} z kafelków graniczących z obozem po czym zasobe te stają się niedostępne.
                    Na kafelkach w okół obozu istnieje tylko 1 zasób z jedzeniem. Gracze dostają po 1 ranie.
                </li>
            </ul>
            <p className={styles.p}>W przypadku twierdzenia JEŚLI TO MOŻLIWE gracze nie otrzymują rany za brakujące zasoby.
                

            </p>
        </section>
        {<ClickNextPhaseSection/>}
    </>
)
}