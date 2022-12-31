import {Resources} from "./Resources";
import {
  IResources,
  IResourcesAmount,
} from "../../../interfaces/Resources/Resources";
import {
  IResourceService,
  IResourceServiceRenderData,
} from "../../../interfaces/Resources/AllResources";
import {IGame} from "../../../interfaces/Game";
import {RESOURCE_CONJUGATION_PL} from "../../../interfaces/TRANSLATE_PL/CATEGORIES/RESOURCE_PL";
import Entries from "../../../interfaces/Entries";

export class ResourceService implements IResourceService {
  private _future: IResources = new Resources();
  private _owned: IResources = new Resources();
  private _cellar: boolean = false;
  private _pit: boolean = false;

  get blockedProductionRound(): number | null {
    return this._blockedProductionRound;
  }

  set blockedProductionRound(value: number | null) {
    this._blockedProductionRound = value;
  }

  private _blockedProductionRound: null | number = null;
  private readonly _game: IGame;

  constructor(game: IGame) {
    this._game = game;
  }

  // ------------------------------------------------

  get renderData(): IResourceServiceRenderData {
    return {
      future: this.future.renderData,
      owned: this.owned.renderData,
    };
  }

  get pit(): boolean {
    return this._pit;
  }

  set pit(value: boolean) {
    this._pit = value;
  }

  get future(): IResources {
    return this._future;
  }

  get owned(): IResources {
    return this._owned;
  }

  get cellar(): boolean {
    return this._cellar;
  }

  set cellar(value: boolean) {
    this._cellar = value;
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
    this._owned.addResource(resource, amount);
  }

  public addResourceToFuture(
      resource: keyof IResourcesAmount,
      amount: number,
      logSource: string
  ) {
    this._future.addResource(resource, amount);
    this._game.chatLog.addMessage(
        `Dodano ${amount} ${RESOURCE_CONJUGATION_PL[resource]} do przyszłych surowców`,
        "green",
        logSource
    );
  }

  public canAffordResource(resource: keyof IResourcesAmount, amount: number) {
    return this.owned.canAfford(resource, amount);
  }

  public canAffordResources(resources: IResources) {
    let canAfford = true;
    resources.amount.forEach((amount, resource) => {
      if (!this.canAffordResource(resource, amount)) {
        canAfford = false;
      }
    })
    return canAfford;
  }

  spendResourceIfPossible(
      resource: keyof IResourcesAmount,
      amount: number,
      logSource: string = ""
  ) {
    if (amount === 0) {
      return;
    }
    const diff = this._owned.getResource(resource) - amount;
    if (diff < 0) {
      this._owned.setResource(resource, 0);
    } else {
      this._owned.spendResource(resource, amount);
    }
    if (logSource.length > 0) {
      this._game.chatLog.addMessage(
          `Odjęto ${amount} ${RESOURCE_CONJUGATION_PL[resource]} z posiadanych surowców`,
          "red",
          logSource
      );
    }
  }

  spendResourcesIfPossible(resources: IResources, logSource: string = "") {
    const entries = Object.entries(
        resources.amount
    ) as Entries<IResourcesAmount>;
    entries.forEach(([resource, amount]) => {
      this.spendResourceIfPossible(resource, amount, logSource);
    });
  }

  spendResourceOrGetHurt(
      resource: keyof IResourcesAmount,
      amount: number,
      logSource: string
  ) {
    if (amount === 0) {
      return;
    }
    const diff = this._owned.getResource(resource) - amount;
    if (diff < 0) {
      this._owned.setResource(resource, 0);
      this._game.characterService.hurtAllPlayerCharacters(
          Math.abs(diff),
          logSource
      );
    } else {
      this._owned.spendResource(resource, amount);
    }
  }

  spendResourcesOrGetHurt(resources: IResources, logSource: string) {
    const entries = Object.entries(
        resources.amount
    ) as Entries<IResourcesAmount>;
    entries.forEach(([resource, amount]) => {
      this.spendResourceOrGetHurt(resource, amount, logSource);
    });
  }
}
