import { Resources } from "../ResourceService/Resources";
import { CONSTRUCTION } from "../../../interfaces/ConstructionService/Construction";
import {
  IConstructionService,
  IConstructionServiceRenderData,
} from "../../../interfaces/ConstructionService/IConstructionService";
import { IResources } from "../../../interfaces/Resources/Resources";
import { IGame } from "../../../interfaces/Game";
import { Construction } from "./Construction";

export class ConstructionService implements IConstructionService {
  private _constructions = this.initConstructions();
  private readonly _game: IGame;

  constructor(game: IGame) {
    this._game = game;
  }

  get renderData(): IConstructionServiceRenderData {
    return {
      constructions: this._constructions.map(
        (construct) => construct.renderData
      ),
    };
  }

  get constructions(): Construction[] {
    return this._constructions;
  }

  private initConstructions() {
    return Object.entries(CONSTRUCTION).map(([key, value]) => {
      const cost = new Resources();
      if (value === CONSTRUCTION.WEAPON) {
        cost.setResource("wood", 1);
      } else {
        cost.setResource("wood", 3);
        cost.setResource("leather", 2);
      }
      return new Construction(value, cost, value !== "shelter");
    });
  }

  lvlUpConstruction(construction: CONSTRUCTION, by: number, logSource: string) {
    const construct = this.getConstruction(construction);
    construct.incrementLvl(by);
    this._game.chatLog.addMessage(
      `ulepszono ${construct.name} do poziomu ${construct.lvl}-ego`,
      "green",
      logSource
    );
  }

  lvlDownConstruction(
    construction: CONSTRUCTION,
    by: number,
    logSource: string
  ) {
    const construct = this.getConstruction(construction);
    construct.decrementLvl(by);
    this._game.chatLog.addMessage(
      `Poziom ${construct.name} spadł do poziomu ${construct.lvl}-ego`,
      "red",
      logSource
    );
  }

  lvlDownIfPossible(construction: CONSTRUCTION, by: number, logSource: string) {
    const construct = this.getConstruction(construction);
    const diff = construct.lvl - by;
    if (diff > 0) {
      construct.decrementLvl(by);
    } else {
      construct.decrementLvl(Math.abs(diff));
    }
    this._game.chatLog.addMessage(
      `Poziom ${construct.name} spadł do poziomu ${construct.lvl}-ego`,
      "red",
      logSource
    );
  }

  lvlDownOrSuffer(construction: CONSTRUCTION, by: number, logSource: string) {
    const construct = this.getConstruction(construction);
    const diff = construct.lvl - by;
    if (diff < 0) {
      this.lvlDownConstruction(construction, by - construct.lvl, logSource);
      this._game.characterService.hurtAllPlayerCharacters(diff, logSource);
    } else if (diff !== 0) {
      this.lvlDownConstruction(construction, diff, logSource);
    }
  }

  setLvl(construction: CONSTRUCTION, lvl: number) {
    this.getConstruction(construction).lvl = lvl;
  }

  unlockConstruction(construction: CONSTRUCTION) {
    this.getConstruction(construction).locked = false;
  }

  lockConstruction(construction: CONSTRUCTION) {
    this.getConstruction(construction).locked = true;
  }

  unlockAllConstructions() {
    this._constructions.forEach(
      (construction) => (construction.locked = false)
    );
  }

  commitResources(construction: CONSTRUCTION, resources: IResources) {
    this.getConstruction(construction).committedResources = resources;
  }

  rollBackCommittedResources(construction: CONSTRUCTION) {
    this.getConstruction(construction).committedResources = new Resources();
  }

  getConstruction(construction: CONSTRUCTION) {
    const construct = this._constructions.find(
      (constr) => constr.name === construction
    );
    if (!construct) {
      throw new Error(
        "Cant find structure with given construction: " + construction
      );
    }
    return construct;
  }
}
