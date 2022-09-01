import React from "react";
import styles from "./AdditionalActivities.module.css";
import RestArrange from "./RestArrange/RestArrange";
import { IPawn, IPawnRenderData } from "../../../../interfaces/Pawns/Pawn";
import { AdditionalActivity } from "../../../../server/Classes/AdditionalActivity/AdditionalActivity";
import { IAdditionalActivity } from "../../../../interfaces/AdditionalActivity";

interface Props {
  activities: {
    rest: IAdditionalActivity;
    arrangeCamp: IAdditionalActivity;
  };
  actionSlots: Map<string, IPawnRenderData | null>;
}

export default function AdditionalActivities(props: Props) {
  return (
    <div className={styles.container}>
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
