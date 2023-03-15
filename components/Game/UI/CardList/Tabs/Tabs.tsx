// @flow
import * as React from "react";
import styles from "./Tabs.module.css";
import { Tab } from "../CardList";

type Props = {
  switchTab: (tab: "inventions" | "treasures") => void;
  currentTab: Tab;
};
export const Tabs = (props: Props) => {
  function handleInventionsClick() {
    props.switchTab("inventions");
  }

  function handleTreasuresClick() {
    props.switchTab("treasures");
  }

  return (
    <div className={styles.container}>
      <div
        className={`${styles.tab} ${
          props.currentTab === "inventions" && styles.selected
        }`}
        onClick={handleInventionsClick}
      >
        Pomysły
      </div>
      <div
        className={`${styles.tab} ${
          props.currentTab === "treasures" && styles.selected
        }`}
        onClick={handleTreasuresClick}
      >
        K. Tajemnic
      </div>
    </div>
  );
};
