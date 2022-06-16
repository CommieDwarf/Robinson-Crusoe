import Image from 'next/image';
import React from 'react'
import IResources from '../../../../../interfaces/Resources';
import styles from "./ResourceValues.module.css";


interface Props {
    resources: IResources;
    type: "future" | "owned";
}

type Resource = keyof IResources;

const polishResourceTranslation: {[key: string] : string} = {
    food: "Żywność",
    dryFood: "Suchy prowiant",
    wood: "Drewno",
    leather: "Skóry"
}

export default function ResourceValues(props: Props) {

    const typeInPolish = props.type == "future" ? "Przyszłe" : "Posiadane";

    const resources = [];

    for (const [key, value] of Object.entries(props.resources)) {
        resources.push(
            <div className={styles.resource}>
            <div className={styles.icon}>
              <Image src={`/interface/resources/${key}.png`} layout="fill" />
            </div>
            <div className={styles.label}>{polishResourceTranslation[key]}:</div>
            
            <div className={styles.value}>{props.resources[key as Resource]}</div>
          </div>
        )
    }

  return (
    <div className={styles.container}>
          {typeInPolish} surowce
          <br />
          {resources}
      </div>
  )
}
