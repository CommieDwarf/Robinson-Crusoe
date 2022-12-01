import {SkillService} from "./SkillService/SkillService";
import {ISkillService} from "../../../../interfaces/SkillService/SkillService";
import {IGame} from "../../../../interfaces/Game";
import {ICharacter} from "../../../../interfaces/Characters/Character";
import {ISkill} from "../../../../interfaces/SkillService/Skill";
import {Skill} from "../Skill";
import {SkillInfo} from "../SkillInfo";

export class Cook extends SkillService implements ISkillService {
  constructor(game: IGame, character: ICharacter) {
    super(game, character);
    this._skills = this.getSkills();
  }

  // TODO: implement usages
  private useRecipe() {
  }

  private useReRoll() {
  }

  private useStoneSoup() {
  }

  private useBooze() {
  }

  private getSkills() {
    const skills = new Map<string, ISkill>();
    skills.set("recipe", new Skill(recipeInfo, this.useRecipe));
    skills.set("reRoll", new Skill(reRollInfo, this.useReRoll));
    skills.set("stoneSoup", new Skill(stoneSoupInfo, this.useStoneSoup));
    skills.set("booze", new Skill(boozeInfo, this.useBooze));
    return skills;
  }
}

const recipeInfo = new SkillInfo(
    "recipe",
    "Babcina Receptura",
    "Odrzuć 2 $determination$ aby uleczyć 2 $heart$ odrzucając 1 $food$",
    "Po zupie mojej babci na pewno poczujesz się lepiej.",
    "all",
    "none"
);

const reRollInfo = new SkillInfo(
    "reRoll",
    "Bystre oko",
    "Odrzuć 2 $determination$, aby $reroll$ dowolną szarą kość podczas swojej Akcji.",
    "Gdy mówię, że się znajdzie to się znajdzie. Trzeba tylko wiedzieć, gdzie szukać!",
    "action",
    "none"
);
const stoneSoupInfo = new SkillInfo(
    "stoneSoup",
    "Zupa z gwoździa",
    "Odrzuć 3 $determination$, aby otrzymać 1 $food$.",
    "Brak składników to nie przeszkoda, to wyzwanie. Dobry kucharz poradzi sobie w każdej sytuacji!",
    "all",
    "action"
);
const boozeInfo = new SkillInfo(
    "booze",
    "Samogon",
    "Odrzuć 3 $determination$, aby usunąć 1 $rainCloud$ lub zamienić 1 $snowCloud$ w 1 $rainCloud$",
    "Wiem, że jest zimno i w ogóle, ale mam tu coś co ogrzeje ciało i rozjaśni umysł.",
    "weather",
    "none"
);
