import { Threat } from "./Threat/Threat";
import { Player } from "./Players/Player";
import { ActionSlotsService } from "./ActionSlotsService/ActionSlots";
import { TilesService } from "./Tiles/TileService";
import { AllResources } from "./AllResources/AllResources";
import { StructuresService } from "./Structures/Structures";
import { InventionsService } from "./Inventions/InventionsService";
import { Equipment } from "./Equipment/Equipment";
import { AdditionalActivity } from "./AdditionalActivity/AdditionalActivity";
import { Beasts } from "./Beasts/Beasts";
import { SideCharacter } from "./Characters/SideCharacter";
import { PlayerCharacter } from "./Characters/PlayerCharacter";
import { IPlayer } from "../../interfaces/PlayerService/Player";
import { IGame, IGameRenderData } from "../../interfaces/Game";
import { SCENARIO } from "../../interfaces/Scenario/Scenario";
import { IInventionsService } from "../../interfaces/Inventions/Inventions";

import { IEquipment } from "../../interfaces/Equipment/Equipment";
import { IAllCharacters } from "../../interfaces/AllCharacters/Characters";
import { AllCharacters } from "./Characters/AllCharacters";
import { getPawnCanBeSettled } from "../../utils/canPawnBeSettled";
import {
  IPawn,
  IPawnHelper,
  IPawnRenderData,
} from "../../interfaces/Pawns/Pawn";
import { ICharacter } from "../../interfaces/Characters/Character";
import { ITilesService } from "../../interfaces/Tiles/Tiles";
import { IAllResources } from "../../interfaces/Resources/AllResources";
import { IStructuresService } from "../../interfaces/Structures/Structures";
import { IThreat } from "../../interfaces/Threat/Threat";
import { IBeasts } from "../../interfaces/Beasts/Beasts";
import { Morale } from "./Morale/Morale";
import { IMorale } from "../../interfaces/Morale/Morale";
import { Weather } from "./Weather/Weather";
import { IWeather } from "../../interfaces/Weather/Weather";
import { Action } from "./ActionService/Action";
import { ACTION_TYPE } from "../../interfaces/ActionService/Action";
import { PlayerService } from "./Players/PlayerService";
import { IPlayerService } from "../../interfaces/PlayerService/PlayerSevice";

const player = new Player("Konrad", "orange", 0);
const friday = new SideCharacter("friday", 0, 4);
const dog = new SideCharacter("dog", 1, Infinity);
const cook = new PlayerCharacter("cook", 2, 13, "male", [2, 1, 3, 7], player);
player.setCharacter(cook);

export const characters = [friday, dog, cook];

export { player };
type ScenarioName = "castaways";

export class GameClass implements IGame {
  get playerService(): IPlayerService {
    return this._playerService;
  }

  get weather(): IWeather {
    return this._weather;
  }

  get morale(): IMorale {
    return this._morale;
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

  get renderData(): IGameRenderData {
    return {
      actionSlotsService: this.actionSlotsService.renderData,
      allCharacters: this.allCharacters.characters.map(
        (character) => character.renderData
      ),
      allPawns: this.allPawns.map((pawn) => pawn.renderData),
      allResources: this.allResources.renderData,
      arrangeCamp: this.arrangeCamp,
      beasts: this.beasts.renderData,
      equipment: this.equipment.renderData,
      inventionsService: this.inventionsService.renderData,
      localPlayer: this.localPlayer.renderData,
      players: this._playerService.renderData,
      rest: this.rest,
      structuresService: this.structuresService.renderData,
      threat: this.threat.renderData,
      tilesService: this.tilesService.renderData,
    };
  }

  private _playerService: IPlayerService;
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
  private _weather: IWeather = new Weather();
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

  private _morale = new Morale(this);

  actionServices = {
    gather: new Action(ACTION_TYPE.gather),
    build: new Action(ACTION_TYPE.build),
    explore: new Action(ACTION_TYPE.explore),
    hunt: new Action(ACTION_TYPE.hunt),
  };

  constructor(players: IPlayer[], scenarioName: ScenarioName) {
    this._playerService = new PlayerService(players);
    this._allCharacters = new AllCharacters([
      friday,
      player.getCharacter(),
      dog,
    ]);
  }

  setPawn(droppableId: string, draggableId: string) {
    const pawn = this.allPawns.find((p) => p.draggableId === draggableId);
    if (!pawn) {
      throw new Error("cant find pawn with id: " + draggableId);
    }
    if (!this.canPawnBeSettled(pawn, droppableId)) {
      return;
    }

    if (droppableId.includes("freepawns")) {
      pawn.character.pawns.copyPawnToFreePawns(pawn.draggableId);
    } else {
      console.log(droppableId, pawn);
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

  canPawnBeSettled(pawn: null | IPawn, destinationId: string): boolean {
    if (!pawn) {
      return true;
    }
    if (pawn.draggableId.includes("dog")) {
      if (destinationId.includes("leader")) {
        return false;
      }
      if (destinationId.includes("hunt") || destinationId.includes("explore")) {
        return true;
      }
      return destinationId.includes("freepawns-dog");
    } else if (pawn.draggableId === "friday") {
      return !(
        destinationId.includes("freepawns") &&
        !destinationId.includes("freepawns-friday")
      );
    } else {
      return !(
        destinationId.includes("freepawns") &&
        !destinationId.includes(pawn.character.name)
      );
    }
  }
}
