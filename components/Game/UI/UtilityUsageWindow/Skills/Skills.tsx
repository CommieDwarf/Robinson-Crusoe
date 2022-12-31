// @flow
import * as React from "react";
import styles from "./Skills.module.css";
import { Skill } from "./Skill/Skill";
import { SkillPhase } from "../../../../../interfaces/SkillService/Skill";
import { ISkillServiceRenderData } from "../../../../../interfaces/SkillService/SkillService";

type Props = {
  skillService: ISkillServiceRenderData;
  phase: SkillPhase;
  selected: string;
  select: (name: string) => void;
};
export const Skills = (props: Props) => {
  const skills = props.skillService.skills.filter((skill) => {
    return skill.phase === props.phase || skill.phase === "all";
  });

  return (
    <div className={styles.container}>
      {skills.map((skill, i) => {
        return (
          <Skill
            skill={skill}
            key={skill.name}
            selected={props.selected === skill.name}
            select={props.select}
          />
        );
      })}
    </div>
  );
};
