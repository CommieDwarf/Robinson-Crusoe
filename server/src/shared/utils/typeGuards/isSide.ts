import {Side} from "@shared/types/Game/TileService/TileResourceService";

export function isSide(candidate: any): candidate is Side {
    return candidate === "left" || candidate === "right"
}
