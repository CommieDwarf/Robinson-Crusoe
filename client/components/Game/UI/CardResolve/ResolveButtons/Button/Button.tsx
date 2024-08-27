import {CardResolveButtonProp} from "../../CardResolve";
import styles from "./Button.module.css"
import {capitalize} from "lodash";
import * as React from "react";
import {useTranslation} from "react-i18next";


export function Button(props: CardResolveButtonProp) {


    const {t} = useTranslation();

    function handleClick() {
        if (!props.locked) {
            props.triggerEffect();
        }
    }

    const style = {
        backgroundColor: props.color
    }


    return (
        <div
            className={`${styles.container} ${props.locked ? styles.locked : ""}`}
            onClick={handleClick}
            style={style}
        >
            {/*@ts-ignore*/}
            {capitalize(t(`other.${props.label}`))}
        </div>)
}
