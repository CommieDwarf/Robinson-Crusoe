// @flow
import * as React from "react";
import styles from "./NextPhaseButton.module.css";
import Image from "next/image";

type Props = {
  goNextPhase: () => void;
  locked: boolean;
};
export const NextPhaseButton = (props: Props) => {
  function handleClick() {
    if (props.locked) {
      return;
    }
    props.goNextPhase();
  }

  return (
    <div className={styles.container} onClick={handleClick}>
      <Image
        src={"/interface/compass.png"}
        layout={"fill"}
        alt="następna faza"
      />
    </div>
  );
};
