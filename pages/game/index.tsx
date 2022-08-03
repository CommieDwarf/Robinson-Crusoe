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
import Chat from "../../components/game/interface/chat/Chat";
import Tokens from "../../components/game/interface/tokens/Tokens";
import ScenarioButton from "../../components/game/interface/scenario/ScenarioButton";
import Players from "../../components/game/interface/players/Players";
import getComponentNameFromSourceId from "../../utils/getComponentNameFromSourceId";
import actionSlotStyles from "../../components/game/interface/ActionSlot.module.css";

import newGame from "../../server/Classes/Game";
import Threat from "../../components/game/interface/threat/Threat";
import AdditionalActivities from "../../components/game/interface/additionalActivities/AdditionalActivities";
import Equipment from "../../components/game/interface/equipment/Equipment";
import pawnStyles from "../../components/game/interface/Pawn.module.css";

import {
  DragDropContext,
  DragStart,
  DragUpdate,
  DropResult,
  resetServerContext,
  ResponderProvided,
} from "react-beautiful-dnd";
import { GetServerSideProps } from "next";
import Pawn from "../../interfaces/Pawns/Pawn";
import ICharacter from "../../interfaces/Characters/Character";
import canPawnBeSettled from "../../utils/canPawnBeSettled";
import sleep from "../../utils/sleep";
import { WeatherAndNight } from "../../components/game/interface/WeatherAndNight/WeatherAndNight";
import { INVENTION_TYPE } from "../../interfaces/Inventions/Invention";

interface Characters {
  cook: ICharacter;
  dog: ICharacter;
  friday: ICharacter;
}

interface Props {}

