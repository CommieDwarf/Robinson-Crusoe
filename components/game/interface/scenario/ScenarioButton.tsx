import React from "react";
import styles from "./ScenarioButton.module.css";
import Scenario from "./Scenario/Scenario";

export default function ScenarioButton() {
  return (
    <div className={styles.container}>
      <Scenario />
      <div className={styles.button}>
        <div className={styles.triangle}></div>
      </div>
      <div className={styles.label}>
        Scenariusz: Rozbitkowie <br />
        Tura 12
      </div>
    </div>
  );
}
