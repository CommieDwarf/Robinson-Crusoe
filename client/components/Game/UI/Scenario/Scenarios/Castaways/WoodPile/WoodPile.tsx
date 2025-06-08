// @flow
import * as React from "react";

import styles from "./WoodPile.module.css";
import fireImg from "/public/UI/scenarios/fire.webp";
import woodImg from "/public/UI/resources/wood.webp";
import DynamicImage from "../../../../../../DynamicImage/DynamicImage";
import { OTHER_CONTROLLER_ACTION } from "@shared/types/CONTROLLER_ACTION";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../../store/hooks";
import { selectGame } from "../../../../../../../reduxSlices/gameSession";
import { socketEmitAction } from "../../../../../../../middleware/socketMiddleware";
import { useTranslation } from "react-i18next";

export const WoodPile = () => {
  const scenarioService = useAppSelector(
    (state) => selectGame(state).scenarioService,
  );

  const dispatch = useAppDispatch();

  function handleButtonClick() {
    dispatch(socketEmitAction(OTHER_CONTROLLER_ACTION.ADD_WOOD_TO_PILE));
  }

  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.frame}>
        <DynamicImage src={"/UI/scenarios/square-frame.webp"} alt="" />
      </div>
      <div className={styles.woodPileLvl}>{scenarioService.woodStashLvl}/5</div>
      <div
        className={`${styles.fire} ${
          !scenarioService.isFireBuilt && styles.fireNotBuilt
        }`}
      >
        <DynamicImage src={fireImg} fill alt={"fire"} />
      </div>
      <div
        className={`${styles.woodStack} ${
          styles["level" + scenarioService.woodStashLvl]
        }`}
      >
        <DynamicImage
          src={`/UI/scenarios/castaways/woodStack${scenarioService.woodStashLvl}.webp`}
          fill
          alt={t("scenario.castaways.woodPile")}
        />
      </div>

      {scenarioService.woodStashLvl < 5 && (
        <div className={styles.wood}>
          <div className={styles.woodAmount}>
            {scenarioService.committedWood}/{scenarioService.woodStashLvl}
            <div className={styles.woodImage}>
              <DynamicImage src={woodImg} fill alt={t("resource.wood")} />
            </div>
          </div>

          {scenarioService.woodStashLvl < 5 && (
            <div
              className={`${styles.woodButton}
							${scenarioService.canAddWood && styles.buttonActive}`}
              onClick={handleButtonClick}
            >
              {t("scenario.castaways.putOnPileButton")}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
