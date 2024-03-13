// @flow
import * as React from "react";
import styles from "./Button.module.css";
import {capitalize} from "lodash";
import {useTranslation} from "react-i18next";


type Props = {
    buttonText: string;
    text: string;
    buttonClick: (info: string) => void;
    selected: boolean;
};

export const Button = (props: Props) => {
    function handleClick() {
        props.buttonClick(props.buttonText);
    }

    const selectedClass = props.selected ? styles.selected : "";
    const {t} = useTranslation();
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
            <div className={`${styles.text}`}>
                {/*@ts-ignore*/}
                <span>{capitalize(t(`other.${props.buttonText}`))}</span>
            </div>
        </div>
    );
};
