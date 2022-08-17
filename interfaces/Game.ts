import { IThreat } from "./Threat/Threat";
import { ISideCharacter } from "./Characters/SideCharacter";
import { IPawn } from "./Pawns/Pawn";
import { IBeasts } from "./Beasts/Beasts";
import { IPlayer } from "./Player";
import AdditionalActivity from "./AdditionalActivity";
import { ITiles } from "./Tiles/Tiles";
import { IStructures } from "./Structures/Structures";
import { IAllResources } from "./Resources/AllResources";
import { IInventions } from "./Inventions/Inventions";
import { IActionSlots } from "./ActionSlots";
import { IAllCharacters } from "../components/game/interface/Characters";
import { IEquipment } from "./Equipment/Equipment";
import {ICharacter} from "./Characters/Character";
import {IResourcesAmount} from "./Resources/Resources";




export interface IGame {
  players: IPlayer[],
  player: IPlayer,
  characters: ICharacter[],
  tiles: ITiles[]
  allResources: {
    future: IResourcesAmount,
    owned: IResourcesAmount,
  }
  structures: {
    name: "roof" | "palisade" | "weapon" | "shelter",
    lvl: number,
    requiredHelperAmount: number,
    committedResources: IResourcesAmount,
  }



  setPawn: (droppableId: string, pawn: IPawn) => void;
  unsetPawn: (destinationId: string, draggableId: string) => void;
}


get structures() {
  return this._structures.structures.map((structure) => {
    return {
      name: structure.name,
      lvl: structure.lvl,
      requiredHelperAmount: structure.requiredHelpersAmount,
      committedResources: Object.fromEntries(
          structure.committedResources.amount.entries()
      ),
    };
  });
}

get inventions() {
  this._inventions.inventions.map((invention) => {
    return {
      name: invention.name,
      committedResources: Object.fromEntries(
          invention.committedResources.amount.entries()
      ),
      requiredHelperAmount: invention.requiredHelpersAmount,
      locked: invention.locked,
      build: invention.isBuilt,
    };
  });
}

get threat() {
  const left = this._threat.leftSlot ? this._threat.leftSlot.name : null;
  const right = this._threat.rightSlot ? this._threat.rightSlot.name : null;
  return {
    leftSlot: left,
    rightSlot: right
  };
}

get equipment() {
  return this._equipment.items.map((item) => {
    return {
      name: item.name,
      uses: item.uses
    }
  })
}

get actionSlots() {
  return Object.fromEntries(this._actionSlots.slots.entries());
}

get restPawnAmount() {
  return this._rest.pawnAmount
}

get arrangeCampPawnAmount() {
  return this._arrangeCamp.pawnAmount
}

get beastDeckCount() {
  return this._beasts.deckCount;
}

get allPawns() {
  return this._allPawns.map((pawn) => {
    return {
      draggableId: pawn.draggableId,
      characterName: pawn.character.name,
      characterNamePL: pawn.character.namePL
    }
  })
}