import { CHARACTER } from "@shared/types/Game/Characters/Character";
import { ABILITY } from "@shared/types/Game/Skill/ABILITY";

export function getAbilities(character: CHARACTER): ABILITY[] {
	switch (character) {
		case CHARACTER.COOK:
			return [
				ABILITY.STONE_SOUP,
				ABILITY.GRANDMAS_RECIPE,
				ABILITY.HOOCH,
				ABILITY.SCROUNGER,
			];
		case CHARACTER.EXPLORER:
			return [
				ABILITY.LUCKY,
				ABILITY.GRANDMAS_RECIPE,
				ABILITY.HOOCH,
				ABILITY.SCROUNGER,
			];
		case CHARACTER.CARPENTER:
			return [
				ABILITY.A_NEW_IDEA,
				ABILITY.CRAFTSMANSHIP,
				ABILITY.ECONOMICAL_CONSTRUCTION,
				ABILITY.HANDYMAN,
			];
		case CHARACTER.SOLDIER:
			return [
				ABILITY.DEFENSIVE_PLAN,
				ABILITY.FRENZY,
				ABILITY.THE_HUNT,
				ABILITY.TRACKING,
			];
		case CHARACTER.FRIDAY:
			return [ABILITY.FRIDAYS_ABILITY];
		case CHARACTER.DOG:
			return [];
	}
}
