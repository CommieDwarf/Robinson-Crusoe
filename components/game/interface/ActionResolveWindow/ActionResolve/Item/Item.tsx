// @flow
import * as React from "react";
import {
  IResolvableItemRenderData,
  RESOLVE_ITEM_STATUS,
} from "../../../../../../interfaces/ActionService/ActionStatus";

import styles from "./Item.module.css";
import EventCard from "../../../threat/Card";
import { IEventCardRenderData } from "../../../../../../interfaces/Threat/EventCard";
import Invention from "../../../inventions/Invention/Invention";
import { IInventionRenderData } from "../../../../../../interfaces/Inventions/Invention";
import Structure from "../../../structures/Structure/Structure";
import { IStructureRenderData } from "../../../../../../interfaces/Structures/Structure";
import Tile from "../../../map/Tile/Tile";
import { ITileRenderData } from "../../../../../../interfaces/Tiles/Tile";
import RestArrange from "../../../additionalActivities/RestArrange/RestArrange";
import {
  IActionSlots,
  IActionSlotsServiceRenderData,
} from "../../../../../../interfaces/ActionSlots";

type Props = {
  status: RESOLVE_ITEM_STATUS;
  item: IResolvableItemRenderData;
  actionSlots: IActionSlots;
};
export const Item = (props: Props) => {
  let item;
  const droppableId = props.item.droppableId;

  if (droppableId.includes("threat")) {
    item = <EventCard card={props.item.type as IEventCardRenderData} />;
  } else if (droppableId.includes("hunt")) {
    /// beast
  } else if (droppableId.includes("invention")) {
    item = (
      <Invention
        invention={props.item.type as IInventionRenderData}
        column={0}
        row={0}
        top={0}
        actionSlots={props.actionSlots}
        zIndex={""}
      />
    );
  } else if (droppableId.includes("structure")) {
    item = (
      <Structure
        structure={props.item.type as IStructureRenderData}
        actionSlots={props.actionSlots}
      />
    );
  } else if (
    droppableId.includes("gather") ||
    droppableId.includes("explore")
  ) {
    item = (
      <Tile
        tile={props.item.type as ITileRenderData}
        contentScale={100}
        actionSlots={props.actionSlots}
        isDragDisabled={true}
        zIndex={""}
        camp={false}
      />
    );
  } else if (
    droppableId.includes("rest") ||
    droppableId.includes("arrangeCamp")
  ) {
  }
  return <div className={styles.container}>{item}</div>;
};
