import { inventions } from "../../constants/inventionList";
import shuffle from "../../../utils/shuffleArray";
import { Invention } from "./Invention";
import { IInvention } from "../../../interfaces/Inventions/Invention";
import { IPlayerCharacter } from "../../../interfaces/Characters/PlayerCharacter";
import {
  IInventionsService,
  IInventionsServiceRenderData,
  InventionName,
} from "../../../interfaces/Inventions/Inventions";
import { SCENARIO } from "../../../interfaces/Scenario/Scenario";
import { ITilesService } from "../../../interfaces/Tiles/Tiles";

export class InventionsService implements IInventionsService {
  get inventions(): IInvention[] {
    return this._inventions;
  }

  get renderData(): IInventionsServiceRenderData {
    return {
      inventions: this.inventions.map((invention) => invention.renderData),
    };
  }

  private _builtInventions: IInvention[] = [];
  scenario: SCENARIO;
  private readonly _inventions: IInvention[];
  private _characters: IPlayerCharacter[];
  private _tiles: ITilesService;

  constructor(
    scenario: SCENARIO,
    characters: IPlayerCharacter[],
    tiles: ITilesService
  ) {
    this.scenario = scenario;
    this._characters = characters;
    this._inventions = this.getInitialInventions(scenario);
    this._tiles = tiles;
    this.updateLocks();
  }

  private getInitialInventions(scenario: "castaways") {
    const normalShuffled = shuffle(inventions.normal).slice(0, 5);
    return [
      ...inventions.starters,
      ...normalShuffled,
      ...inventions.scenario.castaways, // HARD CODED FOR THE DEMO
      inventions.personal.cook, // SAME THING
    ];
    // return [
    //   ...inventions.starters,
    //   ...shuffle(inventions.normal),
    //   ...inventions.scenario.castaways,
    //   inventions.personal.cook,
    // ];
  }

  build(name: InventionName) {
    const invention = this.getInvention(name);
    if (!this._builtInventions.includes(invention)) {
      throw new Error("Invention is already has been built " + invention.name);
    }

    this._builtInventions.push(invention);
    invention.isBuilt = true;
  }

  destroy(name: InventionName) {
    const invention = this.getInvention(name);
    if (!this._builtInventions.includes(invention)) {
      throw new Error("There is no such invention built: " + invention.name);
    }

    this._builtInventions = this._builtInventions.filter((inv) => {
      return inv.name !== invention.name;
    });
    invention.isBuilt = false;
  }

  updateLocks() {
    this._inventions.forEach((invention) => {
      invention.locked = !(
        this.isInvRequirementMet(invention) &&
        this.isTileTypeRequirementMet(invention)
      );
    });
  }

  private isInvRequirementMet(invention: IInvention) {
    if (!invention.requirement || !invention.requirement.invention) {
      return true;
    }
    let flag = true;
    invention.requirement.invention.forEach((req) => {
      if (!this._builtInventions.some((inv) => inv.name === req)) {
        flag = false;
      }
    });
    return flag;
  }

  private isTileTypeRequirementMet(invention: IInvention) {
    if (!invention.requirement || !invention.requirement.terrainType) {
      return true;
    }

    return this._tiles.terrainTypesExplored.has(
      invention.requirement.terrainType
    );
  }

  getInvention(name: string): IInvention {
    const invention = this._inventions.find((inv) => inv.name === name);

    if (!invention) {
      throw new Error("Can find invention with specific name: " + name);
    }
    return invention;
  }
}
