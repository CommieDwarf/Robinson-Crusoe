// @flow
import * as React from "react";
import styles from "./Resources.module.css";
import BasicResources from "./BasicResources/BasicResources";
import { IBasicResourcesAmount } from "../../../../../interfaces/Resources/Resources";
import { AdditionalResources } from "./AdditionalResources/AdditionalResources";

type Props = {
  type: "future" | "owned";
  basic: Map<keyof IBasicResourcesAmount, number>;
  tokenAmount: number;
  treasureAmount: number;
};
export const Resources = (props: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.label}>
        {props.type === "future" ? "Przyszłe" : "Posiadane"}
      </div>
      <BasicResources resources={props.basic} />
      <AdditionalResources
        tokens={props.tokenAmount}
        treasures={props.treasureAmount}
      />
    </div>
  );
};
