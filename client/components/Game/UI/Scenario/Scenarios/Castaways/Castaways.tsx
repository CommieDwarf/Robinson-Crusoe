import styles from "./Castaways.module.css";
import { ScenarioInfo } from "./ScenarioInfo/ScenarioInfo";
import { WoodPile } from "./WoodPile/WoodPile";
import React, { useLayoutEffect, useRef, useState } from "react";

import bookEffectImg from "/public/UI/scenarios/castaways/book-effect.png";
import totemEffectImg from "/public/UI/scenarios/castaways/totem-effect.png";
import scenarioTokensImg from "/public/UI/scenarios/castaways/tokens.png";
import Rounds from "./Rounds/Rounds";
import { Card } from "../../../CardList/Cards/Card/Card";
import ResizableImage from "../../../../../ResizableImage/ResizableImage";
import { useTranslation } from "react-i18next";
import { capitalize } from "lodash";
import { useAppSelector } from "../../../../../../store/hooks";
import { selectGame } from "../../../../../../reduxSlices/gameSession";

interface Props {
	zIndex: string;
}

export default function Castaways(props: Props) {
	const currentRound = useAppSelector((state) => selectGame(state)?.round);
	const inventionContRef = useRef<HTMLDivElement>(null);


	const { t } = useTranslation();

	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<h2>{capitalize(t("scenario.castaways.name"))}</h2>
			</div>

			<div className={styles.rounds}>
				<Rounds current={currentRound || 1} />
			</div>

			<div className={styles.middleSection}>
				<div className={styles.scenarioInfo}>
					<ScenarioInfo />
				</div>
				<div className={styles.eventEffects}>
					<div
						className={styles.eventEffect + " " + styles.bookEffect}
					>
						<ResizableImage
							src={bookEffectImg}
							fill
							alt={"tokeny"}
							sizes={styles.eventEffect}
						/>
					</div>
					<div className={styles.eventEffect}>
						<ResizableImage
							src={totemEffectImg}
							fill
							alt={"tokeny"}
							sizes={styles.eventEffect}
						/>
					</div>
				</div>
			</div>

			<div className={styles.bottomSection}>
				{/* <div className={styles.bottomSectionBackground}>
					<ResizableImage
						src={"/UI/scenarios/test2.png"}
						alt={"background"}
					/>
				</div> */}

				<div className={styles.tokens}>
					<ResizableImage
						src={scenarioTokensImg}
						fill
						alt={"tokeny"}
						sizes={styles.tokens}
					/>
				</div>
				<div className={styles.woodPileWrapper}>
				
					<div className={styles.woodPile}>
						<WoodPile />
					</div>
				</div>
				<div className={styles.effects}>
					<div className={styles.effect}>
						<ResizableImage src={bookEffectImg} alt=""/>
					</div>
					<div className={styles.effect}>
						<ResizableImage src={totemEffectImg} alt=""/>
					</div>
				</div>
			</div>
		</div>
	);
}
