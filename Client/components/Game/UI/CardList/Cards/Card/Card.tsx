// @flow
import * as React from "react";
import {IMysteryCardRenderData} from "../../../../../../../interfaces/MysteryService/MysteryCard";
import {IInventionRenderData} from "../../../../../../../interfaces/InventionService/Invention";
import {isCardInvention} from "../../../../../../../utils/typeGuards/isCardInvention";
import Invention from "./Invention/Invention";
import {MysteryCard} from "./MysteryCard/MysteryCard";
import {StorageAction} from "../../../../../../../interfaces/MysteryService/StorageCard";
import {useState} from "react";
import {IItemRenderData, ITEM} from "../../../../../../../interfaces/Equipment/Item";
import {isMysteryCard} from "../../../../../../../utils/typeGuards/isMysteryCard";
import Item from "./Item/Item";
import styles from "./Card.module.css";

type Props = {
    card: IMysteryCardRenderData | IInventionRenderData | IItemRenderData
    column: number;
    row: number;
    top: number;
    zIndexIncreased: boolean;
    hideActionSlots?: boolean;
    useMysteryCard: (cardName: string) => void;
    useInventionCard: (cardName: string) => void;
    useItem: (item: ITEM) => void;
    manageStorage: (
        cardName: string,
        type: "mystery",
        action: StorageAction
    ) => void;

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
        card = <Invention invention={props.card} use={props.useInventionCard}
                          handleMouseOverButtons={handleMouseOverButtons}
        />;
    } else if (isMysteryCard(props.card)) {
        card = (
            <MysteryCard
                mysteryCard={props.card}
                use={props.useMysteryCard}
                manageStorage={props.manageStorage}
                handleMouseOverButtons={handleMouseOverButtons}
            />
        );
    } else {
        card = (
            <Item item={props.card} use={props.useItem}
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
