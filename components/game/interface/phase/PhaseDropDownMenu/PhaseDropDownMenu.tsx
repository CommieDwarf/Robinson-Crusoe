import Image from "next/image";
import React from "react";
import styles from "./PhaseDropDownMenu.module.css";

import { PhaseType } from "../Phase";
import { PHASE_CONJUGATION_PL } from "../../../../../interfaces/TRANSLATE_PL/CATEGORIES/PHASE_PL";

interface Props {
  currentPhase: PhaseType;
  show: boolean;
}

export default function PhaseDropDownMenu(props: Props) {
  const phases: PhaseType[] = [
    "event",
    "morale",
    "production",
    "action",
    "weather",
    "night",
  ];
  let currentPhase =
    props.currentPhase === "preAction" ? "action" : props.currentPhase;

  const phaseElements = phases.map((phase, i) => {
    const currentPhaseClass = currentPhase === phase ? styles.currentPhase : "";
    return (
      <div className={styles.phase + " " + currentPhaseClass} key={i}>
        <div className={styles.phaseLabel + " " + styles[phase]}>
          {i + 1}. Faza {PHASE_CONJUGATION_PL[phase]}
        </div>
        <div className={styles.phasePicture}>
          <Image
            src={"/interface/phase/" + phase + "-pic.png"}
            alt={phase}
            fill
            sizes={styles.phasePicture}
          />
        </div>
      </div>
    );
  });

  const showClass = props.show ? styles.show : styles.hide;

  return (
    <div className={styles.container + " " + showClass}>{phaseElements}</div>
  );
}
