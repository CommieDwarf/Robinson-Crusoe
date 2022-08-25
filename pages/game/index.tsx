import React, { useEffect, useState } from "react";
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
import Chat from "../../components/game/interface/chat/Chat";
import Tokens from "../../components/game/interface/tokens/Tokens";
import ScenarioButton from "../../components/game/interface/scenario/ScenarioButton";
import Players from "../../components/game/interface/players/Players";
import actionSlotStyles from "../../components/game/interface/ActionSlot.module.css";
import _ from "lodash";

import { GameClass } from "../../server/Classes/Game";
import Threat from "../../components/game/interface/threat/Threat";
import AdditionalActivities from "../../components/game/interface/additionalActivities/AdditionalActivities";
import Equipment from "../../components/game/interface/equipment/Equipment";

import { parse, stringify, toJSON, fromJSON } from "flatted";
import { IResourcesAmount } from "../../interfaces/Resources/Resources";
import Entries from "../../interfaces/Entries";
import { ISideCharacter } from "../../interfaces/Characters/SideCharacter";
import getGameData from "../api/getGame";
import setPawn from "../api/setPawn";

import {
  DragDropContext,
  Draggable,
  DragStart,
  DragUpdate,
  DropResult,
  resetServerContext,
  ResponderProvided,
} from "react-beautiful-dnd";
import { GetServerSideProps } from "next";
import { WeatherAndNight } from "../../components/game/interface/WeatherAndNight/WeatherAndNight";
import { INVENTION_TYPE } from "../../interfaces/Inventions/Invention";
import { getPawnCanBeSettled } from "../../utils/canPawnBeSettled";

import { IGame } from "../../interfaces/Game";
import sleep from "../../utils/sleep";
import { IPawn } from "../../interfaces/Pawns/Pawn";
import getComponentNameFromSourceId from "../../utils/getComponentNameFromSourceId";
import { player } from "../../server/Classes/Game";
import { GameData } from "../../interfaces/GameData/GameData";

interface Props {
  gameData: JSON;
}

function objToMap<T>(obj: T): Map<keyof T, any> {
  return new Map(Object.entries(obj) as Entries<T>);
}

