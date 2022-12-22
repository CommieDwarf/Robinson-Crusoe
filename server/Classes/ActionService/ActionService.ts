import {
  IActionService,
  IActionServiceRenderData,
  IResolvableActionServices,
} from "../../../interfaces/ActionService/ActionService";
import { IGame } from "../../../interfaces/Game";
import { ThreatService } from "./ResolvableActionServices/ThreatService";
import { HuntStatus } from "./ResolvableActionServices/HuntService";
import { BuildService } from "./ResolvableActionServices/BuildService";
import { GatherService } from "./ResolvableActionServices/GatherService";
import { ExploreService } from "./ResolvableActionServices/ExploreService";
import { ArrangeCampService } from "./ResolvableActionServices/ArrangeCampService";
import { RestService } from "./ResolvableActionServices/RestService";
import {
  IResolvableActionService,
  RESOLVE_ITEM_STATUS,
} from "../../../interfaces/ActionService/IActionResolvableService";
import { Action } from "../../../interfaces/Action";
import { actionOrder } from "../../../constants/actionOrder";
import { IResolvableItem } from "../../../interfaces/ActionService/IResolvableItem";

export class ActionService implements IActionService {
  private readonly _game: IGame;
  private _currentResolvableActionService: IResolvableActionService;
  private _finished: boolean = false;
  orderIndex = 0;

  private readonly _resolvableActionServices: IResolvableActionServices;

  private _lastResolvedItem: IResolvableItem | null = null;

  constructor(game: IGame) {
    this._game = game;
    this._resolvableActionServices = {
      threat: new ThreatService(this.game),
      hunt: new HuntStatus(this.game),
      build: new BuildService(this.game),
      gather: new GatherService(this.game),
      explore: new ExploreService(this.game),
      arrangeCamp: new ArrangeCampService(this.game),
      rest: new RestService(this.game),
    };
    this._currentResolvableActionService =
      this.resolvableActionServices["threat"];
  }

  get renderData(): IActionServiceRenderData {
    const lastResolvedItem = this._lastResolvedItem
      ? this._lastResolvedItem.renderData
      : null;
    const resolvableActionServices = {
      threat: this.resolvableActionServices.threat.renderData,
      hunt: this.resolvableActionServices.hunt.renderData,
      build: this.resolvableActionServices.build.renderData,
      gather: this.resolvableActionServices.gather.renderData,
      explore: this.resolvableActionServices.explore.renderData,
      arrangeCamp: this.resolvableActionServices.arrangeCamp.renderData,
      rest: this.resolvableActionServices.rest.renderData,
    };
    return {
      resolvableActionServices,
      finished: this.finished,
      currentResolve: this.currentResolvableActionService.renderData,
      lastResolvedItem,
    };
  }

  // -----------------------------------------

  get lastResolvedItem(): IResolvableItem | null {
    return this._lastResolvedItem;
  }

  set lastResolvedItem(value: IResolvableItem | null) {
    this._lastResolvedItem = value;
  }

  set finished(value: boolean) {
    this._finished = value;
  }

  get resolvableActionServices(): IResolvableActionServices {
    return this._resolvableActionServices;
  }

  get currentResolvableActionService(): IResolvableActionService {
    return this._currentResolvableActionService;
  }

  get finished(): boolean {
    return this._finished;
  }

  get game(): IGame {
    return this._game;
  }

  // ---------------------------------------

  updateItems() {
    for (const [key, value] of Object.entries(this.resolvableActionServices)) {
      let val = value as IResolvableActionService;
      val.updateItems();
    }
  }

  setNextAction() {
    if (!this.currentResolvableActionService.finished) {
      throw new Error("All items must be resolved before setting next action");
    }
    this._currentResolvableActionService.clearItems();
    this.lastResolvedItem = null;
    this.orderIndex =
      this.orderIndex >= actionOrder.length - 1 ? 0 : this.orderIndex + 1;

    this._currentResolvableActionService =
      this._resolvableActionServices[actionOrder[this.orderIndex]];

    if (!this._finished) {
      this._currentResolvableActionService.updateItems();
    }

    if (this._currentResolvableActionService.action === "rest") {
      this._finished = true;
    }
  }

  resolveItem(action: Action, droppableId: string) {
    const item = this._currentResolvableActionService.getItem(droppableId);
    if (item.status === RESOLVE_ITEM_STATUS.PENDING) {
      this._currentResolvableActionService.resolveItem(item.droppableId);
      item.helpers.forEach((pawn) => {
        if ("disposable" in pawn) {
          pawn.disposed = true;
        }
      });
    } else {
      throw new Error(
        "Trying to resolve already resolved item: " + item.droppableId
      );
    }
  }
}
