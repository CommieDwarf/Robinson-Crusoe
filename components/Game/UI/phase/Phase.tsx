import Image from "next/image";
import React, {useState} from "react";
import styles from "./Phase.module.css";

import PhaseDropDownMenu from "./PhaseDropDownMenu/PhaseDropDownMenu";
import {useTranslation} from "react-i18next";

import triangle from "/public/UI/misc/triangle.png";

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

    function toggleShowMenu() {
        setShowMenu((prev) => {
            return !prev;
        });
    }

    const [t] = useTranslation();

    return (
        <div className={styles.phase}>
            <strong>
                Faza{" "}
                <span className={styles[props.phase]}>{t(`phase.${props.phase}`)}</span>
            </strong>
            <div className={styles.phaseIcon}>
                <Image
                    src={`/UI/phase/${props.phase}.png`}
                    fill
                    alt="phase icon"
                />
            </div>
            <div className={styles.dropDownButton} onClick={toggleShowMenu}>
                 <span className={styles.dropDownText}>
                    Kolejność
                </span>
                <div className={styles.triangle}>
                    <Image src={triangle} alt={""} fill></Image>
                </div>


                {/*<div className={styles.arrowImg}>*/}
                {/*    <Image src={redArrowImg} alt={""} fill></Image>*/}
                {/*</div>*/}
            </div>
            <PhaseDropDownMenu currentPhase={props.phase} show={showMenu}/>
        </div>
    );
}

export default React.memo(Phase)
