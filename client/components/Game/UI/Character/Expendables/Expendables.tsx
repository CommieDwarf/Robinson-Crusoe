import styles from "./Expendables.module.css";
import {Expendable} from "./Expendable/Expendable/Expendable";
import ResizableImage from "../../../../ResizableImage/ResizableImage";
import compassImg from "/public/UI/tokens/compass.png";
import React from "react";


interface Props {
    determination: number;
    weapon: number;
}

export function Expendables(props: Props) {


    return <div className={styles.container}>
        <Expendable type={"weapon"} value={props.weapon}/>
        <Expendable type={"determination"} value={props.determination}/>
    </div>
}
