// @flow
import * as React from "react";
import styles from "./ResolveItems.module.css";
import { IActionServiceRenderData } from "../../../../../interfaces/ActionService/ActionService";
import { Item } from "./Item/Item";
import { IActionSlotsRenderData } from "../../../../../interfaces/ActionSlots";
import capitalizeFirstLetter from "../../../../../utils/capitalizeFirstLetter";
import { Action } from "../../../../../interfaces/Action";
import { ACTION_PL } from "../../../../../interfaces/TRANSLATE_PL/CATEGORIES/ACTION_PL";
import { ActionRollDiceInfo } from "../../../../../interfaces/RollDice/RollDice";
import { IResolvableItemRenderData } from "../../../../../interfaces/ActionService/IResolvableItem";

type Props = {
  actionService: IActionServiceRenderData;
  actionSlots: IActionSlotsRenderData;
  resolve: (item: IResolvableItemRenderData) => void;
  resolved: Map<string, boolean>;
};

export const ResolveItems = (props: Props) => {
  const items = props.actionService.currentResolve.items.map((item) => {
    return (
      <Item
        status={item.status}
        item={item}
        actionSlots={props.actionSlots}
        key={item.droppableId}
        resolve={props.resolve}
        resolved={props.resolved.get(item.droppableId)}
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
          ACTION_PL[props.actionService.currentResolve.action]
        )}
      </div>
      <div className={styles.items}>{items}</div>
    </div>
  );
};
