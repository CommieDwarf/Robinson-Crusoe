// @flow
import * as React from "react";
import {useState} from "react";
import styles from "./CardResolve.module.css";
import Draggable from "react-draggable";
import {AdventureCardResolve} from "./Adventure/AdventureCardResolve";
import {MysteryCardResolve} from "./Mystery/MysteryCardResolve";
import {objectsEqual} from "@shared/utils/objectsEqual";
import {IAdventureCard, IAdventureCardRenderData} from "@shared/types/Game/AdventureService/AdventureCard";
import {isAdventureCardRenderData} from "@shared/utils/typeGuards/isAdventureCard";
import {
    ACTION_CONTROLLER_ACTION,
    MYSTERY_CONTROLLER_ACTION,
    OTHER_CONTROLLER_ACTION
} from "@shared/types/CONTROLLER_ACTION";
import {IMysteryCard} from "@shared/types/Game/MysteryService/MysteryCard";
import {ResolveButtons} from "./ResolveButtons/ResolveButtons";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {socketEmitAction} from "../../../../middleware/socketMiddleware";;
import {PLAYER_COLOR} from "@shared/types/Game/PLAYER_COLOR";
import { CurrentResolveRenderData } from "@shared/types/Game/EventService/EventService";
import { selectPlayerByCharacter } from "../../../../reduxSlices/gameSession";


export interface CardResolveButtonProp {
    label: string,
    triggerEffect: () => void;
    locked: boolean;
    color?: PLAYER_COLOR
}


type Props = {
    resolve: CurrentResolveRenderData<IMysteryCard | IAdventureCard>,
    eventStage: boolean;
};


const CardResolve = (props: Props) => {
    const [enlarged, setEnlarged] = useState(false);

    const dispatch = useAppDispatch();

    const localPlayer = useAppSelector((state) => state.gameSession.data?.localPlayer);

    function toggleZoom() {
        setEnlarged((state) => !state);
    }

    const playerResolver = useAppSelector((state) => selectPlayerByCharacter(state, props.resolve.resolver.name));

    //no player resolver means it's a side character(Friday) that belongs to all players.
    const actionAllowed = playerResolver && (playerResolver.id === localPlayer?.id) || !playerResolver;

    let button1: CardResolveButtonProp;
    let button2: CardResolveButtonProp | undefined;

    if (isAdventureCardRenderData(props.resolve.card)) {
        const {eventOption1, eventOption2, option1Label, option2Label, shouldDecide} = props.resolve.card;
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
            label: props.resolve.card.eventLabel,
            triggerEffect: () => dispatch(socketEmitAction(MYSTERY_CONTROLLER_ACTION.RESOLVE_EVENT_MYSTERY)),
            locked: !actionAllowed,

        }
    }

    if (!localPlayer) return null;
    return (
        <Draggable bounds={"parent"}>
            <div className={styles.container}>
                <div className={`${styles.card} ${enlarged ? styles.enlarged : ""}`}>
                    {isAdventureCardRenderData(props.resolve.card) ? (
                        <AdventureCardResolve
                            card={props.resolve.card}
                        />
                    ) : (
                        <MysteryCardResolve
                            card={props.resolve.card}
                        />
                    )}
                </div>
                <ResolveButtons button1={button1} button2={button2} color={playerResolver?.color || PLAYER_COLOR.BLUE}/>
            </div>
        </Draggable>
    );
};

export default React.memo(CardResolve, objectsEqual);
