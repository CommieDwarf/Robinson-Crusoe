// @flow
import * as React from "react";
import styles from "./ResolveItems.module.css";
import { IActionServiceRenderData } from "../../../../../interfaces/ActionService/ActionService";
import Card from "../../threat/Card";
import { IEventCardRenderData } from "../../../../../interfaces/Threat/EventCard";
import {
  IActionSlots,
  IActionSlotsServiceRenderData,
} from "../../../../../interfaces/ActionSlots";
import { Item } from "./Item/Item";
import Image from "next/image";

type Props = {
  actionService: IActionServiceRenderData;
  actionSlots: IActionSlots;
};

export const ResolveItems = (props: Props) => {
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
        Zagrożenie
      </div>
      <div className={styles.items}>{items}</div>
    </div>
  );
};
