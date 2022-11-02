// @flow
import * as React from "react";
import styles from "./ActionResolve.module.css";
import { Action } from "./Action/Action";

type Props = {};

export const ActionResolve = (props: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Zagrożenie</div>
      <div className={styles.items}>
        <Action />
      </div>
    </div>
  );
};
