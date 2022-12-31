import { EventService } from "./EventService/EventService";
import { Player } from "./Players/Player";
import { ActionSlotService } from "./ActionSlotsService/ActionSlotService";
import { TileService } from "./TileService/TileService";
import { ResourceService } from "./ResourceService/ResourceService";
import { ConstructionService } from "./ConstructionService/ConstructionService";
import { InventionsService } from "./Inventions/InventionsService";
import { Equipment } from "./Equipment/Equipment";
import { BeastService } from "./BeastService/BeastService";
import { PlayerCharacter } from "./CharacterService/Character/PlayerCharacter/PlayerCharacter";
import { IGame, IGameRenderData } from "../../interfaces/Game";
import { IInventionService } from "../../interfaces/InventionService/InventionService";

import { IEquipment } from "../../interfaces/Equipment/Equipment";
import { ICharacterService } from "../../interfaces/CharacterService/CharacterService";
import { CharacterService } from "./CharacterService/CharacterService";
import { IPawn, IPawnHelper } from "../../interfaces/Pawns/Pawn";
import { ITileService } from "../../interfaces/TileService/ITileService";
import { IResourceService } from "../../interfaces/Resources/AllResources";
import { IConstructionService } from "../../interfaces/ConstructionService/IConstructionService";
import { IEventService } from "../../interfaces/EventService/EventService";
import { MoraleService } from "./MoraleService/MoraleService";
import { IMorale } from "../../interfaces/Morale/Morale";
import { WeatherService } from "./WeatherService/WeatherService";
import { IWeatherService } from "../../interfaces/Weather/Weather";

import { PlayerService } from "./Players/PlayerService";
import { IPlayerService } from "../../interfaces/PlayerService/PlayerSevice";
import { ActionService } from "./ActionService/ActionService";
import { PhaseService } from "./PhaseService/PhaseService";
import { IActionService } from "../../interfaces/ActionService/ActionService";
import { IPhaseService } from "../../interfaces/PhaseService/PhaseService";
import { ChatLog } from "./ChatLog/ChatLog";
import { IChatLog } from "../../interfaces/ChatLog/ChatLog";
import { IAlertService } from "../../interfaces/AlertService/AlertService";
import { AlertService } from "./AlertService/AlertService";
import { ArrangeCampRestService } from "./ArrangeCampRestService/ArrangeCampRestService";
import { Castaways } from "./Scenario/Castaways";
import { IScenarioService } from "../../interfaces/ScenarioService/ScenarioService";
import { IBeastService } from "../../interfaces/Beasts/BeastService";
import { TokenService } from "./TokenService/TokenService";
import { CHARACTER } from "../../interfaces/Characters/Character";

type ScenarioName = "castaways";

export class GameClass implements IGame {
  get actionSlotService(): ActionSlotService {
    return this._actionSlotsService;
  }

  get tokenService(): TokenService {
    return this._tokenService;
  }

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
  private _tileService: ITileService = new TileService(this, 7);
  private _resourceService: IResourceService = new ResourceService(this);
  private _constructionService: IConstructionService = new ConstructionService(
    this
  );
  private _alertService: IAlertService = new AlertService();
  private readonly _inventionService: IInventionService;
  private _weatherService: IWeatherService = new WeatherService(this);
  private _eventService: IEventService = new EventService(this);
  private _phaseService: IPhaseService = new PhaseService(this);
  private readonly _characterService: ICharacterService;
  private _equipmentService: IEquipment = new Equipment(this);
  private _arrangeCampRestService = new ArrangeCampRestService();
  private _beastService: IBeastService = new BeastService(this);
  private _actionSlotsService = new ActionSlotService(
    this._constructionService,
    this.inventionService,
    this._tileService
  );
  private _moraleService = new MoraleService(this);
  private _round = 1;
  private _scenarioService: IScenarioService = new Castaways(this);
  private _tokenService = new TokenService(this);

  constructor(scenarioName: ScenarioName) {
    // this is hardcoded for demo purpose.
    const cook = new PlayerCharacter(
      CHARACTER.COOK,
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

    this._inventionService = new InventionsService(
      "castaways",
      this._tileService,
      this
    );
  }

  get renderData(): IGameRenderData {
    return {
      actionSlotService: this.actionSlotService.renderData,
      characterService: this._characterService.renderData,
      resourceService: this.resourceService.renderData,
      arrangeCampRestService: this._arrangeCampRestService.renderData,
      beastService: this.beastService.renderData,
      equipmentService: this.equipmentService.renderData,
      inventionService: this.inventionService.renderData,
      localPlayer: this.localPlayer.renderData,
      players: this._playerService.renderData,
      constructionService: this.constructionService.renderData,
      eventService: this.eventService.renderData,
      tileService: this.tileService.renderData,
      phaseService: this._phaseService.renderData,
      moraleService: this._moraleService.renderData,
      round: this.round,
      logs: this.chatLog.renderData,
      actionService: this.actionService.renderData,
      alertService: this.alertService.renderData,
      scenarioService: this._scenarioService.renderData,
      weatherService: this._weatherService.renderData,
      allPawns: this.allPawns.map((pawn) => pawn.renderData),
      tokenService: this._tokenService.renderData,
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

  get moraleService(): IMorale {
    return this._moraleService;
  }

  get localPlayer(): Player {
    return this._localPlayer;
  }

  get tileService(): ITileService {
    return this._tileService;
  }

  get resourceService(): IResourceService {
    return this._resourceService;
  }

  get constructionService(): IConstructionService {
    return this._constructionService;
  }

  get inventionService(): IInventionService {
    return this._inventionService;
  }

  get eventService(): IEventService {
    return this._eventService;
  }

  get equipmentService(): IEquipment {
    return this._equipmentService;
  }

  get beastService(): IBeastService {
    return this._beastService;
  }

  get actionSlotService(): ActionSlotService {
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
    this.actionSlotService.clearSlots();
    this._arrangeCampRestService.pawnAmount.rest = 0;
    this._arrangeCampRestService.pawnAmount.arrangeCamp = 0;
  }

  setNextRound() {
    this._round++;
  }

  canPawnBeSettled(
    pawn: null | IPawn | IPawnHelper,
    destinationId: string
  ): boolean {
    if (!pawn) {
      return true;
    }

    if ("action" in pawn) {
      switch (pawn.action) {
        case "build":
          return (
            destinationId.includes("invention") ||
            destinationId.includes("structure")
          );
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
