import styles from "./ControlPanel.module.css";
import {Alerts} from "../Alerts/Alerts";
import {NextPhaseButton} from "../NextPhaseButton/NextPhaseButton";
import React from "react";
import {BackButton} from "../../../BackButton/BackButton";

interface Props {
    phaseChangeLocked: boolean,
    confirmWindowOpen: boolean;
}


export function ControlPanel(props: Props) {


    return <div className={styles.container}>
        <div className={styles.backButtonWrapper}>
            <BackButton/>
        </div>
        <Alerts/>
        <NextPhaseButton
            locked={props.phaseChangeLocked || props.confirmWindowOpen}
        />
    </div>
}
