import {
	IPlayerCharacter,
	IPlayerCharacterRenderData,
} from "@shared/types/Game/Characters/PlayerCharacter";

export const isPlayerCharacter = (
	candidate: Object
): candidate is IPlayerCharacter => {
	return "wounds" in candidate;
};

export const isPlayerCharacterRenderData = (
	candidate: Object
): candidate is IPlayerCharacterRenderData => {
	return "wounds" in candidate;
};
