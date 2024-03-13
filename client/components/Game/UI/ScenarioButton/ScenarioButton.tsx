import React from "react";
import styles from "./ScenarioButton.module.css";

import redArrowImg from "/public/UI/misc/red-arrow.png";
import ResizableImage from "../../../ResizableImage/ResizableImage";
import {IScenarioServiceRenderData} from "@shared/types/Game/ScenarioService/ScenarioService";
import {IInventionRenderData} from "@shared/types/Game/InventionService/Invention";
import {getPropsComparator} from "../../../../utils/getPropsComparator";
import {useTranslation} from "react-i18next";
import {capitalize} from "lodash";

interface Props {
    inventions: IInventionRenderData[];
    zIndex: string;
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    round: number;

    scenario: IScenarioServiceRenderData;
}

function ScenarioButton(props: Props) {
    const zIndexClass = props.inventions.some((inv) =>
        props.zIndex.includes(inv.name)
    )
        ? styles.zIndexIncreased
        : "";

    function handleClick() {
        props.setShow((prev) => !prev);
    }

    const rotatedArrowClass = props.show ? styles.arrowRotated : "";

    const {t} = useTranslation();
    return (
        <div className={`${styles.container} ${zIndexClass}`}>
            <div className={styles.button} onClick={handleClick}>
                <div className={styles.arrowWrapper}>
                    <div className={`${styles.arrow} ${rotatedArrowClass}`}>
                        <ResizableImage src={redArrowImg} alt="strzałka"/>
                    </div>
                </div>
                <div className={styles.label}>
                    {`${capitalize(t("other.scenario", {defaultValue: "scenario"}))}:
                     ${capitalize(t("scenario.castaways.name", {defaultValue: "castaways"}))}
                      ${capitalize(t("other.round", {defaultValue: "round"}))}: ${props.round}`}
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
