// @flow
import * as React from "react";
import styles from "./ScenarioInfo.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "./Button";

type Props = {
  info: Map<string, string>;
};
export const ScenarioInfo = (props: Props) => {
  const [extended, setExtended] = useState(false);
  const [currentInfo, setCurrentInfo] = useState([
    "description",
    props.info.get("description"),
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

  props.info.forEach((value, key) => {
    buttons.push(
      <Button
        buttonText={key}
        selected={currentInfo[0] === key && extended}
        info={value}
        buttonClick={handleButtonClick}
        key={key}
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
            src={"/interface/scenarios/yellowPaper.png"}
            layout={"fill"}
            alt={"papier"}
          />
        </div>
        <div className={styles.paperRoll} onClick={handleRollClick}>
          <Image
            src={"/interface/scenarios/paperScrollRight.png"}
            layout={"fill"}
            alt={"papier"}
          />
        </div>
        <div className={styles.text}>{currentInfo[1]}</div>
      </div>
    </>
  );
};
