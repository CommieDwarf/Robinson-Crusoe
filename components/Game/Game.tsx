import React, {useLayoutEffect, useRef, useState} from "react";
import Phase from "./UI/phase/Phase";
import Morale from "./UI/morale/Morale";
import styles from "./Game.module.css";
import AllResources from "./UI/AllResources/AllResources";
import Constructions from "./UI/Constructions/Constructions";
import MapComponent from "./UI/map/Map";
import Character from "./UI/character/Character";
import Health from "./UI/health/Health";
import ActionsOrder from "./UI/actionsOrder/ActionsOrder";
import ChatLog from "./UI/ChatLog/ChatLog";
import Tokens from "./UI/tokens/Tokens";
import ScenarioButton from "./UI/scenario/ScenarioButton";
import actionSlotStyles from "./UI/ActionSlot.module.css";

import Threat from "./UI/threat/Threat";
import ArrangeCampRest from "./UI/ArrangeCampRest/ArrangeCampRest";

import {IBasicResourcesAmount} from "../../interfaces/Resources/Resources";

import {DragDropContext, DragStart, DragUpdate, DropResult,} from "react-beautiful-dnd";
import {Weather} from "./UI/Weather/Weather";
import {INVENTION_TYPE} from "../../interfaces/InventionService/Invention";
import {canPawnBeSettled} from "../../utils/canPawnBeSettled";

import {IGameRenderData} from "../../interfaces/Game";
import {NextPhaseButton} from "./UI/nextPhaseButton/NextPhaseButton";
import {ActionResolveWindow} from "./UI/ActionResolveWindow/ActionResolveWindow";
import {setNextAction} from "../../pages/api/setNextAction";
import utilizeToken from "../../pages/api/utilizeToken";
import setNextPhase from "../../pages/api/setNextPhase";
import resolveActionItem from "../../pages/api/resolveActionItem";
import rollWeatherDices from "../../pages/api/rollWeatherDices";
import setPawn from "../../pages/api/setPawn";
import unsetPawn from "../../pages/api/unsetPawn";
import {Alerts} from "./UI/Alerts/Alerts";
import {WeatherResolveWindow} from "./UI/WeatherResolveWindow/WeatherResolveWindow";
import {NightTip} from "./UI/NightTip/NightTip";
import moveCamp from "../../pages/api/moveCamp";
import {ITileRenderData} from "../../interfaces/TileService/ITile";
import {ConfirmCampMove} from "./UI/ConfirmCampMove/ConfirmCampMove";
import {sleep} from "../../utils/sleep";
import rollActionDices from "../../pages/api/rollActionDices";
import triggerTileResourceAction from "../../pages/api/triggerTileResourceAction";
import reRollActionDice from "../../pages/api/reRollActionDice";
import utilizeSkill from "../../pages/api/useSkill";
import {ActionDice} from "../../interfaces/RollDice/RollDice";
import {useAppSelector} from "../../store/hooks";
import resolveAdventureCard from "../../pages/api/resolveAdventureCard";
import setAlert from "../../pages/api/setAlert";


import CardResolve from "./UI/CardResolve/CardResolve";
import drawMysteryCard from "../../pages/api/drawMysteryCard";
import finishDrawingMysteryCards from "../../pages/api/finishDrawingMysteryCards";
import {CardList} from "./UI/CardList/CardList";
import triggerTileAction from "../../pages/api/triggerTileAction";
import canAffordItem from "../../pages/api/canAffordItem";
import shouldCommitResources from "../../pages/api/shouldCommitResources";
import resolveEventAdventure from "../../pages/api/resolveEventAdventure";
import resolveEventMystery from "../../pages/api/resolveMysteryCard";
import triggerDrawEffect from "../../pages/api/triggerDrawEffect";
import removeHealthThreshold from "../../pages/api/removeHealthTreshold";
import utilizeMysteryCard from "../../pages/api/utilizeMysteryCard";
import manageCardStorage from "../../pages/api/manageCardStorage";
import {StorageAction} from "../../interfaces/MysteryService/StorageCard";
import utilizeInvention from "../../pages/api/utilizeInvention";
import addWoodToStash from "../../pages/api/addWoodToStash";
import {CONSTRUCTION} from "../../interfaces/ConstructionService/Construction";
import switchCommittedResources from "../../pages/api/switchCommittedResources";
import {Background} from "./UI/Background/Background";
import setBibleUsage from "../../pages/api/setBibleUsage";
import {ITEM} from "../../interfaces/Equipment/Item";
import utilizeItem from "../../pages/api/utilizeItem";
import {IPlayerCharacter} from "../../interfaces/Characters/PlayerCharacter";
import {Cloud} from "../../interfaces/Weather/Weather";
import {ConfirmWindow} from "./UI/ConfirmWindow/ConfirmWindow";
import {CONFIRM_WINDOW} from "./UI/ConfirmWindow/messages";


