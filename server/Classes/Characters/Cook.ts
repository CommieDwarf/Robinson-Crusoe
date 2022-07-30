import {PlayerCharacter} from "./PlayerCharacter";
import {
    IPlayerCharacter,
    ISkill,
    PlayableCharacterName,
} from "../../../interfaces/Characters/PlayerCharacter";
import {IPlayer} from "../../../interfaces/Player";
import {PlayerCharEffects} from "./CharEffects";
import {Skill, SkillInfo} from "./Skill";
import {IResources} from "../../../interfaces/Resources";
import {Resources} from "../AllResources/AllResources";

export class Cook extends PlayerCharacter implements IPlayerCharacter {
    name: PlayableCharacterName = "cook";
    player: IPlayer;
    health = 13;
    moraleThresholds = [4, 7, 9, 11];
    effects = new PlayerCharEffects(this);
    id = 2;
    skills: Map<string, ISkill>;

    constructor(game: unknown, player: IPlayer, gender: "male" | "female") {
        super(gender);
        this.player = player;
    }

    spendResources(resources: IResources) {
    }

    spendDetermination(quantity: number) {
    }

    isRequirementSet(requirements: unknown[]) {
        return true;
    }

    createSkills(): Map<string, ISkill> {
        const skills = new Map<string, ISkill>();
        skills.set(
            "recipe",
            new Skill(recipe.namePL, recipe.description, recipe.quote, () => {
                if (this) {

                }
            })
        );
    }
}

const recipe = {
    namePL: "Babcina Receptura",
    description:
        "Odrzuć 2 $determination$ aby uleczyć 2 $heart$ $br$ odrzucając 1 $food$",
    quote: "Po zupie mojej babci na pewno $br$ poczujesz się lepiej.",
};

// = new Skill("Babcina Receptura," +
//    "Odrzuć 2 $determination$ aby uleczyć 2 $heart$ $br$ odrzucając 1 $food$",
//    "Po zupie mojej babci na pewno $br$ poczujesz się lepiej.",
//
//    )

// const object = {
//   recipe: new SkillInfo(
//       "Babcina receptura",
//       "Odrzuć 2 $determination$ aby uleczyć 2 $heart$ $br$ odrzucając 1 $food$",
//       "Po zupie mojej babci na pewno $br$ poczujesz się lepiej."
//   ),
//   reRoll: new SkillInfo(
//       "Bystre oko",
//       "Odrzuć 2 $determination$, aby $reroll$ dowolną $br$ szarą kość podczas swojej Akcji.",
//       "Gdy mówię, że się znajdzie $br$ to się znajdzie. Trzeba tylko $br$ wiedzieć, gdzie szukać!"
//   ),
//   stoneSoup: new SkillInfo(
//       "Zupa z gwoździa",
//       "Odrzuć 3 $determination$, aby otrzymać 1 $food$.",
//       "Brak składników to nie $br$ przeszkoda, to wyzwanie. $br$ Dobry kucharz poradzi sobie $br$ w każdej sytuacji!"
//   ),
//   booze: new SkillInfo(
//       "Samogon",
//       "Odrzuć 3 $determination$, aby usunąć 1 $rainCloud$  $br$ lub zamienić 1 $snowCloud$ w 1 $rainCloud$",
//       "Wiem, że jest zimno i w ogóle, $br$ ale mam tu coś co ogrzeje ciało $br$ i rozjaśni umysł."
//   ),
// };
