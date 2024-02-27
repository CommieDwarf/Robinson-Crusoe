import {Gender, ICharacter, ICharacterRenderData,} from "../../../../../interfaces/Characters/Character";

import {PlayerCharacterName} from "../../../../../interfaces/Characters/PlayerCharacter";
import {SideCharacterName} from "../../../../../interfaces/Characters/SideCharacter";
import {GAME_STATUS, IGame} from "../../../../../interfaces/Game";
import {ICharEffects} from "../../../../../interfaces/Characters/CharEffects";
import {IPawnService} from "../../../../../interfaces/Pawns/PawnService";
import {ISkill} from "../../../../../interfaces/Skill/Skill";
import {ActionDice} from "../../../../../interfaces/RollDice/RollDice";
import {Cloud} from "../../../../../interfaces/Weather/Weather";
import {PlayerCharacter} from "./PlayerCharacter/PlayerCharacter";

export abstract class Character implements ICharacter {
    protected _namePL: string;
    protected _name: PlayerCharacterName | SideCharacterName;
    protected _gender: Gender = "male";
    protected _determination = 0;
    protected _id: number;
    protected readonly _maxHealth;
    protected _health: number;
    protected _game: IGame;
    protected declare _effects: ICharEffects;
    protected declare _pawnService: IPawnService;
    protected declare _skills: ISkill[];

    protected constructor(
        name: PlayerCharacterName | SideCharacterName,
        namePL: string,
        id: number,
        maxHealth: number,
        game: IGame
    ) {
        this._namePL = namePL;
        this._name = name;
        this._id = id;
        this._maxHealth = maxHealth;
        this._health = this._maxHealth;
        this._game = game;
    }

    get renderData(): ICharacterRenderData {
        return this.getRenderData();
    }

    protected getRenderData(): ICharacterRenderData {
        return {
            determination: this._determination,
            pawnService: this._pawnService.renderData,
            gender: this._gender,
            health: this._health,
            id: this._id,
            maxHealth: this._maxHealth,
            name: this._name,
            namePL: this._namePL,
            skills: this._skills.map((skill) => skill.renderData),
        };
    }

    get skills(): ISkill[] {
        return this._skills;
    }

    get effects(): ICharEffects {
        return this._effects;
    }

    get pawnService(): IPawnService {
        return this._pawnService;
    }

    set determination(value: number) {
        this._determination = value;
    }

    get maxHealth() {
        return this._maxHealth;
    }

    get determination(): number {
        return this._determination;
    }

    get id(): number {
        return this._id;
    }

    get namePL(): string {
        return this._namePL;
    }

    set namePL(value: string) {
        this._namePL = value;
    }

    get health(): number {
        return this._health;
    }

    set health(value: number) {
        this._health = value;
    }

    get name(): PlayerCharacterName | SideCharacterName {
        return this._name;
    }

    get gender() {
        return this._gender;
    }

    incrDetermination(by: number) {
        this._determination += by;
    }

    decrDetermination(by: number) {
        this._determination -= by;
    }

    hurt(by: number) {
        this._health -= by;
        if (this instanceof PlayerCharacter && this._health <= 0) {
            this._game.setGameStatus(GAME_STATUS.LOSE, `${this._namePL} nie żyje`);
        }
    }

    heal(by: number) {
        if (by + this._health > this._maxHealth) {
            this._health = this._maxHealth;
        } else {
            this._health += by;
        }
    }

    public getSkill(name: string) {
        const skill = this._skills.find((skill) => skill.name === name);
        if (!skill) {
            throw new Error(`Can't find skill with name: ${name}`);
        }
        return skill;
    }

    public useSkill(name: string, target: ICharacter | ActionDice | Cloud | null = null) {
        const skill = this.getSkill(name);
        if (!target) {
            target = this._game.localPlayer.getCharacter();
        }
        if (skill.usedInThisRound) {
            this._game.alertService.setAlert("Ta umiejętność została już użyta w tej rundzie.");
            return;
        }

        if (this._determination >= skill.cost) {
            skill.use(target);
        } else {
            this._game.alertService.setAlert(
                "Za mało determinacji, żeby użyć tej umiejętności"
            );
        }
    }

}
