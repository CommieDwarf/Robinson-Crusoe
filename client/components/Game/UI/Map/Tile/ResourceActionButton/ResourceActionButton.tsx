// @flow
import * as React from "react";
import styles from "./ResourceActionButton.module.css";
import circleImg from "/public/UI/misc/red-circle-2.png";
import ResizableImage from "../../../../../ResizableImage/ResizableImage";
import {emitAction} from "../../../../../../pages/api/emitAction";
import {TILE_CONTROLLER_ACTION} from "@shared/types/CONTROLLER_ACTION";

interface Props {
    side: "left" | "right";
    tileID: number;
}

export const ResourceActionButton = (props: Props) => {
    function handleClick() {
        emitAction(TILE_CONTROLLER_ACTION.TRIGGER_TILE_RESOURCE_ACTION, {
            tileID: props.tileID,
            side: props.side,
        })
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
