import { ICreator } from "../../../../../interfaces/Creator/Creator";
import { IAdventureCard } from "../../../../../interfaces/AdventureService/AdventureCard";
import { ADVENTURE_CARD_BUILD } from "../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import { IGame } from "../../../../../interfaces/Game";
import { Accident } from "../AdventureCards/Build/Accident";
import { Breakdown } from "../AdventureCards/Build/Breakdown";
import { BrokenLever } from "../AdventureCards/Build/BrokenLever";
import { ComingToTerms } from "../AdventureCards/Build/ComingToTerms";
import { Construction } from "../AdventureCards/Build/Construction";
import { ConstructionIsWeak } from "../AdventureCards/Build/ConstructionIsWeak";
import { CutHead } from "../AdventureCards/Build/CutHead";
import { DangerousWork } from "../AdventureCards/Build/DangerousWork";
import { DarkCloudsInTheSky } from "../AdventureCards/Build/DarkCloudsInTheSky";
import { FastWork } from "../AdventureCards/Build/FastWork";
import { FearOfTheBeasts } from "../AdventureCards/Build/FearOfTheBeasts";
import { HardWork } from "../AdventureCards/Build/HardWork";
import { HowlingInTheBushes } from "../AdventureCards/Build/HowlingInTheBushes";
import { HungryPredator } from "../AdventureCards/Build/HungryPredator";
import { InAHurry } from "../AdventureCards/Build/InAHurry";
import { LaboriousWork } from "../AdventureCards/Build/LaboriousWork";
import { LackOfHope } from "../AdventureCards/Build/LackOfHope";
import { MonkeysWatchYou } from "../AdventureCards/Build/MonkeysWatchYou";
import { NastyWound } from "../AdventureCards/Build/NastyWound";
import { PredatorInTheCamp } from "../AdventureCards/Build/PredatorInTheCamp";
import { Savings } from "../AdventureCards/Build/Savings";
import { Sting } from "../AdventureCards/Build/Sting";
import { Tired } from "../AdventureCards/Build/Tired";
import { ToolsBreak } from "../AdventureCards/Build/ToolsBreak";
import { ToolsInspection } from "../AdventureCards/Build/ToolsInspection";
import { Unmotivated } from "../AdventureCards/Build/Unmotivated";
import { VisitOfAPredator } from "../AdventureCards/Build/VisitOfAPredator";
import { WindStorm } from "../AdventureCards/Build/WindStorm";
import { YouNeedABiggerCamp } from "../AdventureCards/Build/YouNeedABiggerCamp";

export class BuildAdventureCardCreator
  implements ICreator<IAdventureCard, ADVENTURE_CARD_BUILD>
{
  private readonly _game: IGame;

  constructor(game: IGame) {
    this._game = game;
  }

  create(card: ADVENTURE_CARD_BUILD) {
    const game = this._game;
    switch (card) {
      case ADVENTURE_CARD_BUILD.ACCIDENT:
        return new Accident(game);
      case ADVENTURE_CARD_BUILD.BREAKDOWN:
        return new Breakdown(game);
      case ADVENTURE_CARD_BUILD.BROKEN_LEVER:
        return new BrokenLever(game);
      case ADVENTURE_CARD_BUILD.COMING_TO_TERMS:
        return new ComingToTerms(game);
      case ADVENTURE_CARD_BUILD.CONSTRUCTION:
        return new Construction(game);
      case ADVENTURE_CARD_BUILD.CONSTRUCTION_IS_WEAK:
        return new ConstructionIsWeak(game);
      case ADVENTURE_CARD_BUILD.CUT_HEAD:
        return new CutHead(game);
      case ADVENTURE_CARD_BUILD.DANGEROUS_WORK:
        return new DangerousWork(game);
      case ADVENTURE_CARD_BUILD.DARK_CLOUDS_IN_THE_SKY:
        return new DarkCloudsInTheSky(game);
      case ADVENTURE_CARD_BUILD.FAST_WORK:
        return new FastWork(game);
      case ADVENTURE_CARD_BUILD.FEAR_OF_THE_BEASTS:
        return new FearOfTheBeasts(game);
      case ADVENTURE_CARD_BUILD.HARD_WORK:
        return new HardWork(game);
      case ADVENTURE_CARD_BUILD.HOWLING_IN_THE_BUSHES:
        return new HowlingInTheBushes(game);
      case ADVENTURE_CARD_BUILD.HUNGRY_PREDATOR:
        return new HungryPredator(game);
      case ADVENTURE_CARD_BUILD.IN_A_HURRY:
        return new InAHurry(game);
      case ADVENTURE_CARD_BUILD.LABORIOUS_WORK:
        return new LaboriousWork(game);
      case ADVENTURE_CARD_BUILD.LACK_OF_HOPE:
        return new LackOfHope(game);
      case ADVENTURE_CARD_BUILD.MONKEYS_WATCH_YOU:
        return new MonkeysWatchYou(game);
      case ADVENTURE_CARD_BUILD.NASTY_WOUND:
        return new NastyWound(game);
      case ADVENTURE_CARD_BUILD.PREDATOR_IN_THE_CAMP:
        return new PredatorInTheCamp(game);
      case ADVENTURE_CARD_BUILD.SAVINGS:
        return new Savings(game);
      case ADVENTURE_CARD_BUILD.STING:
        return new Sting(game);
      case ADVENTURE_CARD_BUILD.TIRED:
        return new Tired(game);
      case ADVENTURE_CARD_BUILD.TOOLS_BREAK:
        return new ToolsBreak(game);
      case ADVENTURE_CARD_BUILD.TOOLS_INSPECTION:
        return new ToolsInspection(game);
      case ADVENTURE_CARD_BUILD.UNMOTIVATED:
        return new Unmotivated(game);
      case ADVENTURE_CARD_BUILD.VISIT_OF_A_PREDATOR:
        return new VisitOfAPredator(game);
      case ADVENTURE_CARD_BUILD.WIND_STORM:
        return new WindStorm(game);
      case ADVENTURE_CARD_BUILD.YOU_NEED_A_BIGGER_CAMP:
        return new YouNeedABiggerCamp(game);
    }
  }
}
