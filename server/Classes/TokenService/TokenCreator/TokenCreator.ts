import { ITokenCreator } from "../../../../interfaces/TokenCreator/TokenCreator";
import { IPlayerCharacter } from "../../../../interfaces/Characters/PlayerCharacter";
import { IGame } from "../../../../interfaces/Game";
import { DiscoveryTokenName } from "../../../../interfaces/TokenService/Token";
import { Candles } from "../Tokens/Candles";
import { FallenTree } from "../Tokens/FallenTree";
import { LargeLeaves } from "../Tokens/LargeLeaves";
import { OldMachete } from "../Tokens/OldMachete";
import { Poison } from "../Tokens/Poison";
import { Herbs } from "../Tokens/Herbs";
import { Goat } from "../Tokens/Goat";
import { ThornyBushes } from "../Tokens/ThornyBushes";
import { Tobacco } from "../Tokens/Tobacco";
import { Treasure } from "../Tokens/Treasure";
import { Vegetables } from "../Tokens/Vegetables";
import { Castaways1 } from "../Tokens/Castaways/Castaways1";
import { Castaways2 } from "../Tokens/Castaways/Castaways2";
import { Castaways3 } from "../Tokens/Castaways/Castaways3";
import { Castaways4 } from "../Tokens/Castaways/Castaways4";
import { NourishingLarvae } from "../Tokens/NourishingLarvae";
import { HealingHerbs } from "../Tokens/HealingHerbs";

export class TokenCreator implements ITokenCreator {
  private readonly _game: IGame;
  private readonly _character: IPlayerCharacter;

  constructor(game: IGame, character: IPlayerCharacter) {
    this._game = game;
    this._character = character;
  }

  createToken(name: DiscoveryTokenName) {
    const game = this._game;
    const char = this._character;
    switch (name) {
      case DiscoveryTokenName.candles:
        return new Candles(game, char);
      case DiscoveryTokenName.fallenTree:
        return new FallenTree(game, char);
      case DiscoveryTokenName.goat:
        return new Goat(game, char);
      case DiscoveryTokenName.healingHerbs:
        return new HealingHerbs(game, char);
      case DiscoveryTokenName.herbs:
        return new Herbs(game, char);
      case DiscoveryTokenName.nourishingLarvae:
        return new NourishingLarvae(game, char);
      case DiscoveryTokenName.largeLeaves:
        return new LargeLeaves(game, char);
      case DiscoveryTokenName.oldMachete:
        return new OldMachete(game, char);
      case DiscoveryTokenName.poison:
        return new Poison(game, char);
      case DiscoveryTokenName.thornyBushes:
        return new ThornyBushes(game, char);
      case DiscoveryTokenName.tobacco:
        return new Tobacco(game, char);
      case DiscoveryTokenName.treasure:
        return new Treasure(game, char);
      case DiscoveryTokenName.vegetables:
        return new Vegetables(game, char);
      // TODO: implement conditional statement in the future for multiple scenarios.
      case DiscoveryTokenName.scenario1:
        return new Castaways1(game, char);
      case DiscoveryTokenName.scenario2:
        return new Castaways2(game, char);
      case DiscoveryTokenName.scenario3:
        return new Castaways3(game, char);
      case DiscoveryTokenName.scenario4:
        return new Castaways4(game, char);
    }
  }
}
