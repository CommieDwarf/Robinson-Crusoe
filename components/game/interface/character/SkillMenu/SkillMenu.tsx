import Image from "next/image";
import React from "react";
import { ISkill } from "../../../../../interfaces/Character";
import styles from "./SkillMenu.module.css";

interface Props {
  skillDescription: {
    skill: ISkill | null;
    show: boolean;
  };
}

export default function SkillMenu(props: Props) {
  let description;
  let commentary;
  if (props.skillDescription.skill) {
    description = insertJSXIntoString(props.skillDescription.skill.description);
    commentary = insertJSXIntoString(props.skillDescription.skill.commentary);
  }
  const visibilityClass = props.skillDescription.show
    ? styles.skillDescriptionVisible
    : "";

  return (
    <div className={styles.container + " " + visibilityClass}>
      {props.skillDescription.skill && (
        <>
          <div className={styles.useButton}>Użyj</div>
          <div className={styles.commentary}>{commentary}</div>
          <div className={styles.description}>{description}</div>
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

function insertJSXIntoString(string: string) {
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
    } else if (st === "br") {
      return <br />;
    } else {
      return st;
    }
  });
}
