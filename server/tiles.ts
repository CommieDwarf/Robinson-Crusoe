import shuffle from "../utils/shuffleArray";
import tileStructures from "./tiles/tileStructures";
import { TileStructure } from "../interfaces/Tile";
import tileTypes, { TileType } from "./tiles/tilleTypes";

const starter = tileTypes[0];

const tileStack = shuffle(tileTypes);


class Tile {
  structure: TileStructure;
  id: number;
  starter: boolean;
  show: boolean;
  type: TileType | null;
  constructor(
    structure: TileStructure,
    id: number,
    starter: boolean,
    show: boolean,
    type: TileType | null
  ) {
    this.structure = structure;
    this.id = id;
    this.starter = starter;
    this.show = show;
    this.type = type;
  }
}

const tiles: Tile[] = [];

for (let i = 0; i < 15; i++) {
  tiles.push(new Tile(tileStructures[i], i, false, false, null));
}

tiles[7].show = true;
tiles[7].type = tileTypes[0];
tiles[2].show = true;
tiles[6].show = true;
tiles[11].show = true;

export default tiles;
