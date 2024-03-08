import {CHARACTER} from "@shared/types/Game/Characters/Character";
import {Cloud} from "@shared/types/Game/Weather/Weather";
import {ActionDice} from "@shared/types/Game/RollDice/RollDice";
import {ABILITY} from "@shared/types/Game/Skill/ABILITY";

type GrandmasRecipeArgs = [target: CHARACTER];
type HoochArgs = [target: Cloud];
type ScroungerArgs = [target: ActionDice];
type StoneSoupArgs = [];
type FridaysAbilityArgs = [target: ActionDice]

export interface AbilityArgMap {
    [ABILITY.GRANDMAS_RECIPE]: GrandmasRecipeArgs,
    [ABILITY.HOOCH]: HoochArgs,
    [ABILITY.SCROUNGER]: ScroungerArgs,
    [ABILITY.STONE_SOUP]: StoneSoupArgs,
    [ABILITY.FRIDAYS_ABILITY]: FridaysAbilityArgs

}
