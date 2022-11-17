// @flow
import * as React from "react";
import { useState } from "react";
import styles from "./Button.module.css";
import Image from "next/image";

export enum BUTTON_PL {
  mechanics = "Budowa stosu",
  description = "opis",
  objective = "cel",
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
      className={
        styles.button + " " + styles[props.buttonText] + " " + selectedClass
      }
      onClick={handleClick}
    >
      <div className={styles.background}>
        <Image
          src={"/interface/scenarios/textBackground2.png"}
          layout={"fill"}
          alt={"tło"}
        />
      </div>
      <span className={styles.text + " " + styles[props.buttonText]}>
        {BUTTON_PL[props.buttonText]}
      </span>
    </div>
  );
};
