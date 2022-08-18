import { Threat } from "./Threat/Threat";
import { Player } from "./Players/Players";
import { ActionSlotsService } from "./ActionSlotsService/ActionSlots";
import { TilesService } from "./Tiles/Tiles";
import { AllResources } from "./AllResources/AllResources";
import { StructuresService } from "./Structures/Structures";
import { InventionsService } from "./Inventions/InventionsService";
import { Equipment } from "./Equipment/Equipment";
import { AdditionalActivity } from "./AdditionalActivity/AdditionalActivity";
import { Beasts } from "./Beasts/Beasts";
import { SideCharacter } from "./Characters/SideCharacter";
import { PlayerCharacter } from "./Characters/PlayerCharacter";
import { IPlayer } from "../../interfaces/Player";
import { IGame } from "../../interfaces/Game";
import { SCENARIO } from "../../interfaces/Scenario/Scenario";
import { IInventionsService } from "../../interfaces/Inventions/Inventions";

import { IEquipment } from "../../interfaces/Equipment/Equipment";
import { IAllCharacters } from "../../components/game/interface/Characters";
import { AllCharacters } from "./Characters/Characters";
import { getPawnCanBeSettled } from "../../utils/canPawnBeSettled";
import { IPawn, IPawnHelper } from "../../interfaces/Pawns/Pawn";
import { ICharacter } from "../../interfaces/Characters/Character";
import { ITilesService } from "../../interfaces/Tiles/Tiles";
import { IAllResources } from "../../interfaces/Resources/AllResources";
import { IStructuresService } from "../../interfaces/Structures/Structures";
import { IThreat } from "../../interfaces/Threat/Threat";
import { IBeasts } from "../../interfaces/Beasts/Beasts";

const player = new Player("Konrad", "orange", 0);
const friday = new SideCharacter("friday", 0, 4);
const dog = new SideCharacter("dog", 1, Infinity);
const cook = new PlayerCharacter("cook", 2, 13, "male", [2, 1, 3, 7], player);
player.setCharacter(cook);

export { player };
type ScenarioName = "castaways";

export class GameClass implements IGame {
  get players(): IPlayer[] {
    return this._players;
  }

  get localPlayer(): Player {
    return this._localPlayer;
  }

  get allCharacters(): IAllCharacters {
    return this._allCharacters;
  }

  get tilesService(): ITilesService {
    return this._tilesService;
  }

  get allResources(): IAllResources {
    return this._allResources;
  }

  get structuresService(): IStructuresService {
    return this._structuresService;
  }

  get inventionsService(): IInventionsService {
    return this._inventionsService;
  }

  get threat(): IThreat {
    return this._threat;
  }

  get equipment(): IEquipment {
    return this._equipment;
  }

  get rest(): AdditionalActivity {
    return this._rest;
  }

  get arrangeCamp(): AdditionalActivity {
    return this._arrangeCamp;
  }

  get beasts(): IBeasts {
    return this._beasts;
  }

  get actionSlotsService(): ActionSlotsService {
    return this._actionSlotsService;
  }

  get allPawns(): (IPawn | IPawnHelper)[] {
    return this._allPawns;
  }

  private _players: IPlayer[];
  private _localPlayer: Player = player;
  private _allCharacters: IAllCharacters;
  private _tilesService: ITilesService = new TilesService();
  private _allResources: IAllResources = new AllResources();
  private _structuresService: IStructuresService = new StructuresService();
  private _inventionsService: IInventionsService = new InventionsService(
    SCENARIO.CASTAWAYS,
    [cook],
    this._tilesService
  );
  private _threat: IThreat = new Threat(this);
  private _equipment: IEquipment = new Equipment(this);
  private _rest = new AdditionalActivity("rest");
  private _arrangeCamp = new AdditionalActivity("arrangeCamp");
  private _beasts: IBeasts = new Beasts(this, this._allResources.owned);
  private _actionSlotsService = new ActionSlotsService(
    this._structuresService,
    this._inventionsService,
    this._tilesService
  );
  private _allPawns = [
    ...cook.pawns.pawns,
    ...friday.pawns.pawns,
    ...dog.pawns.pawns,
  ];

  constructor(players: IPlayer[], scenarioName: ScenarioName) {
    this._players = players;
    this._allCharacters = new AllCharacters([
      friday,
      player.getCharacter(),
      dog,
    ]);
  }

