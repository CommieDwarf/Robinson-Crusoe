import React from "react";
import styles from "./Cards.module.css";
import {objectsEqual} from "@shared/utils/objectsEqual";
import {Tab} from "../CardList";
import {Card} from "./Card/Card";
import {useAppSelector} from "../../../../../store/hooks";
import {selectGame} from "../../../../../reduxSlices/gameSession";
import {INVENTION_TYPE} from "@shared/types/Game/InventionService/Invention";

interface Props {
    tab: Tab;
    isBeingDragged: boolean;
    topLayerElement: string;
    topLayer: boolean;
    scrollTop: number;
    containerWidth: number;
}

function Cards(props: Props) {

    const cards = useAppSelector((state) => {
        return {
            inventions: selectGame(state).inventionService.inventions.filter(inv => inv.inventionType !== INVENTION_TYPE.SCENARIO)!,
            mysteryCards: [...selectGame(state).mysteryService.cardsAsReminders!,
                ...selectGame(state).resourceService.owned.treasures!
            ],
            items: selectGame(state).equipmentService.items!
        }
    })


    let cardsSelected = cards[props.tab];


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

    const cardElements = cardsSelected.map((card) => {
        column = column == maxColumns - 1 ? 0 : column + 1;
        row = column == 0 ? row + 1 : row;
        return (
            <Card
                top={props.scrollTop}
                column={column}
                row={row}
                card={card}
                key={card.name}
                zIndexIncreased={props.topLayerElement.includes(card.name)}
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
        <div className={`${styles.container} ${props.topLayer && styles.zIndexIncreased}`} style={contentStyle}>
            {cardElements}
        </div>
    );
}


export default React.memo(Cards, objectsEqual);
