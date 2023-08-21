import styles from "./Scenario.module.css";

import React from "react";

import Castaways from "./Scenarios/Castaways/Castaways";
import {IInventionRenderData} from "../../../../../interfaces/InventionService/Invention";
import {IScenarioServiceRenderData} from "../../../../../interfaces/ScenarioService/ScenarioService";

interface Props {
    inventions: IInventionRenderData[];
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    zIndex: string;
    round: number;
    scenario: IScenarioServiceRenderData;
    addWoodToStash: () => void;

}

export default function Scenario(props: Props) {
    const hiddenClass = props.show ? "" : styles.hidden;

    return (
        <div className={styles.container + " " + hiddenClass}>
            <div className={styles.content}>
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
