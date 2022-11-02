import {
  IActionService,
  IActionServiceRenderData,
  Statuses,
} from "../../../interfaces/ActionService/ActionService";
import { IGame } from "../../../interfaces/Game";
import { ThreatStatus } from "./ActionStatuses/ThreatStatus";
import { HuntStatus } from "./ActionStatuses/HuntStatus";
import { BuildStatus } from "./ActionStatuses/BuildStatus";
import { GatherStatus } from "./ActionStatuses/GatherStatus";
import { ExploreStatus } from "./ActionStatuses/ExploreStatus";
import { ArrangeCampStatus } from "./ActionStatuses/ArrangeCampStatus";
import { RestStatus } from "./ActionStatuses/RestStatus";

const actionOrder: (keyof Statuses)[] = [
  "threat",
  "hunt",
  "build",
  "gather",
  "explore",
  "arrangeCamp",
  "rest",
];

export class ActionService implements IActionService {
  get currentResolve(): keyof Statuses {
    return this._currentResolve;
  }

  get finished(): boolean {
    return this._finished;
  }

  get game(): IGame {
    return this._game;
  }

  private readonly _game: IGame;
  private _currentResolve: keyof Statuses = "threat";
  private _finished: boolean = false;
  orderIndex = 0;

  statuses: Statuses = {
    threat: new ThreatStatus(this.game),
    hunt: new HuntStatus(this.game),
    build: new BuildStatus(this.game),
    gather: new GatherStatus(this.game),
    explore: new ExploreStatus(this.game),
    arrangeCamp: new ArrangeCampStatus(this.game),
    rest: new RestStatus(this.game),
  };

  constructor(game: IGame) {
    this._game = game;
  }

  get renderData(): IActionServiceRenderData {
    const statuses = {
      threat: this.statuses.threat.renderData,
      hunt: this.statuses.hunt.renderData,
      build: this.statuses.build.renderData,
      gather: this.statuses.gather.renderData,
      explore: this.statuses.explore.renderData,
      arrangeCamp: this.statuses.arrangeCamp.renderData,
      rest: this.statuses.rest.renderData,
    };
    return {
      statuses,
      finished: this.finished,
      currentResolve: this.currentResolve,
    };
  }

  setNextAction() {
    if (this.orderIndex >= actionOrder.length) {
      this.orderIndex = 0;
    } else {
      this.orderIndex++;
    }
    this._currentResolve = actionOrder[this.orderIndex];
  }

  resolveNext(): void {
    if (!this._finished) {
      this.statuses[this.currentResolve].resolveNextItem();
    }
    if (this.statuses[this.currentResolve].finished) {
      this.setNextAction();
      if (this.currentResolve === "threat") {
        this._finished = true;
      }
    }
  }
}
