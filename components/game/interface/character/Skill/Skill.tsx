import Image from "next/image";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Skill as ISkill } from "../../../../../server/characters";

import styles from "./Skill.module.css";
import ZIndexIncreased from "../../../../../interfaces/ZIndexIncreased";
import sleep from "../../../../../utils/sleep";

interface Props {
  skill: ISkill;
  setSkillDescription: Dispatch<
    SetStateAction<{ skill: ISkill | null; show: boolean }>
  >;
  setZIndex: React.Dispatch<React.SetStateAction<ZIndexIncreased>>;
}

export default function Skill(props: Props) {
  async function handleClick() {
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

    props.setZIndex((prev) => {
      const copy = { ...prev };
      copy.character = !copy.character;
      return copy;
    });
  }

  return (
    <div className={styles.container} onClick={handleClick}>
      <span className={styles.skillName}>{props.skill.name}</span>
    </div>
  );
}
