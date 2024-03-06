import {SideCharacter} from "./Character/SideCharacter/SideCharacter";
import {ISideCharacter} from "@shared/types/Game/Characters/SideCharacter";
import {ISkill} from "@shared/types/Game/Skill/Skill";
import {CHARACTER, Gender} from "@shared/types/Game/Characters/Character";
import {IGame} from "@shared/types/Game/Game";

export class Dog extends SideCharacter implements ISideCharacter {
    protected readonly _skills: ISkill<any>[] = [];

    constructor(gender: Gender, game: IGame) {
        super(CHARACTER.DOG, "Pies", 1, Infinity, game);
    }
}
