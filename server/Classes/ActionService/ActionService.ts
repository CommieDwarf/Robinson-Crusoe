import {
  IActionService,
  IActionServiceRenderData,
  ISpecificActionServices,
} from "../../../interfaces/ActionService/ActionService";
import { IGame } from "../../../interfaces/Game";
import { ThreatService } from "./SpecificActionService/ThreatService";
import { HuntStatus } from "./SpecificActionService/HuntService";
import { BuildService } from "./SpecificActionService/BuildService";
import { GatherService } from "./SpecificActionService/GatherService";
import { ExploreService } from "./SpecificActionService/ExploreService";
import { ArrangeCampService } from "./SpecificActionService/ArrangeCampService";
import { RestService } from "./SpecificActionService/RestService";
import {
  ISpecificActionService,
  RESOLVE_ITEM_STATUS,
} from "../../../interfaces/ActionService/IActionResolvableService";
import { ACTION } from "../../../interfaces/ACTION";
import { actionOrder } from "../../../constants/actionOrder";
import { IResolvableItem } from "../../../interfaces/ActionService/IResolvableItem";
import Entries from "../../../interfaces/Entries";

export class ActionService implements IActionService {
  private readonly _game: IGame;
  private _currentResolvableActionService: ISpecificActionService;
  private _finished: boolean = false;
  orderIndex = 0;

  private readonly _specificActionServices: ISpecificActionServices;

  private _lastResolvedItem: IResolvableItem | null = null;

  constructor(game: IGame) {
    this._game = game;
    this._specificActionServices = {
      [ACTION.THREAT]: new ThreatService(this.game),
      [ACTION.HUNT]: new HuntStatus(this.game),
      [ACTION.BUILD]: new BuildService(this.game),
      [ACTION.GATHER]: new GatherService(this.game),
      [ACTION.EXPLORE]: new ExploreService(this.game),
      [ACTION.ARRANGE_CAMP]: new ArrangeCampService(this.game),
      [ACTION.REST]: new RestService(this.game),
    };
    this._currentResolvableActionService =
      this.specificActionServices["threat"];
  }

  get renderData(): IActionServiceRenderData {
    const lastResolvedItem = this._lastResolvedItem
      ? this._lastResolvedItem.renderData
      : null;

    const entries = Object.entries(
      this._specificActionServices
    ) as Entries<ISpecificActionServices>;
    const renderDataEntries = entries.map(([key, value]) => [
      key,
      value.renderData,
    ]);
    const specificActionServices = Object.fromEntries(renderDataEntries);

    return {
      specificActionServices,
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

  get specificActionServices(): ISpecificActionServices {
    return this._specificActionServices;
  }

  get currentResolvableActionService(): ISpecificActionService {
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
    for (const [key, value] of Object.entries(this.specificActionServices)) {
      let val = value as ISpecificActionService;
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
      this._specificActionServices[actionOrder[this.orderIndex]];

    if (!this._finished) {
      this._currentResolvableActionService.updateItems();
    }

    if (this._currentResolvableActionService.action === "rest") {
      this._finished = true;
    }
  }

  resolveItem(action: ACTION, droppableId: string) {
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
