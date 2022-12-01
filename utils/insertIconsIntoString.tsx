import styles from "../components/game/interface/character/SkillMenu/SkillMenu.module.css";
import Image from "next/image";
import React from "react";

const icons = [
  "determination",
  "heart",
  "reroll",
  "rainCloud",
  "snowCloud",
  "food",
];

export function insertIconsIntoString(string: string) {
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