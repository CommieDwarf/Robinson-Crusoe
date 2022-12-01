// @flow
import * as React from "react";
import styles from "./RollDiceButton.module.css";
import Image from "next/image";
import { useState } from "react";

type Props = {
  rollWeatherDices: () => void;
};
export const RollDiceButton = (props: Props) => {
  const [clicked, setClicked] = useState(false);

  function handleClick() {
    if (!clicked) {
      props.rollWeatherDices();
      setClicked(true);
    }
  }

  const clickedClass = clicked ? styles.clicked : styles.notClicked;

  return (
    <div
      className={styles.container + " " + clickedClass}
      onClick={handleClick}
    >
      <Image
        className={"dices"}
        src={"/interface/weather/dices.png"}
        layout={"fill"}
        alt={"losuj"}
      />
      <span className={styles.roll}>Losuj!</span>
    </div>
  );
};
