import * as React from "react";
import styles from "./Background.module.css";

interface Props {
    columnStart: number;
    columnEnd: number;
    rowStart: number;
    rowEnd: number;
}

export const Background = (props: Props) => {


    return <div className={styles.container} style={{
        gridColumn: `${props.columnStart} /  ${props.columnEnd}`,
        gridRow: `${props.rowStart} / ${props.rowEnd}`,
    }}></div>
}
