// @flow
import * as React from "react";
import styles from "./Button.module.css";
import Image from "next/image";

import scenarioBackgroundImg from "/public/UI/scenarios/background.png";

export enum BUTTON_PL {
  description = "Opis",
  objective = "Cel",
  mechanics = "Budowa stosu",
}

type Props = {
  buttonText: keyof typeof BUTTON_PL;
  text: string;
  buttonClick: (info: string[]) => void;
  selected: boolean;
};

export const Button = (props: Props) => {
  function handleClick() {
    props.buttonClick([props.buttonText, props.text]);
  }

  const selectedClass = props.selected ? styles.selected : "";

  return (
    <div
      className={`${styles.button} ${
        styles[props.buttonText]
      } ${selectedClass}`}
      onClick={handleClick}
    >
      <div className={styles.background}>
        <Image
          src={scenarioBackgroundImg}
          fill
          alt={"tło"}
          sizes={styles.background}
        />
      </div>
      <span className={`${styles.text} ${styles[props.buttonText]}`}>
        {BUTTON_PL[props.buttonText]}
      </span>
    </div>
  );
};
