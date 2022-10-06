import Image from "next/image";
import React, {Dispatch, SetStateAction, useState} from "react";

import styles from "./SkillLabel.module.css";
import {ISkill} from "../../../../../interfaces/Characters/Skill";

interface Props {
  skill: ISkill;
  setSkillDescription: Dispatch<SetStateAction<{ skill: ISkill | null; show: boolean }>>;
  selected: boolean;
}

export default function SkillLabel(props: Props) {
  function handleClick() {
    props.setSkillDescription((prev) => {
      if (prev.skill == props.skill && prev.show) {
        return {
          skill: props.skill,
          show: false,
        };
      } else {
        return {
          skill: props.skill,
          show: true,
        };
      }
    });
  }

  const selectedClass = props.selected ? styles.skillNameSelected : "";

  return (
      <div className={styles.container + " " + selectedClass} onClick={handleClick}>
        <span className={styles.skillName}>{props.skill.namePL}</span>
      </div>
  );
}
