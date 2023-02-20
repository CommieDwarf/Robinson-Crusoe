// @flow
import * as React from "react";
import styles from "./Utility.module.css";
import { UtilityUsageWindow } from "../../UtilityUsageWindow/UtilityUsageWindow";
import { ISkillRenderData } from "../../../../../interfaces/Skill/Skill";
import { PHASE } from "../../../../../interfaces/PhaseService/Phase";

type Props = {
  skills: ISkillRenderData[];
  determination: number;
  isOpen: boolean;
};
export const Utility = (props: Props) => {
  const openClass = props.isOpen ? styles.open : styles.closed;
  return (
    <div className={styles.container + " " + openClass}>
      <div className={styles.wrapper}>
        <UtilityUsageWindow
          skills={props.skills}
          determination={props.determination}
          phase={PHASE.WEATHER}
        />
      </div>
    </div>
  );
};
