import Image from "next/image";
import React from "react";
import styles from "./ResourceValues.module.css";
import { IResourcesAmount } from "../../../../../interfaces/Resources/Resources";
import { useTranslation } from "react-i18next";
import capitalizeFirstLetter from "../../../../../utils/capitalizeFirstLetter";

interface Props {
  resources: Map<keyof IResourcesAmount, number>;
  type: "future" | "owned";
}

export default function ResourceValues(props: Props) {
  const typePL = props.type == "future" ? "Przyszłe" : "Posiadane";

  const resources: JSX.Element[] = [];

  const [t] = useTranslation();

  props.resources.forEach((value, key) => {
    resources.push(
      <div className={styles.resource} key={key}>
        <div className={styles.label}>
          {capitalizeFirstLetter(t(`resource.${key}`))}:
        </div>
        <div className={styles.icon}>
          <Image
            src={`/UI/resources/${key}.png`}
            fill
            alt={key}
            sizes={styles.icon}
          />
        </div>
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
