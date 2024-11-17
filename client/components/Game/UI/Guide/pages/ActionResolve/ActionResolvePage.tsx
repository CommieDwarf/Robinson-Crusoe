import { insertIconsIntoText } from "../../../../../../utils/insertIconsIntoText/insertIconsIntoText";
import ResizableImage from "../../../../../ResizableImage/ResizableImage";
import ActionOrder from "../../../ActionOrder/ActionOrder";
import guideStyles from "../../Guide.module.css";
import { ImgListItem } from "../../ImgList.tsx/ImgListItem";
import styles from "./ActionResolvePage.module.css";
export function ActionResolvePage() {
	return (
		<>
			<section>
				<div className={guideStyles.flexBlock}>
					<div className={guideStyles.titleImg}>
						<ResizableImage
							src={"/UI/phase/action.png"}
							alt="action"
						/>
					</div>
					<h2 className={guideStyles.title}>Faza Akcji</h2>
					<div className={guideStyles.titleImg}>
						<ResizableImage
							src={"/UI/phase/action.png"}
							alt="action"
						/>
					</div>
				</div>
				<div className={guideStyles.flexBlock}>
					<h2 className={guideStyles.subTitle}>
						Rozpatrywanie akcji
					</h2>
				</div>
				<p className={guideStyles.p}>
					Gdy już rozdysponujesz wszystkie pionki kliknij ikonę
					kompasu {insertIconsIntoText("$compass$", guideStyles.icon)}
					, aby przejść do rozpatrywania akcji (w przypadku gry
					wieloosobowej gracze muszą wyrazić gotowość).
				</p>
				<div className={styles.actionOrder}>
					<ActionOrder actionOrderContainerRef={undefined} />
				</div>
				<p className={guideStyles.p}>
					Podczas wykonywania akcji wszystkie zdobyte surowce, żetony
					odkryć i karty skarbów umieszczane są w{" "}
					<strong>przyszłych surowcach</strong>.
				</p>
				<p className={guideStyles.p}>
					Po fazie akcji surowce umieszczane są w{" "}
					<strong>posiadanych surowcach</strong> i stają się dostępne
					dla graczy.
				</p>
			</section>
			<section>
				<h2 className={guideStyles.subTitle}>Rzucanie koścmi</h2>
				<p className={guideStyles.p}>
					W akcjach takich jak <strong>exploracja</strong>,{" "}
					<strong>zbieranie surowców</strong> oraz{" "}
					<strong>budowanie</strong> możliwe jest przydzielenie 1
					pionka mniej. W takim przypadku gracz rzuca 3 koścmi, a
					pomyślność akcji jest zależna od wyniku rzutu jednej z nich.
				</p>
				<ul className={guideStyles.list}>
					<li className={guideStyles.li}>
						<div
							className={`${guideStyles.listItemImg} ${guideStyles.diceSide}`}
						>
							<ResizableImage
								src={"/UI/dice/action/explore/success.png"}
								alt="symbol sukcesu"
							/>
						</div>
						<div className={guideStyles.listItemDescription}>
							<strong>Sukces</strong> - Akcja się udała.
						</div>
					</li>
					<ImgListItem
						imgElement={() => (
							<ResizableImage
								src={
									"/UI/dice/action/explore/determination.png"
								}
								alt="kość przygody"
							/>
						)}
						textElement={() => (
							<>
								<strong>Żetony determinacji</strong> - Akcja się
								nie udała. Gracz dostaje 2 żetony determinacji.
							</>
						)}
						borderRadius
					/>
					<ImgListItem
						imgElement={() => (
							<ResizableImage
								src={"/UI/dice/action/explore/mystery.png"}
								alt="kość przygody"
							/>
						)}
						textElement={() => (
							<>
								<strong>Przygoda</strong> - Gracz rozpatruje
								kartę przygody.
							</>
						)}
						borderRadius
					/>
					<ImgListItem
						imgElement={() => (
							<ResizableImage
								src={"/UI/dice/action/explore/hurt.png"}
								alt="kość przygody"
							/>
						)}
						textElement={() => (
							<>
								<strong>Obrażenia</strong> - Gracz otrzymuje
								ranę.
							</>
						)}
						borderRadius
					/>
					<ImgListItem
						imgElement={() => (
							<ResizableImage
								src={"/UI/dice/action/explore/blank.png"}
								alt="symbol sukcesu"
							/>
						)}
						textElement={() => (
							<>
								<strong>Pusto</strong> - Nic się nie dzieje.
							</>
						)}
						borderRadius
					/>
				</ul>
			</section>
		</>
	);
}
