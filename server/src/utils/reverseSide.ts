import {Side} from "../server/src/types/TileService/TileResourceService";

export function reverseSide(side: Side) {
    return side === "left" ? "right" : "left";
}
