import React from "react";
import styles from "./SkillMenu.module.css";
import { insertIconsIntoString } from "../../../../../utils/insertIconsIntoString";
import { ISkillRenderData } from "../../../../../interfaces/Skill/Skill";

interface Props {
  skillDescription: {
    skill: ISkillRenderData | null;
    show: boolean;
  };
}

export default function SkillMenu(props: Props) {
  let description;
  let quote;
  if (props.skillDescription.skill) {
    description = insertIconsIntoString(
      props.skillDescription.skill.description
    );
    quote = insertIconsIntoString(props.skillDescription.skill.quote);
  }
  const visibilityClass = props.skillDescription.show
    ? styles.skillDescriptionVisible
    : "";

  return (
    <div className={styles.container + " " + visibilityClass}>
      {props.skillDescription.skill && (
        <>
          <div className={styles.useButton}>Użyj</div>
          <div className={styles.text}>
            <div className={styles.quote}>{quote}</div>
            <div className={styles.description}>{description}</div>
          </div>
        </>
      )}
    </div>
  );
}
