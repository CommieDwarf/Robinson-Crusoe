import {CardResolveButtonProp} from "../../CardResolve";
import styles from "./Button.module.css"
import {capitalize} from "lodash";
import * as React from "react";


export function Button(props: CardResolveButtonProp) {

    function handleClick() {
        if (!props.locked) {
            props.triggerEffect();
        }
    }

    const style = {
        backgroundColor: props.color
    }

    return <div
        className={`${styles.container} ${props.locked ? styles.locked : ""}`}
        onClick={handleClick}
        style={style}
    >
        {capitalize(props.label)}
    </div>
}
