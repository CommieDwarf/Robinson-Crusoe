import { IGraph } from "../Graph/Graph";
import { ITile } from "./ITile";
import { IVertex } from "../Graph/Vertex";

export interface ITileGraph extends IGraph<ITile> {
  addEdges: (tileID: number) => void;
  moveCamp: (tileID: number) => void;
  campTileID: number;
  previousCampTileID: number | null;
  campTileVertex: IVertex<ITile>;
  previousCampTileVertex: IVertex<ITile> | null;
  updateRequiredHelpers: () => void;
}
