import { TOKEN_PL } from "../TRANSLATE_PL/CATEGORIES/TOKEN_PL";

export interface IToken {
  name: keyof typeof TOKEN_PL;
  namePL: TOKEN_PL;
  description: string;
  use: () => void;
  autoDiscard: () => void;
  renderData: ITokenRenderData;
}

export interface ITokenRenderData {
  name: keyof typeof TOKEN_PL;
  namePL: TOKEN_PL;
  description: string;
}
