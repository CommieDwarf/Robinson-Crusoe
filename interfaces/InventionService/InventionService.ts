import { IInvention, IInventionRenderData, INVENTION } from "./Invention";
import { IPlayerCharacter } from "../Characters/Character";

export interface IInventionServiceRenderData {
  inventions: IInventionRenderData[];
}

export interface IInventionService {
  inventions: IInvention[];
  builtInventions: IInvention[];
  scenario: string;
  build: (invention: INVENTION, builder: IPlayerCharacter) => void;
  destroy: (invention: INVENTION) => void;
  updateLocks: () => void;
  getInvention: (invention: INVENTION) => IInvention;
  fireplace: boolean;
  isBuilt: (invention: INVENTION) => boolean;
  renderData: IInventionServiceRenderData;
}
