import inventionList from "../../constants/inventionList";
import shuffle from "../../../utils/shuffleArray";
import { TerrainType } from "../../../interfaces/Tile";
import IInvention, { INVENTION_TYPE } from "../../../interfaces/Invention";
import { Resources } from "../AllResources/AllResources";
import { Character } from "../Characters/characters";
import InventionList from "../../constants/inventionList";

import characters from "../Characters/characters";
import {Player} from "../Players/Players";

export class Invention implements IInvention {
  get character(): Character {
    return this._character;
  }
  get cost(): Resources {
    return this._cost;
  }

  set cost(value: Resources) {
    this._cost = value;
  }

  get built(): boolean {
    return this._built;
  }

  set built(value: boolean) {
    this._built = value;
  }

  get name(): string {
    return this._name;
  }

  get locked(): boolean {
    return this._locked;
  }

  set locked(value: boolean) {
    this._locked = value;
  }

  get requiredHelpers(): number {
    return this._requiredHelpers;
  }

  set requiredHelpers(value: number) {
    this._requiredHelpers = value;
  }

  get reward(): {} {
    return this._reward;
  }

  get type(): INVENTION_TYPE {
    return this._type;
  }

  get committedResources(): Resources {
    return this._committedResources;
  }

  set committedResources(value: Resources) {
    this._committedResources = value;
  }

  get requirement() {
    return this._requirement;
  }

  private readonly _name: string;
  private _locked = true;
  private readonly _requirement: {
    invention: IInvention | null;
    terrainType: TerrainType | null;
  };
  private _requiredHelpers = 1;
  private readonly _reward: {};
  private readonly _type: INVENTION_TYPE;
  private _committedResources = new Resources();
  private _built = false;
  private _cost: Resources;
  private readonly _character: Character | null;

  constructor(
    name: string,
    requirement: {
      invention: IInvention | null;
      terrainType: TerrainType | null;
    },
    reward: {},
    type: INVENTION_TYPE,
    cost: Resources,
    character: Character | null,
  ) {
    this._name = name;
    this._requirement = requirement;
    this._reward = reward;
    this._type = type;
    this._cost = cost;
    this._character = character;
  }
}

export default class Inventions {
  get inventions(): Invention[] {
    return this._inventions;
  }
  builtInventions: Invention[] = [];
  scenario: "castaways";
  discoveredTileTypes = ["beach"];
  private readonly _inventions: Invention[];
  players: Player[];

  constructor(scenario: "castaways", players: Player[]) {
    this.scenario = scenario;
    this._inventions = this.getInitialInventions(scenario);
    this.players = players;
  }

  getInitialInventions(scenario: "castaways") {
    const normalInventionList = shuffle(inventionList.normal).slice(0, 5);
    const scenarioInventionList = inventionList.scenario[scenario];

    const inventions: Invention[] = [];

    normalInventionList.forEach((name) => {
      inventions.push(
        new Invention(
          name,
          {
            invention: null,
            terrainType: null,
          },
          {},
          INVENTION_TYPE.NORMAL,
          new Resources(),
            null
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
    this.players.forEach((player) => {
      inventions.push(
        new Invention(
          InventionList.personal[player.character.name.en],
          { invention: null, terrainType: null },
          {},
          INVENTION_TYPE.PERSONAL,
          new Resources(),
          player
        )
      );
    });
    return inventions;
  }

  build(invention: Invention) {
    if (!this.builtInventions.includes(invention)) {
      this.builtInventions.push(invention);
      invention.built = true;
    } else {
      throw new Error("Invention is already has been built " + invention.name);
    }
  }

  destroy(invention: Invention) {
    if (this.builtInventions.includes(invention)) {
      this.builtInventions = this.builtInventions.filter((inv) => {
        return inv.name !== invention.name;
      });
      invention.built = false;
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
