// @flow
import * as React from "react";
import styles from "./Description.module.css";
import Image from "next/image";
import { useState } from "react";
import { Button } from "./Button/Button";
import { ScenarioText } from "../../../../../../../../interfaces/ScenarioService/ScenarioService";
import { castaways } from "../../../../../../../../constants/scenarios/castaways";
import Entries from "../../../../../../../../interfaces/Entries";

import yellowPaperImg from "/public/UI/scenarios/yellow-paper.png";
import paperScrollRightImg from "/public/UI/scenarios/paper-scroll-right.png";

type Props = {};

export const Description = (props: Props) => {
  const [extended, setExtended] = useState(false);
  const [currentInfo, setCurrentInfo] = useState([
    "description",
    castaways.text.description,
  ]);
  const [selectedButton, setSelectedButton] = useState("");

  function handleButtonClick(info: string[]) {
    setExtended((prev) => {
      return !(currentInfo[0] === info[0] && prev);
    });

    setCurrentInfo(info);
    setSelectedButton(info[1]);
  }

  function handleRollClick() {
    setExtended((prev) => !prev);
  }

  const buttons: JSX.Element[] = [];

  const textEntries = Object.entries(castaways.text) as Entries<ScenarioText>;

  textEntries.forEach(([key, value], i) => {
    buttons.push(
      <Button
        buttonText={key}
        selected={currentInfo[0] === key && extended}
        text={value}
        buttonClick={handleButtonClick}
        key={i}
      />
    );
  });

  const containerExtendedClass = extended ? styles["containerExtended"] : "";

  return (
    <>
      <div className={styles.menu}>{buttons}</div>
      <div className={styles.container + " " + containerExtendedClass}>
        <div className={styles.paper} onClick={handleRollClick}>
          <Image
            src={yellowPaperImg}
            fill
            alt={"papier"}
            sizes={styles.paper}
          />
        </div>
        <div className={styles.paperRoll} onClick={handleRollClick}>
          <Image
            src={paperScrollRightImg}
            fill
            alt={"papier"}
            sizes={styles.paperRoll}
          />
        </div>
        <div className={styles.text}>{currentInfo[1]}</div>
      </div>
    </>
  );
};
