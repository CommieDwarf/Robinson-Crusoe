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
import getComponentNameFromSourceId from "../../utils/getComponentNameFromSourceId";
import actionSlotStyles from "../../components/game/interface/ActionSlot.module.css";

import game from "../../server/game";
import Threat from "../../components/game/interface/threat/Threat";
import AdditionalActivities from "../../components/game/interface/additionalActivities/AdditionalActivities";
import Equipment from "../../components/game/interface/equipment/Equipment";

import {
  DragDropContext,
  DragStart,
  DragUpdate,
  DropResult,
  ResponderProvided,
} from "react-beautiful-dnd";
import { resetServerContext } from "react-beautiful-dnd";
import { GetServerSideProps } from "next";
import Pawn from "../../interfaces/Pawn";
import ICharacter from "../../interfaces/Character";
import getPawnCanBeSettled from "../../utils/getCanPawnBeSettled";
import { stringify } from "querystring";

interface Characters {
  cook: ICharacter;
  dog: ICharacter;
  friday: ICharacter;
}

interface Props {}

export default function Game(props: Props) {
  const [actionSlots, setActionSlots] = useState(game.actionSlots);
  const [pawns, setPawns] = useState(
    game.player.character.pawns
      .concat(game.characters.dog.pawns)
      .concat(game.characters.friday.pawns)
  );
  const [characters, setCharacters] = useState<Characters>(game.characters);
  const [isBeingDragged, setIsBeingDragged] = useState(false);
  const [player, setPlayer] = useState(game.player);
  const [zIndexIncreased, setZIndexIncreased] = useState({
    map: false,
    inventions: false,
    threat: false,
    structures: false,
    additionalActivities: false,
  });
  const [zIndexInventionIncreased, setZIndexInventionIncreased] = useState(new Map<string, boolean>());

  function unselectAllActionSlots() {
    actionSlots.forEach((value, key) => {
      const actionSlot = document.getElementById(key);
      if (actionSlot) {
        actionSlot.classList.remove(actionSlotStyles.canBeSettled);
        actionSlot.classList.remove(actionSlotStyles.cantBeSettled);
      }
     
    });
    const dogDroppable = document.getElementById("dog-droppable");
    const fridayDroppable = document.getElementById("friday-droppable");
    const chars = [dogDroppable, fridayDroppable];

    chars.forEach((char) => {
      char?.classList.remove(actionSlotStyles.canBeSettled)
      char?.classList.remove(actionSlotStyles.cantBeSettled)
    })
  }

  function setPawn(pawn: Pawn, destinationId: string) {
    if (destinationId === "freepawns") {
      setPlayer((prev) => {
        const playerCopy = { ...prev };
        playerCopy.character.freePawns.push(pawn);
        return playerCopy;
      });
    } else if (
      destinationId === "dog-droppable" ||
      destinationId === "friday-droppable"
    ) {
      let id = pawn.id as "dog" | "friday";
      setCharacters((prev) => {
        const characters = { ...prev };
        characters[id].freePawns.push(pawn);
        return characters;
      });
    } else {
      setActionSlots((prev) => {
        const actionSlots = new Map(prev);
        actionSlots.set(destinationId, pawn);
        return actionSlots;
      });
    }
  }

  function unsetPawn(pawn: Pawn, sourceId: string) {
    if (sourceId === "freepawns") {
      setPlayer((prev) => {
        const playerCopy = { ...prev };
        playerCopy.character.freePawns = playerCopy.character.freePawns.filter(
          (p) => p.id !== pawn.id
        );
        return playerCopy;
      });
    } else if (
      sourceId === "dog-droppable" ||
      sourceId === "friday-droppable"
    ) {
      let id = pawn.id as "dog" | "friday";
      setCharacters((prev) => {
        const characters = { ...prev };
        characters[id].freePawns = characters[id].freePawns.filter(
          (p) => p.id !== pawn.id
        );
        return characters;
      });
    } else {
      setActionSlots((prev) => {
        const actionSlots = new Map(prev);
        actionSlots.set(sourceId, null);
        return actionSlots;
      });
    }
  }

  async function swapPawns(sourceId: string, destinationId: string) {
    const pawn1 = actionSlots.get(sourceId);
    const pawn2 = actionSlots.get(destinationId);
    if (!pawn1 || !pawn2) {
      return;
    }

    setActionSlots((prev) => {
      const actionSlots = new Map(prev);
      actionSlots.set(sourceId, pawn2);
      actionSlots.set(destinationId, null);
      return actionSlots;
    });

    await sleep(10); // Sleep has been used because DnD library have thrown
    // "Couldnt find draggable with id..."
    setActionSlots((prev) => {
      const actionSlots = new Map(prev);
      actionSlots.set(destinationId, pawn1);
      return actionSlots;
    });
  }

  function updatePawnLocations(
    draggableId: string,
    destinationId: string,
    sourceId: string
  ) {
    const pawn = pawns.find((pawn) => pawn.id === draggableId);
    if (!pawn) {
      throw new Error("Couldnt find pawn with id: " + draggableId);
    }
    if (destinationId === sourceId) {
      return;
    }
    if (getPawnCanBeSettled(pawn, destinationId)) {
      let pawn2 = actionSlots.get(destinationId);
      if (pawn2) {
        if (!getPawnCanBeSettled(pawn2, sourceId)) {
          return;
        }
        swapPawns(destinationId, sourceId);
      } else {
        setPawn(pawn, destinationId);
        unsetPawn(pawn, sourceId);
      }
    }
  }

  function onDragEnd(result: DropResult) {
    setIsBeingDragged(false);
    unselectAllActionSlots();
    const { draggableId, destination, source } = result;
    if (!draggableId || !destination?.droppableId || !source.droppableId) {
      return;
    }


    updatePawnLocations(
      draggableId,
      destination.droppableId,
      source.droppableId
    );

    setZIndexIncreased((prev) => {
      const copy = { ...prev };
      Object.keys(copy).forEach((key) => {
        const k = key as keyof typeof copy;
          copy[k] = false;
      });
      return copy;
    });
    setZIndexInventionIncreased((prev) => {
      const copy = new Map(prev);
      copy.forEach((value,key) => {
        copy.set(key, false);
      })
      return copy;
    })

  }

  function getPawnById(id: string) {
    return pawns.find((pawn) => pawn.id === id);
  }

  function onDragStart(start: DragStart, provided: ResponderProvided) {
    
    start.mode = "SNAP";
    setIsBeingDragged(true);
    const componentName = getComponentNameFromSourceId(start.source.droppableId)
    setZIndexIncreased((prev) => {
      const copy = { ...prev };
        
      copy[componentName] = true;
      return copy;
    });
    if (componentName.includes("invention")) {
      const array = start.source.droppableId.split("-");
      console.log(array)
      setZIndexInventionIncreased((prev) => {
        const copy = new Map(prev);
        copy.set(array[1], true);
        return copy;
      })
    }
  }

  function onDragUpdate(update: DragUpdate, provided: ResponderProvided) {
    const dupa = document.getElementById(update.draggableId);
    if (dupa) {
      const style = getComputedStyle(dupa);
      console.log(style.visibility);
    }
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
    const pawn = getPawnById(update.draggableId);

    if (!slotDestinationElement || !pawn || !slotSourceElement) {
      
      return;
    }
// dasdasd
    if (
      update.destination.droppableId.includes("freepawns")
    ) {
      return;
    }
    console.log(slotSourceElement, slotDestinationElement )
    if (getPawnCanBeSettled(pawn, update.destination.droppableId)) {
      slotDestinationElement.classList.add(actionSlotStyles.canBeSettled);
    } else {
      slotDestinationElement.classList.add(actionSlotStyles.cantBeSettled);
    }

    let pawn2 = actionSlots.get(update.destination.droppableId);
    if (update.source.droppableId.includes("freepawns")) {
      return;
    }
    if (pawn2) {
      if (getPawnCanBeSettled(pawn2, update.source.droppableId)) {
        slotSourceElement.classList.add(actionSlotStyles.canBeSettled);
      } else {
        slotSourceElement.classList.add(actionSlotStyles.cantBeSettled);
      }
    }
  }

  

  return (
    <div className={styles.game}>
      <DragDropContext
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
        onDragUpdate={onDragUpdate}
      >
        <Phase phase="production" />
        <Morale current={3} />
        <Resources allResources={game.allResources} />
        <Structures structures={game.structures} actionSlots={actionSlots} />
        <MapComponent
          tiles={game.tiles}
          actionSlots={actionSlots}
          zIndexIncreased={zIndexIncreased.map}
        />
        <Inventions
          inventions={game.inventions}
          isBeingDragged={isBeingDragged}
          zIndexIncreased={zIndexIncreased.inventions}
          zIndexInventionIncreased={zIndexInventionIncreased}
          actionSlots={actionSlots}
        />
        <Character
          character={player.character}
          dog={characters.dog}
          friday={characters.friday}
        />
        <Health />
        <Threat threatCards={game.threatCards} />
        <AdditionalActivities />
        <Equipment equipment={game.equipment} />
        <ActionsOrder />
        <Chat />
        <Tokens />
        <ScenarioButton />
        <Players />
      </DragDropContext>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  resetServerContext(); // <-- CALL RESET SERVER CONTEXT, SERVER SIDE

  return { props: { data: [] } };
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
