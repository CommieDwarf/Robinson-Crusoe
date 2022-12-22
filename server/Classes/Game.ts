import {Threat} from "./Threat/Threat";
import {Player} from "./Players/Player";
import {ActionSlotsService} from "./ActionSlotsService/ActionSlots";
import {TileService} from "./TileService/TileService";
import {ResourceService} from "./ResourceService/ResourceService";
import {StructuresService} from "./Structures/Structures";
import {InventionsService} from "./Inventions/InventionsService";
import {Equipment} from "./Equipment/Equipment";
import {Beasts} from "./Beasts/Beasts";
import {PlayerCharacter} from "./CharacterService/Character/PlayerCharacter/PlayerCharacter";
import {IGame, IGameRenderData} from "../../interfaces/Game";
import {IInventionsService} from "../../interfaces/Inventions/Inventions";

import {IEquipment} from "../../interfaces/Equipment/Equipment";
import {ICharacterService} from "../../interfaces/CharacterService/CharacterService";
import {CharacterService} from "./CharacterService/CharacterService";
import {IPawn, IPawnHelper} from "../../interfaces/Pawns/Pawn";
import {ITileService} from "../../interfaces/TileService/ITileService";
import {IAllResources} from "../../interfaces/Resources/AllResources";
import {IStructuresService} from "../../interfaces/Structures/Structures";
import {IThreat} from "../../interfaces/Threat/Threat";
import {IBeasts} from "../../interfaces/Beasts/Beasts";
import {Morale} from "./Morale/Morale";
import {IMorale} from "../../interfaces/Morale/Morale";
import {WeatherService} from "./WeatherService/WeatherService";
import {IWeatherService} from "../../interfaces/Weather/Weather";

import {PlayerService} from "./Players/PlayerService";
import {IPlayerService} from "../../interfaces/PlayerService/PlayerSevice";
import {ActionService} from "./ActionService/ActionService";
import {PhaseService} from "./PhaseService/PhaseService";
import {IActionService} from "../../interfaces/ActionService/ActionService";
import {IPhaseService} from "../../interfaces/PhaseService/PhaseService";
import {ChatLog} from "./ChatLog/ChatLog";
import {IChatLog} from "../../interfaces/ChatLog/ChatLog";
import {IAlertService} from "../../interfaces/AlertService/AlertService";
import {AlertService} from "./AlertService/AlertService";
import {ArrangeCampRestService} from "./ArrangeCampRestService/ArrangeCampRestService";
import {Castaways} from "./Scenario/Castaways";
import {IScenarioService} from "../../interfaces/ScenarioService/ScenarioService";

type ScenarioName = "castaways";

export class GameClass implements IGame {
  get weatherService(): IWeatherService {
    return this._weatherService;
  }

  get scenarioService(): IScenarioService {
    return this._scenarioService;
  }

  get arrangeCampRestService(): ArrangeCampRestService {
    return this._arrangeCampRestService;
  }

  private _chatLog: IChatLog = new ChatLog(this);
  private _actionService: ActionService = new ActionService(this);
  private readonly _playerService: IPlayerService;
  private readonly _localPlayer: Player;
  private _tilesService: ITileService = new TileService(this, 7);
  private _allResources: IAllResources = new ResourceService(this);
  private _structuresService: IStructuresService = new StructuresService(this);
  private _alertService: IAlertService = new AlertService();
  private readonly _inventionsService: IInventionsService;
  private _weatherService: IWeatherService = new WeatherService(this);
  private _threat: IThreat = new Threat(this);
  private _phaseService: IPhaseService = new PhaseService(this);
  private readonly _characterService: ICharacterService;
  private _equipment: IEquipment = new Equipment(this);
  private _arrangeCampRestService = new ArrangeCampRestService();
  private _beasts: IBeasts = new Beasts(this, this._allResources.owned);
  private _actionSlotsService = new ActionSlotsService(
      this._structuresService,
      this.inventionsService,
      this._tilesService
  );
  private _morale = new Morale(this);
  private _round = 12;
  private _scenarioService: IScenarioService = new Castaways(this);

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

    this._inventionsService = new InventionsService(
        "castaways",
        this._tilesService,
        this
    );
  }

  get renderData(): IGameRenderData {
    return {
      actionSlotsService: this.actionSlotsService.renderData,
      characterService: this._characterService.renderData,
      allResources: this.allResources.renderData,
      arrangeCampRestService: this._arrangeCampRestService.renderData,
      beasts: this.beasts.renderData,
      equipment: this.equipment.renderData,
      inventionsService: this.inventionsService.renderData,
      localPlayer: this.localPlayer.renderData,
      players: this._playerService.renderData,
      structuresService: this.structuresService.renderData,
      threat: this.threat.renderData,
      tilesService: this.tilesService.renderData,
      phaseService: this._phaseService.renderData,
      morale: this._morale.renderData,
      round: this.round,
      logs: this.chatLog.renderData,
      actionService: this.actionService.renderData,
      alertService: this.alertService.renderData,
      scenarioService: this._scenarioService.renderData,
      weatherService: this._weatherService.renderData,
      allPawns: this.allPawns.map((pawn) => pawn.renderData),
    };
  }

  get alertService(): IAlertService {
    return this._alertService;
  }

  get characterService(): ICharacterService {
    return this._characterService;
  }

  get chatLog(): IChatLog {
    return this._chatLog;
  }

  get round(): number {
    return this._round;
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

  get morale(): IMorale {
    return this._morale;
  }

  get localPlayer(): Player {
    return this._localPlayer;
  }

  get tilesService(): ITileService {
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

  get beasts(): IBeasts {
    return this._beasts;
  }

  get actionSlotsService(): ActionSlotsService {
    return this._actionSlotsService;
  }

  get allPawns() {
    let pawns: IPawn[] = [];
    this.characterService.allCharacters.forEach((char) => {
      pawns = pawns.concat(char.pawnService.pawns);
    });
    return pawns;
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
      pawn.character.pawnService.copyPawnToFreePawns(pawn.draggableId);
    } else {
      this._actionSlotsService.setPawn(droppableId, pawn);
    }
    if (droppableId.includes("rest")) {
      this._arrangeCampRestService.pawnAmount.rest++;
    } else if (droppableId.includes("arrangeCamp")) {
      this._arrangeCampRestService.pawnAmount.arrangeCamp++;
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
      this._arrangeCampRestService.pawnAmount.rest--;
    } else if (destinationId.includes("arrangeCamp")) {
      this._arrangeCampRestService.pawnAmount.arrangeCamp--;
    }
  }

  resetPawns() {
    this.characterService.resetPawns();
    this.actionSlotsService.clearSlots();
    this._arrangeCampRestService.pawnAmount.rest = 0;
    this._arrangeCampRestService.pawnAmount.arrangeCamp = 0;
  }

  setNextRound() {
    this._round++;
  }

  canPawnBeSettled(pawn: null | IPawn | IPawnHelper, destinationId: string): boolean {
    if (!pawn) {
      return true;
    }
    if ("action" in pawn) {
      switch (pawn.action) {
        case "build":
          return destinationId.includes("invention") || destinationId.includes("structure");
        case "explore":
          return destinationId.includes("explore");
        case "gather":
          return destinationId.includes("gather");
      }
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
