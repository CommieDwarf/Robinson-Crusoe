import {
  IPlayerCharacter,
  PlayableCharacterName,
} from "../../../interfaces/Characters/PlayerCharacter";
import { IPlayer } from "../../../interfaces/Player";
import { PlayerCharEffects } from "./CharEffects";
import { IResources } from "../../../interfaces/Resources";
import { Skill, SkillInfo } from "./Skill";
import { ISkill } from "../../../interfaces/Characters/Skill";
import { IDictionary } from "../../../interfaces/IDictionary";
import { ICharEffects } from "../../../interfaces/Characters/CharEffects";
import { Pawns } from "../Pawns/Pawns";
import { IPawns } from "../../../interfaces/Pawns/Pawns";
import { CHAR_NAME_TRANSLATION } from "../../../interfaces/Characters/Character";

class Ipawns {}

export class Cook implements IPlayerCharacter {
  get namePL(): CHAR_NAME_TRANSLATION.cook {
    return this._namePL;
  }

  get name(): PlayableCharacterName {
    return this._name;
  }

  get gender(): "male" | "female" {
    return this._gender;
  }

  get player(): IPlayer {
    return this._player;
  }

  get health(): number {
    return this._health;
  }

  get moraleThresholds(): number[] {
    return this._moraleThresholds;
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

  private readonly _name: PlayableCharacterName = "cook";
  private readonly _namePL = CHAR_NAME_TRANSLATION.cook;
  private readonly _player: IPlayer;
  private readonly _skills: IDictionary<ISkill>;
  private readonly _gender: "male" | "female";
  private _health = 13;
  private _moraleThresholds = [4, 7, 9, 11];
  private _effects: ICharEffects = new PlayerCharEffects(this);
  private _id = 2;
  pawns: IPawns;

  constructor(game: unknown, player: IPlayer, gender: "male" | "female") {
    this._gender = gender;
    this._player = player;
    this._skills = this.createSkills();
    this.pawns = new Pawns(this, 2);
  }

  spendResources(resources: IResources) {}

  spendDetermination(quantity: number) {}

  isRequirementSet(requirements: unknown[]) {
    return true;
  }

  // TODO: Implement skill's usage

  private useRecipe() {}

  private useReRoll() {}

  private useStoneSoup() {}

  private useBooze() {}

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
