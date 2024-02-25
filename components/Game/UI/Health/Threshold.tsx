import styles from "./Health.module.css";
import Image from "next/image";
import xMark from "/public/UI/misc/x-mark.png";

import moraleArrowLeftImg from "/public/UI/icons/morale-arrow-left.png";
import React from "react";
import ResizableImage from "../../../ResizableImage/ResizableImage";

interface Props {
    id: number;
    thresholdAmountForRemoval: number;
    removeThreshold: (threshold: number) => void;
    removed: boolean;
}

export default function Threshold(props: Props) {

    let blinkClass =
        props.thresholdAmountForRemoval > 0 && !props.removed ? styles.thresholdMarkedForRemoval : "";

    const handleClick = () => {
        if (props.thresholdAmountForRemoval > 0 && !props.removed) {
            props.removeThreshold(props.id);
        }
    };


    return (
        <div className={`${styles.arrow} ${blinkClass}`} onClick={handleClick}>
            <ResizableImage src={moraleArrowLeftImg} fill alt="morale" sizes={styles.arrow}/>
            {props.removed && (
                <ResizableImage src={xMark} alt="usunięty próg" sizes={styles.xMark} className={styles.xMark}/>
            )}
        </div>
    );
}
