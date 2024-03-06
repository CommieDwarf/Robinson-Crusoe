// @flow
import * as React from "react";
import {useState} from "react";
import {isCardInvention} from "@shared/utils/typeGuards/isCardInvention";
import {IItemRenderData, ITEM} from "@shared/types/Game/Equipment/Item";
import {MysteryCard} from "./MysteryCard/MysteryCard";
import {IMysteryCardRenderData} from "@shared/types/Game/MysteryService/MysteryCard";
import styles from "./Card.module.css"
import Invention from "./Invention/Invention";
import {isMysteryCard} from "@shared/utils/typeGuards/isMysteryCard";
import {IInventionRenderData} from "@shared/types/Game/InventionService/Invention";
import Item from "./Item/Item"

type Props = {
    card: IMysteryCardRenderData | IInventionRenderData | IItemRenderData
    column: number;
    row: number;
    top: number;
    zIndexIncreased: boolean;
    hideActionSlots?: boolean;
    height: number;
    width: number;
    totalWidth: number;
    enlargeParams?: {
        left: number,
        top: number,
        scale: number,
    }
};
export const Card = (props: Props) => {
    const [mouseOnButtons, setMouseOnButtons] = useState(false);
    const [enlarged, setEnlarged] = useState(false);

    function handleEnlarge() {
        if (!mouseOnButtons) {
            setEnlarged(!enlarged);
        }
    }

    function handleMouseOverButtons(value: boolean) {
        setMouseOnButtons(value);
    }

    let card;

    const enlargeMultiplayer = 2.1

    const top = props.row * props.height;

    const wrapperStyle = {
        left: enlarged ? (props.enlargeParams?.left ? props.enlargeParams.left : props.totalWidth / 4) : props.column * props.width,
        top: enlarged ? (props.enlargeParams?.top ? props.enlargeParams.top : props.top + 5) : top,
        cursor: enlarged ? "zoom-out" : "zoom-in",
        height: enlarged ? props.height * (props.enlargeParams ? props.enlargeParams.scale : enlargeMultiplayer) + "px" : props.height + "px",
    };


    const enlargedClass = enlarged
        ? styles.enlarged
        : styles.zIndexTransition;


    const zIndexClass = props.zIndexIncreased ? styles.zIndexIncreased : "";

    if (isCardInvention(props.card)) {
        card = <Invention
            invention={props.card}
            handleMouseOverButtons={handleMouseOverButtons}
        />;
    } else if (isMysteryCard(props.card)) {
        card = (
            <MysteryCard
                mysteryCard={props.card}
                handleMouseOverButtons={handleMouseOverButtons}
            />
        );
    } else {
        card = (
            <Item item={props.card}
                  handleMouseOverButtons={handleMouseOverButtons}/>
        )
    }

    return <div className={`${styles.card} ${styles.zIndexIncreased} ${enlargedClass} ${zIndexClass}`}
                style={wrapperStyle}
                onClick={handleEnlarge}
    >
        {card}

    </div>
}
