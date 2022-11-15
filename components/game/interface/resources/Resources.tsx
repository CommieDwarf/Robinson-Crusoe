import Image from "next/image";
import React from "react";
import styles from "./Resources.module.css";

import ResourceValues from "./ResourceValues/ResourceValues";
import { IResourcesAmount } from "../../../../interfaces/Resources/Resources";

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
          alt={"ramka"}
        />
      </div>
      <div className={styles.leftBar}>
        <Image
          src="/interface/resources/boardVert.jpg"
          layout="fill"
          alt={"ramka"}
        />
      </div>
      <ResourceValues resources={props.future} type="future" />
      <div className={styles.rightBar}>
        <Image
          src="/interface/resources/boardVert.jpg"
          layout="fill"
          alt={"ramka"}
        />
      </div>
      <div className={styles.botBar}>
        <Image src="/interface/resources/board.jpg" layout="fill" alt={"tło"} />
      </div>
      <div className={styles.midBar}>
        <Image
          src="/interface/resources/board.jpg"
          layout="fill"
          alt={"ramka"}
        />
        <div className={styles.barDecoration}>
          <div className={styles.productionIcon}>
            <Image
              src="/interface/resources/production.png"
              layout="fill"
              alt={"ikona produkcji"}
            />
          </div>
        </div>
      </div>
      <ResourceValues resources={props.owned} type={"owned"} />
    </div>
  );
}
