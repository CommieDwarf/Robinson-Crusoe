import { IActionService } from "../../../interfaces/ActionService/IActionService";
import { IGame } from "../../../interfaces/Game";
import { Action } from "./Action";
import { ACTION_TYPE } from "../../../interfaces/ActionService/Action";
import { ICharacter } from "../../../interfaces/Characters/Character";
import { IActionSlotsService } from "../../../interfaces/ActionSlots";
import { inventionList } from "../../constants/inventionList";
import { StructureName } from "../../../interfaces/Structures/Structures";
import { InventionName } from "../../../interfaces/Inventions/Inventions";
import { IPawn } from "../../../interfaces/Pawns/Pawn";

export class ActionService implements IActionService {
  build = new Action(ACTION_TYPE.build);
  explore = new Action(ACTION_TYPE.explore);
  gather = new Action(ACTION_TYPE.gather);
  hunt = new Action(ACTION_TYPE.hunt);
  threat = new Action(ACTION_TYPE.threat);
  _game: IGame;

  constructor(game: IGame) {
    this._game = game;
  }

  resolveActions(): void {
    // TODO: call resolve methods
    const slotsCategorized =
      this._game.actionSlotsService.slotsOccupiedAndCategorized;
    this.resolveThreat(slotsCategorized.threat);
  }

  private resolveThreat(slots: Map<string, IPawn>) {
    // TODO implement 2 pawns option.
    slots.forEach((pawn, droppableId) => {
      const arrDroppableId = droppableId.split("-");
      const side = (arrDroppableId[1] + "Slot") as "leftSlot" | "rightSlot";
      const pawnSlotCount = arrDroppableId[2];
      if (pawnSlotCount === "1") {
        this._game.threat[side]?.fullFill(pawn.character);
      }
    });
  }

  private resolveHunt(slots: Map<string, IPawn>) {
    const leader = slots.get("hunt-leader")?.character;
    const helper = slots.get("hunt-helper")?.character;

    if (leader && helper) {
      this._game.beasts.fightBeast(leader, helper);
    } else if (leader || helper) {
      throw new Error("There must be 2 pawns assigned to hunt");
    }
  }

  private resolveBuildStructure(slots: Map<string, IPawn>) {
    // TODO: implement roll dice and reRoll and pull adventure card
    slots.forEach((pawn, droppableId) => {
      const droppableIdArr = droppableId.split("-");
      const structureName = droppableIdArr[1] as StructureName;
      const leader = droppableIdArr[droppableId.length - 1] === "leader";
      if (leader) {
        // TODO: implement helper
        this._game.structuresService.lvlUpStruct(structureName, 1);
      }
    });
  }

  private resolveBuildInvention(slots: Map<string, IPawn>) {
    // TODO: implement roll dice and reRoll and pull adventure card
    slots.forEach((pawn, droppableId) => {
      const droppableIdArr = droppableId.split("-");
      const inventionName = droppableIdArr[1] as InventionName;
      const leader = droppableIdArr[droppableId.length - 1] === "leader";
      if (leader) {
        // TODO: implement helper
        this._game.inventionsService.build(inventionName);
      }
    });
  }

  private resolveGather(slots: Map<string, IPawn>) {
    // TODO: implement roll dice, reRoll and pull adventure card
    slots.forEach((pawn, droppableId) => {
      const array = droppableId.split("-");
      const tileId = parseInt(array[1]);
      const side = array[3] as "left" | "right";
      const resource =
        this._game.tilesService.getExploredTile(tileId).tileType?.resources[
          side
        ];
      if (!resource || resource === "beast") {
        throw new Error("Cant add resource " + resource + " to all resources");
      }
      this._game.allResources.addResourceToOwned(resource, 1);
    });
  }

  private resolveExplore(slots: Map<string, IPawn>) {
    // TODO: implement roll dice, reRoll and pull adventure card and many pawns
    slots.forEach((pawn, droppableId) => {
      const droppableIdArr = droppableId.split("-");
      const tileId = parseInt(droppableIdArr[1]);
      const leader = droppableIdArr[droppableIdArr.length - 1] === "leader";
      if (leader) {
        this._game.tilesService.revealTile(tileId);
      }
    });
  }
}

// this._structuresService.structures.forEach((structure) => {
//     actionSlots.set("structure-" + structure.name + "-leader", null);
//     actionSlots.set("structure-" + structure.name + "-helper-1", null);
//     actionSlots.set("structure-" + structure.name + "-helper-2", null);
// });
//
// inventionList.forEach((invention) => {
//     actionSlots.set("invention-" + invention + "-leader", null);
//     actionSlots.set("invention-" + invention + "-helper-1", null);
//     actionSlots.set("invention-" + invention + "-helper-2", null);
// });
//
// this._tiles.tiles.forEach((tile) => {
//     actionSlots.set(`tile-${tile.id}-gather-left-leader`, null);
//     actionSlots.set(`tile-${tile.id}-gather-right-helper-1`, null);
//     actionSlots.set(`tile-${tile.id}-gather-left-helper-1`, null);
//     actionSlots.set(`tile-${tile.id}-gather-right-leader`, null);
//     actionSlots.set(`tile-${tile.id}-gather-right-helper-2`, null);
//     actionSlots.set(`tile-${tile.id}-gather-left-helper-2`, null);
//     actionSlots.set(`tile-${tile.id}-explore-leader`, null);
//     actionSlots.set(`tile-${tile.id}-explore-helper-1`, null);
//     actionSlots.set(`tile-${tile.id}-explore-helper-2`, null);
// });
//
// for (let i = 1; i < 10; i++) {
//     actionSlots.set("rest-" + i, null);
//     actionSlots.set("arrangeCamp-" + i, null);
// }
//
// actionSlots.set("threat-left-1", null);
// actionSlots.set("threat-left-2", null);
// actionSlots.set("threat-right-1", null);
// actionSlots.set("threat-right-2", null);
//
// actionSlots.set("hunt-leader", null);
// actionSlots.set("hunt-helper", null);
