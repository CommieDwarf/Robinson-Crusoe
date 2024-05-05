import React from "react";
import styles from "./ScenarioButton.module.css";

import redArrowImg from "/public/UI/misc/red-arrow.png";
import ResizableImage from "../../../ResizableImage/ResizableImage";
import {IScenarioServiceRenderData} from "@shared/types/Game/ScenarioService/ScenarioService";
import {IInventionRenderData, INVENTION_TYPE} from "@shared/types/Game/InventionService/Invention";
import {getPropsComparator} from "../../../../utils/getPropsComparator";
import {useTranslation} from "react-i18next";
import {capitalize} from "lodash";
import {useAppSelector} from "../../../../store/hooks";
import {selectGame} from "../../../../reduxSlices/gameSession";

interface Props {
    topLayerElement: string;
    show: boolean;
    toggleShowScenario: () => void;
}

function ScenarioButton(props: Props) {

    const inventions = useAppSelector((state) => {
        return selectGame(state).inventionService.inventions
            .filter((inv) => inv.inventionType === INVENTION_TYPE.SCENARIO)!;
    })

    const currentRound = useAppSelector((state) => {
        return selectGame(state).round!;
    })

    const topLayer = inventions.some((inv) =>
        props.topLayerElement.includes(inv.name)
    )


    function handleClick() {
        props.toggleShowScenario();
    }

    const rotatedArrowClass = props.show ? styles.arrowRotated : "";

    const {t} = useTranslation();
    return (
        <div className={`${styles.container} ${topLayer && styles.zIndexIncreased}`}>
            <div className={styles.button} onClick={handleClick}>
                <div className={styles.arrowWrapper}>
                    <div className={`${styles.arrow} ${rotatedArrowClass}`}>
                        <ResizableImage src={redArrowImg} alt="strzałka"/>
                    </div>
                </div>
                <div className={styles.label}>
                    {`${capitalize(t("other.scenario", {defaultValue: "scenario"}))}:
                     ${capitalize(t("scenario.castaways.name", {defaultValue: "castaways"}))}
                      ${capitalize(t("other.round", {defaultValue: "round"}))}: ${currentRound}`}
                </div>
                <div className={styles.arrowWrapper}>
                    <div className={`${styles.arrow} ${rotatedArrowClass}`}>
                        <ResizableImage src={redArrowImg} alt="strzałka"/>
                    </div>
                </div>
            </div>
            )
        </div>
    );
}


export default React.memo(ScenarioButton, getPropsComparator());
