// @flow
import * as React from "react";
import styles from "./ResolveItems.module.css";
import { IActionServiceRenderData } from "../../../../../interfaces/ActionService/ActionService";
import { Item } from "./Item/Item";
import { IActionSlotsRenderData } from "../../../../../interfaces/ActionSlots";
import capitalizeFirstLetter from "../../../../../utils/capitalizeFirstLetter";

const translateActionPL = {
  threat: "zagrożenie",
  hunt: "polowanie",
  build: "budowanie",
  gather: "zbieranie",
  explore: "exploracja",
  arrangeCamp: "porządkowanie obozu",
  rest: "odpoczynek",
};

type Props = {
  actionService: IActionServiceRenderData;
  actionSlots: IActionSlotsRenderData;
};

export const ResolveItems = (props: Props) => {
  console.log(props.actionService.statuses);
  const items = props.actionService.statuses[
    props.actionService.currentResolve
  ].items.map((item) => {
    return (
      <Item
        status={item.status}
        item={item}
        actionSlots={props.actionSlots}
        key={item.droppableId}
      />
    );
  });

  return (
    <div className={styles.container}>
      <div
        className={
          styles.title + " " + styles[props.actionService.currentResolve]
        }
      >
        {capitalizeFirstLetter(
          translateActionPL[props.actionService.currentResolve]
        )}
      </div>
      <div className={styles.items}>{items}</div>
    </div>
  );
};
