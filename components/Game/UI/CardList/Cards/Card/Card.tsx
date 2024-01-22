// @flow
import * as React from "react";
import {IMysteryCardRenderData} from "../../../../../../interfaces/MysteryService/MysteryCard";
import {IInventionRenderData} from "../../../../../../interfaces/InventionService/Invention";
import {isCardInvention} from "../../../../../../utils/isCardInvention";
import Invention from "./Invention/Invention";
import {MysteryCard} from "./MysteryCard/MysteryCard";
import {StorageAction} from "../../../../../../interfaces/MysteryService/StorageCard";
import {useState} from "react";
import {IItemRenderData, ITEM} from "../../../../../../interfaces/Equipment/Item";
import {isMysteryCard} from "../../../../../../utils/isMysteryCard";
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

    const wrapperStyle = {
        left: enlarged ? props.totalWidth / 4 : props.column * props.width,
        top: props.row * props.height,
        cursor: enlarged ? "zoom-out" : "zoom-in",
        height: enlarged ? props.height * enlargeMultiplayer + "px" : props.height + "px",
    };

    const enlargedClass = enlarged
        ? styles.enlarged
        : styles.zIndexTransition;

    wrapperStyle.top = enlarged ? props.top : wrapperStyle.top;
    // wrapperStyle.left = enlarged ? 60 : wrapperStyle.left;

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
