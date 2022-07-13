import React from "react";
import styles from "./AdditionalActivities.module.css";
import RestArrange from "./RestArrange/RestArrange";
import AdditionalActivity from "../../../../interfaces/AdditionalActivity";
import Pawn from "../../../../interfaces/Pawn";

interface Props {
  activities: {
    rest: AdditionalActivity;
    arrange: AdditionalActivity;
  };
  actionSlots: Map<string, Pawn | null>;
}

export default function AdditionalActivities(props: Props) {
  return (
    <div className={styles.container}>
      <RestArrange
        activity={props.activities.arrange}
        actionSlots={props.actionSlots}
      />
      <RestArrange
        activity={props.activities.rest}
        actionSlots={props.actionSlots}
      />
    </div>
  );
}
