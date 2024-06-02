import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import Phase from "./UI/Phase/Phase";
import Morale from "./UI/Morale/Morale";
import styles from "./Game.module.css";
import AllResources from "./UI/AllResources/AllResources";
import Constructions from "./UI/Constructions/Constructions";
import MapComponent from "./UI/Map/Map";
import Character from "./UI/Character/Character";
import Health from "./UI/Health/Health";
import ActionsOrder from "./UI/ActionOrder/ActionOrder";
import ChatLog from "./UI/ChatLog/ChatLog";
import Tokens from "./UI/tokens/Tokens";
import ScenarioButton from "./UI/ScenarioButton/ScenarioButton";
import actionSlotStyles from "./UI/ActionSlot.module.css";

import Threat from "./UI/threat/Threat";
import ArrangeCampRest from "./UI/ArrangeCampRest/ArrangeCampRest";


import {DragDropContext, DragStart, DragUpdate, DropResult,} from "react-beautiful-dnd";
import {Weather} from "./UI/Weather/Weather";

import {NextPhaseButton} from "./UI/NextPhaseButton/NextPhaseButton";
import {ActionResolveWindow} from "./UI/ActionResolveWindow/ActionResolveWindow";

import {Alerts} from "./UI/Alerts/Alerts";
import {WeatherResolveWindow} from "./UI/WeatherResolveWindow/WeatherResolveWindow";
import {NightTip} from "./UI/NightTip/NightTip";
import {ConfirmCampMove} from "./UI/ConfirmCampMove/ConfirmCampMove";
import {sleep} from "@shared/utils/sleep";

import {useAppDispatch, useAppSelector} from "../../store/hooks";

import CardResolve from "./UI/CardResolve/CardResolve";

import {CardList} from "./UI/CardList/CardList";

import {ConfirmWindow} from "./UI/ConfirmWindow/ConfirmWindow";
import {CONFIRM_WINDOW} from "./UI/ConfirmWindow/messages";
import Scenario from "./UI/Scenario/Scenario";
import {isPawnPlacementAllowed} from "@shared/utils/isPawnPlacementAllowed";
import {ITileRenderData} from "@shared/types/Game/TileService/ITile";
import {CHARACTER_CONTROLLER_ACTION, OTHER_CONTROLLER_ACTION} from "@shared/types/CONTROLLER_ACTION";
import {MysteryCardDraw} from "./UI/MysteryCardDraw/MysteryCardDraw";
import {socketEmitter} from "../../pages/_app";
import {PickOne} from "./UI/PickOne/PickOne";
import {IPawnRenderData} from "@shared/types/Game/Pawns/Pawn";
import {actionSlotUpdated, selectGame} from "../../reduxSlices/gameSession";
import {BackButton} from "../BackButton/BackButton";
import {ControlPanel} from "./UI/ControlPanel/ControlPanel";


interface Props {
}

