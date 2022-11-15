import Image from "next/image";
import React, { useState } from "react";
import styles from "./Phase.module.css";

import PhaseDropDownMenu from "./PhaseDropDownMenu/PhaseDropDownMenu";
import { PHASE_CONJUGATION_PL } from "../../../../interfaces/TRANSLATE_PL/CATEGORIES/PHASE_PL";

export type PhaseType =
  | "production"
  | "night"
  | "preAction"
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
          {PHASE_CONJUGATION_PL[props.phase]}
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
