import {SideCharacter} from "./Character/SideCharacter/SideCharacter";
import {ISideCharacter} from "@shared/types/Game/Characters/SideCharacter";
import {IAbility} from "@shared/types/Game/Skill/IAbility";
import {CHARACTER, Gender} from "@shared/types/Game/Characters/Character";
import {IGame} from "@shared/types/Game/Game";

export class Dog extends SideCharacter implements ISideCharacter {
    protected readonly _skills: IAbility<any>[] = [];

    constructor(gender: Gender, game: IGame) {
        super(CHARACTER.DOG, "Pies", 1, Infinity, game);
    }
}
