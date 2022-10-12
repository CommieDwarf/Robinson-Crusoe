import React, {useState} from "react";
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
import Players from "../../components/game/interface/players/Players";
import actionSlotStyles from "../../components/game/interface/ActionSlot.module.css";

import Threat from "../../components/game/interface/threat/Threat";
import AdditionalActivities from "../../components/game/interface/additionalActivities/AdditionalActivities";
import Equipment from "../../components/game/interface/equipment/Equipment";

import {fromJSON, parse, stringify, toJSON} from "flatted";
import {IResourcesAmount} from "../../interfaces/Resources/Resources";
import {ISideCharacterRenderData} from "../../interfaces/Characters/SideCharacter";
import getGameData from "../api/getGame";
import setPawn, {SetPawnData} from "../api/setPawn";

import {
  DragDropContext,
  DragStart,
  DragUpdate,
  DropResult,
  resetServerContext,
} from "react-beautiful-dnd";
import {GetServerSideProps} from "next";
import {WeatherAndNight} from "../../components/game/interface/WeatherAndNight/WeatherAndNight";
import {INVENTION_TYPE} from "../../interfaces/Inventions/Invention";
import {getPawnCanBeSettled} from "../../utils/canPawnBeSettled";

import {IGameRenderData} from "../../interfaces/Game";
import sleep from "../../utils/sleep";
import {IPawnRenderData} from "../../interfaces/Pawns/Pawn";
import {IPlayerCharacterRenderData} from "../../interfaces/Characters/PlayerCharacter";
import unsetPawn, {UnsetPawnData} from "../api/unsetPawn";
import {NextPhaseButton} from "../../components/game/interface/nextPhaseButton/NextPhaseButton";
import nextPhase from "../api/nextPhase";

interface Props {
  gameData: IGameRenderData;
}

export default function Game(props: Props) {
  const [gameRenderData, setGameRenderData] = useState(props.gameData);
  const actionSlots = new Map<string, IPawnRenderData | null>(
      Object.entries(gameRenderData.actionSlotsService.slots)
  );
  const [isPawnBeingDragged, setIsPawnBeingDragged] = useState(false);

  const [showScenario, setShowScenario] = useState(false);

  // Increase of proper component's z-index is necessary to render dragged pawn above other components
  // and also for proper render of scaled components
  const [zIndex, setZIndex] = useState("");

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
    setZIndex(start.source.droppableId);
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
    setZIndex("");
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

    let setPawnData: SetPawnData = {
      destinationId,
      draggableId: draggedPawn.draggableId,
    };
    setPawn(JSON.stringify(setPawnData));
    let unsetPawnData: UnsetPawnData = {
      destinationId: sourceId,
      draggableId: draggedPawn.draggableId,
    };
    unsetPawn(JSON.stringify(unsetPawnData));

    setGameRenderData(JSON.parse(getGameData()));

    // Sleep is used here, because if pawns are switched in the same time,
    // beautiful DND goes nuts and throws error that it cannot find draggable
    await sleep(100);

    if (pawnAtActionSlot) {
      setPawnData = {
        destinationId: sourceId,
        draggableId: pawnAtActionSlot.draggableId,
      };
      setPawn(JSON.stringify(setPawnData));
      setGameRenderData(JSON.parse(getGameData()));
    }
  }

  console.log(gameRenderData.logs)

  function goNextPhase() {
    nextPhase();
    setGameRenderData(JSON.parse(getGameData()));
  }

  const dog = gameRenderData.allCharacters.find(
      (char) => char.name === "dog"
  ) as ISideCharacterRenderData;
  const friday = gameRenderData.allCharacters.find(
      (char) => char.name === "friday"
  ) as ISideCharacterRenderData;
  const localPlayerCharacter = gameRenderData.allCharacters.find(
      (char) => char.id === gameRenderData.localPlayer.characterId
  ) as IPlayerCharacterRenderData;

  return (
      <div className={styles.game}>
        <DragDropContext
            onDragEnd={onDragEnd}
            onDragUpdate={onDragUpdate}
            onDragStart={onDragStart}
        >
          <Phase phase={gameRenderData.phaseService.phase}/>
          <Morale current={gameRenderData.morale.lvl}/>
          <Resources
              future={
                new Map(Object.entries(gameRenderData.allResources.future)) as Map<keyof IResourcesAmount,
                    number>
              }
              owned={
                new Map(Object.entries(gameRenderData.allResources.owned)) as Map<keyof IResourcesAmount,
                    number>
              }
          />
          <Structures
              structures={gameRenderData.structuresService.structures}
              actionSlots={actionSlots}
              zIndex={zIndex}
          />
          <MapComponent
              tiles={gameRenderData.tilesService.tiles}
              actionSlots={actionSlots}
              zIndex={zIndex}
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
              zIndex={zIndex}
              actionSlots={actionSlots}
          />
          {localPlayerCharacter && dog && friday && (
              <Character
                  character={localPlayerCharacter}
                  dog={dog}
                  friday={friday}
                  zIndex={zIndex}
              />
          )}

          <Health/>
          <Threat
              threat={gameRenderData.threat}
              actionSlots={actionSlots}
              zIndex={zIndex}
          />
          <AdditionalActivities
              activities={{
                rest: gameRenderData.rest,
                arrangeCamp: gameRenderData.arrangeCamp,
              }}
              actionSlots={actionSlots}
              zIndex={zIndex}
          />
          <Equipment equipment={gameRenderData.equipment}/>
          <ActionsOrder/>
          <ChatLog logMessages={gameRenderData.logs}/>
          <WeatherAndNight/>
          <Tokens
              tokens={[
                "additionalFood",
                "basket",
                "discovery3",
                "discovery4",
                "largeLeaves",
                "oldMachete",
                "shortcut",
              ]}
          />
          <ScenarioButton
              inventions={gameRenderData.inventionsService.inventions.filter(
                  (inv) => inv.type === INVENTION_TYPE.SCENARIO
              )}
              actionSlots={actionSlots}
              zIndex={zIndex}
              show={showScenario}
              setShow={setShowScenario}
              turn={gameRenderData.turn}
          />
          <Players/>
          <NextPhaseButton goNextPhase={goNextPhase}/>
        </DragDropContext>
      </div>
  );
}

// for beautiful DND to work correctly...
export const getStaticProps: GetServerSideProps = async ({query}) => {
  resetServerContext(); // <-- CALL RESET SERVER CONTEXT, SERVER SIDE
  const gameDataJSON = getGameData();
  const gameData = await JSON.parse(gameDataJSON);
  return {
    props: {
      gameData,
    },
  };
};
