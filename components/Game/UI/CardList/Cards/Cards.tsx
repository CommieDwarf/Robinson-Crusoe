import React from "react";
import styles from "./Cards.module.css";

import Invention from "./Invention/Invention";
import { IInventionRenderData } from "../../../../../interfaces/InventionService/Invention";
import { objectsEqual } from "../../../../../utils/objectsEqual";
import { IMysteryCardRenderData } from "../../../../../interfaces/MysteryService/MysteryCard";
import { Tab } from "../CardList";
import { MysteryCard } from "./MysteryCard/MysteryCard";

interface Props {
  inventions: IInventionRenderData[];
  mysteryCards: IMysteryCardRenderData[];
  tab: Tab;
  isBeingDragged: boolean;
  zIndex: string;
  scrollTop: number;
  toggleZoom: () => void;
}

function Cards(props: Props) {
  let column = -1;
  let row = -1;
  let cards;
  if (props.tab === "inventions") {
    cards = props.inventions.map((card) => {
      column = column == 2 ? 0 : column + 1;
      row = column == 0 ? row + 1 : row;
      return (
        <Invention
          top={props.scrollTop}
          column={column}
          row={row}
          invention={card}
          key={card.name}
          zIndexIncreased={props.zIndex.includes(card.name)}
          toggleZoom={props.toggleZoom}
        />
      );
    });
  } else {
    cards = props.mysteryCards.map((card) => {
      column = column == 2 ? 0 : column + 1;
      row = column == 0 ? row + 1 : row;
      return (
        <MysteryCard
          top={props.scrollTop}
          column={column}
          row={row}
          mysteryCard={card}
          key={card.name}
          zIndexIncreased={props.zIndex.includes(card.name)}
          toggleZoom={props.toggleZoom}
        />
      );
    });
  }

  const contentStyle = {
    height: (row + 1) * 140,
  };

  const zIndexClass =
    props.zIndex.includes("invention") || props.zIndex.includes("mystery")
      ? styles.zIndexIncreased
      : "";

  return (
    <div className={`${styles.container} ${zIndexClass}`} style={contentStyle}>
      {cards}
    </div>
  );
}

// function areEqual(prevProps: Props, nextProps: Props) {
//   const start = Date.now();
//   let equal = objectsEqual(prevProps, nextProps);
//   const end = Date.now();
//   console.log(end - start);
//   return equal;
// }

export default React.memo(Cards, objectsEqual);
