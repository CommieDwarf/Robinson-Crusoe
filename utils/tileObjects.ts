type Slot = "food" | "wood" | "beast";

interface TileExtras {
  discoveryToken: number;
  totem: boolean;
  naturalShelter: boolean;
}

type TerrainType = "beach" | "hills" | "mountains" | "river" | "plains";

class TileObject {
  id: number;
  terrainType: TerrainType;
  slots: {
    left: Slot,
    right: Slot,
  };
  extras: TileExtras;

  constructor(
    id: number,
    terrainType: TerrainType,
    slots: {left: Slot, right: Slot},
    extras: TileExtras
  ) {
    this.id = id;
    this.terrainType = terrainType;
    this.extras = extras;
    this.slots = slots;
  }
}

const tileObjects: TileObject[] = [
  new TileObject(
    0,
    "beach",
    { left: "wood", right: "food" },
    { discoveryToken: 0, totem: false, naturalShelter: false }
  ),
  new TileObject(
    1,
    "hills",
    {left: "wood", right: "food" },
    {discoveryToken: 1, totem: true, naturalShelter: false}
  ),
  new TileObject(
    2,
    "river",
    {left: "beast", right: "food"},
    {discoveryToken: 3, totem: false, naturalShelter: false}
  ),
  new TileObject(
    3,
    "plains",
    {left: "wood", right: "beast"},
    {discoveryToken: 2, totem: false, naturalShelter: false}
  ),
  new TileObject(
    4,
    "plains",
    {left: "food", right: "beast"},
    {discoveryToken: 3, totem: false, naturalShelter: false}
  ),
  new TileObject(
    5,
    "mountains",
    {left: "wood", right: "beast"},
    {discoveryToken: 1, totem: false, naturalShelter: true}
  ),
  new TileObject(
    6,
    "hills",
    {left: "wood", right: "beast"},
    {discoveryToken: 2, totem: true, naturalShelter: false}
  ),
  new TileObject(
    7,
    "mountains",
    {left: "food", right: "wood"},
    {discoveryToken: 1, totem: true, naturalShelter: false}
  ),
  new TileObject(
    8,
    "mountains",
    {left: "food", right: "beast"},
    {discoveryToken: 1, totem: true, naturalShelter: true}
  ),
  new TileObject(
    9,
    "river",
    {left: "wood", right: "food"},
    {discoveryToken: 1, totem: true, naturalShelter: false}
  ),
  new TileObject(
    10,
    "plains",
    {left: "food", right: "wood"},
    {discoveryToken: 1, totem: true, naturalShelter: false}
  ),
];

export default tileObjects;