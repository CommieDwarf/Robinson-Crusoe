import inventionList from "../../constants/inventionList";
import InventionList from "../../constants/inventionList";
import shuffle from "../../../utils/shuffleArray";
import { Invention } from "./Invention";
import {
  IInvention,
  INVENTION_TYPE,
} from "../../../interfaces/Inventions/Invention";
import { Resources } from "../AllResources/Resources";
import { IPlayerCharacter } from "../../../interfaces/Characters/PlayerCharacter";
import {
  IInventionsService,
  InventionName,
} from "../../../interfaces/Inventions/Inventions";
import { SCENARIO } from "../../../interfaces/Scenario/Scenario";
import { ITiles } from "../../../interfaces/Tiles/Tiles";

export class InventionsService implements IInventionsService {
  get inventions(): IInvention[] {
    return this._inventions;
  }

  private _builtInventions: IInvention[] = [];
  scenario: SCENARIO;
  private _discoveredTileTypes = ["beach"];
  private readonly _inventions: IInvention[];
  private _characters: IPlayerCharacter[];
  private _tiles: ITiles;

  constructor(
    scenario: SCENARIO,
    characters: IPlayerCharacter[],
    tiles: ITiles
  ) {
    this.scenario = scenario;
    this._characters = characters;
    this._inventions = this.getInitialInventions(scenario);
    this._tiles = tiles;
    this.updateLocks();
  }

  private getInitialInventions(scenario: "castaways") {
    const normalInventionList = shuffle(inventionList.normal).slice(0, 5);
    const scenarioInventionList = inventionList.scenario[scenario];

    const inventions: Invention[] = [];

    normalInventionList.forEach((name) => {
      inventions.push(
        new Invention(
          name,
          { invention: null, terrainType: null },
          {},
          INVENTION_TYPE.NORMAL,
          new Resources(),
          null
        )
      );
    });
    scenarioInventionList.forEach((name) => {
      inventions.push(
        new Invention(
          name,
          {
            invention: null,
            terrainType: null,
          },
          {},
          INVENTION_TYPE.SCENARIO,
          new Resources(),
          null
        )
      );
    });
    InventionList.starters.forEach((name) => {
      inventions.push(
        new Invention(
          name,
          {
            invention: null,
            terrainType: null,
          },
          {},
          INVENTION_TYPE.STARTER,
          new Resources(),
          null
        )
      );
    });
    this._characters.forEach((character) => {
      inventions.push(
        new Invention(
          InventionList.personal[character.name],
          { invention: null, terrainType: null },
          {},
          INVENTION_TYPE.PERSONAL,
          new Resources(),
          character
        )
      );
    });
    return inventions;
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
      invention.locked =
        !this.isInvRequirementMet(invention) ||
        !this.isTileTypeRequirementMet(invention);
    });
  }

  private isInvRequirementMet(invention: IInvention) {
    if (!invention.requirement.invention) {
      return true;
    }
    return this._builtInventions.some((builtInv) => {
      return builtInv.name === invention.requirement.invention?.name;
    });
  }

  private isTileTypeRequirementMet(invention: IInvention) {
    if (!invention.requirement.terrainType) {
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
