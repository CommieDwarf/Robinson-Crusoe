// @flow
import * as React from "react";
import styles from "./ConfirmCampMove.module.css";
import { ITileRenderData } from "../../../../interfaces/TileService/ITile";
import Tile from "../map/Tile/Tile";
import Image from "next/image";

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
          src={"/interface/map/tiles/" + props.currentCamp.tileType.id + ".png"}
          alt={"Obecny obóz"}
          fill
          sizes={styles.tile}
        />
      </div>
      <div className={styles.arrow}>
        <Image
          src={"/interface/weather/red-arrow.png"}
          alt={"strzałka"}
          fill
          sizes={styles.arrow}
        />
      </div>
      <div className={styles.tile}>
        <Image
          src={"/interface/map/tiles/" + props.nextCamp.tileType.id + ".png"}
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
