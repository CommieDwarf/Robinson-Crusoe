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
import { PlayerCharacter } from "./Characters/PlayerCharacter";
import { IGame, IGameRenderData } from "../../interfaces/Game";
import { SCENARIO } from "../../interfaces/Scenario/Scenario";
import { IInventionsService } from "../../interfaces/Inventions/Inventions";

import { IEquipment } from "../../interfaces/Equipment/Equipment";
import { ICharacterService } from "../../interfaces/CharacterService/CharacterService";
import { CharacterService } from "./Characters/CharacterService";
import { IPawn, IPawnHelper } from "../../interfaces/Pawns/Pawn";
import { ICharacter } from "../../interfaces/Characters/Character";
import { ITilesService } from "../../interfaces/Tiles/TilesService";
import { IAllResources } from "../../interfaces/Resources/AllResources";
import { IStructuresService } from "../../interfaces/Structures/Structures";
import { IThreat } from "../../interfaces/Threat/Threat";
import { IBeasts } from "../../interfaces/Beasts/Beasts";
import { Morale } from "./Morale/Morale";
import { IMorale } from "../../interfaces/Morale/Morale";
import { Weather } from "./Weather/Weather";
import { IWeather } from "../../interfaces/Weather/Weather";

import { PlayerService } from "./Players/PlayerService";
import { IPlayerService } from "../../interfaces/PlayerService/PlayerSevice";
import { ActionService } from "./ActionService/ActionService";
import { PhaseService } from "./PhaseService/PhaseService";
import { IActionService } from "../../interfaces/ActionService/ActionService";
import { IPhaseService } from "../../interfaces/PhaseService/PhaseService";
import { ChatLog } from "./ChatLog/ChatLog";
import { IChatLog } from "../../interfaces/ChatLog/ChatLog";

type ScenarioName = "castaways";

export class GameClass implements IGame {
  get characterService(): ICharacterService {
    return this._characterService;
  }

  get chatLog(): IChatLog {
    return this._chatLog;
  }

  get turn(): number {
    return this._turn;
  }

  get actionService(): IActionService {
    return this._actionService;
  }

  get phaseService(): IPhaseService {
    return this._phaseService;
  }

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
      characterService: this._characterService.renderData,
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
      phaseService: this._phaseService.renderData,
      morale: this._morale.renderData,
      turn: this.turn,
      logs: this.chatLog.renderData,
      actionService: this.actionService.renderData,
    };
  }

  private _chatLog: IChatLog = new ChatLog(this);
  private _actionService: ActionService = new ActionService(this);
  private _playerService: IPlayerService;
  private _localPlayer: Player;
  private _tilesService: ITilesService = new TilesService(this);
  private _allResources: IAllResources = new AllResources(this);
  private _structuresService: IStructuresService = new StructuresService(this);

  // hardcoded for demo version
  private _inventionsService: IInventionsService;

  private _weather: IWeather = new Weather();
  private _threat: IThreat = new Threat(this);
  private _phaseService: IPhaseService = new PhaseService(this);

  private _characterService: ICharacterService;
  private _equipment: IEquipment = new Equipment(this);
  private _rest = new AdditionalActivity("rest");
  private _arrangeCamp = new AdditionalActivity("arrangeCamp");
  private _beasts: IBeasts = new Beasts(this, this._allResources.owned);
  private _actionSlotsService = new ActionSlotsService(
    this._structuresService,
    this.inventionsService,
    this._tilesService
  );
  private _allPawns: IPawn[] = [];

  private _morale = new Morale(this);
  private _turn = 1;

  constructor(scenarioName: ScenarioName) {
    // this is hardcoded for demo purpose.
    const cook = new PlayerCharacter(
      "cook",
      2,
      13,
      this,
      "male",
      [2, 4, 6, 9],
      this.localPlayer
    );
    this._localPlayer = new Player("Konrad", "orange", 0, cook);

    this._playerService = new PlayerService([this.localPlayer]);
    this._characterService = new CharacterService(
      [this.localPlayer.getCharacter()],
      this
    );
    this._characterService.allCharacters.forEach(
      (char) => (this._allPawns = this._allPawns.concat(char.pawnService.pawns))
    );

    this._inventionsService = new InventionsService(
      SCENARIO.CASTAWAYS,
      [this.localPlayer.getCharacter()],
      this._tilesService,
      this
    );
  }

  setPawn(droppableId: string, draggableId: string) {
    const pawn = this.allPawns.find((p) => p.draggableId === draggableId);
    if (!pawn) {
      throw new Error("cant find pawn with id: " + draggableId);
    }
    if (!this.canPawnBeSettled(pawn, droppableId)) {
      console.log("return");
      return;
    }

    if (droppableId.includes("freepawns")) {
      pawn.character.pawnService.copyPawnToFreePawns(pawn.draggableId);
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
      const character = this._characterService.getCharacter(charName);
      character.pawnService.removePawn(draggableId, "freePawns");
    } else {
      this._actionSlotsService.unsetPawn(destinationId);
    }
    if (destinationId.includes("rest")) {
      this._rest.decrementPawns();
    } else if (destinationId.includes("arrangeCamp")) {
      this._arrangeCamp.decrementPawns();
    }
  }

  resetPawns() {
    this.characterService.resetPawns();
    this.actionSlotsService.clearSlots();
  }

  setNextTurn() {
    this._turn++;
  }

  getPawnFromActionSlot(droppableId: string) {
    return this._actionSlotsService.getPawn(droppableId);
  }

  getPawnFromCharacter(draggableId: string) {
    let searched;
    this.characterService.allCharacters.forEach((char) => {
      let pawn = char.pawnService.freePawns.find(
        (p) => p.draggableId === draggableId
      );
      if (pawn) {
        searched = pawn;
      }
    });
    return searched;
  }

  getCharacterById(id: number): ICharacter {
    const char = this.characterService.allCharacters.find(
      (char) => char.id === id
    );
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
