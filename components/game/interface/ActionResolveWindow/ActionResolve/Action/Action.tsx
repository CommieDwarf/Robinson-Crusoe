// @flow
import * as React from "react";
import styles from "./Action.module.css";
import Card from "../../../threat/Card";
import getResolvingAction from "../../../../../../pages/api/getResolvingAction";

type Props = {};

const type = "threat";

export const Action = (props: Props) => {
  console.log(getResolvingAction("threat"));
  return (
    <div className={styles[type]}>
      <div className={styles.items}></div>
    </div>
  );
};