interface Props {
    gameRenderData: IGameRenderData;
    updateGameRenderData: () => void;
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

    const gameRef = useRef<HTMLDivElement>(null);
    const [gameHeight, setGameHeight] = useState<number>(0);

    useLayoutEffect(() => {
        const current = gameRef.current
        if (current) {
            setGameHeight(current.offsetHeight);
        }
    }, [])


    function useReRollSkill(dice: ActionDice) {
        // Fixed for now
        utilizeSkill("scrounger", "cook", dice);
        props.updateGameRenderData();
    }

    function handleResolveAdventureCard(option: 1 | 2) {
        resolveAdventureCard(option, gameRenderData.localPlayer.character.name);
        props.updateGameRenderData();
    }

    function handleDrawOrFinishMysteryCard(action: 1 | 2) {
        if (action === 1) {
            drawMysteryCard();
        } else if (action === 2) {
            finishDrawingMysteryCards();
        }
        props.updateGameRenderData();
    }

    function handleTriggerDrawEffect() {
        triggerDrawEffect();
        props.updateGameRenderData();
    }

    function handleSetNextAction() {
        setNextAction();
        props.updateGameRenderData();
    }

    function handleReRollActionDice(resolvableItemID: string) {
        reRollActionDice(resolvableItemID);
        props.updateGameRenderData();
    }

    function handleUtilizeToken(id: string, targetName: string | null = null) {
        utilizeToken(id, targetName);
        props.updateGameRenderData();
    }

    function handleSetNextPhase() {

        if (gameRenderData.characterService.areSomePawnsUnassigned &&
            gameRenderData.phaseService.phase === "preAction" &&
            !confirmWindow
        ) {
            setConfirmWindow(CONFIRM_WINDOW.GO_ACTION_PHASE);

        } else {
            setNextPhase();
        }
        props.updateGameRenderData();
        setShowNightTip(true);
    }

    function handleRollActionDices(resolvableItemID: string) {
        rollActionDices(resolvableItemID);
        props.updateGameRenderData();
    }

    function handleResolveActionItem(resolvableItemID: string) {
        resolveActionItem(resolvableItemID);
        props.updateGameRenderData();
    }

    function handleRollWeatherDices() {
        rollWeatherDices();
        props.updateGameRenderData();
    }

    function handleSetPawn(destinationId: string, draggableId: string) {
        setPawn(destinationId, draggableId);
    }

    function handleUnsetPawn(droppableId: string, draggableId: string) {
        unsetPawn(droppableId, draggableId);
    }

    function handleMoveCamp(tileID: number) {
        moveCamp(tileID);
        props.updateGameRenderData();
    }

    function handleTileResourceAction(tileID: number, side: "left" | "right") {
        triggerTileResourceAction(tileID, side);
        props.updateGameRenderData();
    }

    function handleTileAction(tileID: number) {
        triggerTileAction(tileID);
        props.updateGameRenderData();
    }

    function handleEventAdventureResolve(option: 1 | 2) {
        resolveEventAdventure(option);
        props.updateGameRenderData();
    }

    function handleEventMysteryResolve(option: 1 | 2) {
        resolveEventMystery();
        props.updateGameRenderData();
    }

    function handleHealthThresholdRemoval(threshold: number) {
        removeHealthThreshold(threshold);
        props.updateGameRenderData();
    }

    function handleUseMysteryCard(cardName: string) {
        utilizeMysteryCard(cardName);
        props.updateGameRenderData();
    }

    function handleCardStorage(cardName: string, type: "mystery", action: StorageAction) {
        manageCardStorage(cardName, type, action);
        props.updateGameRenderData();
    }

