import {
  ISideCharacter,
  ISideCharacterRenderData,
} from "../Characters/SideCharacter";
import {
  IPlayerCharacter,
  IPlayerCharacterRenderData,
} from "../Characters/PlayerCharacter";
import { ICharacter, ICharacterRenderData } from "../Characters/Character";

export interface ICharacterServiceRenderData {
  playerCharacters: IPlayerCharacterRenderData[];
  dog: ISideCharacterRenderData;
  friday: ISideCharacterRenderData;
}

export interface ICharacterService {
  allCharacters: (ISideCharacter | IPlayerCharacter)[];

  dog: ISideCharacter;
  friday: ISideCharacter;
  removeFreePawn: (charName: string, draggableId: string) => void;
  removePawn: (charName: string, draggableId: string) => void;
  addPawn: (charName: string, draggableId: string) => void;
  addFreePawn: (charName: string, draggableId: string) => void;
  getCharacter: (charName: string) => ISideCharacter | IPlayerCharacter;
  hurtAllPlayerCharacters: (by: number, source: string) => void;
  decrDeterminationAllPlayerCharacters: (by: number, logSource: string) => void;
  renderData: ICharacterServiceRenderData;
  hurt: (
    charOrName: string | ICharacter,
    by: number,
    logSource: string
  ) => void;
  heal: (
    charOrName: string | ICharacter,
    by: number,
    logSource: string
  ) => void;
  decrDetermination: (
    charOrName: string | ICharacter,
    by: number,
    logSource: string
  ) => void;
  incrDetermination: (
    charOrName: string | ICharacter,
    by: number,
    logSource: string
  ) => void;
}
