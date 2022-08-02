import { Skill } from "../Classes/Skills/Skill";
import { ISkill } from "../../interfaces/Characters/Skill";
import { IDictionary } from "../../interfaces/IDictionary";
import { IPlayerCharacter } from "../../interfaces/Characters/PlayerCharacter";
import { SkillInfo } from "../Classes/Skills/SkillInfo";

export function getCookSkills(
  character: IPlayerCharacter
): IDictionary<ISkill> {
  if (character.name !== "cook") {
    throw new Error("Tried to assign cook skills to " + character.name);
  }

  function useRecipe() {}

  function useReRoll() {}

  function useStoneSoup() {}

  function useBooze() {}

  return {
    recipe: new Skill(recipeInfo, useRecipe),
    reRoll: new Skill(reRollInfo, useReRoll),
    stoneSoup: new Skill(stoneSoupInfo, useStoneSoup),
    booze: new Skill(boozeInfo, useBooze),
  };
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
