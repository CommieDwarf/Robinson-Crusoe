import { IPlayerCharacter } from "../Characters/PlayerCharacter";

export interface IMorale {
  lvl: number;
  lvlUp: (by: number, sourceLog: string) => void;
  lvlDown: (by: number, sourceLog: string) => void;
  getDetermination: (primeCharacter: IPlayerCharacter) => void;
  renderData: IMoraleRenderData;
  diary: boolean;
  drums: boolean;
}

export interface IMoraleRenderData {
  lvl: number;
}
