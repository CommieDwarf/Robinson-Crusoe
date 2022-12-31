// @flow
import * as React from "react";
import styles from "./NightTip.module.css";
import Image from "next/image";
import nightPicImg from "/public/UI/phase/night-pic.png";

type Props = {
  hideNightTip: () => void;
};
export const NightTip = (props: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.closeButton} onClick={props.hideNightTip}>
        X
      </div>
      <header className={styles.header}>
        <span className={styles.title}>Nastała Noc</span>
        <div className={styles.nightPicture}>
          <Image
            src={nightPicImg}
            alt={"noc"}
            fill
            sizes={styles.nightPicture}
          />
        </div>
      </header>
      <div className={styles.tip}>
        <p>
          W tej fazie możesz się leczyć umiejetnościami i żetonami oraz
          przenieść swój obóz.
        </p>
        <p>
          Aby przenieść obóz kliknij na strzałkę. Zbudowane konstrukcje zostaną
          utracone.
        </p>
      </div>
    </div>
  );
};