export default function Game(props: Props) {
  const [game, setGame] = useState(newGame);

  const [isPawnBeingDragged, setIsPawnBeingDragged] = useState(false);
  const [zIndexIncreased, setZIndexIncreased] = useState<Map<string, boolean>>(
    new Map()
  );
  const [showScenario, setShowScenario] = useState(false);

  function setActivitiesPawnCounter(destination: string, source: string) {
    const destArray = destination.split("-");
    const sourceArray = source.split("-");

    const destActivity = destArray[0];
    const sourceActivity = sourceArray[0];

    switch (destActivity) {
      case "rest":
        incrOrDecrActivityPawnCounter("rest", "incrementPawns");
        break;
      case "arrangeCamp":
        incrOrDecrActivityPawnCounter("arrangeCamp", "incrementPawns");
        break;
    }
    switch (sourceActivity) {
      case "rest":
        incrOrDecrActivityPawnCounter("rest", "decrementPawns");
        break;
      case "arrangeCamp":
        incrOrDecrActivityPawnCounter("arrangeCamp", "decrementPawns");
        break;
    }
  }

  function incrOrDecrActivityPawnCounter(
    activity: "rest" | "arrangeCamp",
    action: "incrementPawns" | "decrementPawns"
  ) {
    setGame((prev) => {
      const copy = { ...prev };
      copy[activity][action]();
      return copy;
    });
  }

  function unselectAllActionSlots() {
    game.actionSlots.slots.forEach((value, key) => {
      const actionSlot = document.getElementById(key);
      if (actionSlot) {
        actionSlot.classList.remove(actionSlotStyles.canBeSettled);
        actionSlot.classList.remove(actionSlotStyles.cantBeSettled);
      }
    });
    const dogDroppable = document.getElementById("dog-droppable");
    const fridayDroppable = document.getElementById("friday-droppable");
    [dogDroppable, fridayDroppable].forEach((char) => {
      char?.classList.remove(actionSlotStyles.canBeSettled);
      char?.classList.remove(actionSlotStyles.cantBeSettled);
    });
  }

  function addFreePawnToPlayerChar(pawn: Pawn) {
    setGame((prev) => {
      const copy = { ...prev };
      copy.player.character.freePawns.push(pawn);
      return copy;
    });
  }

  function addFreePawnToSideChar(pawn: Pawn, char: "friday" | "dog") {
    setGame((prev) => {
      const copy = { ...prev };
      copy.sideCharacters[char].freePawns = [pawn];
      return copy;
    });
  }

  function setPawnToActionSlot(pawn: Pawn, slotId: string) {
    setGame((prev) => {
      const copy = { ...prev };
      copy.actionSlots.setPawn(slotId, pawn);
      return copy;
    });
  }

  // TODO: Make pawn objects instance of class.
  function removeFreePawnFromPlayerChar(pawn: Pawn) {
    setGame((prev) => {
      const copy = { ...prev };
      copy.player.character.removePawn(pawn);
      return copy;
    });
  }

  function removeFreePawnToSideChar(sideChar: "friday" | "dog") {
    setGame((prev) => {
      const copy = { ...prev };
      copy.sideCharacters[sideChar].freePawns = [];
      return copy;
    });
  }

  function removePawnFromActionSlot(droppableId: string) {
    setGame((prev) => {
      const copy = { ...prev };
      copy.actionSlots.unsetPawn(droppableId);
      return copy;
    });
  }

  function setFreePawn(pawn: Pawn, destinationId: string) {
    switch (destinationId) {
      case "playerChar-droppable":
        addFreePawnToPlayerChar(pawn);
        break;
      case "dog-droppable":
        addFreePawnToSideChar(pawn, "dog");
        break;
      case "friday-droppable":
        addFreePawnToSideChar(pawn, "friday");
        break;
      default:
        setPawnToActionSlot(pawn, destinationId);
        break;
    }
  }

  function unsetPawn(pawn: Pawn, sourceId: string) {
    switch (sourceId) {
      case "playerChar-droppable":
        removeFreePawnFromPlayerChar(pawn);
        break;
      case "dog-droppable":
        removeFreePawnToSideChar("dog");
        break;
      case "friday-droppable":
        removeFreePawnToSideChar("friday");
        break;
      default:
        removePawnFromActionSlot(sourceId);
        break;
    }
  }

  async function swapPawns(sourceId: string, destinationId: string) {
    const pawn1 = game.actionSlots.findPawn(sourceId);
    const pawn2 = game.actionSlots.findPawn(destinationId);
    if (!pawn1 || !pawn2) {
      throw new Error(
        "Couldnt find one of pawns in slots: " +
          sourceId +
          " or " +
          destinationId
      );
    }

    setGame((prev) => {
      const copy = { ...prev };
      copy.actionSlots.setPawn(sourceId, pawn2);
      copy.actionSlots.unsetPawn(destinationId);
      return copy;
    });

    await sleep(10); // Sleep has been used because DnD library have thrown
    // "Couldn't find draggable with id..."

    setGame((prev) => {
      const copy = { ...prev };
      copy.actionSlots.setPawn(destinationId, pawn1);
      return copy;
    });
  }

  function updatePawnLocations(
    draggableId: string,
    destinationId: string,
    sourceId: string
  ) {
    const pawn1 = game.allPawns.find((p) => p.id === draggableId);

    if (!pawn1) {
      throw new Error("Couldnt find pawn with id: " + draggableId);
    }
    if (destinationId === sourceId) {
      return;
    }

    if (canPawnBeSettled(pawn1, destinationId)) {
      let pawn2 = game.actionSlots.findPawn(destinationId);
      setActivitiesPawnCounter(destinationId, sourceId);
      if (pawn2) {
        if (!canPawnBeSettled(pawn2, sourceId)) {
          return;
        }
        swapPawns(destinationId, sourceId);
      } else {
        setFreePawn(pawn1, destinationId);
        unsetPawn(pawn1, sourceId);
      }
    }
  }

  function setDefaultToAllZIndex() {
    setZIndexIncreased((prev) => {
      const copy = new Map(prev);
      copy.forEach((value, key) => {
        copy.set(key, false);
      });
      return copy;
    });
  }

  function onDragEnd(result: DropResult) {
    setIsPawnBeingDragged(false);
    unselectAllActionSlots();
    const { draggableId, destination, source } = result;
    const pawnElement = document.getElementById(draggableId);
    pawnElement?.classList.remove(pawnStyles.dragged);

    if (!draggableId || !destination?.droppableId || !source.droppableId) {
      return;
    }

    updatePawnLocations(
      draggableId,
      destination.droppableId,
      source.droppableId
    );

    setDefaultToAllZIndex();
  }

  function onDragStart(start: DragStart, provided: ResponderProvided) {
    const pawn = document.getElementById(start.draggableId);
    if (!pawn) {
      return;
    }
    pawn.classList.add(pawnStyles.dragged);

    setIsPawnBeingDragged(true);
    const componentName = getComponentNameFromSourceId(
      start.source.droppableId
    );

    setZIndexIncreased((prev) => {
      const copy = new Map(prev);
      copy.set(componentName, true);
      copy.set(start.source.droppableId, true);
      return copy;
    });
  }

  function onDragUpdate(update: DragUpdate, provided: ResponderProvided) {
    unselectAllActionSlots();
    if (!update.destination?.droppableId || !update.draggableId) {
      return;
    }
    if (update.destination.droppableId === update.source.droppableId) {
      return;
    }
    const slotDestinationElement = document.getElementById(
      update.destination.droppableId
    );
    const slotSourceElement = document.getElementById(
      update.source.droppableId
    );
    const pawn = game.allPawns.find((p) => update.draggableId === p.id);

    if (!slotDestinationElement || !pawn || !slotSourceElement) {
      return;
    }
    if (update.destination.droppableId.includes("freepawns")) {
      return;
    }
    if (canPawnBeSettled(pawn, update.destination.droppableId)) {
      slotDestinationElement.classList.add(actionSlotStyles.canBeSettled);
    } else {
      slotDestinationElement.classList.add(actionSlotStyles.cantBeSettled);
    }

    let pawn2 = game.actionSlots.findPawn(update.destination.droppableId);
    if (update.source.droppableId.includes("freepawns")) {
      return;
    }
    if (pawn2) {
      if (canPawnBeSettled(pawn2, update.source.droppableId)) {
        slotSourceElement.classList.add(actionSlotStyles.canBeSettled);
      } else {
        slotSourceElement.classList.add(actionSlotStyles.cantBeSettled);
      }
    }
  }

  const char = game.player.character;

  return (
    <div className={styles.game}>
      <DragDropContext
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
        onDragUpdate={onDragUpdate}
      >
        <Phase phase="production" />
        <Morale current={3} />
        <Resources
          future={game.allResources.future.amount}
          owned={game.allResources.owned.amount}
        />
        <Structures
          structures={game.structures.structures}
          actionSlots={game.actionSlots.slots}
        />
        <MapComponent
          tiles={game.tiles.tiles}
          actionSlots={game.actionSlots.slots}
          zIndexIncreased={zIndexIncreased}
          scrollDisabled={isPawnBeingDragged}
          showScenario={showScenario}
          beastDeck={game.beasts.deck}
        />

        <Inventions
          inventions={game.inventions}
          isBeingDragged={isPawnBeingDragged}
          zIndexIncreased={zIndexIncreased}
          actionSlots={game.actionSlots.slots}
        />
        <Character
          character={game.player.character}
          dog={game.sideCharacters.dog}
          friday={game.sideCharacters.friday}
          zIndexIncreased={zIndexIncreased}
          setZIndexIncreased={setZIndexIncreased}
        />
        <Health />
        <Threat threat={game.threat} actionSlots={game.actionSlots.slots} />
        <AdditionalActivities
          activities={{
            rest: game.rest,
            arrange: game.arrangeCamp,
          }}
          actionSlots={game.actionSlots.slots}
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
          inventions={game.inventions.inventions.filter(
            (inv) => inv.type !== INVENTION_TYPE.SCENARIO
          )}
          actionSlots={game.actionSlots.slots}
          zIndexIncreased={zIndexIncreased}
          show={showScenario}
          setShow={setShowScenario}
        />
        <Players />
      </DragDropContext>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  resetServerContext(); // <-- CALL RESET SERVER CONTEXT, SERVER SIDE

  return { props: { data: [] } };
};
