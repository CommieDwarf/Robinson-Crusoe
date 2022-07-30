import { ICharacter } from "../../../interfaces/Characters/Character";
import { ISkill } from "../../../interfaces/Characters/PlayerCharacter";

export class Skill implements ISkill {
  commentary: string;
  description: string;
  namePL: string;
  use: (character: ICharacter) => void;

  constructor(
    namePL: string,
    description: string,
    commentary: string,
    use: (character: ICharacter) => void
  ) {
    this.namePL = namePL;
    this.commentary = commentary;
    this.description = description;
    this.use = use;
  }
}
