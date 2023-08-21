// @flow
import * as React from "react";
import {IMysteryCardRenderData} from "../../../../../../interfaces/MysteryService/MysteryCard";
import {IInventionRenderData} from "../../../../../../interfaces/InventionService/Invention";
import {isCardInvention} from "../../../../../../utils/isCardInvention";
import Invention from "./Invention/Invention";
import {MysteryCard} from "./MysteryCard/MysteryCard";
import {StorageAction} from "../../../../../../interfaces/MysteryService/StorageCard";
import {useState} from "react";

type Props = {
    card: IMysteryCardRenderData | IInventionRenderData;
    column: number;
    row: number;
    top: number;
    zIndexIncreased: boolean;
    hideActionSlots?: boolean;
    useMysteryCard: (cardName: string) => void;
    useInventionCard: (cardName: string) => void;
    manageStorage: (
        cardName: string,
        type: "mystery",
        action: StorageAction
    ) => void;
};
export const Card = (props: Props) => {
    const [mouseOnButtons, setMouseOnButtons] = useState(false);
    const [enlarge, setEnlarge] = useState(false);

    function handleEnlarge(value: boolean) {
        if (!mouseOnButtons) {
            setEnlarge(value);
            console.log("ENLARGE")
        }
    }

    function handleMouseOverButtons(value: boolean) {
        setMouseOnButtons(value);
    }


    if (isCardInvention(props.card)) {
        return <Invention invention={props.card} {...props} use={props.useInventionCard}
                          handleEnlarge={handleEnlarge}
                          enlarged={enlarge}
                          handleMouseOverButtons={handleMouseOverButtons}
        />;
    } else {

        return (
            <MysteryCard
                mysteryCard={props.card}
                use={props.useMysteryCard}
                {...props}
                manageStorage={props.manageStorage}
                handleEnlarge={handleEnlarge}
                enlarged={enlarge}
                handleMouseOverButtons={handleMouseOverButtons}
            />
        );
    }
};
