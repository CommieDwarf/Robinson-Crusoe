import { IGraph } from "../Graph/Graph";
import { ITile } from "./ITile";
import { IVertex } from "../Graph/Vertex";

export interface ITileGraph extends IGraph<ITile> {
	addEdges: (tileID: number) => void;
	moveCamp: (tileID: number) => void;
	getBorderVertices: (id: number) => IVertex<ITile>[];
	campTileVertex: IVertex<ITile>;
	previousCampTileVertex: IVertex<ITile> | null;
	updateDistance: () => void;
	canCampBeMoved: () => boolean;
	getClosestTilesWIthResource: (resource: "food" | "wood") => ITile[];
}
