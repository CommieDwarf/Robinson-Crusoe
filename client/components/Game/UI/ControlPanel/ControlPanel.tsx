import styles from "./ControlPanel.module.css";
import {Alerts} from "../Alerts/Alerts";
import {NextPhaseButton} from "../NextPhaseButton/NextPhaseButton";
import React from "react";
import {BackButton} from "../../../BackButton/BackButton";
import {ViewPlayersButton} from "./ViewPlayersButton/ViewPlayersButton";
import ResizableImage from "../../../ResizableImage/ResizableImage";
import starImg from "/public/UI/icons/star.png";
import {PlayerReadiness} from "./PlayerReadiness/PlayerReadiness";
import {useAppSelector} from "../../../../store/hooks";
import {selectGame} from "../../../../reduxSlices/gameSession";

interface Props {
    phaseChangeLocked: boolean,
    confirmWindowIsOpen: boolean;
    togglePlayerListOpen: () => void;
}


export function ControlPanel(props: Props) {
    const isPreAction = useAppSelector(state => selectGame(state)?.phaseService.phase! === "preAction");

    return <div className={styles.container}>
        <div className={styles.backButtonWrapper}>
            <BackButton url={"/"}/>
        </div>
        <div className={styles.viewPlayersButtonWrapper}>
            <ViewPlayersButton onClick={() => {
                props.togglePlayerListOpen();
            }}/>
        </div>

        {isPreAction && <PlayerReadiness/>}
        <NextPhaseButton
            locked={props.phaseChangeLocked || props.confirmWindowIsOpen}
        />
    </div>
}
