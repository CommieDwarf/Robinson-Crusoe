import { DiscoveryTokenName, IToken } from "../TokenService/Token";

export interface ITokenCreator {
  createToken: (name: DiscoveryTokenName) => IToken;
}
