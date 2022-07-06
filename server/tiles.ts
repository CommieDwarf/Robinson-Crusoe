import shuffle from "../utils/shuffleArray";
import tileStructures from "./tiles/tileStructures";
import { TileStructure } from "../interfaces/Tile";
import tileTypes, { TileType } from "./tiles/tilleTypes";
import ITile, { TileActionSlots } from "../interfaces/Tile";
import { Character } from "./characters";
import player from "./Players";
import Pawn from "../interfaces/Pawn";

const starter = tileTypes[0];

const tileStack = shuffle(tileTypes);




export class Tile implements ITile {
  structure: TileStructure;
  id: number;
  starter: boolean;
  show: boolean;
  type: TileType | null;
  helpersRequied : number;
  constructor(
    structure: TileStructure,
    id: number,
    starter: boolean,
    show: boolean,
    type: TileType | null,
    helpersRequied : number,
  ) {
    this.structure = structure;
    this.id = id;
    this.starter = starter;
    this.show = show;
    this.type = type;
    this.helpersRequied = helpersRequied;
  }
}

const tiles: Tile[] = [];



for (let i = 0; i < 15; i++) {
  tiles.push(new Tile(tileStructures[i], i, false, false, null,  2))
}

tiles[7].show = true;
tiles[7].type = tileTypes[0];
tiles[2].show = true;
tiles[6].show = true;
tiles[11].show = true;

export default tiles;
