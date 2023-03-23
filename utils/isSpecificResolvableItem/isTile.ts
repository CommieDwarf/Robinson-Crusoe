import {Action, AdventureAction} from "../../interfaces/ACTION";
import {ITile} from "../../interfaces/TileService/ITile";

export const isTile = (
    candidate: any
): candidate is ITile => {
    return (
        candidate instanceof Object && "hasBasicResource" in candidate
    );
};
