import React, {useLayoutEffect, useRef, useState} from "react";
import styles from "./Phase.module.css";

import PhaseDropDownMenu from "./PhaseDropDownMenu/PhaseDropDownMenu";
import {useTranslation} from "react-i18next";

import triangle from "/public/UI/misc/triangle.png";
import ResizableImage from "../../../ResizableImage/ResizableImage";
import capitalize from "@shared/utils/capitalize";

export type PhaseType =
    | "production"
    | "night"
    | "preAction"
    | "action"
    | "event"
    | "morale"
    | "weather";

type Props = {
    phase: PhaseType;
};

function Phase(props: Props) {
    const [showMenu, setShowMenu] = useState(false);

    const [containerHeight, setContainerHeight] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (containerRef.current) setContainerHeight(containerRef.current.offsetHeight);
    }, [])

    function toggleShowMenu() {
        setShowMenu((prev) => {
            return !prev;
        });
    }

    const [t] = useTranslation();

    return (
        <div className={styles.container} ref={containerRef}>
            <strong>

                <span className={styles[props.phase]}>{capitalize(t(`phase.phase`, {
                    phase: props.phase
                }))}
                </span>
            </strong>
            <div className={styles.phaseIcon}>
                <ResizableImage
                    src={`/UI/phase/${props.phase}.png`}
                    fill
                    alt="phase icon"
                />
            </div>
            <div className={styles.dropDownButton} onClick={toggleShowMenu}>
                 <span className={styles.dropDownText}>
                    {t("other.order")}
                </span>
                <div className={styles.triangle}>
                    <ResizableImage src={triangle} alt={""}/>
                </div>


                {/*<div className={styles.arrowImg}>*/}
                {/*    <ResizableImage src={redArrowImg} alt={""} fill></Image>*/}
                {/*</div>*/}
            </div>
            <PhaseDropDownMenu currentPhase={props.phase} show={showMenu} rowHeight={containerHeight}/>
        </div>
    );
}

export default React.memo(Phase)
