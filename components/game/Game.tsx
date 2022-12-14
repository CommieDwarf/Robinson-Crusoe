import React, { useState } from "react";
import Phase from "../../components/game/interface/phase/Phase";
import Morale from "../../components/game/interface/morale/Morale";
import styles from "./Game.module.css";
import Resources from "../../components/game/interface/resources/Resources";
import Structures from "../../components/game/interface/structures/Structures";
import MapComponent from "../../components/game/interface/map/Map";
import Inventions from "../../components/game/interface/inventions/Inventions";
import Character from "../../components/game/interface/character/Character";
import Health from "../../components/game/interface/health/Health";
import ActionsOrder from "../../components/game/interface/actionsOrder/ActionsOrder";
import ChatLog from "../../components/game/interface/ChatLog/ChatLog";
import Tokens from "../../components/game/interface/tokens/Tokens";
import ScenarioButton from "../../components/game/interface/scenario/ScenarioButton";
import actionSlotStyles from "../../components/game/interface/ActionSlot.module.css";

import Threat from "../../components/game/interface/threat/Threat";
import ArrangeCampRest from "../../components/game/interface/ArrangeCampRest/ArrangeCampRest";
import Equipment from "../../components/game/interface/equipment/Equipment";

import { fromJSON, parse, stringify, toJSON } from "flatted";
import { IResourcesAmount } from "../../interfaces/Resources/Resources";

import {
  DragDropContext,
  DragStart,
  DragUpdate,
  DropResult,
  resetServerContext,
} from "react-beautiful-dnd";
import { GetServerSideProps } from "next";
import { Weather } from "./interface/Weather/Weather";
import { INVENTION_TYPE } from "../../interfaces/Inventions/Invention";
import { getPawnCanBeSettled } from "../../utils/canPawnBeSettled";

import { IGameRenderData } from "../../interfaces/Game";
import sleep from "../../utils/sleep";
import { IPawnRenderData } from "../../interfaces/Pawns/Pawn";
import { NextPhaseButton } from "./interface/nextPhaseButton/NextPhaseButton";
import { ActionResolveWindow } from "./interface/ActionResolveWindow/ActionResolveWindow";
import { Action } from "../../interfaces/Action";
import { setNextAction } from "../../pages/api/setNextAction";
import utilizeToken from "../../pages/api/utilizeToken";
import setNextPhase from "../../pages/api/setNextPhase";
import resolveActionItem from "../../pages/api/resolveActionItem";
import rollWeatherDices from "../../pages/api/rollWeatherDices";
import setPawn, { SetPawnData } from "../../pages/api/setPawn";
import unsetPawn, { UnsetPawnData } from "../../pages/api/unsetPawn";
import { Alerts } from "./interface/Alerts/Alerts";

interface Props {
  gameRenderData: IGameRenderData;
  updateGameRenderData: () => void;
}