    function handleAddWoodToStash() {
        addWoodToStash();
        props.updateGameRenderData();
    }

    function handleUseInvention(name: string) {
        utilizeInvention(name);
        props.updateGameRenderData();
    }

    function handleSwitchCommittedResources(construction: CONSTRUCTION) {
        switchCommittedResources(construction);
        props.updateGameRenderData();
    }

    function handleSetBibleUsage(resolvableItemId: string, value: boolean) {
        setBibleUsage(resolvableItemId, value);
        props.updateGameRenderData();
    }

    function handleUseItem(item: ITEM) {
        utilizeItem(item);
        props.updateGameRenderData();
    }

    function handleUseSkill(character: string, skillName: string, target: IPlayerCharacter | ActionDice | Cloud | null = null) {
        utilizeSkill(skillName, character, target);
        props.updateGameRenderData();
    }

    function handleSetAlert(msg: string) {
        setAlert(msg);
        props.updateGameRenderData();
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
        unselectActionSlots();
        const pawn = gameRenderData.allPawns.find(
            (p) => p.draggableId === update.draggableId
        );
        const destinationId = update.destination?.droppableId;
        if (
            destinationId?.includes("freepawns") ||
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
                update.source.droppableId.includes("freepawns") ||
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
            (destinationId.includes("freepawns") && sourceId.includes("freepawns"))
        ) {
            return;
        }
        let pawnAtActionSlot = null;
        if (!destinationId.includes("freepawns")) {
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

        if (shouldCommitResources(destinationId)) {
            if (!canAffordItem(destinationId)) {
                handleSetAlert("Brakuje materiałów")
                return;
            }
        }

        handleSetPawn(destinationId, draggedPawn.draggableId);
        handleUnsetPawn(sourceId, draggedPawn.draggableId);

        props.updateGameRenderData();

        // Sleep is used here, because if both pawns are switched in the same time,
        // beautiful DND loses draggable.
        await sleep(100);

        if (pawnAtActionSlot) {
            setPawn(sourceId, pawnAtActionSlot.draggableId);
            props.updateGameRenderData();
        }
    }

    const scenarioInventions = gameRenderData.inventionService.inventions.filter(
        (inv) => inv.inventionType === INVENTION_TYPE.SCENARIO
    );

    const gameStyle = {
        fontSize: gameHeight / 100
    }


    return (
        <div className={styles.game} ref={gameRef} style={gameStyle}>
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
                    resolve={handleResolveAdventureCard}
                    eventStage={false}
                    triggerDrawEffect={() => {
                    }}
                />
            )}
            {props.gameRenderData.mysteryService.isDrawingOn && (
                <CardResolve
                    renderData={props.gameRenderData.mysteryService}
                    resolve={handleDrawOrFinishMysteryCard}
                    eventStage={false}
                    triggerDrawEffect={handleTriggerDrawEffect}
                />
            )}
            {props.gameRenderData.eventService.currentAdventureCard && (
                <CardResolve
                    renderData={props.gameRenderData.eventService.currentAdventureCard}
                    resolve={handleEventAdventureResolve}
                    eventStage={true}
                    triggerDrawEffect={() => {
                    }}
                />
            )}
            {props.gameRenderData.eventService.currentMysteryCard && (
                <CardResolve
                    renderData={props.gameRenderData.eventService.currentMysteryCard}
                    resolve={handleEventMysteryResolve}
                    eventStage={true}
                    triggerDrawEffect={() => {
                    }}
                />
            )}

