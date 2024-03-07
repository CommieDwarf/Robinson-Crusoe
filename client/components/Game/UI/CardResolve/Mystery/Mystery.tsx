// @flow
import * as React from "react";
import cardResolveStyles from "../CardResolve.module.css";
import {MysteryCardCounter} from "./MysteryCardCounter/MysteryCardCounter";
import {CardActions} from "../Actions/CardActions";
import {ZoomButton} from "../ZoomButton/ZoomButton";
import ResizableImage from "../../../../ResizableImage/ResizableImage";
import {IMysteryCardRenderData} from "@shared/types/Game/MysteryService/MysteryCard";
import {MysteryCardsAmount} from "@shared/types/Game/MysteryService/MysteryService";
import {ICharacterRenderData} from "@shared/types/Game/Characters/Character";
import {kebabCase} from "lodash";
import {emitAction} from "../../../../../pages/api/emitAction";
import {MYSTERY_CONTROLLER_ACTION} from "@shared/types/CONTROLLER_ACTION";

type Props = {
    isDrawingOn: boolean;
    canDraw: boolean;
    currentResolve: IMysteryCardRenderData | null;
    canFinish: boolean;
    drawer: ICharacterRenderData | null;
    cardsLeft: MysteryCardsAmount;
    toggleZoom: () => void;
};

export const Mystery = (props: Props) => {
    function handleDrawClick() {
        if (props.currentResolve?.drawResolved === false) {
            emitAction(MYSTERY_CONTROLLER_ACTION.TRIGGER_MYSTERY_DRAW_EFFECT)
        } else if (props.canDraw) {
            emitAction(MYSTERY_CONTROLLER_ACTION.DRAW_MYSTERY_CARD)
        }
    }

    function handleFinishClick() {
        if (props.canFinish) {
            emitAction(MYSTERY_CONTROLLER_ACTION.FINISH_DRAWING_MYSTERY_CARDS);
        }
    }

    let label1 = "Ciągnij";
    let label2 = "Skończ"
    let action1Locked = !props.canDraw
    if (props.currentResolve && !props.currentResolve.drawResolved) {
        label1 = props.currentResolve.drawLabel;
        label2 = "";
        action1Locked = false;
    }


    const cardImgSrc = props.currentResolve
        ? `/UI/cards/mystery/${props.currentResolve.type}/${kebabCase(
            props.currentResolve.name
        )}.png`
        : `/UI/cards/reverse/mystery.png`;

    return (
        <>
            {props.currentResolve && (
                <ZoomButton onClick={props.toggleZoom} cardType={"mystery"}/>
            )}
            <MysteryCardCounter cardsLeft={props.cardsLeft}/>
            <ResizableImage
                src={cardImgSrc}
                alt={"karta tajemnic"}
                fill
                sizes={cardResolveStyles.card}
                unselectable={"on"}
                draggable={"false"}
            />
            <CardActions
                label1={label1}
                label2={label2}
                triggerAction1={handleDrawClick}
                triggerAction2={handleFinishClick}
                action1Locked={action1Locked}
                action2Locked={!props.canFinish}
            />
        </>
    );
};
