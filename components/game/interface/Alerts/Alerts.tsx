// @flow
import * as React from "react";
import styles from "./Alerts.module.css";

type Props = {
  message: string;
};
export const Alerts = (props: Props) => {
  return (
    <div className={styles.container}>
      <span className={styles.alertMessage}>{props.message}</span>
    </div>
  );
};
