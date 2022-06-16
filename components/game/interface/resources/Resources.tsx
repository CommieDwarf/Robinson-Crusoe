import Image from "next/image";
import React from "react";
import styles from "./Resources.module.css";


import { AllResources } from "../../../../interfaces/Resources";
import ResourceValues from "./ResourceValues.tsx/ResourceValues";


interface Props {
  allResources: AllResources
}

export default function Resources(props: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <Image src="/interface/resources/board.jpg" layout="fill" />
      </div>
      <div className={styles.leftBar}>
        <Image src="/interface/resources/boardVert.jpg" layout="fill" />
      </div>
      <ResourceValues resources={props.allResources.future} type="future" />
      <div className={styles.rightBar}>
        <Image src="/interface/resources/boardVert.jpg" layout="fill" />
      </div>
      <div className={styles.botBar}>
        <Image src="/interface/resources/board.jpg" layout="fill" />
      </div>
      <div className={styles.midBar}>
        <Image src="/interface/resources/board.jpg" layout="fill" />
        <div className={styles.barDecoration}>
          <div className={styles.productionIcon}>
            <Image src="/interface/resources/production.png" layout="fill" />
          </div>
        </div>
      </div>
      <ResourceValues resources={props.allResources.owned} type={"owned"} />
    </div>
  );
}
