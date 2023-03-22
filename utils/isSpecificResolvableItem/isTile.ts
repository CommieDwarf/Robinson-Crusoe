import {Action, AdventureAction} from "../../interfaces/ACTION";
import {ITile} from "../../interfaces/TileService/ITile";

export const isTile = (
    candidate: Object
): candidate is ITile => {
    return (
        "hasBasicResource" in candidate
    );
};
