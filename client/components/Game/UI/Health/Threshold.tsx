import styles from "./Health.module.css";
import xMark from "/public/UI/misc/x-mark.png";

import moraleArrowLeftImg from "/public/UI/icons/morale-arrow-left.png";
import React from "react";
import ResizableImage from "../../../ResizableImage/ResizableImage";
import {CHARACTER_CONTROLLER_ACTION} from "@shared/types/CONTROLLER_ACTION";
import {socketEmitter} from "../../../../pages/_app";

interface Props {
    id: number;
    thresholdAmountForRemoval: number;
    removed: boolean;
}

export default function Threshold(props: Props) {

    let blinkClass =
        props.thresholdAmountForRemoval > 0 && !props.removed ? styles.thresholdMarkedForRemoval : "";

    const handleClick = () => {
        if (props.thresholdAmountForRemoval > 0 && !props.removed) {
            socketEmitter.emitAction(CHARACTER_CONTROLLER_ACTION.REMOVE_HEALTH_THRESHOLD, props.id)
        }
    };


    return (
        <div className={`${styles.arrow} ${blinkClass}`} onClick={handleClick}>
            <ResizableImage src={moraleArrowLeftImg} fill alt="morale" sizes={styles.arrow}/>
            {props.removed && (
                <div className={styles.xMark}>
                    <ResizableImage src={xMark} alt="usunięty próg"/>

                </div>
            )}
        </div>
    );
}
