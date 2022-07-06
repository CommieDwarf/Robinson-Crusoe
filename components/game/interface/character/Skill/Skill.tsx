import Image from "next/image";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Skill as ISkill } from "../../../../../server/characters";

import styles from "./Skill.module.css";

interface Props {
  skill: ISkill;
  setSkillDescription: Dispatch<
    SetStateAction<{ skill: ISkill | null; show: boolean }>
  >;
}

export default function Skill(props: Props) {
  function handleClick() {
    props.setSkillDescription((prev) => {
      if (prev.skill == props.skill && prev.show == true) {
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

  return (
    <div className={styles.container} onClick={handleClick}>
      <span className={styles.skillName}>
        {props.skill.name}
      </span>
    </div>
  );
}
