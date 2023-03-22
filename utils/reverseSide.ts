import {Side} from "../interfaces/TileService/TileResourceService";

export function reverseSide(side: Side) {
    return side === "left" ? "right" : "left";
}