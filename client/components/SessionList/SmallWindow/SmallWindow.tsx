import styles from "./SmallWindow.module.css";
import React from "react";
import ResizableImage from "../../ResizableImage/ResizableImage";
import xMarkImg from "public/UI/misc/x-mark.png";


interface Props {
    children: any;
    closeWindow: () => void;
}

export function SmallWindow(props: Props) {


    function handleClickClose() {
        props.closeWindow();
    }

    return <div className={styles.container}>
        {props.children}
        <div className={styles.closeButton} onClick={handleClickClose}>
            <ResizableImage src={xMarkImg} alt={"close"}/>
        </div>
    </div>
}
