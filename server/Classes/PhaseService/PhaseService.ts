import {
  IPhaseService,
  Phase,
  PhaseEffects,
} from "../../../interfaces/PhaseService/PhaseService";
import { IGame } from "../../../interfaces/Game";
import { PHASE } from "../../../interfaces/PhaseService/Phase";

const phases: Phase[] = [
  "event",
  "morale",
  "production",
  "action",
  "weather",
  "night",
];

export class PhaseService implements IPhaseService {
  get phase(): Phase {
    return this._phase;
  }

  get renderData() {
    return {
      phase: this._phase,
    };
  }

  private _phase: Phase = "event";
  private _phaseIndex = 0;
  private _game: IGame;

  phaseEffects: PhaseEffects;

  constructor(game: IGame) {
    this._game = game;
    this.phaseEffects = {
      event: this.eventEffect,
      morale: () => this.moraleEffect(),
      production: this.productionEffect,
      action: () => {},
      weather: () => {},
      night: this.nightEffect,
    };
  }

  goNextPhase() {
    this.phaseEffects[this._phase]();
    this._phaseIndex =
      this._phaseIndex === phases.length - 1 ? 0 : ++this._phaseIndex;
    this._phase = phases[this._phaseIndex];
    if (this._phase === "action") {
      this._game.actionService;
    }
  }

  private eventEffect = () => {
    this._game.threat.moveCardsLeft();
    this._game.threat.pullCard();
  };

  private moraleEffect() {
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
  }

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

  private actionEffect() {}

  private nightEffect = () => {
    this._game.setNextTurn();
  };
}
