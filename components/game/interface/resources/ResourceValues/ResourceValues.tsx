import Image from "next/image";
import React from "react";
import styles from "./ResourceValues.module.css";
import { IResourcesAmount } from "../../../../../interfaces/Resources/Resources";
import { RESOURCE_PL } from "../../../../../interfaces/TRANSLATE_PL/CATEGORIES/RESOURCE_PL";

interface Props {
  resources: Map<keyof IResourcesAmount, number>;
  type: "future" | "owned";
}

export default function ResourceValues(props: Props) {
  const typePL = props.type == "future" ? "Przyszłe" : "Posiadane";

  const resources: JSX.Element[] = [];

  props.resources.forEach((value, key) => {
    resources.push(
      <div className={styles.resource} key={key}>
        <div className={styles.icon}>
          <Image
            src={`/interface/resources/${key}.png`}
            fill
            alt={RESOURCE_PL[key]}
            sizes={styles.icon}
          />
        </div>
        <div className={styles.label}>{RESOURCE_PL[key]}:</div>
        <div className={styles.value}>{value}</div>
      </div>
    );
  });
  return (
    <div className={styles.container}>
      {typePL} surowce
      <br />
      {resources}
    </div>
  );
}
