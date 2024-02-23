import styles from "./Scenario.module.css";

import React from "react";

import Castaways from "./Scenarios/Castaways/Castaways";
import {IInventionRenderData} from "../../../../interfaces/InventionService/Invention";
import {IScenarioServiceRenderData} from "../../../../interfaces/ScenarioService/ScenarioService";

interface Props {
    inventions: IInventionRenderData[];
    show: boolean;
    zIndex: string;
    round: number;
    scenario: IScenarioServiceRenderData;
    addWoodToStash: () => void;
    contentHeight: number;
}

export default function Scenario(props: Props) {
    const hiddenClass = props.show ? "" : styles.hidden;

    const actionOrderRowHeight = props.contentHeight * 0.05;

    const contentStyle = {
        height: (props.contentHeight + actionOrderRowHeight) + "px",
    }

    console.log(contentStyle)

    return (
        <div className={styles.container + " " + hiddenClass}>
            <div className={styles.content} style={contentStyle}>
                <Castaways
                    inventions={props.inventions}
                    setShow={props.setShow}
                    zIndex={props.zIndex}
                    round={props.round}
                    scenario={props.scenario}
                    addWoodToStash={props.addWoodToStash}
                />
            </div>
        </div>
    );
}
