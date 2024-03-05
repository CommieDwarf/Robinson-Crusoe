// @flow
import * as React from "react";
import styles from "./Button.module.css";

export enum BUTTON_PL {
    description = "Opis",
    objective = "Cel",
    mechanics = "Budowa stosu",
}

type Props = {
    buttonText: keyof typeof BUTTON_PL;
    text: string;
    buttonClick: (info: string[]) => void;
    selected: boolean;
};

export const Button = (props: Props) => {
    function handleClick() {
        props.buttonClick([props.buttonText, props.text]);
    }

    const selectedClass = props.selected ? styles.selected : "";

    return (
        <div
            className={`${styles.button} ${
                styles[props.buttonText]
            } ${selectedClass}`}
            onClick={handleClick}
        >
            <div className={styles.background}>
                {/*<ResizableImage*/}
                {/*    src={scenarioBackgroundImg}*/}
                {/*    fill*/}
                {/*    alt={"tło"}*/}
                {/*    sizes={styles.background}*/}
                {/*/>*/}
            </div>
            <div className={`${styles.text} ${styles[props.buttonText]}`}>
                {BUTTON_PL[props.buttonText]}
            </div>
        </div>
    );
};
