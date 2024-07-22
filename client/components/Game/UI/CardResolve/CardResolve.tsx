// @flow
import * as React from "react";
import {useState} from "react";
import styles from "./CardResolve.module.css";
import Draggable from "react-draggable";
import {AdventureCardResolve} from "./Adventure/AdventureCardResolve";
import {MysteryCardResolve} from "./Mystery/MysteryCardResolve";
import {objectsEqual} from "@shared/utils/objectsEqual";
import {IAdventureCardRenderData} from "@shared/types/Game/AdventureService/AdventureCard";
import {isAdventureCardRenderData} from "@shared/utils/typeGuards/isAdventureCard";
import {
    ACTION_CONTROLLER_ACTION,
    MYSTERY_CONTROLLER_ACTION,
    OTHER_CONTROLLER_ACTION
} from "@shared/types/CONTROLLER_ACTION";
import {IMysteryCardRenderData} from "@shared/types/Game/MysteryService/MysteryCard";
import {ResolveButtons} from "./ResolveButtons/ResolveButtons";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {socketEmitAction} from "../../../../middleware/socketMiddleware";
import {ICharacterRenderData} from "@shared/types/Game/Characters/Character";
import {IPlayerRenderData} from "@shared/types/Game/PlayerService/Player";
import {PLAYER_COLOR} from "@shared/types/Game/PLAYER_COLOR";


export interface CardResolveButtonProp {
    label: string,
    triggerEffect: () => void;
    locked: boolean;
    color?: PLAYER_COLOR
}


type Props = {
    card: IAdventureCardRenderData | IMysteryCardRenderData,
    player: IPlayerRenderData,
    eventStage: boolean;
};


const CardResolve = (props: Props) => {
    const [enlarged, setEnlarged] = useState(false);

    const dispatch = useAppDispatch();

    const localPlayer = useAppSelector((state) => state.gameSession.data?.localPlayer)!;

    function toggleZoom() {
        setEnlarged((state) => !state);
    }

    const actionAllowed = props.player.id === localPlayer.id;

    let button1: CardResolveButtonProp;
    let button2: CardResolveButtonProp | undefined;

    if (isAdventureCardRenderData(props.card)) {
        const {eventOption1, eventOption2, option1Label, option2Label, shouldDecide} = props.card;
        if (props.eventStage) {
            button1 = {
                label: eventOption1?.label || "next",
                triggerEffect: () => dispatch(socketEmitAction(OTHER_CONTROLLER_ACTION.RESOLVE_EVENT_ADVENTURE, 1)),
                locked: !actionAllowed,
            };
            if (eventOption2) {
                button2 = {
                    label: eventOption2.label,
                    triggerEffect: () => dispatch(socketEmitAction(OTHER_CONTROLLER_ACTION.RESOLVE_EVENT_ADVENTURE, 2)),
                    locked: !actionAllowed,
                }
            }
        } else {
            button1 = {
                label: option1Label,
                triggerEffect: () => dispatch(socketEmitAction(ACTION_CONTROLLER_ACTION.RESOLVE_ADVENTURE, 1)),
                locked: !actionAllowed,
            }
            if (shouldDecide) {
                button2 = {
                    label: option2Label,
                    triggerEffect: () => dispatch(socketEmitAction(ACTION_CONTROLLER_ACTION.RESOLVE_ADVENTURE, 2)),
                    locked: !actionAllowed,
                }
            }
        }
    } else {
        button1 = {
            label: props.card.eventLabel,
            triggerEffect: () => dispatch(socketEmitAction(MYSTERY_CONTROLLER_ACTION.RESOLVE_EVENT_MYSTERY)),
            locked: !actionAllowed,

        }
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
                <ResolveButtons button1={button1} button2={button2} color={props.player.color}/>
            </div>
        </Draggable>
    );
};

export default React.memo(CardResolve, objectsEqual);
