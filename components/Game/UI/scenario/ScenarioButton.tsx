import React from "react";
import styles from "./ScenarioButton.module.css";
import Scenario from "./Scenario/Scenario";
import Image from "next/image";
import {IInventionRenderData} from "../../../../interfaces/InventionService/Invention";

import redArrowImg from "/public/UI/misc/red-arrow.png";
import {arraysEqual} from "../../../../utils/arraysEqual";
import {IScenarioServiceRenderData} from "../../../../interfaces/ScenarioService/ScenarioService";
import {objectsEqual} from "../../../../utils/objectsEqual";

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
            <Scenario
                zIndex={props.zIndex}
                inventions={props.inventions}
                show={props.show}
                setShow={props.setShow}
                round={props.round}
                scenario={props.scenario}
                addWoodToStash={props.addWoodToStash}
            />
            <div className={styles.button} onClick={handleClick}>
                <div className={styles.arrowWrapper}>
                    <div className={`${styles.arrow} ${rotatedArrowClass}`}>
                        <Image src={redArrowImg} fill alt="strzałka" sizes={styles.arrow}/>
                    </div>
                </div>
                <div className={styles.label}>
                    Scenariusz: Rozbitkowie --- Tura: {props.round}
                </div>
                <div className={styles.arrowWrapper}>
                    <div className={`${styles.arrow} ${rotatedArrowClass}`}>
                        <Image src={redArrowImg} fill alt="strzałka" sizes={styles.arrow}/>
                    </div>
                </div>
            </div>
            )
        </div>
    );
}


export default React.memo(ScenarioButton, objectsEqual);
