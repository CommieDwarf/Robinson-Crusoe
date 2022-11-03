import { IGame } from "../interfaces/Game";
import { InventionName } from "../interfaces/Inventions/Inventions";
import { StructureName } from "../interfaces/Structures/Structures";
import { RestArrange } from "../server/Classes/AdditionalActivity/RestArrange";
import { EventCard } from "../server/Classes/Threat/EventCard";

export function getItemFromDroppableId(droppableId: string, game: IGame) {
  if (droppableId.includes("threat")) {
    if (droppableId.includes("left")) {
      return game.threat.leftSlot as EventCard;
    } else {
      return game.threat.rightSlot as EventCard;
    }
  } else if (droppableId.includes("beast")) {
    return game.beasts.getBeastFromDeck();
  } else if (droppableId.includes("invention")) {
    let name = droppableId.split("-")[1] as InventionName;
    return game.inventionsService.getInvention(name);
  } else if (droppableId.includes("structure")) {
    let name = droppableId.split("-")[1] as StructureName;
    return game.structuresService.getStruct(name);
  } else if (droppableId.includes("tile")) {
    let id = droppableId.split("-")[1];
    return game.tilesService.findTile(parseInt(id));
  } else if (droppableId.includes("rest")) {
    return new RestArrange("rest");
  } else if (droppableId.includes("arrangeCamp")) {
    return new RestArrange("arrangeCamp");
  }

  throw new Error("Can't find item from droppableId: " + droppableId);
}

// actionSlots.set("structure-" + structure.name + "-leader", null);
// actionSlots.set("structure-" + structure.name + "-helper-1", null);
// actionSlots.set("structure-" + structure.name + "-helper-2", null);
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
