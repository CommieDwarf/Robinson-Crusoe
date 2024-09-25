import ResizableImage from "../../../../ResizableImage/ResizableImage";
import guideStyles from "../Guide.module.css";

export function NightPage() {
	return (
		<>
			<div className={guideStyles.flexBlock}>
				<div
					className={`${guideStyles.titleImg} ${guideStyles.moraleIcon}`}
				>
					<ResizableImage src={"/UI/phase/night.png"} alt="event" />
				</div>
				<h2 className={guideStyles.title}>Faza Nocy</h2>
				<div
					className={`${guideStyles.titleImg} ${guideStyles.moraleIcon}`}
				>
					<ResizableImage src={"/UI/phase/night.png"} alt="event" />
				</div>
			</div>
				<ul className={guideStyles.list}>
					<li>
						W fazie Nocy każdy gracz musi zjeść posiłek. W tym celu
						należy odrzucić po 1 pożywieniu za każdego gracza. Jeśli
						gracze nie dysponują wystarcza- jącą ilością pożywienia,
						to wspólnie decydują, kto nie będzie jadł. Każdy gracz,
						za którego nie zostanie odrzucone pożywienie, otrzymuje
						2 Rany
					</li>
					<li>
						W fazie Nocy gracze mogą zdecydować o przeniesieniu
						Obozu na sąsiedni kafelek. Od tego wyboru zależy, jakie
						surowce gracze otrzymają w następnej rundzie w fazie
						Produkcji i które kafelki/obszary będą sąsiadujące dla
						celów Zbierania Surowców oraz Eksploracji, itp.
					</li>
					<li>
						Jeśli gracze nie mają wybudowanego Schronienia (i ich
						Obóz nie znaj- duje się na kafelku Wyspy z naturalnym
						Schronieniem), to każdy gracz otrzymuje 1 Ranę za spanie
						pod gołym niebem.
					</li>
					<li>
						Jeśli gracze nie posiadają niepsującego się pożywienia
						albo Przedmiotu („Piwnica”) czy Skarbu („Skrzynie” lub
						„Beczka”), który pozwala na przechowywanie pożywienia,
						to całe pożywienie, pozostałe po fazie Nocy, psuje się i
						jest odrzucane.
					</li>
                    <li>
                        Po fazie nocy umiejetności postaci są odświeżąne i mogą zostać ponownie użyte.
                    </li>
							
				</ul>

				<div className={guideStyles.flexBlock}>
					<div className={guideStyles.exampleGif} style={{height: "250px"}}>
						<ResizableImage 
							src={"/UI/guide/camp-movement.gif"}
							alt="przenoszenie obozu"/>

					</div>
				</div>
		</>
	);
}
