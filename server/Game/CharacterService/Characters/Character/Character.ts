import {
    Gender, ICharacter,
    ICharacterRenderData,
} from "../../../../../interfaces/Characters/Character";

import {PlayerCharacterName} from "../../../../../interfaces/Characters/PlayerCharacter";
import {SideCharacterName} from "../../../../../interfaces/Characters/SideCharacter";
import {IGame} from "../../../../../interfaces/Game";
import {ICharEffects} from "../../../../../interfaces/Characters/CharEffects";
import {IPawnService} from "../../../../../interfaces/Pawns/Pawns";
import {ISkill} from "../../../../../interfaces/Skill/Skill";
import {ActionDice} from "../../../../../interfaces/RollDice/RollDice";

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

    public useSkill(name: string, target: ICharacter | ActionDice | null) {
        const skill = this.getSkill(name);
        if (skill.used) {
            this._game.alertService.setAlert("Ta umiejętność została już użyta");
            return;
        }
        if (this._determination >= skill.cost) {
            skill.use(target);
            this.decrDetermination(skill.cost);
        } else {
            this._game.alertService.setAlert(
                "Za mało determinacji, żeby użyć tej umiejętności"
            );
        }
    }

    refreshSkills() {
        this._skills.forEach((skill) => (skill.used = false));
    }
}
