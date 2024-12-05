import styles from "./Expendables.module.css";
import {Expendable} from "./Expendable/Expendable/Expendable";
import React from "react";


interface Props {
    determination: number;
    weapon: number;
    wood: boolean;
}

export function Expendables(props: Props) {


    return <div className={`${styles.container} tour-character-expendables`}>
        <Expendable type={"weapon"} value={props.weapon}/>
        <Expendable type={"determination"} value={props.determination}/>
        {props.wood &&
            <Expendable type={"wood"} value={null}/>
        }
    </div>
}
