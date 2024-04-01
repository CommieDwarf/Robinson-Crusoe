import styles from "./Expendable.module.css"
import React from "react";
import {insertIconsIntoText} from "../../../../../../../utils/insertIconsIntoText";

interface Props {
    type: "weapon" | "determination";
    value: number;
}


export function Expendable(props: Props) {
    return <div className={styles.container}>
        <div className={styles.value}>{props.value}</div>
        <div className={styles.iconWrapper}>
            {insertIconsIntoText(`$${props.type}$`, styles.icon)}
        </div>
    </div>
}
