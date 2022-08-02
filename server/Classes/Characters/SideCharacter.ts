import {Character} from "./Character";
import {
    ISideCharacter,
    SideCharacterName,
} from "../../../interfaces/Characters/SideCharacter";
import {Pawns} from "../Pawns/Pawns";
import {IDictionary} from "../../../interfaces/IDictionary";
import {ISkill} from "../../../interfaces/Characters/Skill";
import {ICharEffects} from "../../../interfaces/Characters/CharEffects";
import {SideCharEffects} from "./CharEffects";

export class SideCharacter extends Character implements ISideCharacter {
    get pawns(): Pawns {
        return this._pawns;
    }

    set pawns(value: Pawns) {
        this._pawns = value;
    }

    get skills(): IDictionary<ISkill> {
        return this._skills;
    }

    set skills(value: IDictionary<ISkill>) {
        this._skills = value;
    }

    get effects(): ICharEffects {
        return this._effects;
    }

    set effects(value: ICharEffects) {
        this._effects = value;
    }

    get name(): SideCharacterName {
        return this._name;
    }

    set name(value: SideCharacterName) {
        this._name = value;
    }

    private _pawns: Pawns;
    private _skills: IDictionary<ISkill>
    private _effects: ICharEffects
    protected declare _name: SideCharacterName;

    constructor(name: SideCharacterName, id: number, health: number) {
        super(name, id, health);
        this._pawns = new Pawns(this, 1);
        this._skills = this.getSkills();
        this._effects = new SideCharEffects(this);
    }

    //TODO: implement getSkills for Friday
    private getSkills(): IDictionary<ISkill> {
        if (this.name === "dog") {
            return {};
        }

        return {};
    }
}
