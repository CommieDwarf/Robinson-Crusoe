import inventionList from "../../constants/inventionList";
import InventionList from "../../constants/inventionList";
import shuffle from "../../../utils/shuffleArray";
import { Invention } from "./Invention";
import { INVENTION_TYPE } from "../../../interfaces/Invention";
import { Resources } from "../AllResources/Resources";
import { IPlayerCharacter } from "../../../interfaces/Characters/PlayerCharacter";

export default class Inventions {
  get inventions(): Invention[] {
    return this._inventions;
  }

  builtInventions: Invention[] = [];
  scenario: "castaways";
  discoveredTileTypes = ["beach"];
  private readonly _inventions: Invention[];
  private _characters: IPlayerCharacter[];

  constructor(scenario: "castaways", characters: IPlayerCharacter[]) {
    this.scenario = scenario;
    this._inventions = this.getInitialInventions(scenario);
    this._characters = characters;
  }

  getInitialInventions(scenario: "castaways") {
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

  build(invention: Invention) {
    if (!this.builtInventions.includes(invention)) {
      this.builtInventions.push(invention);
      invention.isBuilt = true;
    } else {
      throw new Error("Invention is already has been built " + invention.name);
    }
  }

  destroy(invention: Invention) {
    if (this.builtInventions.includes(invention)) {
      this.builtInventions = this.builtInventions.filter((inv) => {
        return inv.name !== invention.name;
      });
      invention.isBuilt = false;
    } else {
      throw new Error("There is no such invention built: " + invention.name);
    }
  }

  updateLockToAllInventions() {
    this._inventions.forEach((invention) => {
      invention.locked =
        this.checkInventionRequirement(invention) &&
        this.checkTileTypeRequirement(invention);
    });
  }

  checkInventionRequirement(invention: Invention) {
    if (!invention.requirement.invention) {
      return true;
    }

    return this.builtInventions.some((builtInv) => {
      return builtInv.name === invention.requirement.invention?.name;
    });
  }

  checkTileTypeRequirement(invention: Invention) {
    if (!invention.requirement.terrainType) {
      return true;
    }

    return this.discoveredTileTypes.some((tileType) => {
      return invention.requirement.terrainType === tileType;
    });
  }

  findInvention(name: string) {
    const invention = this._inventions.find((inv) => inv.name === name);

    if (!invention) {
      throw new Error("Can find invention with specific name: " + name);
    }

    return invention;
  }
}
