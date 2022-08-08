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
import actionSlotStyles from "../../components/game/interface/ActionSlot.module.css";

import newGame from "../../server/Classes/Game";
import Threat from "../../components/game/interface/threat/Threat";
import AdditionalActivities from "../../components/game/interface/additionalActivities/AdditionalActivities";
import Equipment from "../../components/game/interface/equipment/Equipment";

import {
  DragDropContext,
  Draggable,
  DragUpdate,
  resetServerContext,
} from "react-beautiful-dnd";
import { GetServerSideProps } from "next";
import { WeatherAndNight } from "../../components/game/interface/WeatherAndNight/WeatherAndNight";
import { INVENTION_TYPE } from "../../interfaces/Inventions/Invention";
import { getPawnCanBeSettled } from "../../utils/canPawnBeSettled";

interface Props {}

export default function Game(props: Props) {
  const [game, setGame] = useState(newGame);

  const [isPawnBeingDragged, setIsPawnBeingDragged] = useState(false);
  const [zIndexIncreased, setZIndexIncreased] = useState<Map<string, boolean>>(
    new Map()
  );
  const [showScenario, setShowScenario] = useState(false);

  function unselectActionSlots() {
    game.actionSlots.slots.forEach((value, key) => {
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

  function resetAllIndexes() {
    setZIndexIncreased((prev) => {
      const copy = new Map(prev);
      copy.forEach((value, key) => {
        copy.set(key, false);
      });
      return copy;
    });
  }

  function onDragEnd() {}

  function onDragUpdate(update: DragUpdate) {
    unselectActionSlots();
    const pawn = game.allPawns.find(
      (p) => p.draggableId === update.draggableId
    );
    const destinationId = update.destination?.droppableId;

    if (destinationId?.includes("freepawns")) {
      return;
    } else if (destinationId === update.source.droppableId) {
      return;
    }

    console.log(pawn);

    if (destinationId && pawn) {
      const slotElement = document.getElementById(destinationId);
      if (getPawnCanBeSettled(pawn, destinationId)) {
        slotElement?.classList.add(actionSlotStyles.canBeSettled);
      } else {
        slotElement?.classList.add(actionSlotStyles.cantBeSettled);
      }
    }
  }

  return (
    <div className={styles.game}>
      <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
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
          beastCount={game.beasts.deckCount}
        />

        <Inventions
          inventions={game.inventions}
          isBeingDragged={isPawnBeingDragged}
          zIndexIncreased={zIndexIncreased}
          actionSlots={game.actionSlots.slots}
        />
        <Character
          character={game.player.getCharacter()}
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
