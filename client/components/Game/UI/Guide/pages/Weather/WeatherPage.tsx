import { insertIconsIntoText } from "../../../../../../utils/insertIconsIntoText";
import ResizableImage from "../../../../../ResizableImage/ResizableImage";
import guideStyles from "../../Guide.module.css";
import { ImgListItem } from "../../ImgList.tsx/ImgListItem";

export function WeatherPage() {
	return (
		<>
			<div className={guideStyles.flexBlock}>
				<div className={guideStyles.titleImg}>
					<ResizableImage
						src={"/UI/phase/weather.png"}
						alt="action"
					/>
				</div>
				<h2 className={guideStyles.title}>Faza Pogody</h2>
				<div className={guideStyles.titleImg}>
					<ResizableImage
						src={"/UI/phase/weather.png"}
						alt="action"
					/>
				</div>
			</div>
			<section>
				<p className={guideStyles.p}>
					W tej fazie gracze muszą zmierzyć się z warunkami
					atmosferycznymi panującymi na wyspie. Pogoda jest losowana
					poprzez rzut koścmi. Rodzaj rzucanych kości dla każdej rundy
					zaznaczony jest w karcie scenariusza.
				</p>
				<h2 className={guideStyles.subTitle}>Kości pogody</h2>
				<ul className={guideStyles.list}>
					<ImgListItem
						imgElement={() => (
							<ResizableImage
								src={"/UI/dice/weather/rain/rain.png"}
								alt="kość pogody"
							/>
						)}
						textElement={() => (
							<>
								<strong>Kość deszczowa</strong>
							</>
						)}
						borderRadius={true}
					/>
					<ImgListItem
						imgElement={() => (
							<ResizableImage
								src={"/UI/dice/weather/winter/snow.png"}
								alt="kość pogody"
							/>
						)}
						textElement={() => (
							<>
								<strong>Kość śniegowa</strong>
							</>
						)}
						borderRadius={true}
					/>
					<ImgListItem
						imgElement={() => (
							<ResizableImage
								src={"/UI/dice/weather/animals/beast.png"}
								alt="kość wygłodniałych zwierząt"
							/>
						)}
						textElement={() => (
							<>
								<strong>Kość wygłodniałych zwierząt</strong>
							</>
						)}
						borderRadius={true}
					/>
				</ul>
			</section>
			<section>
				<h2 className={guideStyles.subTitle}>Żetony pogody</h2>
				<ul className={guideStyles.list}>
					<li>
						W trakcie trwania gry na polu pogody mogą zostać
						położone 3 rodzaje żetonów.
					</li>
					<li>
						Jeśli na polu pogody istnieje już dany żeton, nic się
						nie dzieje.
					</li>
				</ul>

				<ul className={guideStyles.list}>
					<ImgListItem
						imgElement={() => (
							<ResizableImage
								src="/UI/weather/tokens/rain.png"
								alt="żeton chmury deszczowej"
							/>
						)}
						textElement={() => (
							<><strong>Żeton chmury deszczowej</strong>  - reprezentuje 1 chmure deszczową.</>
						)}
					/>
					<ImgListItem
						imgElement={() => (
							<ResizableImage
								src="/UI/weather/tokens/snow.png"
								alt="żeton chmury zimowej"
							/>
						)}
						textElement={() => (
							<><strong>Żeton chmury zimowej</strong> - reprezentuje 1 chmure śniegową.</>
						)}
					/>
					<ImgListItem
						imgElement={() => (
							<ResizableImage
								src="/UI/weather/tokens/storm.png"
								alt="żeton sztormu"
							/>
						)}
						textElement={() => <><strong>Żeton sztormu</strong> - niszczony jest 1 poziom
						 {insertIconsIntoText("$palisade$", guideStyles.icon)}palisady.</>}
					/>
				</ul>
			</section>

			<section>
				<h2 className={guideStyles.subTitle}>Chmury</h2>
				<p className={guideStyles.p}>
					Na kościach Deszczowej i Zimowej występują 2 rodzaje chmur:
				</p>
				<ul className={guideStyles.list}>
					<ImgListItem
						imgElement={() => (
							<ResizableImage
								src="/UI/weather/rain-cloud.png"
								alt="deszczowa chmura"
							/>
						)}
						textElement={() => <strong>Deszczowa chmura</strong>}
						
					/>
				</ul>
				<ul className={guideStyles.list}>
					<ImgListItem
						imgElement={() => (
							<ResizableImage
								src="/UI/weather/snow-cloud.png"
								alt="śniegowa chmura"
							/>
						)}
						textElement={() => <strong>Śniegowa chmura</strong>}
					/>
				</ul>
			</section>
			<section>
				<h2 className={guideStyles.subTitle}>Rozpatrywanie chmur</h2>
				<ul className={guideStyles.list}>
					<li>
						Sumowana jest liczba zimowych chmur (z kości oraz
						żetonu). Na każdą zimową chmurę odrzucane jest 1
						{insertIconsIntoText("$wood$", guideStyles.icon)}
						drewno (w celu ogrzania się).
					</li>
					<li>
						Sumowana jest liczba wszytkich chmur (z kości oraz
						żetonów) i porównywana z poziomem dachu.
						{insertIconsIntoText("$roof$", guideStyles.icon)}
						Poziom dachu wskazuje ilość chmur przed którymi chroni.
					</li>
					<li>
						Za każdy brakujący poziom dachu odrzucane jest 1
						{insertIconsIntoText("$food$", guideStyles.icon)}{" "}
						jedzenie oraz 1{" "}
						{insertIconsIntoText("$wood$", guideStyles.icon)} drewno
						(w celu ogrzania się i żeby nie zachorować).
					</li>
					<li>
						Za każdy surowiec którego gracze nie mogą odrzucić,
						dostają po 1 ranie.
					</li>
					<li>Żetony pogody są odrzucane.</li>
				</ul>
			</section>
			<section>
				<h2 className={guideStyles.subTitle}>Wygłodniałe zwierzęta</h2>
				<p className={guideStyles.p}>
					Na kości Wygłodniałych zwierząt widnieją następujące efekty
					wpływające na graczy:
				</p>
				<ul className={guideStyles.list}>
					<ImgListItem
						imgElement={() => (
							<ResizableImage
								src="/UI/dice/weather/animals/beast.png"
								alt="bestia"
							/>
						)}
						textElement={() => (
							<>
								Rozpatrywana jest walka z bestią o sile 3.
								(walczy <strong>pierwszy gracz</strong>; poziom
								broni nie spada.){" "}
							</>
						)}
						borderRadius={true}
					/>
					<ImgListItem
						imgElement={() => (
							<ResizableImage
								src="/UI/dice/weather/animals/palisade.png"
								alt="palisada"
							/>
						)}
						textElement={() => (
							<>
								Poziom
								{insertIconsIntoText(
									"$palisade$",
									guideStyles.icon
								)}
								palisady spada o 1.
							</>
						)}
						borderRadius={true}
					/>
					<ImgListItem
						imgElement={() => (
							<ResizableImage
								src="/UI/dice/weather/animals/food.png"
								alt="palisada"
							/>
						)}
						textElement={() => (
							<>
								Gracze odrzucają 1{" "}
								{insertIconsIntoText(
									"$food$",
									guideStyles.icon
								)}{" "}
								jedzenie
							</>
						)}
						borderRadius={true}
					/>
				</ul>
			</section>
		</>
	);
}
