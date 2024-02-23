// @flow
import * as React from "react";
import styles from "./NextPhaseButton.module.css";
import Image from "next/image";
import compassImg from "/public/UI/tokens/compass.png";

type Props = {
    goNextPhase: () => void;
    locked: boolean;
};
export const NextPhaseButton = (props: Props) => {
    function handleClick() {
        if (props.locked) {
            return;
        }
        props.goNextPhase();
    }

    const className = props.locked ? styles.locked : "";

    return (
        <div className={styles.container + " " + className} onClick={handleClick}>
            <div className={styles.token}>
                {/*<Image*/}
                {/*    src={compassImg}*/}
                {/*    fill*/}
                {/*    alt="następna faza"*/}
                {/*    sizes={styles.container}*/}
                {/*/>*/}
            </div>

        </div>
    );
};
