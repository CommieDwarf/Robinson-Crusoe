// @flow
import * as React from "react";
import styles from "./ConfirmCampMove.module.css";
import {ITileRenderData} from "../../../../interfaces/TileService/ITile";
import Image from "next/image";
import redArrowImg from "/public/UI/misc/red-arrow.png";

type Props = {
    currentCamp: ITileRenderData;
    nextCamp: ITileRenderData;
    moveCamp: (tileID: number) => void;
    hide: () => void;
};
export const ConfirmCampMove = (props: Props) => {
    function handleConfirmClick() {
        props.moveCamp(props.nextCamp.id);
        props.hide();
    }

    function handleCancelClick() {
        props.hide();
    }

    return (
        <div className={styles.container}>
            <h3>Czy na pewno chcesz przenieść obóz?</h3>
            <div className={styles.tile}>
                <Image
                    src={"/UI/map/tiles/" + props.currentCamp.tileResourceService?.id + ".png"}
                    alt={"Obecny obóz"}
                    fill
                    sizes={styles.tile}
                />
            </div>
            <div className={styles.arrow}>
                <Image src={redArrowImg} alt={"strzałka"} fill sizes={styles.arrow}/>
            </div>
            <div className={styles.tile}>
                <Image
                    src={"/UI/map/tiles/" + props.nextCamp.tileResourceService?.id + ".png"}
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
