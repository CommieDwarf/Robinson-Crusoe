import { ICharacter } from "../Characters/Character";

export interface IArrangeCampRestService {
  pawnAmount: {
    rest: number;
    arrangeCamp: number;
  };
  arrangeCampBonus: "determination" | "morale" | null;
  renderData: IArrangeCampRestServiceRenderData;
  bed: boolean;
  rest: (character: ICharacter) => void;
  arrangeCamp: (character: ICharacter) => void;
}

export interface IArrangeCampRestServiceRenderData {
  pawnAmount: {
    rest: number;
    arrangeCamp: number;
  };

  arrangeCampBonus: "determination" | "morale" | null;
}
