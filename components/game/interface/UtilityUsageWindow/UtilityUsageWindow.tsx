// @flow
import * as React from "react";
import styles from "./UtilityUsageWindow.module.css";
import { Skills } from "./Skills/Skills";
import { ISkill, SkillPhase } from "../../../../interfaces/SkillService/Skill";
import { useState } from "react";
import { ISkillServiceRenderData } from "../../../../interfaces/SkillService/SkillService";

type Props = {
  skillService: ISkillServiceRenderData;
  determination: number;
  phase: SkillPhase;
};
export const UtilityUsageWindow = (props: Props) => {
  const [selected, setSelected] = useState("");

  function select(name: string) {
    setSelected(name);
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.useButton}>Użyj</div>
      </header>
      <Skills
        skillService={props.skillService}
        phase={props.phase}
        selected={selected}
        select={select}
      />
    </div>
  );
};
