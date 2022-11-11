// @flow
import * as React from "react";
import { RESOLVE_ITEM_STATUS } from "../../../../../../interfaces/ActionService/IActionResolvableService";

import styles from "./Item.module.css";
import { IEventCardRenderData } from "../../../../../../interfaces/Threat/EventCard";
import { IStructure } from "../../../../../../interfaces/Structures/Structure";
import { ITileRenderData } from "../../../../../../interfaces/Tiles/Tile";
import { IActionSlotsRenderData } from "../../../../../../interfaces/ActionSlots";
import Image from "next/image";
import { IInventionRenderData } from "../../../../../../interfaces/Inventions/Invention";
import { IBeastRenderData } from "../../../../../../interfaces/Beasts/Beast";
import { IResolvableItemRenderData } from "../../../../../../interfaces/ActionService/IResolvableItem";
import { Action } from "../../../../../../interfaces/Action";

enum ITEM_STATUS_PL {
  SUCCESS = "sukces!",
  FAILURE = "porażka!",
  PENDING = "",
}

type Props = {
  status: RESOLVE_ITEM_STATUS;
  item: IResolvableItemRenderData;
  actionSlots: IActionSlotsRenderData;
  resolveItem: (action: Action, droppableId: string) => void;
};
export const Item = (props: Props) => {
  let image;
  let extraInfoDiv;
  const droppableId = props.item.droppableId;

  if (droppableId.includes("threat")) {
    const card = props.item.content as unknown as IEventCardRenderData;
    image = (
      <div className={styles.threat}>
        <Image
          src={`/interface/events/${card.name}.png`}
          layout="fill"
          alt={card.name}
        />
      </div>
    );
  } else if (droppableId.includes("hunt")) {
    const beast = props.item.content as unknown as IBeastRenderData;
    image = (
      <div className={styles.hunt}>
        <Image
          src={`/interface/beast/${beast.name.en}.png`}
          layout={"fill"}
          alt={beast.name.pl}
        />
      </div>
    );
  } else if (droppableId.includes("invention")) {
    const invention = props.item.content as unknown as IInventionRenderData;
    const reverse =
      invention.isBuilt && invention.type !== "scenario" ? "-reverse" : "";
    image = (
      <div className={styles.invention}>
        <Image
          src={`/interface/inventions/${invention.type}/${invention.name}${reverse}.png`}
          layout="fill"
          alt={invention.name}
        />
      </div>
    );
  } else if (droppableId.includes("structure")) {
    const structure = props.item.content as unknown as IStructure;
    image = (
      <div className={styles[structure.name] + " " + styles.structure}>
        <Image
          src={`/interface/structures/${structure.name}.png`}
          layout="fill"
          alt={structure.name}
        />
      </div>
    );
    const arrowAndNextLvl =
      props.item.status !== RESOLVE_ITEM_STATUS.PENDING ? (
        ""
      ) : (
        <>
          <div className={styles.arrow}>
            <Image
              src={"/interface/actions/red-arrow.png"}
              layout={"fill"}
              alt="lvl"
            />
          </div>
          <span className={styles.nextLvl + " " + styles.lvl}>
            {structure.lvl + 1}
            <span className={styles.lvlSpan}>lvl</span>
          </span>
        </>
      );
    extraInfoDiv = (
      <div className={styles.structureLvl}>
        <span className={styles.currentLvl + " " + styles.lvl}>
          {structure.lvl}
          <span className={styles.lvlSpan}>lvl</span>
        </span>
        {arrowAndNextLvl}
      </div>
    );
  } else if (
    droppableId.includes("gather") ||
    droppableId.includes("explore")
  ) {
    const tile = props.item.content as unknown as ITileRenderData;

    const id = tile.tileType?.id != null ? tile.tileType.id : 11;
    image = (
      <div className={styles.tile}>
        <Image
          src={`/interface/map/tiles/${id}.png`}
          layout={"fill"}
          alt={"kafelek"}
        />
      </div>
    );
    if (props.item.additionalInfo.resource) {
      extraInfoDiv = (
        <div className={styles.gather}>
          <span className={styles.gatherAmount}>1</span>
          <div className={styles.resourceIcon}>
            <Image
              src={`/interface/resources/${
                tile.tileType?.resources[props.item.additionalInfo.resource]
              }.png`}
              layout={"fill"}
              alt={"surowiec"}
            />
          </div>
        </div>
      );
    }
  } else if (
    droppableId.includes("rest") ||
    droppableId.includes("arrangeCamp")
  ) {
    image = (
      <div className={styles.restArrange}>
        <Image
          src={`/interface/actions/${props.item.action}Picture.png`}
          layout={"fill"}
          alt={props.item.action}
        />
      </div>
    );
  }

  function handleClick() {
    if (props.status === RESOLVE_ITEM_STATUS.PENDING) {
      props.resolveItem(props.item.action, props.item.droppableId);
    }
  }

  const lockedButtonClass =
    props.status === RESOLVE_ITEM_STATUS.PENDING
      ? styles.clickableButton
      : styles.locked;
  const imageName = `${props.item.leader.character.name}-${props.item.leader.character.gender}`;
  const itemType = props.item.droppableId.split("-")[0];
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        {image}
        {extraInfoDiv}
      </div>

      <div className={styles.status + " " + styles[itemType + "Status"]}>
        {ITEM_STATUS_PL[props.status]}
      </div>
      <div
        className={`${styles.resolveButton} ${lockedButtonClass}`}
        onClick={handleClick}
      >
        Wykonaj
      </div>
      <div className={styles.character}>
        <Image
          src={`/interface/characters/pawns/${imageName}.png`}
          layout="fill"
          alt="pionek"
        />
      </div>
    </div>
  );
};
