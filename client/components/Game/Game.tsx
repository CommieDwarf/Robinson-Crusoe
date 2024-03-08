import React, {useLayoutEffect, useRef, useState} from "react";
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

import {useAppSelector} from "../../store/hooks";

import CardResolve from "./UI/CardResolve/CardResolve";

import {CardList} from "./UI/CardList/CardList";

import {ConfirmWindow} from "./UI/ConfirmWindow/ConfirmWindow";
import {CONFIRM_WINDOW} from "./UI/ConfirmWindow/messages";
import Scenario from "./UI/Scenario/Scenario";
import {canPawnBeSettled} from "@shared/utils/canPawnBeSettled";
import {IBasicResourcesAmount} from "@shared/types/Game/Resources/Resources";
import {INVENTION_TYPE} from "@shared/types/Game/InventionService/Invention";
import {IGameRenderData} from "@shared/types/Game/Game";
import {ITileRenderData} from "@shared/types/Game/TileService/ITile";
import {emitAction} from "../../pages/api/emitAction";
import {CHARACTER_CONTROLLER_ACTION, OTHER_CONTROLLER_ACTION} from "@shared/types/CONTROLLER_ACTION";
import {socket} from "../../pages/_app";
import {MethodData} from "@shared/types/MethodData";


interface Props {
    gameRenderData: IGameRenderData;
}

