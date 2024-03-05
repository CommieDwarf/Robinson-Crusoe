import {Side} from "../types/TileService/TileResourceService";

export function reverseSide(side: Side) {
    return side === "left" ? "right" : "left";
}
