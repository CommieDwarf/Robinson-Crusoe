// @flow
import * as React from "react";
import styles from "./MysteryCard.module.css";
import UseButtons from "./UseOverlay/UseOverlay";
import ResizableImage from "../../../../../../ResizableImage/ResizableImage";
import {IMysteryCardRenderData} from "@shared/types/Game/MysteryService/MysteryCard";
import {kebabCase} from "lodash";
import {emitAction} from "../../../../../../../pages/api/emitAction";
import {MYSTERY_CONTROLLER_ACTION} from "@shared/types/CONTROLLER_ACTION";
import {isTreasureCard, isTreasureCardRenderData} from "@shared/utils/typeGuards/isTreasureCard";


type Props = {
    mysteryCard: IMysteryCardRenderData;

    hideActionSlots?: boolean;
    handleMouseOverButtons: (value: boolean) => void;
};
export const MysteryCard = (props: Props) => {


    function onMouseEnterButton() {
        props.handleMouseOverButtons(true)
    }

    function onMouseLeaveButton() {
        props.handleMouseOverButtons(false);
    }


    function use() {
        emitAction(MYSTERY_CONTROLLER_ACTION.USE_TREASURE_CARD, props.mysteryCard.name)
    }

    const imgUrl = `/UI/cards/mystery/${props.mysteryCard.type}/${kebabCase(
        props.mysteryCard.name
    )}.png`

    console.log(props.mysteryCard)

    return (
        <div
            className={`${styles.container}`}
        >
            <ResizableImage
                src={imgUrl}
                alt={"karta pomysłu"}
                placeholder="blur"
                blurDataURL={imgUrl}
            />
            {isTreasureCardRenderData(props.mysteryCard) && (
                <UseButtons card={props.mysteryCard} onMouseEnterButton={onMouseEnterButton}
                            onMouseLeaveButton={onMouseLeaveButton}
                            use={use}
                ></UseButtons>
            )}
        </div>
    );
};
