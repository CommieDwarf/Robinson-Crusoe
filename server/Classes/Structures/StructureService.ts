import { Resources } from "../ResourceService/Resources";
import { STRUCTURE } from "../../../interfaces/Structures/Structure";
import { Structure } from "./Structure";
import {
  IStructuresService,
  IStructuresServiceRenderData,
  StructureName,
} from "../../../interfaces/Structures/Structures";
import { IResources } from "../../../interfaces/Resources/Resources";
import { IGame } from "../../../interfaces/Game";

export class StructuresService implements IStructuresService {
  private _structures = this.getInitialStructures();
  private readonly _game: IGame;

  constructor(game: IGame) {
    this._game = game;
  }

  get renderData(): IStructuresServiceRenderData {
    return {
      structures: this._structures.map((structure) => structure.renderData),
    };
  }

  get structures(): Structure[] {
    return this._structures;
  }

  private getInitialStructures() {
    return Object.entries(STRUCTURE).map(([key, value]) => {
      const cost = new Resources();
      if (value === "weapon") {
        cost.setResource("wood", 1);
      } else {
        cost.setResource("wood", 3);
        cost.setResource("leather", 2);
      }
      return new Structure(value, cost, value !== "shelter");
    });
  }

  lvlUpStruct(name: StructureName, by: number, logSource: string) {
    const structure = this.getStruct(name);
    structure.incrementLvl(by);
    this._game.chatLog.addMessage(
      `ulepszono ${structure.namePL} do poziomu ${structure.lvl}-ego`,
      "green",
      logSource
    );
  }

  lvlDownStruct(name: StructureName, by: number, logSource: string) {
    const structure = this.getStruct(name);
    structure.decrementLvl(by);
    this._game.chatLog.addMessage(
      `Poziom ${structure.namePL} spadł do poziomu ${structure.lvl}-ego`,
      "red",
      logSource
    );
  }

  lvlDownOrSuffer(name: StructureName, by: number, logSource: string) {
    const structure = this.getStruct(name);
    const diff = structure.lvl - by;
    if (diff < 0) {
      this.lvlDownStruct(name, by - structure.lvl, logSource);
      this._game.characterService.hurtAllPlayerCharacters(diff, logSource);
    } else if (diff !== 0) {
      this.lvlDownStruct(name, diff, logSource);
    }
  }

  setLvl(name: StructureName, lvl: number) {
    this.getStruct(name).lvl = lvl;
  }

  unlockStruct(name: StructureName) {
    this.getStruct(name).locked = false;
  }

  lockStruct(name: StructureName) {
    this.getStruct(name).locked = true;
  }

  unlockAllStructs() {
    this._structures.forEach((structure) => (structure.locked = false));
  }

  commitResources(name: StructureName, resources: IResources) {
    this.getStruct(name).committedResources = resources;
  }

  rollBackCommittedResources(name: StructureName) {
    this.getStruct(name).committedResources = new Resources();
  }

  getStruct(name: StructureName) {
    const struct = this._structures.find(
      (structure) => structure.name === name
    );
    if (!struct) {
      throw new Error("Cant find structure with given name: " + name);
    }
    return struct;
  }
}
