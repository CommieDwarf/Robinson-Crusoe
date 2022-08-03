import { TileStructure } from "../../interfaces/Tiles/Tile";

const mapStructure = [
  [
    null,
    { id: 0, borderTiles: [4, 5, 1] },
    { id: 1, borderTiles: [0, 2, 5, 6] },
    { id: 2, borderTiles: [1, 6, 7] },
  ],
  [
    { id: 3, borderTiles: [4, 8] },
    { id: 4, borderTiles: [3, 0, 5, 8] },
    { id: 5, borderTiles: [0, 1, 4, 6, 9, 10] },
    { id: 6, borderTiles: [1, 2, 5, 7, 11] },
    { id: 7, borderTiles: [2, 6, 11] },
  ],
  [
    { id: 8, borderTiles: [3, 4, 9, 12] },
    { id: 9, borderTiles: [4, 5, 8, 10, 12, 13] },
    { id: 10, borderTiles: [5, 6, 9, 11, 13, 14] },
    { id: 11, borderTiles: [6, 7, 10, 14] },
  ],
  [
    null,
    { id: 12, borderTiles: [8, 9, 13] },
    { id: 13, borderTiles: [9, 10, 12, 14] },
    { id: 14, borderTiles: [10, 11, 13] },
  ],
];

function getTileStructures(topStart: number, leftStart: number) {
  const tileStructures: TileStructure[] = [];
  let top = topStart;
  let nextRowStartLeft = leftStart;
  for (let row of mapStructure) {
    let left = nextRowStartLeft;
    for (let hex of row) {
      if (hex) {
        tileStructures.push({ ...hex, position: { left, top } });
      }
      left += 16;
    }
    top += 13.5;
    nextRowStartLeft = nextRowStartLeft === 22 ? 14 : 22;
  }

  return tileStructures;
}

export default getTileStructures(17, 22);
