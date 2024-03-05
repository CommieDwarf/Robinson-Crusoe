import {SideCharacter} from "./Character/SideCharacter/SideCharacter";
import {ISideCharacter} from "../../../types/Characters/SideCharacter";
import {ISkill} from "../../../types/Skill/Skill";
import {CHARACTER, Gender} from "../../../types/Characters/Character";
import {IGame} from "../../../types/Game";

export class Dog extends SideCharacter implements ISideCharacter {
    protected readonly _skills: ISkill[] = [];

    constructor(gender: Gender, game: IGame) {
        super(CHARACTER.DOG, "Pies", 1, Infinity, game);
    }
}
