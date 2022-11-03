// @flow
import * as React from "react";
import styles from "./ResolveItems.module.css";
import {IActionServiceRenderData} from "../../../../../interfaces/ActionService/ActionService";
import Card from "../../threat/Card";
import {IEventCardRenderData} from "../../../../../interfaces/Threat/EventCard";

type Props = {
  actionService: IActionServiceRenderData;
};

export const ResolveItems = (props: Props) => {
  let items = [];

  if (props.actionService.currentResolve === "threat") {
    items = props.actionService.statuses.threat.items;
    items = items.map((item) => {
      return (
          <Card card={item.type as IEventCardRenderData} key={item.droppableId}/>
      );
    });
  }

  console.log(props.actionService);

  return (
      <div className={styles.container}>
        <div className={styles.title}>Zagrożenie</div>
        <div className={styles.items}>{items}</div>
      </div>
  );
};
