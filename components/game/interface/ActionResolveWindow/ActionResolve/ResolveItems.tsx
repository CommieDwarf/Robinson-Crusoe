// @flow
import * as React from "react";
import styles from "./ResolveItems.module.css";
import { IActionServiceRenderData } from "../../../../../interfaces/ActionService/ActionService";
import { Item } from "./Item/Item";
import { IActionSlotsRenderData } from "../../../../../interfaces/ActionSlots";
import capitalizeFirstLetter from "../../../../../utils/capitalizeFirstLetter";
import { Action } from "../../../../../interfaces/Action";

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
  resolveItem: (action: Action, droppableItem: string) => void;
};

export const ResolveItems = (props: Props) => {
  const items = props.actionService.currentResolve.items.map((item) => {
    return (
      <Item
        status={item.status}
        item={item}
        actionSlots={props.actionSlots}
        key={item.droppableId}
        resolveItem={props.resolveItem}
      />
    );
  });

  return (
    <div className={styles.container}>
      <div
        className={
          styles.title + " " + styles[props.actionService.currentResolve.action]
        }
      >
        {capitalizeFirstLetter(
          translateActionPL[props.actionService.currentResolve.action]
        )}
      </div>
      <div className={styles.items}>{items}</div>
    </div>
  );
};
