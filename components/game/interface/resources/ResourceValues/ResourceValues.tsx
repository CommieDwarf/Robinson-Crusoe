import Image from "next/image";
import React from "react";
import IResources from "../../../../../interfaces/Resources";
import styles from "./ResourceValues.module.css";
import Entries from "../../../../../interfaces/Entries";

interface Props {
  resources: Map<keyof IResources, number>;
  type: "future" | "owned";
}

type Resource = keyof IResources;

const polishResourceTranslation = {
  food: "Żywność",
  dryFood: "Suchy prowiant",
  wood: "Drewno",
  leather: "Skóry",
};

export default function ResourceValues(props: Props) {
  const typeInPolish = props.type == "future" ? "Przyszłe" : "Posiadane";

  const resources: JSX.Element[] = [];

  let i = 0;

  props.resources.forEach((value, key) => {
    resources.push(
      <div className={styles.resource} key={value}>
        <div className={styles.icon}>
          <Image src={`/interface/resources/${key}.png`} layout="fill" />
        </div>
        <div className={styles.label}>{polishResourceTranslation[key]}:</div>

        <div className={styles.value}>{value}</div>
      </div>
    );
  });
  return (
    <div className={styles.container}>
      {typeInPolish} surowce
      <br />
      {resources}
    </div>
  );
}
