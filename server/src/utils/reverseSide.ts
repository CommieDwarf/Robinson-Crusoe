import { Side } from "@shared/types/Game/TileService/TileResourceService";

export function reverseSide(side: Side) {
	return side === "left" ? "right" : "left";
}
