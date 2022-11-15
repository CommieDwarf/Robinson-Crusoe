import {
  IPhaseService,
  Phase,
  PhaseEffects,
} from "../../../interfaces/PhaseService/PhaseService";
import { IGame } from "../../../interfaces/Game";
import { MissingLeaderError } from "../Errors/MissingLeaderError";
import {
  ACTION_PL,
  Translatable,
  TRANSLATE_PL,
} from "../../../interfaces/TRANSLATE_PL/TRANSLATE_PL";

const phases: Phase[] = [
  "event",
  "morale",
  "production",
  "preAction",
  "action",
  "weather",
  "night",
];

export class PhaseService implements IPhaseService {
  get locked(): boolean {
    return this._locked;
  }

  set locked(value: boolean) {
    this._locked = value;
  }

  get phase(): Phase {
    return this._phase;
  }

  get renderData() {
    return {
      phase: this._phase,
      locked: this.locked,
    };
  }

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
      weather: () => {},
      night: this.nightEffect,
    };
  }

  goNextPhase() {
    try {
      this.phaseEffects[this._phase]();
      this._phaseIndex =
        this._phaseIndex === phases.length - 1 ? 0 : ++this._phaseIndex;
      this._phase = phases[this._phaseIndex];
      this._game.alertService.clearAlert();
    } catch (error) {
      if (error instanceof MissingLeaderError) {
        this._game.alertService.setAlert(
          `Pomocnicy nie mogą samodzielnie wykonywać akcji. ${[
            TRANSLATE_PL[error.itemType as Translatable],
          ]} - ${TRANSLATE_PL[error.itemName as Translatable]}`
        );
      } else {
        throw error;
      }
    }
  }

  private eventEffect = () => {
    this._game.threat.moveCardsLeft();
    this._game.threat.pullCard();
  };

  private moraleEffect = () => {
    if (this._game.morale.lvl === 0) {
      return;
    }
    // TODO: implement player choice when lvl 3 whenever he wants determination or health
    const primePlayerCharacter =
      this._game.playerService.primePlayer.getCharacter();
    if (this._game.morale.lvl > 0) {
      this._game.characterService.incrDetermination(
        primePlayerCharacter,
        this._game.morale.lvl,
        "Faza morali"
      );
    } else {
      this._game.characterService.decrDetermination(
        primePlayerCharacter,
        Math.abs(this._game.morale.lvl),
        "Faza morali"
      );
    }
  };

  private productionEffect = () => {
    const resources =
      this._game.tilesService.currentCampTile.tileType?.resources;
    if (!resources) {
      throw new Error("There are no resources in tile");
    }
    const res1 = resources.left;
    const res2 = resources.right;
    if (res1 !== "beast") {
      this._game.allResources.addResourceToOwned(res1, 1, "kafelek z obozem");
    }
    if (res2 !== "beast") {
      this._game.allResources.addResourceToOwned(res2, 1, "kafelek z obozem");
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

  private nightEffect = () => {
    this._game.setNextTurn();
  };
}
