import Image from "next/image";
import React from "react";
import styles from "./ResourceValues.module.css";
import { IResourcesAmount } from "../../../../../interfaces/Resources/Resources";

interface Props {
  resources: Map<keyof IResourcesAmount, number>;
  type: "future" | "owned";
}

const ResourcePL = {
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
      <div className={styles.resource} key={key}>
        <div className={styles.icon}>
          <Image src={`/interface/resources/${key}.png`} layout="fill" />
        </div>
        <div className={styles.label}>{ResourcePL[key]}:</div>

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
