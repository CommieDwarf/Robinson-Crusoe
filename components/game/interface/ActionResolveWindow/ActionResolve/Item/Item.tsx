// @flow
import * as React from "react";
import { RESOLVE_ITEM_STATUS } from "../../../../../../interfaces/ActionService/IActionResolvableService";

import styles from "./Item.module.css";
import { IEventCardRenderData } from "../../../../../../interfaces/Threat/EventCard";
import { IStructure } from "../../../../../../interfaces/Structures/Structure";
import { ITileRenderData } from "../../../../../../interfaces/TileService/ITile";
import { IActionSlotsRenderData } from "../../../../../../interfaces/ActionSlots";
import Image from "next/image";
import { IInventionRenderData } from "../../../../../../interfaces/Inventions/Invention";
import { IBeastRenderData } from "../../../../../../interfaces/Beasts/Beast";
import { IResolvableItemRenderData } from "../../../../../../interfaces/ActionService/IResolvableItem";
import { ITEM_STATUS_PL } from "../../../../../../interfaces/TRANSLATE_PL/CATEGORIES/ITEM_STATUS_PL";

type Props = {
  status: RESOLVE_ITEM_STATUS;
  item: IResolvableItemRenderData;
  actionSlots: IActionSlotsRenderData;
  resolve: (item: IResolvableItemRenderData) => void;
  resolved: boolean | undefined;
  resolveLocked: boolean;
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
          fill
          alt={card.name}
          sizes={styles.threat}
        />
      </div>
    );
  } else if (droppableId.includes("hunt")) {
    const beast = props.item.content as unknown as IBeastRenderData;
    image = (
      <div className={styles.hunt}>
        <Image
          src={`/interface/beast/${beast.name.en}.png`}
          fill
          alt={beast.name.pl}
          sizes={styles.hunt}
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
          fill
          alt={invention.name}
          sizes={styles.invention}
        />
      </div>
    );
  } else if (droppableId.includes("structure")) {
    const structure = props.item.content as unknown as IStructure;
    image = (
      <div className={styles[structure.name] + " " + styles.structure}>
        <Image
          src={`/interface/structures/${structure.name}.png`}
          fill
          alt={structure.name}
          sizes={styles.structure}
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
              fill
              alt="lvl"
              sizes={styles.arrow}
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

    const id =
      tile.tileType?.id != null &&
      (props.resolved || droppableId.includes("gather"))
        ? tile.tileType.id
        : 11;

    image = (
      <div className={styles.tile}>
        <Image
          src={`/interface/map/tiles/${id}.png`}
          fill
          alt={"kafelek"}
          sizes={styles.tile}
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
              fill
              sizes={styles.resourceIcon}
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
          fill
          sizes={styles.restArrange}
          alt={props.item.action}
        />
      </div>
    );
  }

  function handleClick() {
    if (
      props.status === RESOLVE_ITEM_STATUS.PENDING &&
      !props.resolveLocked &&
      !props.resolved
    ) {
      props.resolve(props.item);
    }
  }

  const lockedButtonClass =
    props.status === RESOLVE_ITEM_STATUS.PENDING &&
    !props.resolveLocked &&
    !props.resolved
      ? styles.clickableButton
      : styles.locked;
  const imageName = `${props.item.leader.character.name}-${props.item.leader.character.gender}`;
  const itemType = props.item.droppableId.split("-")[0];
  const statusClass =
    props.status === RESOLVE_ITEM_STATUS.SUCCESS
      ? styles.success
      : styles.failure;
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        {image}
        {extraInfoDiv}
      </div>

      {props.resolved && (
        <div
          className={
            styles.status +
            " " +
            styles[itemType + "Status"] +
            " " +
            statusClass
          }
        >
          {ITEM_STATUS_PL[props.status]}
        </div>
      )}
      <div
        className={`${styles.resolveButton} ${lockedButtonClass}`}
        onClick={handleClick}
      >
        Wykonaj
      </div>
      <div className={styles.character}>
        <Image
          src={`/interface/characters/pawns/${imageName}.png`}
          fill
          alt="pionek"
          sizes={styles.character}
        />
      </div>
    </div>
  );
};
