import Image from "next/image";
import React from "react";
import styles from "./BasicResources.module.css";
import { IResourcesAmount } from "../../../../../../interfaces/Resources/Resources";
import { useTranslation } from "react-i18next";

interface Props {
  resources: Map<keyof IResourcesAmount, number>;
}

export default function BasicResources(props: Props) {
  const resources: JSX.Element[] = [];

  props.resources.forEach((value, key) => {
    resources.push(
      <div className={styles.resource} key={key}>
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
      <div className={styles.resources}> {resources}</div>
    </div>
  );
}
