import styles from "./Health.module.css";
import xMark from "/public/UI/misc/x-mark.png";

import moraleArrowLeftImg from "/public/UI/icons/morale-arrow-left.png";
import React from "react";
import ResizableImage from "../../../ResizableImage/ResizableImage";
import {CHARACTER_CONTROLLER_ACTION} from "@shared/types/CONTROLLER_ACTION";
import {useAppDispatch} from "../../../../store/hooks";
import {socketEmitAction} from "../../../../middleware/socketMiddleware";

interface Props {
    id: number;
    thresholdAmountForRemoval: number;
    removed: boolean;
    vertical?: boolean;
}

export default function Threshold(props: Props) {

    const dispatch = useAppDispatch();

    let blinkClass =
        props.thresholdAmountForRemoval > 0 && !props.removed ? styles.thresholdMarkedForRemoval : "";

    const handleClick = () => {
        if (props.thresholdAmountForRemoval > 0 && !props.removed) {
            dispatch(socketEmitAction(CHARACTER_CONTROLLER_ACTION.REMOVE_HEALTH_THRESHOLD, props.id));
        }
    };


    return (
        <div className={styles.arrowWrapper}>
            <div className={`${styles.arrow} ${blinkClass} ${props.vertical && styles.arrowVertical}`}
                 onClick={handleClick}>
                <ResizableImage src={moraleArrowLeftImg} fill alt="morale" sizes={styles.arrow}/>
                {props.removed && (
                    <div className={styles.xMark}>
                        <ResizableImage src={xMark} alt="usunięty próg"/>
                    </div>
                )}
            </div>
        </div>

    );
}
