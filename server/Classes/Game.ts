import { Threat } from "./Threat/Threat";
import { Player } from "./Players/Players";
import ActionSlots from "./ActionSlots/ActionSlots";
import Tiles from "./Tiles/Tiles";
import AllResources from "./AllResources/AllResources";
import Structures from "./Structures/Structures";
import Inventions from "./Inventions/Inventions";
import Equipment from "./Equipment/Equipment";
import Activity from "./AdditionalActivity/AdditionalActivity";
import Beasts from "./Beasts/Beasts";
import { SideCharacter } from "./Characters/SideCharacter";
import { PlayerCharacter } from "./Characters/PlayerCharacter";
import { IPlayer } from "../../interfaces/Player";
import { IGame } from "../../interfaces/Game";
import { SCENARIO } from "../../interfaces/Scenario/Scenario";
import { IInventions } from "../../interfaces/Inventions/Inventions";
import { IActionSlots } from "../../interfaces/ActionSlots";

import { IEquipment } from "../../interfaces/Equipment/Equipment";
import { IAllCharacters } from "../../components/game/interface/Characters";
import { AllCharacters } from "./Characters/Characters";
import { getPawnCanBeSettled } from "../../utils/canPawnBeSettled";
import { IPawn } from "../../interfaces/Pawns/Pawn";

const player = new Player("Konrad", "orange", 0);
const friday = new SideCharacter("friday", 0, 4);
const dog = new SideCharacter("dog", 1, Infinity);
const cook = new PlayerCharacter("cook", 2, 13, "male", [2, 1, 3, 7], player);
player.setCharacter(cook);

type ScenarioName = "castaways";

export class Game implements IGame {
  players: IPlayer[];
  player: Player = player;
  allCharacters: IAllCharacters;
  tiles = new Tiles();
  allResources = new AllResources();
  structures = new Structures();
  inventions: IInventions;
  threat = new Threat(this);
  equipment: IEquipment = new Equipment(this);
  sideCharacters = { dog, friday };
  actionSlots: IActionSlots;
  rest = new Activity("rest");
  arrangeCamp = new Activity("arrangeCamp");
  beasts = new Beasts(this, this.allResources.owned);
  allPawns = [...cook.pawns.pawns, ...friday.pawns.pawns, ...dog.pawns.pawns];

  constructor(players: IPlayer[], scenarioName: ScenarioName) {
    this.players = players;
    this.allCharacters = new AllCharacters([
      friday,
      player.getCharacter(),
      dog,
    ]);
    this.inventions = new Inventions(SCENARIO.CASTAWAYS, [cook]);
    this.actionSlots = new ActionSlots(
      this.structures,
      this.inventions,
      this.tiles
    );
  }

  setPawn(droppableId: string, pawn: IPawn) {
    if (!getPawnCanBeSettled(pawn, droppableId)) {
      return;
    }

    if (droppableId.includes("freepawns")) {
      pawn.character.pawns.addPawn(pawn, "freePawns");
    } else {
      this.actionSlots.setPawn(droppableId, pawn);
    }
  }

  unsetPawn(destinationId: string, draggableId: string) {
    if (destinationId.includes("freepawns")) {
      const charName = destinationId.split("-")[1];
      const character = this.allCharacters.getCharacter(charName);
      character.pawns.removePawn(draggableId, "freePawns");
    } else {
      this.actionSlots.unsetPawn(destinationId);
    }
  }

  //
  // setPawns(sourceId: string, destinationId: string, draggableId: string) {
  //   if (sourceId === destinationId) {
  //     return;
  //   }
  //   let draggedPawn: IPawn | null | undefined =
  //       this.getPawnFromCharacter(draggableId);
  //   console.log(draggableId);
  //   if (!draggedPawn) {
  //     draggedPawn = this.getPawnFromActionSlot(sourceId);
  //   }
  //   if (!draggedPawn) {
  //     throw new Error(
  //         "Can't find pawn with id: " +
  //         draggableId +
  //         " neither with droppableId: " +
  //         sourceId
  //     );
  //   }
  //   let pawnAtDestination: IPawn | null | undefined =
  //       this.getPawnFromActionSlot(destinationId);
  //
  //   let canPawnsBeSwapped = getPawnCanBeSettled(draggedPawn, destinationId);
  //   if (pawnAtDestination !== undefined) {
  //     canPawnsBeSwapped = getPawnCanBeSettled(pawnAtDestination, sourceId);
  //   }
  //
  //   if (!canPawnsBeSwapped) {
  //     return;
  //   }
  //
  //   if (sourceId.includes("freepawns")) {
  //     const charName = sourceId.split("-")[1];
  //     const character = this.allCharacters.getCharacter(charName);
  //     character.pawns.removePawn(draggableId, "freePawns");
  //     if (pawnAtDestination) {
  //       character.pawns.copyPawnToFreePawns(pawnAtDestination.draggableId);
  //     }
  //     console.log(destinationId, draggedPawn);
  //     this.actionSlots.setPawn(destinationId, draggedPawn);
  //     console.log(this.actionSlots.getPawn(destinationId));
  //   } else if (destinationId.includes("freepawns")) {
  //     const charName = destinationId.split("-")[1];
  //     const character = this.allCharacters.getCharacter(charName);
  //     character.pawns.addPawn(draggedPawn, "freePawns");
  //     this.actionSlots.unsetPawn(draggableId);
  //   } else {
  //     this.actionSlots.setPawns(destinationId, sourceId);
  //   }
  // }

  getPawnFromActionSlot(droppableId: string) {
    return this.actionSlots.getPawn(droppableId);
  }

  getPawnFromCharacter(draggableId: string) {
    let searched;
    this.allCharacters.characters.forEach((char) => {
      let pawn = char.pawns.freePawns.find(
        (p) => p.draggableId === draggableId
      );
      if (pawn) {
        searched = pawn;
      }
    });
    return searched;
  }
}

export default new Game([player], "castaways");
