// @flow
import * as React from "react";
import { useState } from "react";
import styles from "./Button.module.css";
import Image from "next/image";

const pl = new Map();
pl.set("woodStash", "Budowa stosu");
pl.set("description", "Opis");
pl.set("objective", "Cel");

type Props = {
  buttonText: string;
  info: string;
  buttonClick: (info: string[]) => void;
  selected: boolean;
};

export const Button = (props: Props) => {
  function handleClick() {
    props.buttonClick([props.buttonText, props.info]);
  }

  const plText = pl.get(props.buttonText);
  if (!plText) {
    throw new Error("Button text translation not found");
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
      <span className={styles.text}> {plText} </span>
    </div>
  );
};
