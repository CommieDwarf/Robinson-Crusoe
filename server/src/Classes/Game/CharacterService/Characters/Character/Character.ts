import {Gender, ICharacter, ICharacterRenderData,} from "@shared/types/Game/Characters/Character";

import {PlayerCharacterName} from "@shared/types/Game/Characters/PlayerCharacter";
import {SideCharacterName} from "@shared/types/Game/Characters/SideCharacter";
import {GAME_STATUS, IGame} from "@shared/types/Game/Game";
import {ICharEffects} from "@shared/types/Game/Characters/CharEffects";
import {IPawnService} from "@shared/types/Game/Pawns/PawnService";
import {IAbility} from "@shared/types/Game/Skill/IAbility";
import {ActionDice} from "@shared/types/Game/RollDice/RollDice";
import {Cloud} from "@shared/types/Game/Weather/Weather";
import {PlayerCharacter} from "./PlayerCharacter/PlayerCharacter";
import {ABILITY} from "@shared/types/Game/Skill/ABILITY";

export abstract class Character implements ICharacter {
    protected _name: PlayerCharacterName | SideCharacterName;
    protected _gender: Gender = "male";
    protected _determination = 0;
    protected _id: number;
    protected readonly _maxHealth;
    protected _health: number;
    protected _game: IGame;
    protected declare _effects: ICharEffects; //do wywalenia chyba
    protected declare _pawnService: IPawnService<ICharacter>;
    protected declare _skills: IAbility<any>[];

    protected constructor(
        name: PlayerCharacterName | SideCharacterName,
        id: number,
        maxHealth: number,
        game: IGame
    ) {
        this._name = name;
        this._id = id;
        this._maxHealth = maxHealth;
        this._health = this._maxHealth;
        this._game = game;
    }

    get renderData(): ICharacterRenderData {
        return {
            ...this.getPawnOwnerRenderData(),
            pawnService: this._pawnService.renderData,
        }
    }

    public getPawnOwnerRenderData(): Omit<ICharacterRenderData, "pawnService"> {
        return {
            determination: this._determination,
            gender: this._gender,
            health: this._health,
            id: this._id,
            maxHealth: this._maxHealth,
            name: this._name,
            abilities: this._skills.map((skill) => skill.renderData),
        };
    }

    get abilities(): IAbility<any>[] {
        return this._skills;
    }

    get effects(): ICharEffects {
        return this._effects;
    }

    get pawnService(): IPawnService<ICharacter> {
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

    public getAbility(name: ABILITY) {
        const skill = this._skills.find((skill) => skill.name === name);
        if (!skill) {
            throw new Error(`Can't find skill with name: ${name}`);
        }
        return skill;
    }

    public useAbility(name: ABILITY, target: ICharacter | ActionDice | Cloud | null = null) {
        const skill = this.getAbility(name);
        if (!target) {
            target = this;
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
