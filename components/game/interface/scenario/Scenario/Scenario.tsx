import styles from "./Scenario.module.css";

import React, { useEffect, useState } from "react";

import Castaways from "./Scenarios/Castaways/Castaways";

export default function Scenario() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Castaways />
      </div>
    </div>
  );
}
