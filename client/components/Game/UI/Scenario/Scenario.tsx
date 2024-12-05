import styles from "./Scenario.module.css";

import React from "react";

import Castaways from "./Scenarios/Castaways/Castaways";


interface Props {
    show: boolean;
    zIndex: string;
    contentHeight: number;
}

export default function Scenario(props: Props) {
    const hiddenClass = props.show ? "" : styles.hidden;

    const actionOrderRowHeight = props.contentHeight * 0.05;

    const contentStyle = {
        height: (props.contentHeight + actionOrderRowHeight) + "px",
    }


    return (
        <div className={`${styles.container} ${hiddenClass} tour-scenario`}>
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
