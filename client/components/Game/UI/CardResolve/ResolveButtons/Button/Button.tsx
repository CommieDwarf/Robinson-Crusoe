import {CardResolveButtonProp} from "../../CardResolve";
import styles from "./Button.module.css"
import {capitalize} from "lodash";
import * as React from "react";


export function Button(props: CardResolveButtonProp) {


    return <div
        className={`${styles.container} ${props.locked ? styles.locked : ""}`}
        onClick={props.triggerEffect}
    >
        {capitalize(props.label)}
    </div>
}
