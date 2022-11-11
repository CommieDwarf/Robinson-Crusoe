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

enum resourcePL {
  wood = "drewna",
  food = "jedzenia",
  dryFood = "suchego jedzenia",
  leather = "skóry",
}

export class AllResources implements IAllResources {
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

  get renderData(): IAllResourcesRenderData {
    return {
      future: this.future.renderData,
      owned: this.owned.renderData,
    };
  }

  private _future: IResources = new Resources();
  private _owned: IResources = new Resources();
  private _blockedProduction = false;
  private readonly _game: IGame;

  constructor(game: IGame) {
    this._game = game;
  }

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
      `Dodano ${amount} ${resourcePL[resource]} do posiadanych surowców`,
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
      `Dodano ${amount} ${resourcePL[resource]} do przyszłych surowców`,
      "green",
      logSource
    );
  }

  canOwnedAfford(cost: IResources) {
    return this.owned.canAfford(cost);
  }

  spendFromOwned(cost: IResources) {
    this.owned;
  }
}
