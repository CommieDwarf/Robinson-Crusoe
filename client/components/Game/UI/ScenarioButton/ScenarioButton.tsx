import React from "react";
import styles from "./ScenarioButton.module.css";
import {IInventionRenderData} from "@sharedTypes/InventionService/Invention";

import redArrowImg from "/public/UI/misc/red-arrow.png";
import {IScenarioServiceRenderData} from "@sharedTypes/ScenarioService/ScenarioService";
import ResizableImage from "../../../ResizableImage/ResizableImage";
import {objectsEqual} from "@sharedUtils/objectsEqual";

interface Props {
    inventions: IInventionRenderData[];
    zIndex: string;
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    round: number;

    scenario: IScenarioServiceRenderData;
    addWoodToStash: () => void;
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

    return (
        <div className={`${styles.container} ${zIndexClass}`}>
            <div className={styles.button} onClick={handleClick}>
                <div className={styles.arrowWrapper}>
                    <div className={`${styles.arrow} ${rotatedArrowClass}`}>
                        <ResizableImage src={redArrowImg} fill alt="strzałka" sizes={styles.arrow}/>
                    </div>
                </div>
                <div className={styles.label}>
                    Scenariusz: Rozbitkowie - Runda: {props.round}
                </div>
                <div className={styles.arrowWrapper}>
                    <div className={`${styles.arrow} ${rotatedArrowClass}`}>
                        <ResizableImage src={redArrowImg} fill alt="strzałka" sizes={styles.arrow}/>
                    </div>
                </div>
            </div>
            )
        </div>
    );
}


export default React.memo(ScenarioButton, objectsEqual);
