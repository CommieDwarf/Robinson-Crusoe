// @flow
import * as React from "react";
import styles from "./ConfirmCampMove.module.css";
import redArrowImg from "/public/UI/misc/red-arrow.png";
import ResizableImage from "../../../ResizableImage/ResizableImage";

import {socket} from "../../../../pages/_app";
import {ITileRenderData} from "@shared/types/Game/TileService/ITile";
import {TILE_CONTROLLER_ACTION} from "@shared/types/CONTROLLER_ACTION";

type Props = {
    currentCamp: ITileRenderData;
    nextCamp: ITileRenderData;
    hide: () => void;
};
export const ConfirmCampMove = (props: Props) => {
    function handleConfirmClick() {
        socket.emit(TILE_CONTROLLER_ACTION.MOVE_CAMP, {
            tileId: props.nextCamp.id
        })
        props.hide();
    }

    function handleCancelClick() {
        props.hide();
    }

    return (
        <div className={styles.container}>
            <h3>Czy na pewno chcesz przenieść obóz?</h3>
            <div className={styles.tile}>
                <ResizableImage
                    src={"/UI/Map/tiles/" + props.currentCamp.tileResourceService?.id + ".png"}
                    alt={"Obecny obóz"}
                    fill
                    sizes={styles.tile}
                />
            </div>
            <div className={styles.arrow}>
                <ResizableImage src={redArrowImg} alt={"strzałka"} fill sizes={styles.arrow}/>
            </div>
            <div className={styles.tile}>
                <ResizableImage
                    src={"/UI/Map/tiles/" + props.nextCamp.tileResourceService?.id + ".png"}
                    alt={"Przyszły obóz"}
                    fill
                    sizes={styles.tile}
                />
            </div>
            <div className={styles.buttons}>
                <div
                    className={styles.button + " " + styles.accept}
                    onClick={handleConfirmClick}
                >
                    Przenieś
                </div>
                <div
                    className={styles.button + " " + styles.cancel}
                    onClick={handleCancelClick}
                >
                    Anuluj
                </div>
            </div>
        </div>
    );
};
