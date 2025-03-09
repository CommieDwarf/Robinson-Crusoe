// @flow
import * as React from "react";
import styles from "./Button.module.css";
import {capitalize} from "lodash";
import {useTranslation} from "react-i18next";
import DynamicImage from "components/DynamicImage/DynamicImage";


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

    const {t} = useTranslation();
    return (
        <div
            className={`${styles.button} ${
                styles[props.buttonText]
            } ${props.selected && styles.selected}`}
            onClick={handleClick}
        >
            <div className={styles.frame}>
                <DynamicImage src={"/UI/scenarios/rectangle-frame.webp"} alt={"frame"} />
            </div>
            <div className={`${styles.text}`}>
                {/*@ts-ignore*/}
                <span>{capitalize(t(`other.${props.buttonText}`))}</span>
            </div>
        </div>
    );
};
