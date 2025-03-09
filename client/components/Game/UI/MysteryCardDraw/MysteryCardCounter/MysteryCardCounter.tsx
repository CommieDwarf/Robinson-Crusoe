// @flow
import * as React from "react";
import styles from "./MysteryCardCounter.module.css";
import DynamicImage from "../../../../DynamicImage/DynamicImage";
import { MysteryCardsAmount } from "@shared/types/Game/MysteryService/MysteryService";

type Props = {
	cardsLeft: MysteryCardsAmount;
};
export const MysteryCardCounter = (props: Props) => {
	return (
		<div className={styles.container}>
			<div className={styles.background}>
				<DynamicImage
					src={"/UI/misc/mystery-background.webp"}
					fill
					sizes={styles.mysteryCountBackground}
					alt={"licznik kart"}
				/>
			</div>
			<div className={styles.counters}>
				{Object.entries(props.cardsLeft).map(([category, amount]) => {
					return (
						<div className={styles.counter} key={category}>
							<div className={styles.categoryImg}>
								<DynamicImage
									src={`/UI/misc/${category}.webp`}
									fill
									alt={"licznik"}
								/>
							</div>
							<div className={styles.count}>{amount}</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};
