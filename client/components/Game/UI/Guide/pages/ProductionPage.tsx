import ResizableImage from "../../../../ResizableImage/ResizableImage";
import { insertIcon } from "../Guide";
import styles from "../Guide.module.css";
import { ClickNextPhaseSection } from "./ClickNextPhaseSection";

export function ProductionPage() {
	return (
		<>
			<section>
				<h2 className={styles.title}>Faza Produkcji</h2>
				<p className={styles.p}>
					W tej fazie gracze otrzymują surowce które
					znajdują się na kafelku na którym mają obóz.
				</p>
				<div className={styles.flexBlock}>
					<div className={styles.tile}>
						<ResizableImage
							src="/UI/map/tiles/0.png"
							alt="kafelek"
						/>
					</div>
					<p className={styles.p} style={{ width: "50%" }}>
						W tym przypadku gracze otrzymują 1 drewno{" "}
						{insertIcon("$wood$")} oraz 1 jedzenie{" "}
						{insertIcon("$food$")}
					</p>
				</div>
				<p className={styles.p}>Otrzymane surowce umieszczane są w <strong>posiadanych </strong>
                    surowcach i są gotowe do użycia natychmiast.
                </p>
			</section>
		</>
	);
}
