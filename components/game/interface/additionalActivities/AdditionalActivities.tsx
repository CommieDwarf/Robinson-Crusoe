import React from "react";
import styles from "./AdditionalActivities.module.css";
import RestArrange from "./RestArrange/RestArrange";
import { IPawnRenderData } from "../../../../interfaces/Pawns/Pawn";
import { IAdditionalActivity } from "../../../../interfaces/ArrangeCampService/ArrangeCampService";

interface Props {
  activities: {
    rest: IAdditionalActivity;
    arrangeCamp: IAdditionalActivity;
  };
  actionSlots: Map<string, IPawnRenderData | null>;
  zIndex: string;
}

export default function AdditionalActivities(props: Props) {
  const zIndexClass =
    props.zIndex.includes("rest") || props.zIndex.includes("arrangeCamp")
      ? styles.zIndexIncreased
      : "";

  return (
    <div className={styles.container + " " + zIndexClass}>
      <RestArrange
        activity={props.activities.arrangeCamp}
        actionSlots={props.actionSlots}
      />
      <RestArrange
        activity={props.activities.rest}
        actionSlots={props.actionSlots}
      />
    </div>
  );
}
