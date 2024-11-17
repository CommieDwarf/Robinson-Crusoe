import styles from "./Expendable.module.css"
import React from "react";
import {insertIconsIntoText} from "../../../../../../../utils/insertIconsIntoText/insertIconsIntoText";
import {PersonalResourceIcon} from "./PersonalResourceIcon/PersonalResourceIcon";

interface Props {
    type: "weapon" | "determination" | "wood";
    value: number | null | string;
}


export function Expendable(props: Props) {
    return <div className={styles.container}>
        {props.value !== null && <div className={`${styles.value} ${styles[props.type + "Value"]}`}>{props.value}</div>}
        <div className={`${styles.iconWrapper} ${styles[props.type + "Icon"]}`}>
            {props.type === "wood" ?
                <div className={styles.icon}>
                    <PersonalResourceIcon type={"wood"}/>
                </div>
                : insertIconsIntoText(`$${props.type}$`, styles.icon)}
        </div>
    </div>
}
