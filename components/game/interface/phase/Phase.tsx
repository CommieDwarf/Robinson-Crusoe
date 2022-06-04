import { GetStaticPathsResult } from "next";
import Image from "next/image";
import React from "react";
import styles from "./Phase.module.css";

const phases = {
  production: "produkcji",
  night: "nocy",
  action: "akcji",
  event: "wydarzenia",
  morale: "morali",
  weather: "pogody",
};

type phaseType =
  | "production"
  | "night"
  | "action"
  | "event"
  | "morale"
  | "weather";

type Props = {
  phase: phaseType;
};

export default function Phase(props: Props) {
  const iconSize = 32;
  return (
    <div className={styles.phase}>
      <strong>Faza <span className={styles[props.phase]}>{phases[props.phase]}</span></strong>
      <div className={styles["phase-icon"]}>
        <Image
          src={"/interface/phases/" + props.phase + ".png"}
          width={iconSize}
          height={iconSize}
          alt="phase icon"
        />
      </div>
    </div>
  );
}
