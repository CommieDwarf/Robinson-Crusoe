import Image from "next/image";
import React from "react";
import styles from "./Resources.module.css";

import IResources from "../../../../interfaces/Resources/Resources";
import ResourceValues from "./ResourceValues/ResourceValues";

interface Props {
  owned: Map<keyof IResources, number>;
  future: Map<keyof IResources, number>;
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
