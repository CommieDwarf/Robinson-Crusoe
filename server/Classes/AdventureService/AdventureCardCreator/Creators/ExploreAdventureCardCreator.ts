import { ICreator } from "../../../../../interfaces/Creator/Creator";
import { IAdventureCard } from "../../../../../interfaces/AdventureService/AdventureCard";
import { ADVENTURE_CARD_EXPLORE } from "../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import { IGame } from "../../../../../interfaces/Game";
import { Bamboo } from "../AdventureCards/Explore/Bamboo";
import { Carcass } from "../AdventureCards/Explore/Carcass";
import { ColdWind } from "../AdventureCards/Explore/ColdWind";
import { DangerousTerrain } from "../AdventureCards/Explore/DangerousTerrain";
import { EmptyForest } from "../AdventureCards/Explore/EmptyForest";
import { Flu } from "../AdventureCards/Explore/Flu";
import { ItWillRain } from "../AdventureCards/Explore/ItWillRain";
import { Lost } from "../AdventureCards/Explore/Lost";
import { LostInTheThicket } from "../AdventureCards/Explore/LostInTheThicket";
import { LostInTheWood } from "../AdventureCards/Explore/LostInTheWood";
import { Misadventure } from "../AdventureCards/Explore/Misadventure";
import { OldGrave } from "../AdventureCards/Explore/OldGrave";
import { OldHut } from "../AdventureCards/Explore/OldHut";
import { Puma } from "../AdventureCards/Explore/Puma";
import { RemainsOfASettlement } from "../AdventureCards/Explore/RemainsOfASettlement";
import { RuinedHut } from "../AdventureCards/Explore/RuinedHut";
import { SecretCave } from "../AdventureCards/Explore/SecretCave";
import { Shrine } from "../AdventureCards/Explore/Shrine";
import { SignsOfFire } from "../AdventureCards/Explore/SignsOfFire";
import { StormOnTheHorizon } from "../AdventureCards/Explore/StormOnTheHorizon";
import { SurprisingDiscovery } from "../AdventureCards/Explore/SurprisingDiscovery";
import { Swamp } from "../AdventureCards/Explore/Swamp";
import { TheresSomethingInTheAir } from "../AdventureCards/Explore/TheresSomethingInTheAir";
import { ThornyBush } from "../AdventureCards/Explore/ThornyBush";
import { Tiger } from "../AdventureCards/Explore/Tiger";
import { Vipers } from "../AdventureCards/Explore/Vipers";
import { WildBerries } from "../AdventureCards/Explore/WildBerries";
import { WildDog } from "../AdventureCards/Explore/WildDog";
import { WrongTrack } from "../AdventureCards/Explore/WrongTrack";

export class ExploreAdventureCardCreator
  implements ICreator<IAdventureCard, ADVENTURE_CARD_EXPLORE>
{
  private readonly _game: IGame;

  constructor(game: IGame) {
    this._game = game;
  }

  create(card: ADVENTURE_CARD_EXPLORE) {
    const game = this._game;
    switch (card) {
      case ADVENTURE_CARD_EXPLORE.BAMBOO:
        return new Bamboo(game);
      case ADVENTURE_CARD_EXPLORE.CARCASS:
        return new Carcass(game);
      case ADVENTURE_CARD_EXPLORE.COLD_WIND:
        return new ColdWind(game);
      case ADVENTURE_CARD_EXPLORE.DANGEROUS_TERRAIN:
        return new DangerousTerrain(game);
      case ADVENTURE_CARD_EXPLORE.EMPTY_FOREST:
        return new EmptyForest(game);
      case ADVENTURE_CARD_EXPLORE.FLU:
        return new Flu(game);
      case ADVENTURE_CARD_EXPLORE.IT_WILL_RAIN:
        return new ItWillRain(game);
      case ADVENTURE_CARD_EXPLORE.LOST:
        return new Lost(game);
      case ADVENTURE_CARD_EXPLORE.LOST_IN_THE_THICKET:
        return new LostInTheThicket(game);
      case ADVENTURE_CARD_EXPLORE.LOST_IN_THE_WOOD:
        return new LostInTheWood(game);
      case ADVENTURE_CARD_EXPLORE.MISADVENTURE:
        return new Misadventure(game);
      case ADVENTURE_CARD_EXPLORE.OLD_GRAVE:
        return new OldGrave(game);
      case ADVENTURE_CARD_EXPLORE.OLD_HUT:
        return new OldHut(game);
      case ADVENTURE_CARD_EXPLORE.PUMA:
        return new Puma(game);
      case ADVENTURE_CARD_EXPLORE.REMAINS_OF_A_SETTLEMENT:
        return new RemainsOfASettlement(game);
      case ADVENTURE_CARD_EXPLORE.RUINED_HUT:
        return new RuinedHut(game);
      case ADVENTURE_CARD_EXPLORE.SECRET_CAVE:
        return new SecretCave(game);
      case ADVENTURE_CARD_EXPLORE.SHRINE:
        return new Shrine(game);
      case ADVENTURE_CARD_EXPLORE.SIGNS_OF_FIRE:
        return new SignsOfFire(game);
      case ADVENTURE_CARD_EXPLORE.STORM_ON_THE_HORIZON:
        return new StormOnTheHorizon(game);
      case ADVENTURE_CARD_EXPLORE.SURPRISING_DISCOVERY:
        return new SurprisingDiscovery(game);
      case ADVENTURE_CARD_EXPLORE.SWAMP:
        return new Swamp(game);
      case ADVENTURE_CARD_EXPLORE.THERES_SOMETHING_IN_THE_AIR:
        return new TheresSomethingInTheAir(game);
      case ADVENTURE_CARD_EXPLORE.THORNY_BUSH:
        return new ThornyBush(game);
      case ADVENTURE_CARD_EXPLORE.TIGER:
        return new Tiger(game);
      case ADVENTURE_CARD_EXPLORE.VIPERS:
        return new Vipers(game);
      case ADVENTURE_CARD_EXPLORE.WILD_BERRIES:
        return new WildBerries(game);
      case ADVENTURE_CARD_EXPLORE.WILD_DOG:
        return new WildDog(game);
      case ADVENTURE_CARD_EXPLORE.WRONG_TRACK:
        return new WrongTrack(game);
    }
  }
}
