import React from "react";
import styles from "./Cards.module.css";

import {IInventionRenderData} from "../../../../../../interfaces/InventionService/Invention";
import {objectsEqual} from "../../../../../../utils/objectsEqual";
import {IMysteryCardRenderData} from "../../../../../../interfaces/MysteryService/MysteryCard";
import {Tab} from "../CardList";
import {Card} from "./Card/Card";
import {StorageAction} from "../../../../../../interfaces/MysteryService/StorageCard";
import {IItemRenderData, ITEM} from "../../../../../../interfaces/Equipment/Item";

interface Props {
    inventions: IInventionRenderData[];
    mysteryCards: IMysteryCardRenderData[];
    items: IItemRenderData[];
    tab: Tab;
    isBeingDragged: boolean;
    zIndex: string;
    scrollTop: number;
    useMysteryCard: (cardName: string) => void;
    useInventionCard: (cardName: string) => void;
    manageStorage: (cardName: string, type: "mystery", action: StorageAction) => void;
    useItem: (item: ITEM) => void;

    containerWidth: number;
}

function Cards(props: Props) {
    const zIndexClass =
        props.zIndex.includes("invention") || props.zIndex.includes("mystery")
            ? styles.zIndexIncreased
            : "";

    let cardsSelected = props[props.tab];


    let column = -1;
    let row = -1;


    const aspectRatio = 0.654;
    const tabsHeight = 20;
    // const columnGap = 6;
    const scrollbar = 20;
    const totalWidth = props.containerWidth - scrollbar;
    const cardWidth = totalWidth / 4;
    const cardHeight = cardWidth / aspectRatio;


    const maxColumns = 4;

    const cards = cardsSelected.map((card) => {
        column = column == maxColumns - 1 ? 0 : column + 1;
        row = column == 0 ? row + 1 : row;
        return (
            <Card
                top={props.scrollTop}
                column={column}
                row={row}
                card={card}
                key={card.name}
                zIndexIncreased={props.zIndex.includes(card.name)}
                useMysteryCard={props.useMysteryCard}
                useInventionCard={props.useInventionCard}
                manageStorage={props.manageStorage}
                useItem={props.useItem}
                height={cardHeight}
                width={cardWidth}
                totalWidth={totalWidth}
            />
        );
    });
    const contentStyle = {
        height: (row + 1) * cardHeight + tabsHeight,
    };

    return (
        <div className={`${styles.container} ${zIndexClass}`} style={contentStyle}>
            {cards}
        </div>
    );
}


export default React.memo(Cards, objectsEqual);
