import {MysteryCardCounter} from "./MysteryCardCounter/MysteryCardCounter";
import * as React from "react";
import {IMysteryServiceRenderData} from "@shared/types/Game/MysteryService/MysteryService";
import {emitAction} from "../../../../pages/api/emitAction";
import {MYSTERY_CONTROLLER_ACTION} from "@shared/types/CONTROLLER_ACTION";
import {useTranslation} from "react-i18next";
import {CardResolveButtonProp} from "../CardResolve/CardResolve";
import {MysteryCardResolve} from "../CardResolve/Mystery/MysteryCardResolve";
import styles from "./MysteryCardDraw.module.css";
import {ResolveButtons} from "../CardResolve/ResolveButtons/ResolveButtons";
import {useState} from "react";
import Draggable from "react-draggable";

export interface Props {
    mysteryService: IMysteryServiceRenderData,
}

export function MysteryCardDraw(props: Props) {


    const mysteryCard = props.mysteryService.currentResolve;


    //TODO przetłumacz
    const button1: CardResolveButtonProp = {
        label: mysteryCard?.drawResolved && mysteryCard?.drawLabel || "draw",
        triggerEffect: drawOrTriggerEffect,
        locked: !props.mysteryService.canDraw
    };

    const button2: CardResolveButtonProp = {
        label: "Finish",
        triggerEffect: finish,
        locked: !props.mysteryService.canFinish
    }


    function drawOrTriggerEffect() {
        if (props.mysteryService.currentResolve?.drawResolved === false) {
            emitAction(MYSTERY_CONTROLLER_ACTION.TRIGGER_MYSTERY_DRAW_EFFECT)
        } else if (props.mysteryService.canDraw) {
            emitAction(MYSTERY_CONTROLLER_ACTION.DRAW_MYSTERY_CARD)
        }
    }

    function finish() {
        if (props.mysteryService.canFinish) {
            emitAction(MYSTERY_CONTROLLER_ACTION.FINISH_DRAWING_MYSTERY_CARDS);
        }
    }

    const [enlarged, setEnlarged] = useState(false);


    return <Draggable bounds={"parent"}>
        <div className={`${styles.container} ${enlarged && styles.enlarged}`}>
            <div className={styles.card}>
                <MysteryCardResolve card={props.mysteryService.currentResolve}/>
            </div>
            <ResolveButtons button1={button1} button2={button2}/>
            <MysteryCardCounter cardsLeft={props.mysteryService.cardsLeft}/>
        </div>
    </Draggable>

}
