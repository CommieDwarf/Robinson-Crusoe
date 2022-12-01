export interface IToken {
  name: string;
  namePL: string;
  use: () => void;
  renderData: ITokenRenderData;
}

export interface ITokenRenderData {
  name: string;
  namePL: string;
}
