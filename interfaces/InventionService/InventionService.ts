import { IInvention, IInventionRenderData, INVENTION } from "./Invention";
import { ICharacter } from "../Characters/Character";

export interface IInventionServiceRenderData {
  inventions: IInventionRenderData[];
}

export interface IInventionService {
  inventions: IInvention[];
  builtInventions: IInvention[];
  scenario: string;
  build: (invention: INVENTION, builder: ICharacter) => void;
  destroy: (invention: INVENTION) => void;
  updateLocks: () => void;
  getInvention: (invention: INVENTION) => IInvention;
  fireplace: boolean;
  isBuilt: (invention: INVENTION) => boolean;
  renderData: IInventionServiceRenderData;
}
