import {
  EVENT_CARD,
  IEventCard,
  WRECKAGE_CARD,
} from "../../../../interfaces/EventService/EventCard";
import { IGame } from "../../../../interfaces/Game";
import { Argument } from "./EventCards/Argument";
import { Fire } from "./EventCards/Fire";
import { AwfulWeather } from "./EventCards/AwfulWeather";
import { BrokenTree } from "./EventCards/BrokenTree";
import { CloudBurst } from "./EventCards/CloudBurst";
import { DangerousNight } from "./EventCards/DangerousNight";
import { HowlingFromTheWoods } from "./EventCards/HowlingFromTheWoods";
import { NightHowling } from "./EventCards/NightHowling";
import { Rain } from "./EventCards/Rain";
import { RavishingWindstorm } from "./EventCards/RavishingWindstorm";
import { SleeplessNight } from "./EventCards/SleeplessNight";
import { UnusuallyColdNight } from "./EventCards/UnusuallyColdNight";
import { SupplyCrates } from "./WreckageCards/SupplyCrates";
import { ICreator } from "../../../../interfaces/Creator/Creator";

export class EventCardCreator
  implements ICreator<IEventCard, EVENT_CARD | WRECKAGE_CARD>
{
  protected readonly _game;

  constructor(game: IGame) {
    this._game = game;
  }

  create(eventCard: EVENT_CARD | WRECKAGE_CARD): IEventCard {
    switch (eventCard) {
      case WRECKAGE_CARD.SUPPLY_CRATES:
        return new SupplyCrates(this._game);
      case EVENT_CARD.ARGUMENT:
        return new Argument(this._game);
      case EVENT_CARD.AWFUL_WEATHER:
        return new AwfulWeather(this._game);
      case EVENT_CARD.BROKEN_TREE:
        return new BrokenTree(this._game);
      case EVENT_CARD.CLOUD_BURST:
        return new CloudBurst(this._game);
      case EVENT_CARD.DANGEROUS_NIGHT:
        return new DangerousNight(this._game);
      case EVENT_CARD.FIRE:
        return new Fire(this._game);
      case EVENT_CARD.HOWLING_FROM_THE_WOODS:
        return new HowlingFromTheWoods(this._game);
      case EVENT_CARD.NIGHT_HOWLING:
        return new NightHowling(this._game);
      case EVENT_CARD.RAIN:
        return new Rain(this._game);
      case EVENT_CARD.RAVISHING_WINDSTORM:
        return new RavishingWindstorm(this._game);
      case EVENT_CARD.SLEEPLESS_NIGHT:
        return new SleeplessNight(this._game);
      case EVENT_CARD.UNUSUALLY_COLD_NIGHT:
        return new UnusuallyColdNight(this._game);
    }
  }
}
