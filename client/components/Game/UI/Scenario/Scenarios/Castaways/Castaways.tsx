import styles from "./Castaways.module.css";
import { ScenarioInfo } from "./ScenarioInfo/ScenarioInfo";
import { WoodPile } from "./WoodPile/WoodPile";
import React from "react";
import bookEffectImg from "/public/UI/scenarios/castaways/book-effect.webp";
import totemEffectImg from "/public/UI/scenarios/castaways/totem-effect.webp";
import scenarioTokensImg from "/public/UI/scenarios/castaways/tokens.webp";
import Rounds from "./Rounds/Rounds";
import DynamicImage from "../../../../../DynamicImage/DynamicImage";
import { useTranslation } from "react-i18next";
import { capitalize } from "lodash";
import { useAppSelector } from "../../../../../../store/hooks";
import { selectGame } from "../../../../../../reduxSlices/gameSession";

export default function Castaways() {
  const currentRound = useAppSelector((state) => selectGame(state)?.round);

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
        <div className={styles.effects}>
          <div className={styles.effect}>
            <DynamicImage src={bookEffectImg} fill alt={"tokeny"} />
          </div>
          <div className={styles.eventEffect}>
            <DynamicImage src={totemEffectImg} fill alt={"tokeny"} />
          </div>
        </div>
      </div>

      <div className={styles.bottomSection}>
        <div className={styles.bottomSectionBackground}>
          <DynamicImage src={"/UI/scenarios/test2.webp"} alt={"background"} />
        </div>

        <div className={styles.tokens}>
          <DynamicImage src={scenarioTokensImg} fill alt={"tokeny"} />
        </div>
        <div className={styles.woodPileWrapper}>
          <div className={styles.woodPile}>
            <WoodPile />
          </div>
        </div>
        <div className={styles.effects}>
          <div className={styles.effect}>
            <DynamicImage src={bookEffectImg} alt="" />
          </div>
          <div className={styles.effect}>
            <DynamicImage src={totemEffectImg} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