export default function Game(props: Props) {
  const [game, setGame] = useState<IGame>(new GameClass([player], "castaways"));

  const [gameData, setGameData] = useState<GameData>(fromJSON(props.gameData));

  const [isPawnBeingDragged, setIsPawnBeingDragged] = useState(false);

  // Increase of proper component's z-index is necessary to render dragged pawn above other components
  // and also for proper render of scaled components
  const [zIndexIncreased, setZIndexIncreased] = useState<Map<string, boolean>>(
    new Map()
  );
  const [showScenario, setShowScenario] = useState(false);

  function unselectActionSlots() {
    game.actionSlotsService.slots.forEach((value, key) => {
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

  function resetAllZIndexes() {
    setZIndexIncreased((prev) => {
      const copy = new Map(prev);
      copy.forEach((value, key) => {
        copy.set(key, false);
      });
      return copy;
    });
  }

  function onDragStart(start: DragStart) {
    const componentName = getComponentNameFromSourceId(
      start.source.droppableId
    );
    resetAllZIndexes();
    setZIndexIncreased((prev) => {
      const copy = new Map(prev);
      copy.set(componentName, true);
      return copy;
    });
  }

  function onDragUpdate(update: DragUpdate) {
    unselectActionSlots();
    const pawn = game.allPawns.find(
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
      const pawnAtDestination = game.actionSlotsService.getPawn(destinationId);
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
    resetAllZIndexes();
    unselectAllActionSlots();
    const destinationId = result.destination?.droppableId;
    const sourceId = result.source.droppableId;
    const draggedPawn = game.allPawns.find(
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
    let pawnAtActionSlot: null | IPawn = null;
    if (!destinationId.includes("freepawns")) {
      pawnAtActionSlot = game.actionSlotsService.getPawn(destinationId);
    }

    if (
      !getPawnCanBeSettled(draggedPawn, destinationId) ||
      !getPawnCanBeSettled(pawnAtActionSlot, sourceId)
    ) {
      return;
    }

    // setGame((prev) => {
    //   prev.setPawn(destinationId, draggedPawn);
    //   prev.unsetPawn(sourceId, result.draggableId);
    //   return _.cloneDeep(prev);
    // });

    const setPawnData = {
      destinationId,
      draggableId: draggedPawn.draggableId,
    };

    setPawn(toJSON(setPawnData));

    // Sleep is used here, because if pawns are switched in the same time,
    // beautiful DND goes nuts and throws error that it cannot find draggable
    await sleep(100);

    // if (pawnAtActionSlot) {
    //   setGame((prev) => {
    //     prev.setPawn(sourceId, pawnAtActionSlot as IPawn);
    //     return _.cloneDeep(prev);
    //   });
    // }

    const gameDataJSON = await getGameData();

    const gameData = await fromJSON(gameDataJSON);
    setGameData(gameData);
  }

  const actionSlots = new Map<string, IPawn | null>(
    Object.entries(gameData.actionSlots)
  );
  console.log(actionSlots);

  return (
    <div className={styles.game}>
      <DragDropContext
        onDragEnd={onDragEnd}
        onDragUpdate={onDragUpdate}
        onDragStart={onDragStart}
      >
        <Phase phase="production" />
        <Morale current={3} />
        <Resources
          future={
            new Map(Object.entries(gameData.allResources.future)) as Map<
              keyof IResourcesAmount,
              number
            >
          }
          owned={
            new Map(Object.entries(gameData.allResources.owned)) as Map<
              keyof IResourcesAmount,
              number
            >
          }
        />
        <Structures
          structures={game.structuresService.structures}
          actionSlots={game.actionSlotsService.slots}
          zIndexIncreased={zIndexIncreased}
        />
        <MapComponent
          tiles={game.tilesService.tiles}
          actionSlots={game.actionSlotsService.slots}
          zIndexIncreased={zIndexIncreased}
          scrollDisabled={isPawnBeingDragged}
          showScenario={showScenario}
          beastCount={game.beasts.deckCount}
        />

        <Inventions
          inventions={gameData.inventions}
          isBeingDragged={isPawnBeingDragged}
          zIndexIncreased={zIndexIncreased}
          actionSlots={actionSlots}
        />
        <Character
          character={gameData.localPlayer.getCharacter()}
          dog={game.allCharacters.getCharacter("dog") as ISideCharacter}
          friday={game.allCharacters.getCharacter("friday") as ISideCharacter}
          zIndexIncreased={zIndexIncreased}
          setZIndexIncreased={setZIndexIncreased}
        />
        <Health />
        <Threat
          threat={game.threat}
          actionSlots={game.actionSlotsService.slots}
        />
        <AdditionalActivities
          activities={{
            rest: game.rest,
            arrange: game.arrangeCamp,
          }}
          actionSlots={game.actionSlotsService.slots}
        />
        <Equipment equipment={game.equipment} />
        <ActionsOrder />
        <Chat />
        <WeatherAndNight />
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
          inventions={game.inventionsService.inventions.filter(
            (inv) => inv.type !== INVENTION_TYPE.SCENARIO
          )}
          actionSlots={game.actionSlotsService.slots}
          zIndexIncreased={zIndexIncreased}
          show={showScenario}
          setShow={setShowScenario}
        />
        <Players />
      </DragDropContext>
    </div>
  );
}

// for beautiful DND to work correctly...
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  resetServerContext(); // <-- CALL RESET SERVER CONTEXT, SERVER SIDE
  const gameDataJSON = await getGameData();

  return {
    props: {
      gameData: gameDataJSON,
    },
  };
};
