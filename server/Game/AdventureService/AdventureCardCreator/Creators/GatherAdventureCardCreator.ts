import { ADVENTURE_CARD_GATHER } from "../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import { ICreator } from "../../../../../interfaces/Creator/Creator";
import { IAdventureCard } from "../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../interfaces/Game";
import { AfterTheHurricane } from "../AdventureCards/Gather/AfterTheHurricane";
import { EndOfSource } from "../AdventureCards/Gather/EndOfSource";
import { EyesInTheBushes } from "../AdventureCards/Gather/EyesInTheBushes";
import { Fruit } from "../AdventureCards/Gather/Fruit";
import { Furs } from "../AdventureCards/Gather/Furs";
import { GoldCoin } from "../AdventureCards/Gather/GoldCoin";
import { Mushrooms } from "../AdventureCards/Gather/Mushrooms";
import { Nestlings } from "../AdventureCards/Gather/Nestlings";
import { NewFlock } from "../AdventureCards/Gather/NewFlock";
import { NiceSurprise } from "../AdventureCards/Gather/NiceSurprise";
import { PathOfAPredator } from "../AdventureCards/Gather/PathOfAPredator";
import { PiratesChest } from "../AdventureCards/Gather/PiratesChest";
import { Shortage } from "../AdventureCards/Gather/Shortage";
import { SignsOfAPredator } from "../AdventureCards/Gather/SignsOfAPredator";
import { Skeleton } from "../AdventureCards/Gather/Skeleton";
import { Spider } from "../AdventureCards/Gather/Spider";
import { SurpriseInTheBushes } from "../AdventureCards/Gather/SurpriseInTheBushes";
import { TracksOfAPredator } from "../AdventureCards/Gather/TracksOfAPredator";
import { TwistedAnkle } from "../AdventureCards/Gather/TwistedAnkle";
import { UnbelievableEffort } from "../AdventureCards/Gather/UnbelievableEffort";
import { UnexpectedDiscovery } from "../AdventureCards/Gather/UnexpectedDiscovery";
import { UnexpectedTroubles } from "../AdventureCards/Gather/UnexpectedTroubles";
import { Viper } from "../AdventureCards/Gather/Viper";
import { WeatherBreakdown } from "../AdventureCards/Gather/WeatherBreakdown";
import { WinterFreezing } from "../AdventureCards/Gather/WinterFreezing";
import { WinterIsComing } from "../AdventureCards/Gather/WinterIsComing";

export class GatherAdventureCardCreator
  implements ICreator<IAdventureCard, ADVENTURE_CARD_GATHER>
{
  private readonly _game: IGame;

  constructor(game: IGame) {
    this._game = game;
  }

  create(card: ADVENTURE_CARD_GATHER) {
    const game = this._game;
    switch (card) {
      case ADVENTURE_CARD_GATHER.AFTER_THE_HURRICANE:
        return new AfterTheHurricane(game);
      case ADVENTURE_CARD_GATHER.END_OF_SOURCE:
        return new EndOfSource(game);
      case ADVENTURE_CARD_GATHER.EYES_IN_THE_BUSHES:
        return new EyesInTheBushes(game);
      case ADVENTURE_CARD_GATHER.FRUIT:
        return new Fruit(game);
      case ADVENTURE_CARD_GATHER.FURS:
        return new Furs(game);
      case ADVENTURE_CARD_GATHER.GOLD_COIN:
        return new GoldCoin(game);
      case ADVENTURE_CARD_GATHER.MUSHROOMS:
        return new Mushrooms(game);
      case ADVENTURE_CARD_GATHER.NESTLINGS:
        return new Nestlings(game);
      case ADVENTURE_CARD_GATHER.NEW_FLOCK:
        return new NewFlock(game);
      case ADVENTURE_CARD_GATHER.NICE_SURPRISE:
        return new NiceSurprise(game);
      case ADVENTURE_CARD_GATHER.PATH_OF_A_PREDATOR:
        return new PathOfAPredator(game);
      case ADVENTURE_CARD_GATHER.PIRATES_CHEST:
        return new PiratesChest(game);
      case ADVENTURE_CARD_GATHER.SHORTAGE:
        return new Shortage(game);
      case ADVENTURE_CARD_GATHER.SIGNS_OF_A_PREDATOR:
        return new SignsOfAPredator(game);
      case ADVENTURE_CARD_GATHER.SKELETON:
        return new Skeleton(game);
      case ADVENTURE_CARD_GATHER.SPIDER:
        return new Spider(game);
      case ADVENTURE_CARD_GATHER.SURPRISE_IN_THE_BUSHES:
        return new SurpriseInTheBushes(game);
      case ADVENTURE_CARD_GATHER.TRACKS_OF_A_PREDATOR:
        return new TracksOfAPredator(game);
      case ADVENTURE_CARD_GATHER.TWISTED_ANKLE:
        return new TwistedAnkle(game);
      case ADVENTURE_CARD_GATHER.UNBELIEVABLE_EFFORT:
        return new UnbelievableEffort(game);
      case ADVENTURE_CARD_GATHER.UNEXPECTED_DISCOVERY:
        return new UnexpectedDiscovery(game);
      case ADVENTURE_CARD_GATHER.UNEXPECTED_TROUBLES:
        return new UnexpectedTroubles(game);
      case ADVENTURE_CARD_GATHER.VIPER:
        return new Viper(game);
      case ADVENTURE_CARD_GATHER.WEATHER_BREAKDOWN:
        return new WeatherBreakdown(game);
      case ADVENTURE_CARD_GATHER.WINTER_FREEZING:
        return new WinterFreezing(game);
      case ADVENTURE_CARD_GATHER.WINTER_IS_COMING:
        return new WinterIsComing(game);
    }
  }
}
