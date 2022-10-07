import {
  IPhaseService,
  Phase,
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
  phase: Phase = "event";
  phaseIndex = 0;
  private _game: IGame;

  phaseEffects = {};

  constructor(game: IGame) {
    this._game = game;
  }

  goNextPhase() {
    this.phaseIndex = this.phaseIndex === 5 ? 0 : this.phaseIndex++;
  }

  private eventEffect() {
    this._game.threat.moveCardsLeft();
    this._game.threat.pullCard();
  }

  private moraleEffect() {
    // TODO: implement player choice when lvl 3 whenever he wants determination or health
    this._game.playerService.primePlayer
      .getCharacter()
      .incrementDetermination(this._game.morale.lvl);
  }

  private productionEffect() {
    const resources =
      this._game.tilesService.currentCampTile.tileType?.resources;
    if (!resources) {
      throw new Error("There are no resources in tile");
    }
    const res1 = resources.left;
    const res2 = resources.right;
    if (res1 !== "beast") {
      this._game.allResources.addResourceToOwned(res1, 1);
    }
    if (res2 !== "beast") {
      this._game.allResources.addResourceToOwned(res2, 1);
    }
  }

  private actionEffect() {
    // let actionSlots = this._game.actionServices
  }
}
