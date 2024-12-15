import styles from "./Scenario.module.css";

import React from "react";

import Castaways from "./Scenarios/Castaways/Castaways";
import { useAppSelector } from "store/hooks";


interface Props {
    zIndex: string;
    contentHeight: number;
}

export default function Scenario(props: Props) {
    const actionOrderRowHeight = props.contentHeight * 0.05;

    const contentStyle = {
        height: (props.contentHeight + actionOrderRowHeight) + "px",
    }

    const hidden = useAppSelector((state) => !state.UITour.UiStates.scenarioOpen) 


    return (
        <div className={`${styles.container} ${hidden && styles.hidden} tour-scenario`}>
            <div className={styles.content} style={contentStyle}>
                <Castaways
                    zIndex={props.zIndex}
                />
            </div>
            <div className={styles.background}>
                
            </div>
        </div>
    );
}