export default function Game(props: Props) {
  const gameRenderData = props.gameRenderData;
  const actionSlots = new Map<string, IPawnRenderData | null>(
    Object.entries(gameRenderData.actionSlotsService.slots)
  );

  const [isPawnBeingDragged, setIsPawnBeingDragged] = useState(false);

  gameRenderData.localPlayer.character.health;
  const [showScenario, setShowScenario] = useState(false);

  // Increase of proper component's z-index is necessary to render dragged pawn above other components
  // and also for proper render of scaled components
  const [elementZIndexed, setElementZIndexed] = useState("");

  function handleSetNextAction() {
    setNextAction();
    props.updateGameRenderData();
  }

  function handleUtilizeToken(id: string) {
    utilizeToken(id);
    props.updateGameRenderData();
  }

  function handleSetNextPhase() {
    setNextPhase();
    props.updateGameRenderData();
  }

  function handleResolveActionItem(action: Action, droppableId: string) {
    resolveActionItem(action, droppableId);
    props.updateGameRenderData();
  }

  function handleRollWeatherDices() {
    rollWeatherDices();
    props.updateGameRenderData();
  }

  function handleSetPawn(destinationId: string, draggableId: string) {
    setPawn(destinationId, draggableId);
  }

  function handleUnsetPawn(destinationId: string, draggableId: string) {
    unsetPawn(destinationId, draggableId);
  }

  function unselectActionSlots() {
    actionSlots.forEach((value, key) => {
      const actionSlot = document.getElementById(key);
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
      if (getPawnCanBeSettled(pawn, destinationId)) {
        destinationSlotElement?.classList.add(actionSlotStyles.canBeSettled);
      } else {
        destinationSlotElement?.classList.add(actionSlotStyles.cantBeSettled);
      }
      const pawnAtDestination = actionSlots.get(destinationId);
      const sourceSlotElement = document.getElementById(
        update.source.droppableId
      );
      if (
        update.source.droppableId.includes("freepawns") ||
        !pawnAtDestination
      ) {
        return;
      }

      if (getPawnCanBeSettled(pawnAtDestination, update.source.droppableId)) {
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
      pawnAtActionSlot = actionSlots.get(destinationId);
      pawnAtActionSlot =
        pawnAtActionSlot === undefined ? null : pawnAtActionSlot;
    }

    if (
      !getPawnCanBeSettled(draggedPawn, destinationId) ||
      !getPawnCanBeSettled(pawnAtActionSlot, sourceId)
    ) {
      return;
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

  return (
    <div className={styles.game}>
      <DragDropContext
        onDragEnd={onDragEnd}
        onDragUpdate={onDragUpdate}
        onDragStart={onDragStart}
      >
        <Phase phase={gameRenderData.phaseService.phase} />
        <Morale current={gameRenderData.morale.lvl} />
        <Resources
          future={
            new Map(Object.entries(gameRenderData.allResources.future)) as Map<
              keyof IResourcesAmount,
              number
            >
          }
          owned={
            new Map(Object.entries(gameRenderData.allResources.owned)) as Map<
              keyof IResourcesAmount,
              number
            >
          }
        />
        <Structures
          structures={gameRenderData.structuresService.structures}
          actionSlots={actionSlots}
          zIndex={elementZIndexed}
        />
        <MapComponent
          tiles={gameRenderData.tilesService.tiles}
          actionSlots={actionSlots}
          zIndex={elementZIndexed}
          scrollDisabled={isPawnBeingDragged}
          showScenario={showScenario}
          beastCount={gameRenderData.beasts.deckCount}
          campTileId={gameRenderData.tilesService.campTileId}
        />

        <Inventions
          inventions={gameRenderData.inventionsService.inventions.filter(
            (inv) => inv.type !== INVENTION_TYPE.SCENARIO
          )}
          isBeingDragged={isPawnBeingDragged}
          zIndex={elementZIndexed}
          actionSlots={actionSlots}
        />
        <Character
          character={gameRenderData.localPlayer.character}
          dog={gameRenderData.characterService.dog}
          friday={gameRenderData.characterService.friday}
          zIndex={elementZIndexed}
        />

        <Health
          value={gameRenderData.localPlayer.character.health}
          maxHealth={gameRenderData.localPlayer.character.maxHealth}
          moraleThresholds={
            gameRenderData.localPlayer.character.moraleThresholds
          }
        />
        <Threat
          threat={gameRenderData.threat}
          actionSlots={actionSlots}
          zIndex={elementZIndexed}
        />
        <ArrangeCampRest
          arrangeCampRestService={gameRenderData.arrangeCampRestService}
          actionSlots={actionSlots}
          zIndex={elementZIndexed}
        />
        <Equipment equipment={gameRenderData.equipment} />
        <ActionsOrder />
        <ChatLog logMessages={gameRenderData.logs} />
        <Weather tokens={gameRenderData.weatherService.tokens} />
        <Tokens
          discoveryTokens={
            gameRenderData.localPlayer.character.tokenService.owned
          }
          utilizeToken={handleUtilizeToken}
          menuDisabled={isPawnBeingDragged || elementZIndexed !== ""}
        />
        <ScenarioButton
          inventions={gameRenderData.inventionsService.inventions.filter(
            (inv) => inv.type === INVENTION_TYPE.SCENARIO
          )}
          actionSlots={actionSlots}
          zIndex={elementZIndexed}
          show={showScenario}
          setShow={setShowScenario}
          round={gameRenderData.round}
        />
        {/*<Players />*/}
        <NextPhaseButton
          goNextPhase={handleSetNextPhase}
          locked={gameRenderData.phaseService.locked}
        />
      </DragDropContext>
      {gameRenderData.phaseService.phase === "action" && (
        <ActionResolveWindow
          actionService={gameRenderData.actionService}
          actionSlots={actionSlots}
          setNextAction={handleSetNextAction}
          resolveItem={handleResolveActionItem}
          setNextPhase={handleSetNextPhase}
        />
      )}
      <Alerts message={gameRenderData.alertService.alert} />
      {/*<WeatherResolveWindow*/}
      {/*  weatherService={gameRenderData.weatherService}*/}
      {/*  round={gameRenderData.round}*/}
      {/*  structuresService={gameRenderData.structuresService}*/}
      {/*  resourcesAmount={gameRenderData.allResources.owned}*/}
      {/*  handleRollWeatherDices={rollWeather}*/}
      {/*  dices={gameRenderData.scenarioService.weather}*/}
      {/*  skillService={gameRenderData.localPlayer.character.skillService}*/}
      {/*  determination={gameRenderData.localPlayer.character.determination}*/}
      {/*/>*/}
    </div>
  );
}
//
