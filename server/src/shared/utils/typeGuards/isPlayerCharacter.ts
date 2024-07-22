import {IPlayerCharacter, IPlayerCharacterRenderData} from "@shared/types/Game/Characters/PlayerCharacter";

export const isPlayerCharacter = (
    candidate: Object
): candidate is IPlayerCharacter | IPlayerCharacterRenderData => {
    return (
        "wounds" in candidate
    );
};