export default function Game(props: Props) {
    const [isPawnBeingDragged, setIsPawnBeingDragged] = useState(false);

    const [showScenario, setShowScenario] = useState(false);

    function toggleShowScenario() {
        setShowScenario(prev => !prev);
    }

    // Increase of proper component's z-index is necessary to render dragged pawn above other components
    // and also for proper render of scaled components
    const [topLayerElement, setTopLayerElement] = useState("");
    const [showNightTip, setShowNightTip] = useState(true);
    const [nextCamp, setNextCamp] = useState<ITileRenderData | null>(null);


    const [confirmWindow, setConfirmWindow] = useState<null | CONFIRM_WINDOW>(null);

    const mapRef = useRef<HTMLDivElement>(null)
    const [mapHeight, setMapHeight] = useState<number>(0);
    const actionOrderRef = useRef<HTMLDivElement>(null);
    const [actionOrderHeight, setActionOrderHeight] = useState<number>(0);

    const dispatch = useAppDispatch();

    const gameData = useAppSelector((state) => {
        const game = selectGame(state);
        return {
            actionSlots: new Map<string, IPawnRenderData<any> | null>(Object.entries(game.actionSlotService.slots!)),
            allPawns: game.globalPawnService.allPawns!,
            inventions: game.inventionService.inventions!,
            objectPickers: game.objectPickers!,
            adventureCardToResolve: game.adventureService.currentCard!,
            isMysteryCardDrawingOn: game.mysteryService.isDrawingOn,
            adventureCardToResolveAsEvent: game.adventureService.currentCard,
            mysteryCardToResolveAsEvent: game.eventService.currentMysteryCard,
            currentPhase: game.phaseService.phase!,
            actionResolveFinished: game.actionService.finished,
            phaseChangeLocked: game.phaseService.locked,
        }
    })


    useEffect(() => {
        if (mapRef.current) setMapHeight(mapRef.current.offsetHeight);
        if (actionOrderRef.current) setActionOrderHeight(actionOrderRef.current.offsetHeight)
    }, [])

    const [gameHeight, setGameHeight] = useState(window.outerHeight);

    useGameHeight();

    function useGameHeight() {
        useLayoutEffect(() => {
            updateGameHeight();

            function updateGameHeight() {
                if (mapRef.current) setMapHeight(mapRef.current.offsetHeight);
                if (actionOrderRef.current) setActionOrderHeight(actionOrderRef.current.offsetHeight);
                setGameHeight(window.outerHeight);
            }

            window.addEventListener("resize", updateGameHeight)
            return () => {
                window.removeEventListener("resize", updateGameHeight);
            }
        }, []);
        return gameHeight;
    }


    function showCampMoveConfirm(tile: ITileRenderData) {
        setNextCamp(tile);
    }

    function hideCampMoveConfirm() {
        setNextCamp(null);
    }

    function hideNightTip() {
        setShowNightTip(false);
    }


    function unselectActionSlots() {
        gameData.actionSlots.forEach((pawn, droppableID) => {
            const actionSlot = document.getElementById(droppableID);
            if (actionSlot) {
                actionSlot.classList.remove(actionSlotStyles.canBeSettled);
                actionSlot.classList.remove(actionSlotStyles.cantBeSettled);
            }
        });
    }

    function unselectSideCharsSlots() {
        const dogDroppable = document.getElementById("dog-droppable");
        const fridayDroppable = document.getElementById("friday-droppable");
        [dogDroppable, fridayDroppable].forEach((char) => {
            char?.classList.remove(actionSlotStyles.canBeSettled);
            char?.classList.remove(actionSlotStyles.cantBeSettled);
        });
    }

    function unselectAllActionSlots() {
        unselectActionSlots();
        unselectSideCharsSlots();
    }

    function onDragStart(start: DragStart) {
        setTopLayerElement(start.source.droppableId);
        setIsPawnBeingDragged(true);
    }

    function onDragUpdate(update: DragUpdate) {
        // unselectActionSlots();
        // const pawn = gameData.allPawns.find(
        //     (p) => p.draggableId === update.draggableId
        // );
        // const destinationId = update.destination?.droppableId;
        // if (
        //     destinationId?.includes("owner") ||
        //     destinationId === update.source.droppableId
        // ) {
        //     return;
        // }
        //
        //
        // if (destinationId && pawn) {
        //     const destinationSlotElement = document.getElementById(destinationId);
        //
        //     if (isPawnPlacementAllowed(pawn, destinationId)) {
        //         destinationSlotElement?.classList.add(actionSlotStyles.canBeSettled);
        //     } else {
        //         destinationSlotElement?.classList.add(actionSlotStyles.cantBeSettled);
        //     }
        //     const pawnAtDestination = gameData.actionSlots.get(destinationId);
        //     const sourceSlotElement = document.getElementById(
        //         update.source.droppableId
        //     );
        //     if (
        //         update.source.droppableId.includes("owner") ||
        //         !pawnAtDestination
        //     ) {
        //         return;
        //     }
        //
        //     if (isPawnPlacementAllowed(pawnAtDestination, update.source.droppableId)) {
        //         sourceSlotElement?.classList.add(actionSlotStyles.canBeSettled);
        //     } else {
        //         sourceSlotElement?.classList.add(actionSlotStyles.cantBeSettled);
        //     }
        // }
    }

    async function onDragEnd(result: DropResult) {
        setTopLayerElement("");
        setIsPawnBeingDragged(false);
        unselectAllActionSlots();
        const destinationId = result.destination?.droppableId;
        const sourceId = result.source.droppableId;
        const draggedPawn = gameData.allPawns.find(
            (p: IPawnRenderData<any>) => p.draggableId === result.draggableId
        );

        if (
            !destinationId ||
            !sourceId ||
            !draggedPawn ||
            destinationId === sourceId ||
            (destinationId.includes("owner") && sourceId.includes("owner"))
        ) {
            return;
        }
        let pawnAtActionSlot = null;
        if (!destinationId.includes("owner")) {
            pawnAtActionSlot = gameData.actionSlots.get(destinationId);
            pawnAtActionSlot =
                pawnAtActionSlot === undefined ? null : pawnAtActionSlot;
        }

        if (
            !isPawnPlacementAllowed(draggedPawn, destinationId) ||
            !isPawnPlacementAllowed(pawnAtActionSlot, sourceId)
        ) {
            return;
        }


        // Przed wysłaniem zapytania aktualizuje stan pionków
        // na null ponieważ react beautiful dnd nie radzi sobie
        // z ich podmianką w jednej aktualizacji.
        gameData.actionSlots.set(sourceId, null);
        gameData.actionSlots.set(destinationId, null);
        dispatch(actionSlotUpdated(Object.fromEntries(gameData.actionSlots.entries())));


        socketEmitter.emitAction(CHARACTER_CONTROLLER_ACTION.MOVE_PAWN, {
            draggableId: draggedPawn.draggableId,
            droppableId: sourceId,
        }, {
            draggableId: pawnAtActionSlot?.draggableId || "",
            droppableId: destinationId,
        })
    }


    const gameStyle = {
        fontSize: gameHeight / 100,
    }


    // @ts-ignore
    const isFirefox = typeof InstallTrigger !== 'undefined';


    return (
        <div className={`${styles.game} ${isFirefox ? styles.gameMoz : ""}`} style={gameStyle}>
            {/*<Background columnStart={3} columnEnd={5} rowStart={3} rowEnd={5}/>*/}
            {/*<Background columnStart={1} columnEnd={3} rowStart={1} rowEnd={2}/>*/}
            {/*<Background columnStart={1} columnEnd={3} rowStart={2} rowEnd={5}/>*/}
            {/*<Background columnStart={1} columnEnd={3} rowStart={5} rowEnd={7}/>*/}
            {/*<Background columnStart={5} columnEnd={6} rowStart={1} rowEnd={3}/>*/}
            {/*<Background columnStart={6} columnEnd={7} rowStart={1} rowEnd={3}/>*/}
            {/*<Background columnStart={6} columnEnd={7} rowStart={3} rowEnd={7}/>*/}
            {/*<Background columnStart={3} columnEnd={6} rowStart={6} rowEnd={7}/>*/}


            {gameData.objectPickers.map((objPicker) => {
                return <PickOne objectPicker={objPicker} key={objPicker.id}/>
            })}
            {gameData.adventureCardToResolve && (
                <CardResolve
                    card={gameData.adventureCardToResolve}
                    eventStage={false}
                />
            )}
            {gameData.isMysteryCardDrawingOn && (
                <MysteryCardDraw/>
            )}
            {gameData.adventureCardToResolveAsEvent && (
                <CardResolve
                    card={gameData.adventureCardToResolveAsEvent}
                    eventStage={true}
                />
            )}
            {gameData.mysteryCardToResolveAsEvent && (
                <CardResolve
                    card={gameData.mysteryCardToResolveAsEvent}
                    eventStage={true}
                />
            )}

            {gameData.currentPhase === "night" && nextCamp && (
                <ConfirmCampMove
                    nextCamp={nextCamp}
                    hide={hideCampMoveConfirm}
                />
            )}

            {gameData.currentPhase === "action" &&
                !gameData.actionResolveFinished && (
                    <ActionResolveWindow/>
                )}

            {gameData.currentPhase === "weather" && (
                <WeatherResolveWindow/>
            )}
            {gameData.currentPhase === "night" && showNightTip && (
                <NightTip hideNightTip={hideNightTip}/>
            )}

            {confirmWindow ? <ConfirmWindow
                name={confirmWindow}
                onAccept={() => {
                    socketEmitter.emitAction(OTHER_CONTROLLER_ACTION.SET_NEXT_PHASE)
                    setConfirmWindow(null);
                }}
                onRefuse={() => {
                    setConfirmWindow(null)
                }}
            /> : ""}


            <DragDropContext
                onDragEnd={onDragEnd}
                onDragUpdate={onDragUpdate}
                onDragStart={onDragStart}
            >
                <Scenario
                    zIndex={topLayerElement}
                    show={showScenario}
                    contentHeight={mapHeight + actionOrderHeight}
                />
                <Phase/>
                <Morale/>
                <AllResources/>
                <Constructions
                    topLayer={topLayerElement.includes("construction")}
                />
                <MapComponent
                    topLayerElement={topLayerElement}
                    scrollDisabled={isPawnBeingDragged}
                    showScenario={showScenario}
                    showCampMoveConfirm={showCampMoveConfirm}
                    mapContainerRef={mapRef}
                />
                <CardList
                    isBeingDragged={isPawnBeingDragged}
                    topLayerElement={topLayerElement}
                />
                <Character
                    zIndex={topLayerElement}
                />

                <Health/>
                <Threat topLayer={topLayerElement.includes("threat")}/>
                <ArrangeCampRest
                    topLayer={
                        topLayerElement.includes("rest") ||
                        topLayerElement.includes("arrange camp")
                    }
                />
                <ActionsOrder
                    actionOrderContainerRef={actionOrderRef}
                />
                <div className={styles.chatLog}>
                    {/*TODO: zmień ""*/}
                    <ChatLog enableLog={true} localUser={""}/>
                </div>
                <Weather/>
                <Tokens
                    menuDisabled={isPawnBeingDragged || topLayerElement !== ""}
                />

                {/*<Players />*/}

            </DragDropContext>
            <ScenarioButton
                topLayerElement={topLayerElement}
                show={showScenario}
                toggleShowScenario={toggleShowScenario}
            />

            <ControlPanel confirmWindowOpen={!!confirmWindow} phaseChangeLocked={gameData.phaseChangeLocked}/>
        </div>
    );
}
//
