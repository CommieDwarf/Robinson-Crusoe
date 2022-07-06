import Pawn from "./Pawn";

interface ICharacter {
  name: {
    pl: string,
    en: string,
  }
  gender: "male" | "female" | null;
  type: "main" | "side" | "helper";
  playerId: number | null;
  skills: ISkill[];
  id: number;
  pawns: Pawn[];
  freePawns: Pawn[];
}

export interface ISkill {
  name: string;
  description: string;
  commentary: string;
}


export default ICharacter;