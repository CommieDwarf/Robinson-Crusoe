// @flow
import * as React from "react";
import styles from "../CardResolve.module.css";
import Image from "next/image";
import i18n from "../../../../../I18n/I18n";
import {formatToKebabCase} from "../../../../../utils/formatToKebabCase";
import {IAdventureCardRenderData} from "../../../../../interfaces/AdventureService/AdventureCard";
import {CardActions} from "../Actions/CardActions";
import {ZoomButton} from "../ZoomButton/ZoomButton";
import {IMysteryCardRenderData} from "../../../../../interfaces/MysteryService/MysteryCard";
import {isAdventureCard} from "../../../../../utils/typeGuards/isAdventureCard";
import {AdventureCard} from "../../../../../server/Game/AdventureService/AdventureCardCreator/AdventureCard";
import ResizableImage from "../../../../ResizableImage/ResizableImage";

type Props = {
    card: IAdventureCardRenderData | IMysteryCardRenderData;
    resolve: (option: 1 | 2) => void;
    toggleZoom: () => void;
    eventStage: boolean;
};
export const Adventure = (props: Props) => {
    function handleZoomClick() {
        props.toggleZoom();
    }

    function handleOption1Click() {
        props.resolve(1);
    }

    function handleOption2Click() {
        props.resolve(2);
    }

    let l: IMysteryCardRenderData;

    let label1: string = ""
    let label2: string = ""


    if ("action" in props.card && !props.eventStage) {
        // ADVENTURE CARD
        label1 = i18n.t(`adventureOptionLabel.${props.card.option1Label}`)
        label2 = props.card.shouldDecide
            ? i18n.t(`adventureOptionLabel.${props.card.option2Label}`)
            : ""
    } else if ("eventOptions" in props.card) {
        // ADVENTURE CARD IN EVENT STAGE
        if (props.card.eventOptions && props.card.eventOptions.every((card) => card.canBeResolved)) {
            label1 = props.card.eventOptions[0].label;
            label2 = props.card.eventOptions[1].label;
        } else {
            label1 = "Dalej";
        }
    } else if ("eventLabel" in props.card) {
        //MYSTERY CARD
        label1 = props.card.eventLabel
        label2 = "";
        if (!label1) {
            label1 = "Dalej"
        }
    }

    let imageUrl = "action" in props.card ? `/UI/cards/adventure/${props.card.action}/${formatToKebabCase(
        props.card.name
    )}.png` : `/UI/cards/mystery/${props.card.type}/${formatToKebabCase(props.card.name)}.png`

    return (
        <>
            <div className={styles.zoomButton}>
                <ZoomButton onClick={handleZoomClick} cardType={"adventure"}/>
            </div>
            {!props.eventStage && isAdventureCard(props.card) && (
                <CardActions
                    label1={label1}
                    label2={label2}
                    triggerAction1={handleOption1Click}
                    triggerAction2={handleOption2Click}
                    action1Locked={false}
                    action2Locked={!props.card.shouldDecide}
                />
            )}
            {props.eventStage && label1 && (
                <CardActions
                    label1={label1}
                    label2={label2}
                    triggerAction1={handleOption1Click}
                    triggerAction2={handleOption2Click}
                    action1Locked={false}
                    action2Locked={false}
                />
            )}

            <ResizableImage
                src={imageUrl}
                alt={"wydarzenie"}
                // unselectable={"on"}
                // draggable={"false"}
            />
        </>
    );
};
