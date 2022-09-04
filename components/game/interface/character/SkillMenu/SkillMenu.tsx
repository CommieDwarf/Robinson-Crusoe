import Image from "next/image";
import React from "react";
import styles from "./SkillMenu.module.css";
import { ISkill } from "../../../../../interfaces/Characters/Skill";

interface Props {
  skillDescription: {
    skill: ISkill | null;
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

const icons = [
  "determination",
  "heart",
  "reroll",
  "rainCloud",
  "snowCloud",
  "food",
];

function insertIconsIntoString(string: string) {
  const array = string.split("$");

  return array.map((st) => {
    if (icons.includes(st)) {
      return (
        <div className={styles.icon}>
          <Image
            src={`/interface/characters/icons/${st}.png`}
            layout="fill"
            alt={st}
          />
        </div>
      );
    } else {
      return st;
    }
  });
}
