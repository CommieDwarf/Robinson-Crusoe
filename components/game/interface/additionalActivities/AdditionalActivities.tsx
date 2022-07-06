import React from "react";
import styles from "./AdditionalActivities.module.css";
import RestArrange from "./RestArrange/RestArrange";

export default function AdditionalActivities() {
  return (
    <div className={styles.container}>
      <RestArrange activity={"arrangeCamp"} />
      <RestArrange activity={"rest"} />
    </div>
  );
}
