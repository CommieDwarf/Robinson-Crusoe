// @flow
import * as React from "react";
import styles from "./Utility.module.css";
import { UtilityUsageWindow } from "../../UtilityUsageWindow/UtilityUsageWindow";
import { ISkillServiceRenderData } from "../../../../../interfaces/SkillService/SkillService";

type Props = {
  skillService: ISkillServiceRenderData;
  determination: number;
  isOpen: boolean;
};
export const Utility = (props: Props) => {
  const openClass = props.isOpen ? styles.open : styles.closed;
  return (
    <div className={styles.container + " " + openClass}>
      <div className={styles.wrapper}>
        <UtilityUsageWindow
          skillService={props.skillService}
          determination={props.determination}
          phase={"weather"}
        />
      </div>
    </div>
  );
};
