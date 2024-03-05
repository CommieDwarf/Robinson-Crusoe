// @flow
import * as React from "react";
import styles from "./MoveCampArrow.module.css";
import Image from "next/image";
import {ITileRenderData} from "../../../../../../../interfaces/TileService/ITile";
import redArrowImg from "/public/UI/misc/red-arrow.png";
import ResizableImage from "../../../../../ResizableImage/ResizableImage";

type Props = {
    tile: ITileRenderData;
    campTile: ITileRenderData;
    showCampMoveConfirm: (tile: ITileRenderData) => void;
};
export const MoveCampArrow = (props: Props) => {
    function handleClick() {
        props.showCampMoveConfirm(props.tile);
    }

    return (
        <div
            className={
                styles.container +
                " " +
                styles[getArrowClass(props.tile, props.campTile)]
            }
            onClick={handleClick}
        >
            <ResizableImage src={redArrowImg} alt={"test"} fill sizes={styles.container}/>
        </div>
    );
};

function getArrowClass(tile: ITileRenderData, campTile: ITileRenderData) {
    const leftDiff = tile.position.cords.left - campTile.position.cords.left;
    const topDiff = tile.position.cords.top - campTile.position.cords.top;

    if (topDiff === 0) {
        if (leftDiff < 0) {
            return "left";
        } else {
            return "right";
        }
    }
    if (leftDiff < 0) {
        if (topDiff < 0) {
            return "topLeft";
        } else {
            return "botLeft";
        }
    } else {
        if (topDiff < 0) {
            return "topRight";
        } else {
            return "botRight";
        }
    }
}
