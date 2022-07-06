import ICharacter from "../interfaces/Character";

import { Pawn, getPawnId } from "./pawns";


export class Character implements ICharacter {
  name: {
    pl: string,
    en: string,
  }
  gender: "male" | "female" | null;
  type: "main" | "side" | "helper";
  playerId: number | null;
  skills: Skill[];
  id: number;
  pawns: Pawn[];
  freePawns: Pawn[];

  constructor(name: {
    pl: string,
    en: string,
  }, gender: "male" | "female" | null, skills: Skill[], type: "main" | "side" | "helper",
  playerId: number | null, id: number, numberOfPawns: number) {
    this.name = name;
    this.gender = gender;
    this.skills = skills;
    this.type = type;
    this.playerId = playerId;
    this.id = id;
    this.pawns = this.getPawns(numberOfPawns);
    this.freePawns = this.pawns;
  }

  private getPawns = (numberOfPawns: number) => {
    let pawns = [];
    if (this.playerId) {
      for (let i = 0; i < numberOfPawns; i++) {
        pawns.push(new Pawn(getPawnId(this.playerId, this, i), this))
      }
    } else {
      pawns.push(new Pawn(this.name.en, this));
    }
    return pawns;
  }
  
}

export class Skill {
  name: string;
  description: string;
  commentary: string;
  constructor(name: string, description: string, commentary: string) {
    this.name = name;
    this.description = description;
    this.commentary = commentary;
  }
}

const cookSkills = [
  new Skill(
    "Babcina receptura",
    "Odrzuć 2 $determination$ aby uleczyć 2 $heart$ $br$ odrzucając 1 $food$",
    "Po zupie mojej babci na pewno $br$ poczujesz się lepiej."
  ),
  new Skill(
    "Bystre oko",
    "Odrzuć 2 $determination$, aby $reroll$ dowolną $br$ szarą kość podczas swojej Akcji.",
    "Gdy mówię, że się znajdzie $br$ to się znajdzie. Trzeba tylko $br$ wiedzieć, gdzie szukać!"
  ),
  new Skill(
    "Zupa z gwoździa",
    "Odrzuć 3 $determination$, aby otrzymać 1 $food$.",
    "Brak składników to nie $br$ przeszkoda, to wyzwanie. $br$ Dobry kucharz poradzi sobie $br$ w każdej sytuacji!"
  ),
  new Skill(
    "Samogon",
    "Odrzuć 3 $determination$, aby usunąć 1 $rainCloud$  $br$ lub zamienić 1 $snowCloud$ w 1 $rainCloud$",
    "Wiem, że jest zimno i w ogóle, $br$ ale mam tu coś co ogrzeje ciało $br$ i rozjaśni umysł."
  ),
];

const cook = new Character({pl: "kucharz",en: "cook"}, "male", cookSkills, "main", 1, 0, 2);

const friday = new Character({pl: "piętaszek", en: "friday"}, null, [], "side", null, 1, 1);
const dog = new Character({pl: "pies", en: "dog"}, null, [], "side", null, 2, 1);

export default {cook, friday, dog};
