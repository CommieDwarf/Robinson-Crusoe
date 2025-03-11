import React from "react";
import styles from "./Morale.module.css";
import MoraleBar from "./MoraleBar/MoraleBar";
import moraleArrowLeftImg from "/public/UI/icons/morale-arrow-left.webp";
import moraleArrowRightImg from "/public/UI/icons/morale-arrow-right.webp";
import DynamicImage from "../../../DynamicImage/DynamicImage";
import { useAppSelector } from "../../../../store/hooks";
import { selectGame } from "../../../../reduxSlices/gameSession";
import { MoraleBar3 } from "./MoraleBar/MoraleBar3";

function Morale() {
	const moraleBars = [];
	const currentMorale = useAppSelector(
		(state) => selectGame(state)!.moraleService.lvl
	);

	for (let i = -3; i <= 3; i++) {
		moraleBars.push(
		);
	}

	return (
		<div className={styles.container}>
			<div className={`${styles.arrowBar} ${styles.leftArrowBar}`}>
				<div className={styles.arrowImg}>
					<DynamicImage
						src={moraleArrowLeftImg}
						fill
						sizes={styles.arrow}
						alt={"spadek morali"}
					/>
				</div>
			</div>
			<div className={`${styles.arrowBar} ${styles.rightArrowBar}`}>
				<div className={styles.arrowImg}>
					<DynamicImage
						src={moraleArrowRightImg}
						fill
						sizes={styles.arrow}
						alt={"przypływ morali"}
					/>
				</div>
			</div>
			<div className={styles.botBar}>{
				[...[-3, -2, -1, 0, 1, 2].map((lvl) => {
					return 	<MoraleBar current={lvl === currentMorale} value={lvl} key={lvl} />
				
				}),
			<MoraleBar3 current={currentMorale === 3}/>
			]
				
				}</div>
		</div>
	);
}

export default React.memo(Morale);
