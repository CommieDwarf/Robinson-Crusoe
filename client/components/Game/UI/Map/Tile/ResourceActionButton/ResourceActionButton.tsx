// @flow
import * as React from "react";
import styles from "./ResourceActionButton.module.css";
import circleImg from "/public/UI/misc/red-circle-2.png";
import ResizableImage from "../../../../../ResizableImage/ResizableImage";

interface Props {
    side: "left" | "right";
    tileID: number;
    triggerResourceAction: (tileID: number, side: "left" | "right") => void;
}

export const ResourceActionButton = (props: Props) => {
    function handleClick() {
        props.triggerResourceAction(props.tileID, props.side);
    }

    return (
        <div
            className={`${styles.container} ${
                props.side === "right" ? styles.right : styles.left
            }`}
            onClick={handleClick}
        >
            <ResizableImage
                src={circleImg}
                alt={"wyczerp źródło"}
                fill
                sizes={styles.container}
            />
        </div>
    );
};
