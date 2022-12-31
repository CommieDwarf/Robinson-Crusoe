import {
  IPhaseService,
  Phase,
  PhaseEffects,
} from "../../../interfaces/PhaseService/PhaseService";
import { IGame } from "../../../interfaces/Game";
import { MissingLeaderError } from "../Errors/MissingLeaderError";
import {
  Translatable,
  TRANSLATE_PL,
} from "../../../interfaces/TRANSLATE_PL/TRANSLATE_PL";
import { phaseOrder } from "../../../constants/phaseOrder";
import { MissingPawnError } from "../Errors/MissingPawnError";
import capitalizeFirstLetter from "../../../utils/capitalizeFirstLetter";

export class PhaseService implements IPhaseService {
  private _phase: Phase = "event";
  private _phaseIndex = 0;
  private _game: IGame;
  private _locked: boolean = false;

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

  get locked(): boolean {
    return this._locked;
  }

  set locked(value: boolean) {
    this._locked = value;
  }

  get phase(): Phase {
    return this._phase;
  }

  handleError(error: MissingPawnError | MissingLeaderError) {
    let itemName = error.itemName ? error.itemName : "";
    let itemNamePL;
    if (error.itemType === "tile") {
      itemNamePL = " nr. " + itemName;
    } else if (error.itemType === "hunt") {
      itemNamePL = "";
    } else {
      itemNamePL = " - " + TRANSLATE_PL[itemName as Translatable];
    }

    const message =
      error instanceof MissingLeaderError
        ? "Pomocnicze pionki nie mogą samodzielnie wykonywać akcji."
        : "Brakuje pionka do wykonania tej akcji";

    this._game.alertService.setAlert(
      `${capitalizeFirstLetter(
        TRANSLATE_PL[error.itemType as Translatable]
      )}${itemNamePL}: ${message}`
    );
  }

  goNextPhase() {
    try {
      this.phaseEffects[this._phase]();
      this._phaseIndex =
        this._phaseIndex === phaseOrder.length - 1 ? 0 : ++this._phaseIndex;
      this._phase = phaseOrder[this._phaseIndex];
      this._game.alertService.clearAlert();
    } catch (error) {
      if (
        error instanceof MissingLeaderError ||
        error instanceof MissingPawnError
      ) {
        this.handleError(error);
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
    const resources = this._game.tileService.campTile.tileType?.resources;
    if (!resources) {
      throw new Error("There are no resources in tile");
    }
    const res1 = resources.left;
    const res2 = resources.right;
    if (res1 !== "beast") {
      this._game.resourceService.addResourceToOwned(
        res1,
        1,
        "kafelek z obozem"
      );
    }
    if (res2 !== "beast") {
      this._game.resourceService.addResourceToOwned(
        res2,
        1,
        "kafelek z obozem"
      );
    }
  };

  private preActionEffect = () => {
    try {
      this._game.actionService.updateItems();
    } catch (error) {
      throw error;
    }

    this.locked = true;
  };

  private actionEffect = () => {
    this.locked = false;
    this._game.actionService.setNextAction();
    this._game.actionService.finished = false;
    this._game.resetPawns();
  };

  private weatherEffect = () => {
    this._game.weatherService.applyEffects();
  };

  private nightEffect = () => {
    this._game.setNextRound();
    this._game.tileService.campJustMoved = false;
  };
}
