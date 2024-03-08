// @flow
import * as React from "react";
import styles from "../CardResolve.module.css";
import i18n from "../../../../../I18n/I18n";
import {CardActions} from "../Actions/CardActions";
import {ZoomButton} from "../ZoomButton/ZoomButton";
import ResizableImage from "../../../../ResizableImage/ResizableImage";
import {emitAction} from "../../../../../pages/api/emitAction";
import {ACTION_CONTROLLER_ACTION, OTHER_CONTROLLER_ACTION} from "@shared/types/CONTROLLER_ACTION";
import {IAdventureCardRenderData} from "@shared/types/Game/AdventureService/AdventureCard";
import {IMysteryCardRenderData} from "@shared/types/Game/MysteryService/MysteryCard";
import {isAdventureCard} from "@shared/utils/typeGuards/isAdventureCard";
import {kebabCase} from "lodash";

type Props = {
    card: IAdventureCardRenderData | IMysteryCardRenderData;
    toggleZoom: () => void;
    eventStage: boolean;
};
export const Adventure = (props: Props) => {
    function handleZoomClick() {
        props.toggleZoom();
    }

    function handleOption1Click() {
        resolve(1);
    }

    function handleOption2Click() {
        resolve(2);
    }


    function resolve(option: 1 | 2) {
        if (props.eventStage) {
            emitAction(OTHER_CONTROLLER_ACTION.RESOLVE_EVENT_ADVENTURE, option)
        } else {
            emitAction(ACTION_CONTROLLER_ACTION.RESOLVE_ADVENTURE, option)
        }
    }


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

    let imageUrl = "action" in props.card ? `/UI/cards/adventure/${props.card.action}/${kebabCase(
        props.card.name
    )}.png` : `/UI/cards/mystery/${props.card.type}/${kebabCase(props.card.name)}.png`

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