            {props.gameRenderData.phaseService.phase === "night" && nextCamp && (
                <ConfirmCampMove
                    currentCamp={props.gameRenderData.tileService.campTile}
                    nextCamp={nextCamp}
                    moveCamp={handleMoveCamp}
                    hide={hideCampMoveConfirm}
                />
            )}
            <DragDropContext
                onDragEnd={onDragEnd}
                onDragUpdate={onDragUpdate}
                onDragStart={onDragStart}
            >
                <Phase phase={gameRenderData.phaseService.phase}/>
                <Morale current={gameRenderData.moraleService.lvl}/>
                <AllResources
                    future={{
                        tokenAmount: gameRenderData.resourceService.future.tokens.length,
                        treasureAmount:
                        gameRenderData.resourceService.future.treasures.length,
                        basic: new Map(
                            Object.entries(gameRenderData.resourceService.future.basic)
                        ) as Map<keyof IBasicResourcesAmount, number>,
                    }}
                    owned={{
                        tokenAmount: gameRenderData.resourceService.owned.tokens.length,
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
                    switchCommittedResources={handleSwitchCommittedResources}
                    ownedResources={gameRenderData.resourceService.owned.basic}
                />
                <MapComponent
                    tileService={gameRenderData.tileService}
                    zIndex={elementZIndexed}
                    scrollDisabled={isPawnBeingDragged}
                    showScenario={showScenario}
                    beastCount={gameRenderData.beastService.deckCount}
                    night={gameRenderData.phaseService.phase === "night"}
                    showCampMoveConfirm={showCampMoveConfirm}
                    triggerTileResourceAction={handleTileResourceAction}
                    triggerTileAction={handleTileAction}
                />

                <CardList
                    inventions={gameRenderData.inventionService.inventions.filter(
                        (inv) => inv.inventionType !== INVENTION_TYPE.SCENARIO
                    )}
                    mysteryCards={[...gameRenderData.resourceService.owned.treasures, ...gameRenderData.mysteryService.cardsAsReminders]}
                    items={gameRenderData.equipmentService.items}
                    isBeingDragged={isPawnBeingDragged}
                    zIndex={elementZIndexed}
                    useMysteryCard={handleUseMysteryCard}
                    useInventionCard={handleUseInvention}
                    useItem={handleUseItem}
                    manageStorage={handleCardStorage}
                />
                <Character
                    character={gameRenderData.localPlayer.character}
                    dog={gameRenderData.characterService.dog}
                    friday={gameRenderData.characterService.friday}
                    zIndex={elementZIndexed}
                    useSkill={handleUseSkill}
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
                    removeThreshold={handleHealthThresholdRemoval}
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
                />
                <ChatLog logMessages={gameRenderData.logs}/>
                <Weather tokens={gameRenderData.weatherService.tokens}/>
                <Tokens
                    discoveryTokens={gameRenderData.tokenService.owned}
                    utilizeToken={handleUtilizeToken}
                    menuDisabled={isPawnBeingDragged || elementZIndexed !== ""}
                />
                <ScenarioButton
                    inventions={scenarioInventions}
                    zIndex={elementZIndexed}
                    show={showScenario}
                    setShow={setShowScenario}
                    round={gameRenderData.round}
                    scenario={gameRenderData.scenarioService}
                    addWoodToStash={handleAddWoodToStash}
                />
                {/*<Players />*/}
                <NextPhaseButton
                    goNextPhase={handleSetNextPhase}
                    locked={gameRenderData.phaseService.locked || !!confirmWindow}
                />
            </DragDropContext>
            {gameRenderData.phaseService.phase === "action" &&
                !gameRenderData.actionService.finished && (
                    <ActionResolveWindow
                        actionService={gameRenderData.actionService}
                        setNextAction={handleSetNextAction}
                        resolveItem={handleResolveActionItem}
                        setNextPhase={handleSetNextPhase}
                        rollDices={handleRollActionDices}
                        reRoll={handleReRollActionDice}
                        useReRollSkill={useReRollSkill}
                        setBibleUsage={handleSetBibleUsage}
                    />
                )}
            <Alerts message={gameRenderData.alertService.alert}/>

            {gameRenderData.phaseService.phase === "weather" && (
                <WeatherResolveWindow
                    weatherService={gameRenderData.weatherService}
                    round={gameRenderData.round}
                    constructionService={gameRenderData.constructionService}
                    resourcesAmount={gameRenderData.resourceService.owned.basic}
                    rollWeatherDices={handleRollWeatherDices}
                    dices={gameRenderData.scenarioService.weather}
                    skills={gameRenderData.localPlayer.character.skills}
                    determination={gameRenderData.localPlayer.character.determination}
                    setNextPhase={handleSetNextPhase}
                />
            )}
            {gameRenderData.phaseService.phase === "night" && showNightTip && (
                <NightTip hideNightTip={hideNightTip}/>
            )}
            {confirmWindow ? <ConfirmWindow
                name={confirmWindow}
                onAccept={() => {
                    handleSetNextPhase();
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
