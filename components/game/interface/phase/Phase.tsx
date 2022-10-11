import Image from "next/image";
import React, { useState } from "react";
import styles from "./Phase.module.css";

import PhaseDropDownMenu from "./PhaseDropDownMenu/PhaseDropDownMenu";

export const polishPhaseConjugation = {
  production: "produkcji",
  night: "nocy",
  action: "akcji",
  event: "wydarzenia",
  morale: "morali",
  weather: "pogody",
};

export type PhaseType =
  | "production"
  | "night"
  | "action"
  | "event"
  | "morale"
  | "weather";

type Props = {
  phase: PhaseType;
};

export default function Phase(props: Props) {
  const [showMenu, setShowMenu] = useState(false);

  function toggleShowMenu() {
    setShowMenu((prev) => {
      return !prev;
    });
  }

  const iconSize = 32;
  return (
    <div className={styles.phase} onClick={toggleShowMenu}>
      <strong>
        Faza{" "}
        <span className={styles[props.phase]}>
          {polishPhaseConjugation[props.phase]}
        </span>
      </strong>
      <div className={styles["phase-icon"]}>
        <Image
          src={"/interface/phase/" + props.phase + ".png"}
          width={iconSize}
          height={iconSize}
          alt="phase icon"
        />
      </div>
      <div className={styles.dropDownButton}>
        <div className={styles.triangle}></div>
      </div>
      <PhaseDropDownMenu currentPhase={props.phase} show={showMenu} />
    </div>
  );
}
