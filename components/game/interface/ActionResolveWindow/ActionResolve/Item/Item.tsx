// @flow
import * as React from "react";
import { RESOLVE_ITEM_STATUS } from "../../../../../../interfaces/ActionService/IActionResolvableService";

import styles from "./Item.module.css";
import { IEventCardRenderData } from "../../../../../../interfaces/Threat/EventCard";
import { IStructure } from "../../../../../../interfaces/Structures/Structure";
import Tile from "../../../map/Tile/Tile";
import { ITileRenderData } from "../../../../../../interfaces/Tiles/Tile";
import { IActionSlotsRenderData } from "../../../../../../interfaces/ActionSlots";
import Image from "next/image";
import { IInventionRenderData } from "../../../../../../interfaces/Inventions/Invention";
import { IBeastRenderData } from "../../../../../../interfaces/Beasts/Beast";
import { IResolvableItemRenderData } from "../../../../../../interfaces/ActionService/IResolvableItem";

type Props = {
  status: RESOLVE_ITEM_STATUS;
  item: IResolvableItemRenderData;
  actionSlots: IActionSlotsRenderData;
};
export const Item = (props: Props) => {
  let image;
  let extraInfoDiv;
  // TODO: make field itemType in item;
  let itemType = "";
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
    itemType = "invention";
    const invention = props.item.content as unknown as IInventionRenderData;
    image = (
      <div className={styles.invention}>
        <Image
          src={`/interface/inventions/${invention.type}/${invention.name}.png`}
          layout="fill"
          alt={invention.name}
        />
      </div>
    );
  } else if (droppableId.includes("structure")) {
    const structure = props.item.content as unknown as IStructure;
    itemType = "structure";
    image = (
      <div className={styles[structure.name] + " " + styles.structure}>
        <Image
          src={`/interface/structures/${structure.name}.png`}
          layout="fill"
          alt={structure.name}
        />
      </div>
    );
    extraInfoDiv = (
      <div className={styles.structureLvl}>
        <span className={styles.currentLvl + " " + styles.lvl}>
          {structure.lvl}
          <span className={styles.lvlSpan}>lvl</span>
        </span>
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
      </div>
    );
  } else if (
    droppableId.includes("gather") ||
    droppableId.includes("explore")
  ) {
    const tile = props.item.content as unknown as ITileRenderData;
    itemType = "tile";
    image = (
      <div className={styles.tile}>
        <Image
          src={`/interface/map/tiles/${tile.id}.png`}
          layout={"fill"}
          alt={"kafelek"}
        />
      </div>
    );
    console.log(tile);
    extraInfoDiv = <div className={styles.gather}></div>;
  } else if (
    droppableId.includes("rest") ||
    droppableId.includes("arrangeCamp")
  ) {
  }

  const lockedButtonClass = styles.locked;

  const imageName = `${props.item.leader.character.name}-${props.item.leader.character.gender}`;
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        {image}
        {extraInfoDiv}
      </div>

      <div className={styles.status + " " + styles[itemType + "Status"]}>
        Sukces!
      </div>
      <div className={`${styles.resolveButton} ${lockedButtonClass}`}>
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
