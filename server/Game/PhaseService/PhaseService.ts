import {
  IPhaseService,
  Phase,
  PhaseEffects,
} from "../../../interfaces/PhaseService/PhaseService";
import { IGame } from "../../../interfaces/Game";
import { MissingLeaderError } from "../Errors/MissingLeaderError";

import { phaseOrder } from "../../../constants/phaseOrder";
import { ActionSlotService } from "../ActionSlotsService/ActionSlotService";
import { MissingHelperError } from "../Errors/MissingHelperError";

export class PhaseService implements IPhaseService {
  private _phase: Phase = "event";
  private _phaseIndex = 0;
  private readonly _game: IGame;

  phaseEffects: PhaseEffects;

  constructor(game: IGame) {
    this._game = game;
    this.phaseEffects = {
      event: this.eventEffect,
      morale: this.moraleEffect,
      production: this.productionEffect,
      preAction: this.preActionEffect,
      action: this.actionEffect,
      weather: this.weatherEffect,
      night: this.nightEffect,
    };
  }

  get renderData() {
    return {
      phase: this._phase,
      locked: this.locked,
    };
  }

  get phase(): Phase {
    return this._phase;
  }

  get locked() {
    if (this._phase === "action" && !this._game.actionService.finished) {
      return true;
    }
    return this._game.tileService.resourceAmountToDeplete > 0;
  }

  handleMissingPawnError(error: MissingHelperError | MissingLeaderError) {
    const message =
      error instanceof MissingLeaderError
        ? "Pomocnicze pionki nie mogą samodzielnie wykonywać akcji."
        : "Brakuje pionka do wykonania tej akcji";

    this._game.alertService.setAlert(message);
    this._game.actionSlotService.pawnDropIDAlert = error.droppableID;
  }

  goNextPhase() {
    if (this._game.mysteryService.isDrawingOn) {
      return;
    }
    if (this._phase === "action") {
      if (!this._game.actionService.finished) {
        return;
      }
    }
    if (
      this._phase === "weather" &&
      this._game.weatherService.shouldRollDices &&
      !this._game.weatherService.rollDiceResult
    ) {
      return;
    }
    try {
      this.phaseEffects[this._phase]();
      this._phaseIndex =
        this._phaseIndex === phaseOrder.length - 1 ? 0 : ++this._phaseIndex;
      this._phase = phaseOrder[this._phaseIndex];
      this._game.alertService.clearAlert();
      this._game.actionSlotService.pawnDropIDAlert = null;
    } catch (error) {
      if (
        error instanceof MissingLeaderError ||
        error instanceof MissingHelperError
      ) {
        this.handleMissingPawnError(error);
      } else {
        throw error;
      }
    }
  }

  private eventEffect = () => {
    this._game.eventService.moveCardsLeft();
    this._game.eventService.pullCard();
  };

  private moraleEffect = () => {
    if (this._game.moraleService.lvl === 0) {
      return;
    }
    // TODO: implement player choice when lvl 3 whenever he wants determination or health
    const primePlayerCharacter =
      this._game.playerService.primePlayer.getCharacter();
    if (this._game.moraleService.lvl > 0) {
      this._game.characterService.incrDetermination(
        primePlayerCharacter,
        this._game.moraleService.lvl,
        "Faza morali"
      );
    } else {
      this._game.characterService.decrDetermination(
        primePlayerCharacter,
        Math.abs(this._game.moraleService.lvl),
        "Faza morali"
      );
    }
  };

  private productionEffect = () => {
    const resources =
      this._game.tileService.campTile.tileResourceService?.resources;
    if (!resources) {
      throw new Error("There are no resources in tile");
    }
    const resourceArr = [resources.left, resources.right];

    resourceArr.forEach((res) => {
      if (!res.depleted && res.resource !== "beast") {
        this._game.resourceService.addBasicResourceToOwned(
          res.resource,
          1,
          "Produkcja"
        );
      }
    });
  };

  private preActionEffect = () => {
    const occupiedSlots = this._game.actionSlotService.getOccupiedActionSlots();
    ActionSlotService.checkMissingPawns(occupiedSlots, this._game);
    this._game.actionService.loadItems();
    this._game.actionSlotService.pawnDropIDAlert = null;
  };

  private actionEffect = () => {
    this._game.actionService.finished = false;
    this._game.resetPawns();
    this._game.resourceService.addFutureToOwned();
  };

  private weatherEffect = () => {
    this._game.weatherService.applyEffects();
  };

  private nightEffect = () => {
    this._game.setNextRound();
    this._game.tileService.campJustMoved = false;
    this._game.characterService.allCharacters.forEach((char) =>
      char.refreshSkills()
    );
  };
}
