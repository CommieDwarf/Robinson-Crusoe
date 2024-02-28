import {IPlayerCharacter} from "../../interfaces/Characters/PlayerCharacter";
import {ICharacter} from "../../interfaces/Characters/Character";

export const isCharacter = (
    candidate: Object
): candidate is ICharacter => {
    return (
        "health" in candidate
    );
};
