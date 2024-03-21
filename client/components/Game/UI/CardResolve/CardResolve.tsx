// @flow
import * as React from "react";
import {useState} from "react";
import styles from "./CardResolve.module.css";
import Draggable from "react-draggable";
import {AdventureCardResolve} from "./Adventure/AdventureCardResolve";
import {MysteryCardResolve} from "./Mystery/MysteryCardResolve";
import {objectsEqual} from "@shared/utils/objectsEqual";
import {IAdventureCardRenderData} from "@shared/types/Game/AdventureService/AdventureCard";
import {isAdventureCard, isAdventureCardRenderData} from "@shared/utils/typeGuards/isAdventureCard";
import {
    ACTION_CONTROLLER_ACTION,
    MYSTERY_CONTROLLER_ACTION,
    OTHER_CONTROLLER_ACTION
} from "@shared/types/CONTROLLER_ACTION";
import {IMysteryCardRenderData} from "@shared/types/Game/MysteryService/MysteryCard";
import {ResolveButtons} from "./ResolveButtons/ResolveButtons";
import {kebabCase} from "lodash";
import {socketEmitter} from "../../../../pages/_app";


export interface CardResolveButtonProp {
    label: string,
    triggerEffect: () => void;
    locked: boolean;
}


type Props = {
    card: IAdventureCardRenderData | IMysteryCardRenderData
    eventStage: boolean;
};


const CardResolve = (props: Props) => {
    const [enlarged, setEnlarged] = useState(false);

    function toggleZoom() {
        setEnlarged((state) => !state);
    }


    let button1: CardResolveButtonProp;
    let button2: CardResolveButtonProp | undefined;

    if (isAdventureCardRenderData(props.card)) {
        const {eventOption1, eventOption2, option1Label, option2Label, shouldDecide} = props.card;
        if (props.eventStage) {
            button1 = {
                label: eventOption1?.label || "next",
                triggerEffect: () => socketEmitter.emitAction(OTHER_CONTROLLER_ACTION.RESOLVE_EVENT_ADVENTURE, 1),
                locked: false,
            };

            if (eventOption2) {
                button2 = {
                    label: eventOption2.label,
                    triggerEffect: () => socketEmitter.emitAction(OTHER_CONTROLLER_ACTION.RESOLVE_EVENT_ADVENTURE, 2),
                    locked: false,
                };
            }
        } else {
            button1 = {
                label: option1Label,
                triggerEffect: () => socketEmitter.emitAction(ACTION_CONTROLLER_ACTION.RESOLVE_ADVENTURE, 1),
                locked: false,
            };

            if (shouldDecide) {
                button2 = {
                    label: option2Label,
                    triggerEffect: () => socketEmitter.emitAction(ACTION_CONTROLLER_ACTION.RESOLVE_ADVENTURE, 2),
                    locked: false,
                };
            }
        }
    } else {

        button1 = {
            label: props.card.eventLabel,
            triggerEffect: () => socketEmitter.emitAction(MYSTERY_CONTROLLER_ACTION.RESOLVE_EVENT_MYSTERY),
            locked: false,
        };
    }

    return (
        <Draggable bounds={"parent"}>
            <div className={styles.container}>
                <div className={`${styles.card} ${enlarged ? styles.enlarged : ""}`}>
                    {isAdventureCardRenderData(props.card) ? (
                        <AdventureCardResolve
                            card={props.card}
                        />
                    ) : (
                        <MysteryCardResolve
                            card={props.card}
                        />
                    )}
                </div>
                <ResolveButtons button1={button1} button2={button2}/>
            </div>
        </Draggable>
    );
};

export default React.memo(CardResolve, objectsEqual);
