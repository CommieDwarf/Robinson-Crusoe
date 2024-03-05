import {IPlayerCharacter} from "../../../shared/types/Characters/PlayerCharacter";
import {ICharacter} from "../../../shared/types/Characters/Character";

export const isCharacter = (
    candidate: Object
): candidate is ICharacter => {
    return (
        "health" in candidate
    );
};
