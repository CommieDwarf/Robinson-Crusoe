import { insertIconsIntoText } from "../../../../../utils/insertIconsIntoText/insertIconsIntoText";
import ResizableImage from "../../../../ResizableImage/ResizableImage";
import { insertIcon } from "../Guide";
import styles from "../Guide.module.css";

export function ClickNextPhaseSection() {
	return (
		<section>
			<p className={styles.p}>
				Kliknij w kompas {insertIcon("$compass$")}w prawym dolnym rogu aby przejść do kolejnej
				fazy.
			</p>

		</section>
	);
}
