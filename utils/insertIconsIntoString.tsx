import styles from "../components/Game/UI/character/SkillMenu/SkillMenu.module.css";
import Image from "next/image";
import React from "react";

const icons = [
  "determination",
  "heart",
  "reroll",
  "rain-cloud",
  "snow-cloud",
  "food",
];

export function insertIconsIntoString(string: string) {
  const array = string.split("$");

  return array.map((str, i) => {
    if (icons.includes(str)) {
      return (
        <div className={styles.icon} key={i}>
          <Image
            src={`/UI/icons/${str}.png`}
            fill
            sizes={styles.icon}
            alt={str}
          />
        </div>
      );
    } else {
      return <span key={i}>{str}</span>;
    }
  });
}
