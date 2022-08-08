import Image from "next/image";
import React from "react";
import styles from "./Resources.module.css";

import ResourceValues from "./ResourceValues/ResourceValues";
import {
  IResources,
  IResourcesAmount,
} from "../../../../interfaces/Resources/Resources";

interface Props {
  owned: Map<keyof IResourcesAmount, number>;
  future: Map<keyof IResourcesAmount, number>;
}

export default function Resources(props: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <Image
          src="/interface/resources/board.jpg"
          layout="fill"
          alt={"board"}
        />
      </div>
      <div className={styles.leftBar}>
        <Image
          src="/interface/resources/boardVert.jpg"
          layout="fill"
          alt={"board"}
        />
      </div>
      <ResourceValues resources={props.future} type="future" />
      <div className={styles.rightBar}>
        <Image
          src="/interface/resources/boardVert.jpg"
          layout="fill"
          alt={"board"}
        />
      </div>
      <div className={styles.botBar}>
        <Image
          src="/interface/resources/board.jpg"
          layout="fill"
          alt={"board"}
        />
      </div>
      <div className={styles.midBar}>
        <Image
          src="/interface/resources/board.jpg"
          layout="fill"
          alt={"board"}
        />
        <div className={styles.barDecoration}>
          <div className={styles.productionIcon}>
            <Image
              src="/interface/resources/production.png"
              layout="fill"
              alt={"production icon"}
            />
          </div>
        </div>
      </div>
      <ResourceValues resources={props.owned} type={"owned"} />
    </div>
  );
}
