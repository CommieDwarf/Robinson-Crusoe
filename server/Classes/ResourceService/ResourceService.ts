import { Resources } from "./Resources";
import {
  IResources,
  IResourcesAmount,
} from "../../../interfaces/Resources/Resources";
import {
  IAllResources,
  IAllResourcesRenderData,
} from "../../../interfaces/Resources/AllResources";
import { IGame } from "../../../interfaces/Game";
import { RESOURCE_CONJUGATION_PL } from "../../../interfaces/TRANSLATE_PL/CATEGORIES/RESOURCE_PL";

export class ResourceService implements IAllResources {
  private _future: IResources = new Resources();
  private _owned: IResources = new Resources();
  private _blockedProduction = false;
  private readonly _game: IGame;

  constructor(game: IGame) {
    this._game = game;
  }

  // ------------------------------------------------

  get renderData(): IAllResourcesRenderData {
    return {
      future: this.future.renderData,
      owned: this.owned.renderData,
    };
  }

  get productionBlocked(): boolean {
    return this._blockedProduction;
  }

  set productionBlocked(value: boolean) {
    this._blockedProduction = value;
  }

  get future(): IResources {
    return this._future;
  }

  get owned(): IResources {
    return this._owned;
  }

  // ------------------------------------

  public addFutureToOwned = (): void => {
    this._owned.addResources(this.future);
    this._future.resetResources();
  };

  public addToOwned = (resources: IResources): void => {
    this._owned.addResources(resources);
  };

  public addResourceToOwned(
    resource: keyof IResourcesAmount,
    amount: number,
    logSource: string
  ) {
    this._game.chatLog.addMessage(
      `Dodano ${amount} ${RESOURCE_CONJUGATION_PL[resource]} do posiadanych surowców`,
      "green",
      logSource
    );
    this._owned.addSingleResource(resource, amount);
  }

  public addResourceToFuture(
    resource: keyof IResourcesAmount,
    amount: number,
    logSource: string
  ) {
    this._future.addSingleResource(resource, amount);
    this._game.chatLog.addMessage(
      `Dodano ${amount} ${RESOURCE_CONJUGATION_PL[resource]} do przyszłych surowców`,
      "green",
      logSource
    );
  }

  canOwnedAfford(cost: IResources) {
    return this.owned.canAfford(cost);
  }

  spendFromOwned(
    resource: keyof IResourcesAmount,
    amount: number,
    logSource: string
  ) {
    this.owned.spendSingleResource(resource, amount);
    this._game.chatLog.addMessage(
      `Odjęto ${amount} ${RESOURCE_CONJUGATION_PL[resource]} z posiadanych surowców`,
      "red",
      logSource
    );
  }
}
