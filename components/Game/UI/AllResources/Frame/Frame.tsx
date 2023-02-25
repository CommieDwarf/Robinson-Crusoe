// @flow
import * as React from "react";
import styles from "./Frame.module.css";
import Image from "next/image";
import boardImg from "/public/UI/misc/board.jpg";
import boardVertImg from "/public/UI/misc/board-vert.jpg";
import productionImg from "/public/UI/phase/production.png";

type Props = {};
export const Frame = (props: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <Image src={boardImg} fill alt={"ramka"} sizes={styles.topBar} />
      </div>
      <div className={styles.leftBar}>
        <Image src={boardVertImg} fill alt={"ramka"} sizes={styles.leftBar} />
      </div>

      <div className={styles.rightBar}>
        <Image src={boardVertImg} fill alt={"ramka"} sizes={styles.rightBar} />
      </div>
      <div className={styles.botBar}>
        <Image src={boardImg} fill alt={"tło"} sizes={styles.botBar} />
      </div>
      <div className={styles.midBar}>
        <Image src={boardImg} fill alt={"ramka"} sizes={styles.midBar} />
        <div className={styles.barDecoration}>
          <div className={styles.productionIcon}>
            <Image
              src={productionImg}
              fill
              alt={"ikona produkcji"}
              sizes={styles.productionIcon}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
