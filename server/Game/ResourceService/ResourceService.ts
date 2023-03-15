import { BasicResources } from "./BasicResources";
import {
  IBasicResources,
  IBasicResourcesAmount,
  IResources,
  IResourcesRenderData,
} from "../../../interfaces/Resources/Resources";
import {
  IResourceService,
  IResourceServiceRenderData,
} from "../../../interfaces/Resources/AllResources";
import { IGame } from "../../../interfaces/Game";
import Entries from "../../../interfaces/Entries";
import i18n from "../../../I18n/I18n";
import { IToken } from "../../../interfaces/TokenService/Token";
import { IMysteryCard } from "../../../interfaces/MysteryService/MysteryCard";

export class ResourceService implements IResourceService {
  private _future: IResources = {
    basic: new BasicResources(),
    treasures: [],
    tokens: [],
  };
  private _owned: IResources = {
    basic: new BasicResources(),
    treasures: [],
    tokens: [],
  };

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
      future: this.unpackRenderData(this._future),
      owned: this.unpackRenderData(this._owned),
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

  public addTokenToFuture(token: IToken) {
    this._future.tokens.push(token);
  }

  public addTreasureToFuture(treasureCard: IMysteryCard) {
    this._future.treasures.push(treasureCard);
  }

  public addTokenToOwned(token: IToken) {
    this._owned.tokens.push(token);
  }

  public addTreasureToOwned(treasureCard: IMysteryCard) {
    this._owned.treasures.push(treasureCard);
  }

  private unpackRenderData(resources: IResources): IResourcesRenderData {
    return {
      basic: resources.basic.renderData,
      tokens: resources.tokens.map((token) => token.renderData),
      treasures: resources.treasures.map((treasure) => treasure.renderData),
    };
  }

  public addFutureToOwned = (): void => {
    this._owned.basic.addResources(this._future.basic);
    this._owned.tokens = this._owned.tokens.concat(this._future.tokens);
    this._owned.treasures = this._owned.treasures.concat(
      this._future.treasures
    );
    this.resetFutureResources();
  };

  private resetFutureResources() {
    this._future = {
      basic: new BasicResources(),
      tokens: [],
      treasures: [],
    };
  }

  public addBasicResourcesToOwned = (resources: IBasicResources): void => {
    this._owned.basic.addResources(resources);
  };

  public addBasicResourceToOwned(
    resource: keyof IBasicResourcesAmount,
    amount: number,
    logSource: string
  ) {
    this._game.chatLog.addMessage(
      `Dodano ${amount} ${i18n.t(`resource.${resource}`, {
        count: amount,
      })} do posiadanych surowców`,
      "green",
      logSource
    );
    this._owned.basic.addResource(resource, amount);
  }

  public addBasicResourceToFuture(
    resource: keyof IBasicResourcesAmount,
    amount: number,
    logSource: string
  ) {
    this._future.basic.addResource(resource, amount);
    this._game.chatLog.addMessage(
      `Dodano ${amount} ${i18n.t(`resource.${resource}`, {
        count: amount,
      })} do przyszłych surowców`,
      "green",
      logSource
    );
  }

  public canAffordResource(
    resource: keyof IBasicResourcesAmount,
    amount: number
  ) {
    return this.owned.basic.canAfford(resource, amount);
  }

  public canAffordResources(resources: IBasicResources) {
    let canAfford = true;
    resources.amount.forEach((amount, resource) => {
      if (!this.canAffordResource(resource, amount)) {
        canAfford = false;
      }
    });
    return canAfford;
  }

  spendBasicResourceIfPossible(
    resource: keyof IBasicResourcesAmount,
    amount: number,
    logSource: string = ""
  ) {
    if (amount === 0) {
      return;
    }
    const diff = this._owned.basic.getResource(resource) - amount;
    if (diff < 0) {
      this._owned.basic.setResource(resource, 0);
    } else {
      this._owned.basic.spendResource(resource, amount);
    }
    if (logSource.length > 0) {
      this._game.chatLog.addMessage(
        `Odjęto ${amount} ${i18n.t(`resource.${resource}`, {
          count: amount,
        })} z posiadanych surowców`,
        "red",
        logSource
      );
    }
  }

  spendBasicResourcesIfPossible(
    resources: IBasicResources,
    logSource: string = ""
  ) {
    const entries = Object.entries(
      resources.amount
    ) as Entries<IBasicResourcesAmount>;
    entries.forEach(([resource, amount]) => {
      this.spendBasicResourceIfPossible(resource, amount, logSource);
    });
  }

  spendBasicResourceOrGetHurt(
    resource: keyof IBasicResourcesAmount,
    amount: number,
    logSource: string
  ) {
    if (amount === 0) {
      return;
    }
    const diff = this._owned.basic.getResource(resource) - amount;
    if (diff < 0) {
      this._owned.basic.setResource(resource, 0);
      this._game.characterService.hurtAllPlayerCharacters(
        Math.abs(diff),
        logSource
      );
    } else {
      this._owned.basic.spendResource(resource, amount);
    }
  }

  spendResourcesOrGetHurt(resources: IBasicResources, logSource: string) {
    const entries = Object.entries(
      resources.amount
    ) as Entries<IBasicResourcesAmount>;
    entries.forEach(([resource, amount]) => {
      this.spendBasicResourceOrGetHurt(resource, amount, logSource);
    });
  }
}
