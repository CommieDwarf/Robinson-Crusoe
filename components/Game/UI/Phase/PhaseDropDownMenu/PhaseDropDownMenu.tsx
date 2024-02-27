import Image from "next/image";
import React, {useLayoutEffect, useRef, useState} from "react";
import styles from "./PhaseDropDownMenu.module.css";
import {useTranslation} from "react-i18next";

import {PhaseType} from "../Phase";
import ResizableImage from "../../../../ResizableImage/ResizableImage";

interface Props {
    currentPhase: PhaseType;
    show: boolean;
    rowHeight: number;
}

export default function PhaseDropDownMenu(props: Props) {
    const [t] = useTranslation();


    const phases: PhaseType[] = [
        "event",
        "morale",
        "production",
        "action",
        "weather",
        "night",
    ];
    let currentPhase =
        props.currentPhase === "preAction" ? "action" : props.currentPhase;


    const phaseElements = phases.map((phase, i) => {
        const currentPhaseClass = currentPhase === phase ? styles.currentPhase : "";

        const phaseStyle = {
            height: props.rowHeight + "px"
        }
        return (
            <div className={`${styles.phase} ${currentPhaseClass} ${phase === "night" ? styles.last : ""}`} key={i}
                 style={phaseStyle}
            >
                <div className={`${styles.phaseLabel} ${styles[phase]}`}>
                    {i + 1}. Faza {t(`phase.${phase}`)}
                </div>
                <div className={styles.phasePicture}>
                    <ResizableImage
                        src={`/UI/phase/${phase}-pic.png`}
                        alt={phase}
                        fill
                        sizes={styles.phasePicture}
                    />
                </div>
            </div>
        );
    });
    const paddingBottom = 10;
    const rowGap = 5;

    const contentStyle = {
        height: ((props.rowHeight + rowGap) * 6 + paddingBottom) + "px",
    }
    return (
        <div className={styles.container} style={props.show ? contentStyle : {height: 0}}>
            <div className={styles.content} style={contentStyle}>
                {phaseElements}
            </div>
        </div>
    );
}
