import { IPlayer } from "../Player";
import { ICharacter } from "./Character";
import { ISideCharacter } from "./SideCharacter";
import { PlayerCharEffects } from "../../server/Classes/Characters/CharEffects";
import { ICharEffects } from "./CharEffects";

export type PlayableCharacterName =
  | "explorer"
  | "carpenter"
  | "cook"
  | "soldier";

export interface IPlayerCharacter extends ICharacter {
  player: IPlayer;
  name: PlayableCharacterName;
  gender: "male" | "female";
  moraleThresholds: number[];
  skills: Map<string, ISkill>;
  id: number;
  health: number;
  effects: ICharEffects;
}

export interface ISkill {
  namePL: string;
  description: string;
  commentary: string;
  use: (character: IPlayerCharacter | ISideCharacter) => void;
}