export default function Game(props: Props) {
    const gameRenderData = props.gameRenderData;
    const [isPawnBeingDragged, setIsPawnBeingDragged] = useState(false);

    gameRenderData.localPlayer.character.health;
    const [showScenario, setShowScenario] = useState(false);
    // Increase of proper component's z-index is necessary to render dragged pawn above other components
    // and also for proper render of scaled components
    const [elementZIndexed, setElementZIndexed] = useState("");
    const [showNightTip, setShowNightTip] = useState(true);
    const [nextCamp, setNextCamp] = useState<ITileRenderData | null>(null);


    const actionSlots = useAppSelector((state) => state.actionSlots.slots);

    const [confirmWindow, setConfirmWindow] = useState<null | CONFIRM_WINDOW>(null);

    const mapRef = useRef<HTMLDivElement>(null)
    const [mapHeight, setMapHeight] = useState<number>(0);
    const actionOrderRef = useRef<HTMLDivElement>(null);
    const [actionOrderHeight, setActionOrderHeight] = useState<number>(0);


    useLayoutEffect(() => {
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
        Object.entries(actionSlots).forEach(([droppableID, pawn]) => {
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
        setElementZIndexed(start.source.droppableId);
        setIsPawnBeingDragged(true);
    }

    function onDragUpdate(update: DragUpdate) {
        console.log("draggableId", update.draggableId)
        unselectActionSlots();
        const pawn = gameRenderData.allPawns.find(
            (p) => p.draggableId === update.draggableId
        );
        const destinationId = update.destination?.droppableId;
        if (
            destinationId?.includes("owner") ||
            destinationId === update.source.droppableId
        ) {
            return;
        }


        if (destinationId && pawn) {
            const destinationSlotElement = document.getElementById(destinationId);

            if (canPawnBeSettled(pawn, destinationId)) {
                destinationSlotElement?.classList.add(actionSlotStyles.canBeSettled);
            } else {
                destinationSlotElement?.classList.add(actionSlotStyles.cantBeSettled);
            }
            const pawnAtDestination = actionSlots[destinationId];
            const sourceSlotElement = document.getElementById(
                update.source.droppableId
            );
            if (
                update.source.droppableId.includes("owner") ||
                !pawnAtDestination
            ) {
                return;
            }

            if (canPawnBeSettled(pawnAtDestination, update.source.droppableId)) {
                sourceSlotElement?.classList.add(actionSlotStyles.canBeSettled);
            } else {
                sourceSlotElement?.classList.add(actionSlotStyles.cantBeSettled);
            }
        }
    }

    async function onDragEnd(result: DropResult) {
        setElementZIndexed("");
        setIsPawnBeingDragged(false);
        unselectAllActionSlots();
        const destinationId = result.destination?.droppableId;
        const sourceId = result.source.droppableId;
        const draggedPawn = gameRenderData.allPawns.find(
            (p) => p.draggableId === result.draggableId
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
            pawnAtActionSlot = actionSlots[destinationId];
            pawnAtActionSlot =
                pawnAtActionSlot === undefined ? null : pawnAtActionSlot;
        }

        if (
            !canPawnBeSettled(draggedPawn, destinationId) ||
            !canPawnBeSettled(pawnAtActionSlot, sourceId)
        ) {

            return;
        }


        //TODO: przenies moze logike do gry
        const canAffordItem: boolean = await new Promise((resolve, reject) => {
            const methodData: MethodData = {
                methodName: "shouldCommitResources",
                methodArgs: [destinationId]
            }
            socket.emit("executeGameMethodAndSendResponse", methodData);
            socket.on("gameMethodResponse", (result: boolean) => {
                socket.off("gameMethodResponse");
                resolve(result);
            })
        })

        if (!canAffordItem) {
            //TODO zrob stan dla alerta
            // handleSetAlert("Brakuje materiałów")
            return;
        }

        emitAction(CHARACTER_CONTROLLER_ACTION.SET_PAWN, destinationId, draggedPawn.draggableId)
        emitAction(CHARACTER_CONTROLLER_ACTION.UNSET_PAWN, sourceId, draggedPawn.draggableId)

        // Sleep is used here, because if both pawns are switched in the same time,
        // beautiful DND loses draggable.
        await sleep(100);

        if (pawnAtActionSlot) {
            emitAction(CHARACTER_CONTROLLER_ACTION.SET_PAWN, sourceId, pawnAtActionSlot.draggableId)
        }
    }

    const scenarioInventions = gameRenderData.inventionService.inventions.filter(
        (inv) => inv.inventionType === INVENTION_TYPE.SCENARIO
    );

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
            {props.gameRenderData.adventureService.currentCard && (
                <CardResolve
                    renderData={props.gameRenderData.adventureService.currentCard}
                    eventStage={false}
                />
            )}
            {props.gameRenderData.mysteryService.isDrawingOn && (
                <CardResolve
                    renderData={props.gameRenderData.mysteryService}
                    eventStage={false}
                />
            )}
            {props.gameRenderData.eventService.currentAdventureCard && (
                <CardResolve
                    renderData={props.gameRenderData.eventService.currentAdventureCard}
                    eventStage={true}
                />
            )}
            {props.gameRenderData.eventService.currentMysteryCard && (
                <CardResolve
                    renderData={props.gameRenderData.eventService.currentMysteryCard}
                    eventStage={true}
                />
            )}

            {props.gameRenderData.phaseService.phase === "night" && nextCamp && (
                <ConfirmCampMove
                    currentCamp={props.gameRenderData.tileService.campTile}
                    nextCamp={nextCamp}
                    hide={hideCampMoveConfirm}
                />
            )}


            <DragDropContext
                onDragEnd={onDragEnd}
                onDragUpdate={onDragUpdate}
                onDragStart={onDragStart}
            >
                <Scenario
                    zIndex={elementZIndexed}
                    inventions={gameRenderData.inventionService.inventions.filter((card) => card.inventionType === INVENTION_TYPE.SCENARIO)}
                    show={showScenario}
                    contentHeight={mapHeight + actionOrderHeight}
                    round={gameRenderData.round}
                    scenario={gameRenderData.scenarioService}
                />
                <Phase phase={gameRenderData.phaseService.phase}/>
                <Morale current={gameRenderData.moraleService.lvl}/>
                <AllResources
                    future={{
                        tokenAmount: gameRenderData.tokenService.future.length,
                        treasureAmount:
                        gameRenderData.resourceService.future.treasures.length,
                        basic: new Map(
                            Object.entries(gameRenderData.resourceService.future.basic)
                        ) as Map<keyof IBasicResourcesAmount, number>,
                    }}
                    owned={{
                        tokenAmount: gameRenderData.tokenService.owned.length,
                        treasureAmount:
                        gameRenderData.resourceService.owned.treasures.length,
                        basic: new Map(
                            Object.entries(gameRenderData.resourceService.owned.basic)
                        ) as Map<keyof IBasicResourcesAmount, number>,
                    }}
                />
                <Constructions
                    constructions={gameRenderData.constructionService.constructions}
                    zIndex={elementZIndexed}
                    ownedResources={gameRenderData.resourceService.owned.basic}
                    naturalShelter={gameRenderData.tileService.campTile.tileResourceService?.extras.naturalShelter || false}
                />
                <MapComponent
                    tileService={gameRenderData.tileService}
                    zIndex={elementZIndexed}
                    scrollDisabled={isPawnBeingDragged}
                    showScenario={showScenario}
                    beastCount={gameRenderData.beastService.deckCount}
                    night={gameRenderData.phaseService.phase === "night"}
                    showCampMoveConfirm={showCampMoveConfirm}
                    containerRef={mapRef}
                />

                <CardList
                    inventions={gameRenderData.inventionService.inventions.filter(
                        (inv) => inv.inventionType !== INVENTION_TYPE.SCENARIO
                    )}
                    mysteryCards={[...gameRenderData.resourceService.owned.treasures, ...gameRenderData.mysteryService.cardsAsReminders]}
                    items={gameRenderData.equipmentService.items}
                    isBeingDragged={isPawnBeingDragged}
                    zIndex={elementZIndexed}
                />
                <Character
                    character={gameRenderData.localPlayer.character}
                    dog={gameRenderData.characterService.dog}
                    friday={gameRenderData.characterService.friday}
                    zIndex={elementZIndexed}
                    overallWeather={gameRenderData.weatherService.overallWeather}
                />

                <Health
                    value={gameRenderData.localPlayer.character.health}
                    maxHealth={gameRenderData.localPlayer.character.maxHealth}
                    moraleThresholds={
                        gameRenderData.localPlayer.character.moraleThresholds
                    }
                    characterService={
                        gameRenderData.characterService
                    }
                />
                <Threat threat={gameRenderData.eventService} zIndex={elementZIndexed}/>
                <ArrangeCampRest
                    arrangeCampRestService={gameRenderData.arrangeCampRestService}
                    zIndex={
                        elementZIndexed.includes("rest") ||
                        elementZIndexed.includes("arrange camp")
                    }
                />
                <ActionsOrder
                    adventureTokens={gameRenderData.actionService.adventureTokens}
                    reRollTokens={gameRenderData.actionService.reRollTokens}
                    globalCostModifiers={gameRenderData.actionService.globalCostModifiers}
                    containerRef={actionOrderRef}
                />
                <ChatLog logMessages={gameRenderData.logs}/>
                <Weather tokens={gameRenderData.weatherService.tokens}/>
                <Tokens
                    owned={gameRenderData.tokenService.owned}
                    future={gameRenderData.tokenService.future}
                    menuDisabled={isPawnBeingDragged || elementZIndexed !== ""}
                />

                {/*<Players />*/}
                <NextPhaseButton
                    locked={gameRenderData.phaseService.locked || !!confirmWindow}
                />
            </DragDropContext>
            <ScenarioButton
                inventions={scenarioInventions}
                zIndex={elementZIndexed}
                show={showScenario}
                setShow={setShowScenario}
                round={gameRenderData.round}
                scenario={gameRenderData.scenarioService}
            />
            {gameRenderData.phaseService.phase === "action" &&
                !gameRenderData.actionService.finished && (
                    <ActionResolveWindow
                        actionService={gameRenderData.actionService}
                    />
                )}
            <Alerts message={gameRenderData.alertService.alert}/>

            {gameRenderData.phaseService.phase === "weather" && (
                <WeatherResolveWindow
                    weatherService={gameRenderData.weatherService}
                    round={gameRenderData.round}
                    constructionService={gameRenderData.constructionService}
                    resourcesAmount={gameRenderData.resourceService.owned.basic}
                    dices={gameRenderData.scenarioService.weather}
                    skills={gameRenderData.localPlayer.character.skills}
                    determination={gameRenderData.localPlayer.character.determination}
                />
            )}
            {gameRenderData.phaseService.phase === "night" && showNightTip && (
                <NightTip hideNightTip={hideNightTip}/>
            )}

            {confirmWindow ? <ConfirmWindow
                name={confirmWindow}
                onAccept={() => {
                    emitAction(OTHER_CONTROLLER_ACTION.SET_NEXT_PHASE)
                    setConfirmWindow(null);
                }}
                onRefuse={() => {
                    setConfirmWindow(null)
                }}
            /> : ""}


        </div>
    );
}
//
