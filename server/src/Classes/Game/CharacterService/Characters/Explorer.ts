import {PlayerCharacter} from "./Character/PlayerCharacter/PlayerCharacter";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";
import {IAbility} from "@shared/types/Game/Skill/IAbility";
import {CHARACTER, Gender} from "@shared/types/Game/Characters/Character";
import {IGame} from "@shared/types/Game/Game";
import {IPlayer} from "@shared/types/Game/PlayerService/Player";
import {Lucky} from "./Skills/Explorer/Lucky";
import {MotivationalSpeech} from "./Skills/Explorer/MotivationalSpeech";
import {Reconnaissance} from "./Skills/Explorer/Reconnaissance";
import {Scouting} from "./Skills/Explorer/Scouting";
import {INVENTION_PERSONAL} from "@shared/types/Game/InventionService/Invention";

export class Explorer extends PlayerCharacter implements IPlayerCharacter {
    protected readonly _skills: IAbility<any>[];

    constructor(gender: Gender, game: IGame, player: IPlayer) {
        super(CHARACTER.EXPLORER, 3, 12, game, gender, [1, 6], INVENTION_PERSONAL.SHORTCUT, player);
        this._skills = this.initSkills();
    }

    get abilities(): IAbility<any>[] {
        return this._skills;
    }

    private initSkills(): IAbility<any>[] {
        return [
            new Lucky(this._game, this),
            new MotivationalSpeech(this._game, this),
            new Reconnaissance(this._game, this),
            new Scouting(this._game, this)
        ]
    }
}
