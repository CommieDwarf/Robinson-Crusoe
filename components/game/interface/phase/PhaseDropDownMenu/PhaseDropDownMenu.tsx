import Image from 'next/image';
import React from 'react';
import styles from "./PhaseDropDownMenu.module.css"

import {PhaseType, polishPhaseConjugation } from "../Phase";

interface Props {
  currentPhase: PhaseType;
  show: boolean;
}

export default function PhaseDropDownMenu(props: Props) {

    const phases: PhaseType[] = ["event", "morale", "production", "action", "weather", "night"];

    const phaseElements = phases.map((phase, i) => {
      const currentPhaseClass = props.currentPhase === phase ? styles.currentPhase : "";
        return <div className={styles.phase + " " + currentPhaseClass}>
            <div className={styles.phaseLabel + " " +styles[phase]}>{i + 1}. Faza {polishPhaseConjugation[phase]}</div>
            <div className={styles.phasePicture}>
              <Image src={"/interface/phase/"+phase+"-pic.png"} layout="fill" alt={phase} />
            </div>
        </div>
    })

  const showClass = props.show ? styles.show : styles.hide; 

  return (
    <div className={styles.container + " " + showClass}>
        {phaseElements}
    </div>
  )
}
