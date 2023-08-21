import React from "react";
import styles from "./Cards.module.css";

import {IInventionRenderData} from "../../../../../interfaces/InventionService/Invention";
import {objectsEqual} from "../../../../../utils/objectsEqual";
import {IMysteryCardRenderData} from "../../../../../interfaces/MysteryService/MysteryCard";
import {Tab} from "../CardList";
import {Card} from "./Card/Card";
import {StorageAction} from "../../../../../interfaces/MysteryService/StorageCard";

interface Props {
    inventions: IInventionRenderData[];
    mysteryCards: IMysteryCardRenderData[];
    tab: Tab;
    isBeingDragged: boolean;
    zIndex: string;
    scrollTop: number;
    toggleZoom: () => void;
    useMysteryCard: (cardName: string) => void;
    useInventionCard: (cardName: string) => void;
    manageStorage: (cardName: string, type: "mystery", action: StorageAction) => void;
}

function Cards(props: Props) {
    const zIndexClass =
        props.zIndex.includes("invention") || props.zIndex.includes("mystery")
            ? styles.zIndexIncreased
            : "";

    let cardsSelected =
        props.tab === "inventions" ? props.inventions : props.mysteryCards;

    let column = -1;
    let row = -1;
    console.log(props.zIndex);

    const cards = cardsSelected.map((card) => {
        column = column == 2 ? 0 : column + 1;
        row = column == 0 ? row + 1 : row;
        return (
            <Card
                top={props.scrollTop}
                column={column}
                row={row}
                card={card}
                key={card.name}
                zIndexIncreased={props.zIndex.includes(card.name)}
                toggleZoom={props.toggleZoom}
                useMysteryCard={props.useMysteryCard}
                useInventionCard={props.useInventionCard}
                manageStorage={props.manageStorage}
            />
        );
    });

    const contentStyle = {
        height: (row + 1) * 140,
    };

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
