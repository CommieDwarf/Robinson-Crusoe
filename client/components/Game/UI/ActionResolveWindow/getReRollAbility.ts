import {IAbilityRenderData} from "@shared/types/Game/Skill/IAbility";
import {CHARACTER} from "@shared/types/Game/Characters/Character";
import {ABILITY} from "@shared/types/Game/Skill/ABILITY";

export function getCharacterRerollAbility(character: { abilities: IAbilityRenderData[], name: CHARACTER }): IAbilityRenderData | undefined {
    switch (character.name) {
        case CHARACTER.COOK:
            return character.abilities.find((ab) => ab.name === ABILITY.SCROUNGER);
        case CHARACTER.FRIDAY:
            return character.abilities.find((ab) => ab.name === ABILITY.FRIDAYS_ABILITY);
        case CHARACTER.CARPENTER:
            return character.abilities.find((ab) => ab.name === ABILITY.CRAFTSMANSHIP);
        case CHARACTER.EXPLORER:
            return character.abilities.find((ab) => ab.name === ABILITY.LUCKY);
        default:
            return undefined;
    }
}