  //
  // get renderData() {
  //   const leftThreatSlot = this._threat.leftSlot
  //     ? this._threat.leftSlot.name
  //     : null;
  //   const rightThreatSlot = this._threat.rightSlot
  //     ? this._threat.rightSlot.name
  //     : null;
  //
  //   return {
  //     players: this._players,
  //     player: this._player,
  //     characters: this._allCharacters.characters,
  //     tiles: this._tiles.tiles,
  //     allResources: {
  //       future: Object.fromEntries(this._allResources.future.amount.entries()),
  //       owned: Object.fromEntries(this._allResources.owned.amount.entries()),
  //     },
  //     structures: this._structures.structures.map((structure) => {
  //       return {
  //         name: structure.name,
  //         lvl: structure.lvl,
  //         requiredHelperAmount: structure.requiredHelpersAmount,
  //         committedResources: Object.fromEntries(
  //           structure.committedResources.amount.entries()
  //         ),
  //       };
  //     }),
  //     inventions: this._inventions.inventions.map((invention) => {
  //       return {
  //         name: invention.name,
  //         committedResources: Object.fromEntries(
  //           invention.committedResources.amount.entries()
  //         ),
  //         requiredHelperAmount: invention.requiredHelpersAmount,
  //         locked: invention.locked,
  //         build: invention.isBuilt,
  //       };
  //     }),
  //     threat: {
  //       leftSlot: leftThreatSlot,
  //       rightSlot: rightThreatSlot,
  //     },
  //     equipment: this._equipment.items.map((item) => {
  //       return {
  //         name: item.name,
  //         uses: item.uses,
  //       };
  //     }),
  //     actionSlots: Object.fromEntries(this._actionSlots.slots.entries()),
  //     restPawnAmount: this._rest.pawnAmount,
  //     arrangeCampPawnCount: this._arrangeCamp.pawnAmount,
  //     beastCount: this._beasts.deckCount,
  //     allPawns: this._allPawns.map((pawn) => {
  //       return {
  //         draggableId: pawn.draggableId,
  //         characterName: pawn.character.name,
  //         characterNamePL: pawn.character.namePL,
  //       };
  //     }),
  //   };
  // }

  // get players() {
  //   return this._players;
  // }
  //
  // get player() {
  //   return this._player;
  // }
  //
  // get characters() {
  //   return this._allCharacters.characters;
  // }

  // get tiles() {
  //   return this._tiles.tiles;
  // }
  //
  // get allResources() {
  //   return {
  //     future: Object.fromEntries(this._allResources.future.amount.entries()),
  //     owned: Object.fromEntries(this._allResources.owned.amount.entries()),
  //   };
  // }
  //
  // get structures() {
  //   return this._structures.structures.map((structure) => {
  //     return {
  //       name: structure.name,
  //       lvl: structure.lvl,
  //       requiredHelperAmount: structure.requiredHelpersAmount,
  //       committedResources: Object.fromEntries(
  //         structure.committedResources.amount.entries()
  //       ),
  //     };
  //   });
  // }

  // get inventions() {
  //   this._inventions.inventions.map((invention) => {
  //     return {
  //       name: invention.name,
  //       committedResources: Object.fromEntries(
  //         invention.committedResources.amount.entries()
  //       ),
  //       requiredHelperAmount: invention.requiredHelpersAmount,
  //       locked: invention.locked,
  //       build: invention.isBuilt,
  //     };
  //   });
  // }
  //
  // get threat() {
  //   const left = this._threat.leftSlot ? this._threat.leftSlot.name : null;
  //   const right = this._threat.rightSlot ? this._threat.rightSlot.name : null;
  //   return {
  //     leftSlot: left,
  //     rightSlot: right,
  //   };
  // }
  //
  // get equipment() {
  //   return this._equipment.items.map((item) => {
  //     return {
  //       name: item.name,
  //       uses: item.uses,
  //     };
  //   });
  // }
  //
  // get actionSlots() {
  //   return Object.fromEntries(this._actionSlots.slots.entries());
  // }
  //
  // get restPawnAmount() {
  //   return this._rest.pawnAmount;
  // }
  //
  // get arrangeCampPawnAmount() {
  //   return this._arrangeCamp.pawnAmount;
  // }
  //
  // get beastDeckCount() {
  //   return this._beasts.deckCount;
  // }
  //
  // get allPawns() {
  //   return this._allPawns.map((pawn) => {
  //     return {
  //       draggableId: pawn.draggableId,
  //       characterName: pawn.character.name,
  //       characterNamePL: pawn.character.namePL,
  //     };
  //   });
  // }

  setPawn(droppableId: string, pawn: IPawn) {
    if (!getPawnCanBeSettled(pawn, droppableId)) {
      return;
    }

    if (droppableId.includes("freepawns")) {
      pawn.character.pawns.copyPawnToFreePawns(pawn.draggableId);
    } else {
      this._actionSlotsService.setPawn(droppableId, pawn);
    }
    if (droppableId.includes("rest")) {
      this._rest.incrementPawns();
    } else if (droppableId.includes("arrangeCamp")) {
      this._arrangeCamp.incrementPawns();
    }
  }

  unsetPawn(destinationId: string, draggableId: string) {
    if (destinationId.includes("freepawns")) {
      const charName = destinationId.split("-")[1];
      const character = this._allCharacters.getCharacter(charName);
      character.pawns.removePawn(draggableId, "freePawns");
    } else {
      this._actionSlotsService.unsetPawn(destinationId);
    }
    if (destinationId.includes("rest")) {
      this._rest.decrementPawns();
    } else if (destinationId.includes("arrangeCamp")) {
      this._arrangeCamp.decrementPawns();
    }
  }

  getPawnFromActionSlot(droppableId: string) {
    return this._actionSlotsService.getPawn(droppableId);
  }

  getPawnFromCharacter(draggableId: string) {
    let searched;
    this._allCharacters.characters.forEach((char) => {
      let pawn = char.pawns.freePawns.find(
        (p) => p.draggableId === draggableId
      );
      if (pawn) {
        searched = pawn;
      }
    });
    return searched;
  }

  getCharacterById(id: number): ICharacter {
    const char = this._allCharacters.characters.find((char) => char.id === id);
    if (!char) {
      throw new Error("Can't find character with id: " + id);
    }
    return char;
  }
}
