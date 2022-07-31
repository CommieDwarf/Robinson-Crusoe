import {
    IPlayerCharacter,
    PlayableCharacterName,
} from "../../../interfaces/Characters/PlayerCharacter";
import {IPlayer} from "../../../interfaces/Player";
import {PlayerCharEffects, SideCharEffects} from "./CharEffects";
import {IResources} from "../../../interfaces/Resources";
import {Skill, SkillInfo} from "./Skill";
import {ISkill} from "../../../interfaces/Characters/Skill";
import {IDictionary} from "../../../interfaces/IDictionary";
import {ICharEffects} from "../../../interfaces/Characters/CharEffects";
import {Pawns} from "../Pawns/Pawns";
import {IPawns} from "../../../interfaces/Pawns/Pawns";
import {CHAR_NAME_TRANSLATION} from "../../../interfaces/Characters/Character";
import {ISideCharacter, SideCharacterName} from "../../../interfaces/Characters/SideCharacter";

class Ipawns {
}

export class Friday implements ISideCharacter {
    get namePL(): CHAR_NAME_TRANSLATION.cook {
        return this._namePL;
    }

    get name(): SideCharacterName {
        return this._name;
    }

    get health(): number {
        return this._health;
    }

    get effects(): ICharEffects {
        return this._effects;
    }

    get id(): number {
        return this._id;
    }

    get skills(): IDictionary<ISkill> {
        return this._skills;
    }

    private readonly _name: SideCharacterName = "friday";
    private readonly _namePL = CHAR_NAME_TRANSLATION.friday;
    private readonly _skills: IDictionary<ISkill>;
    private _health = 4
    private _effects: ICharEffects = new SideCharEffects(this);
    private _id = 0;
    pawns: IPawns;

    constructor(game: unknown) {
        this._skills = this.createSkills();
        this.pawns = new Pawns(this, 2);
    }


    // TODO: Implement skill's usage

    private useRecipe() {
    }

    private useReRoll() {
    }

    private useStoneSoup() {
    }

    private useBooze() {
    }

    createSkills() {
        const skills: IDictionary<ISkill> = {
            recipe: new Skill(recipeInfo, this.useRecipe),
            reRoll: new Skill(reRollInfo, this.useReRoll),
            stoneSoup: new Skill(stoneSoupInfo, this.useStoneSoup),
            booze: new Skill(boozeInfo, this.useBooze),
        };
        return skills;
    }
}

const recipeInfo = new SkillInfo(
    "Babcina Receptura",
    "Odrzuć 2 $determination$ aby uleczyć 2 $heart$ $br$ odrzucając 1 $food$",
    "Po zupie mojej babci na pewno $br$ poczujesz się lepiej."
);

const reRollInfo = new SkillInfo(
    "Bystre oko",
    "Odrzuć 2 $determination$, aby $reroll$ dowolną $br$ szarą kość podczas swojej Akcji.",
    "Gdy mówię, że się znajdzie $br$ to się znajdzie. Trzeba tylko $br$ wiedzieć, gdzie szukać!"
);
const stoneSoupInfo = new SkillInfo(
    "Zupa z gwoździa",
    "Odrzuć 3 $determination$, aby otrzymać 1 $food$.",
    "Brak składników to nie $br$ przeszkoda, to wyzwanie. $br$ Dobry kucharz poradzi sobie $br$ w każdej sytuacji!"
);
const boozeInfo = new SkillInfo(
    "Samogon",
    "Odrzuć 3 $determination$, aby usunąć 1 $rainCloud$  $br$ lub zamienić 1 $snowCloud$ w 1 $rainCloud$",
    "Wiem, że jest zimno i w ogóle, $br$ ale mam tu coś co ogrzeje ciało $br$ i rozjaśni umysł."
);
