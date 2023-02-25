// @flow
import * as React from "react";
import styles from "./Resources.module.css";
import BasicResources from "./BasicResources/BasicResources";
import { IResourcesAmount } from "../../../../../interfaces/Resources/Resources";
import { AdditionalResources } from "./AdditionalResources/AdditionalResources";

type Props = {
  type: "future" | "owned";
  resources: Map<keyof IResourcesAmount, number>;
};
export const Resources = (props: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.label}>
        {props.type === "future" ? "Przyszłe" : "Posiadane"}
      </div>
      <BasicResources resources={props.resources} />
      <AdditionalResources tokens={5} treasures={2} />
    </div>
  );
};
