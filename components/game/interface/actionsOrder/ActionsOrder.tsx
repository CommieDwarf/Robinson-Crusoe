import Image from "next/image";
import React from "react";
import styles from "./ActionsOrder.module.css";
import { actionOrder } from "../../../../constants/actionOrder";

export default function ActionsOrder() {
  let actionIcons: JSX.Element[] = [];

  actionOrder.forEach((action, i) => {
    if (i > 0) {
      actionIcons.push(
        <div className={styles.redArrow} key={i}>
          <Image
            src="/interface/actions/red-arrow.png"
            fill
            alt="strzałka"
            sizes={styles.redArrow}
          />
        </div>
      );
    }

    actionIcons.push(
      <div className={styles.actionIcon} key={i + 100}>
        <Image
          src={"/interface/actions/" + action + ".png"}
          fill
          alt={action}
          sizes={styles.actionIcon}
        />
      </div>
    );
  });

  return (
    <div className={styles.container}>
      <div className={styles.label}>Kolejność akcji</div>
      {actionIcons}
    </div>
  );
}
