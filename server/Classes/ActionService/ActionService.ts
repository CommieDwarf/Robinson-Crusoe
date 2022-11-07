import {
  IActionService,
  IActionServiceRenderData,
  IResolvableActionServices,
} from "../../../interfaces/ActionService/ActionService";
import { IGame } from "../../../interfaces/Game";
import { ThreatStatus } from "./ActionStatuses/ThreatStatus";
import { HuntStatus } from "./ActionStatuses/HuntStatus";
import { BuildStatus } from "./ActionStatuses/BuildStatus";
import { GatherStatus } from "./ActionStatuses/GatherStatus";
import { ExploreStatus } from "./ActionStatuses/ExploreStatus";
import { ArrangeCampStatus } from "./ActionStatuses/ArrangeCampStatus";
import { RestStatus } from "./ActionStatuses/RestStatus";
import { IResolvableActionService } from "../../../interfaces/ActionService/IActionResolvableService";

const actionOrder: (keyof IResolvableActionServices)[] = [
  "threat",
  "hunt",
  "build",
  "gather",
  "explore",
  "arrangeCamp",
  "rest",
];

export class ActionService implements IActionService {
  get resolvableActionServices(): IResolvableActionServices {
    return this._resolvableActionServices;
  }

  get currentResolve(): keyof IResolvableActionServices {
    return this._currentResolve;
  }

  get finished(): boolean {
    return this._finished;
  }

  get game(): IGame {
    return this._game;
  }

  private readonly _game: IGame;
  private _currentResolve: keyof IResolvableActionServices = "threat";
  private _finished: boolean = false;
  orderIndex = 0;

  private _resolvableActionServices: IResolvableActionServices;

  constructor(game: IGame) {
    this._game = game;
    this._resolvableActionServices = {
      threat: new ThreatStatus(this.game),
      hunt: new HuntStatus(this.game),
      build: new BuildStatus(this.game),
      gather: new GatherStatus(this.game),
      explore: new ExploreStatus(this.game),
      arrangeCamp: new ArrangeCampStatus(this.game),
      rest: new RestStatus(this.game),
    };
  }

  get renderData(): IActionServiceRenderData {
    const statuses = {
      threat: this.resolvableActionServices.threat.renderData,
      hunt: this.resolvableActionServices.hunt.renderData,
      build: this.resolvableActionServices.build.renderData,
      gather: this.resolvableActionServices.gather.renderData,
      explore: this.resolvableActionServices.explore.renderData,
      arrangeCamp: this.resolvableActionServices.arrangeCamp.renderData,
      rest: this.resolvableActionServices.rest.renderData,
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
    for (const [key, value] of Object.entries(this.resolvableActionServices)) {
      let val = value as IResolvableActionService;
      val.updateItems();
    }
  }

  resolveNext(): void {
    if (!this._finished) {
      this.resolvableActionServices[this.currentResolve].resolveNextItem();
    }
    if (this.resolvableActionServices[this.currentResolve].finished) {
      if (this.currentResolve === "threat") {
        this._finished = true;
      }
    }
  }
}
