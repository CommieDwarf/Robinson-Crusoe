import {IEventCard} from "../../../../interfaces/EventService/EventCard";
import {IGame} from "../../../../interfaces/Game";
import {ICreator} from "../../../../interfaces/Creator/Creator";
import {EVENT_CARD, WRECKAGE_CARD,} from "../../../../interfaces/EventService/EVENT_CARD";
import {SupplyCrates} from "./WreckageCards/SupplyCrates";
import {CaptainsChest} from "./WreckageCards/CaptainsChest";
import {WreckedLifeboat} from "./WreckageCards/WreckedLifeboat";
import {Argument} from "./EventCards/Argument";
import {AwfulWeather} from "./EventCards/AwfulWeather";
import {BadFeelings} from "./EventCards/BadFeelings";
import {Bear} from "./EventCards/Bear";
import {BodyOnTheBeach} from "./EventCards/BodyOnTheBeach";
import {BrokenTree} from "./EventCards/BrokenTree";
import {CallOfTheWild} from "./EventCards/CallOfTheWild";
import {Catastrophe} from "./EventCards/Catastrophe";
import {ChronicTiredness} from "./EventCards/ChronicTiredness";
import {CloudBurst} from "./EventCards/CloudBurst";
import {ColdRain} from "./EventCards/ColdRain";
import {Council} from "./EventCards/Council";
import {CulledArea} from "./EventCards/CulledArea";
import {DangerousNight} from "./EventCards/DangerousNight";
import {Depression} from "./EventCards/Depression";
import {Despondency} from "./EventCards/Despondency";
import {Devastation} from "./EventCards/Devastation";
import {Disaster} from "./EventCards/Disaster";
import {Drought} from "./EventCards/Drought";
import {Earthquake} from "./EventCards/Earthquake";
import {ExhaustingNight} from "./EventCards/ExhaustingNight";
import {Fight} from "./EventCards/Fight";
import {FightInTheDark} from "./EventCards/FightInTheDark";
import {Fire} from "./EventCards/Fire";
import {Flood} from "./EventCards/Flood";
import {FoulWeather} from "./EventCards/FoulWeather";
import {Frost} from "./EventCards/Frost";
import {HeavyClouds} from "./EventCards/HeavyClouds";
import {HeavyRain} from "./EventCards/HeavyRain";
import {HeavyRainIsComing} from "./EventCards/HeavyRainIsComing";
import {HighWater} from "./EventCards/HighWater";
import {HowlingFromTheWoods} from "./EventCards/HowlingFromTheWoods";
import {Jaguar} from "./EventCards/Jaguar";
import {Landslide} from "./EventCards/Landslide";
import {LossOfHope} from "./EventCards/LossOfHope";
import {MemoriesOfTheCruise} from "./EventCards/MemoriesOfTheCruise";
import {MessInTheCamp} from "./EventCards/MessInTheCamp";
import {Mist} from "./EventCards/Mist";
import {NaturalDamBreaks} from "./EventCards/NaturalDamBreaks";
import {NightAttack} from "./EventCards/NightAttack";
import {NightHowling} from "./EventCards/NightHowling";
import {Otters} from "./EventCards/Otters";
import {Poisoning} from "./EventCards/Poisoning";
import {Precipice} from "./EventCards/Precipice";
import {PredatorInTheVicinity} from "./EventCards/PredatorInTheVicinity";
import {PredatorIsNear} from "./EventCards/PredatorIsNear";
import {Predators} from "./EventCards/Predators";
import {PredatorsInTheWoods} from "./EventCards/PredatorsInTheWoods";
import {RagingRiver} from "./EventCards/RagingRiver";
import {Rain} from "./EventCards/Rain";
import {RavenousPredators} from "./EventCards/RavenousPredators";
import {RavishingHurricane} from "./EventCards/RavishingHurricane";
import {RavishingWindstorm} from "./EventCards/RavishingWindstorm";
import {RoughPassage} from "./EventCards/RoughPassage";
import {SearchingForANewPath} from "./EventCards/SearchingForANewPath";
import {SleeplessNight} from "./EventCards/SleeplessNight";
import {SlowWork} from "./EventCards/SlowWork";
import {SmokeOnTheHorizon} from "./EventCards/SmokeOnTheHorizon";
import {Storm} from "./EventCards/Storm";
import {StormDamage} from "./EventCards/StormDamage";
import {StrokeOfFate} from "./EventCards/StrokeOfFate";
import {StrongWind} from "./EventCards/StrongWind";
import {Termites} from "./EventCards/Termites";
import {TheIslandFightsBack} from "./EventCards/TheIslandFightsBack";
import {Thunderstorm} from "./EventCards/Thunderstorm";
import {UnusuallyColdNight} from "./EventCards/UnusuallyColdNight";
import {Vertigo} from "./EventCards/Vertigo";
import {Weakness} from "./EventCards/Weakness";
import {WinterDepression} from "./EventCards/WinterDepression";
import {WreckedBalloon} from "./EventCards/WreckedBalloon";
import {FlyingSurprise} from "./EventCards/FlyingSurprise";

export class EventCardCreator
    implements ICreator<IEventCard, EVENT_CARD | WRECKAGE_CARD> {
    protected readonly _game;

    implemented: (EVENT_CARD | WRECKAGE_CARD)[] = [
        // EVENT_CARD.AWFUL_WEATHER,
        // EVENT_CARD.BAD_FEELINGS,
        // EVENT_CARD.BODY_ON_THE_BEACH,
        // EVENT_CARD.BROKEN_TREE,
        // EVENT_CARD.CALL_OF_THE_WILD,
        // WRECKAGE_CARD.CAPTAINS_CHEST,
        // EVENT_CARD.CHRONIC_TIREDNESS,
        // EVENT_CARD.COLD_RAIN,
        // EVENT_CARD.CULLED_AREA,
        // EVENT_CARD.DESPONDENCY,
        // EVENT_CARD.DEVASTATION,
        // EVENT_CARD.DROUGHT,
        // EVENT_CARD.EARTHQUAKE,
        // EVENT_CARD.EXHAUSTING_NIGHT,
        // EVENT_CARD.FIGHT,
        
    ]


    constructor(game: IGame) {
        this._game = game;
    }

    create(eventCard: EVENT_CARD | WRECKAGE_CARD): IEventCard {
        const game = this._game;
        switch (eventCard) {
            case WRECKAGE_CARD.CAPTAINS_CHEST:
                return new CaptainsChest(game);
            case WRECKAGE_CARD.SUPPLY_CRATES:
                return new SupplyCrates(game);
            case WRECKAGE_CARD.WRECKED_LIFEBOAT:
                return new WreckedLifeboat(game);
            case EVENT_CARD.ARGUMENT:
                return new Argument(game);
            case EVENT_CARD.AWFUL_WEATHER: //+
                return new AwfulWeather(game);
            case EVENT_CARD.BAD_FEELINGS: //-
                return new BadFeelings(game);
            case EVENT_CARD.BEAR:
                return new Bear(game);
            case EVENT_CARD.BODY_ON_THE_BEACH:
                return new BodyOnTheBeach(game);
            case EVENT_CARD.BROKEN_TREE:
                return new BrokenTree(game);
            case EVENT_CARD.CALL_OF_THE_WILD:
                return new CallOfTheWild(game);
            case EVENT_CARD.CATASTROPHE:
                return new Catastrophe(game);
            case EVENT_CARD.CHRONIC_TIREDNESS:
                return new ChronicTiredness(game);
            case EVENT_CARD.CLOUDBURST:
                return new CloudBurst(game);
            case EVENT_CARD.COLD_RAIN:
                return new ColdRain(game);
            case EVENT_CARD.COUNCIL:
                return new Council(game);
            case EVENT_CARD.CULLED_AREA:
                return new CulledArea(game);
            case EVENT_CARD.DANGEROUS_NIGHT:
                return new DangerousNight(game);
            case EVENT_CARD.DEPRESSION:
                return new Depression(game);
            case EVENT_CARD.DESPONDENCY:
                return new Despondency(game);
            case EVENT_CARD.DEVASTATION:
                return new Devastation(game);
            case EVENT_CARD.DISASTER:
                return new Disaster(game);
            case EVENT_CARD.DROUGHT:
                return new Drought(game);
            case EVENT_CARD.EARTHQUAKE:
                return new Earthquake(game);
            case EVENT_CARD.EXHAUSTING_NIGHT:
                return new ExhaustingNight(game);
            case EVENT_CARD.FIGHT:
                return new Fight(game);
            case EVENT_CARD.FIGHT_IN_THE_DARK:
                return new FightInTheDark(game);
            case EVENT_CARD.FIRE:
                return new Fire(game);
            case EVENT_CARD.FLOOD:
                return new Flood(game);
            case EVENT_CARD.FLYING_SURPRISE:
                return new FlyingSurprise(game);
            case EVENT_CARD.FOUL_WEATHER:
                return new FoulWeather(game);
            case EVENT_CARD.FROST:
                return new Frost(game);
            case EVENT_CARD.HEAVY_CLOUDS:
                return new HeavyClouds(game);
            case EVENT_CARD.HEAVY_RAIN:
                return new HeavyRain(game);
            case EVENT_CARD.HEAVY_RAIN_IS_COMING:
                return new HeavyRainIsComing(game);
            case EVENT_CARD.HIGH_WATER:
                return new HighWater(game);
            case EVENT_CARD.HOWLING_FROM_THE_WOODS:
                return new HowlingFromTheWoods(game);
            case EVENT_CARD.JAGUAR:
                return new Jaguar(game);
            case EVENT_CARD.LANDSLIDE:
                return new Landslide(game);
            case EVENT_CARD.LOSS_OF_HOPE:
                return new LossOfHope(game);
            case EVENT_CARD.MEMORIES_OF_THE_CRUISE:
                return new MemoriesOfTheCruise(game);
            case EVENT_CARD.MESS_IN_THE_CAMP:
                return new MessInTheCamp(game);
            case EVENT_CARD.MIST:
                return new Mist(game);
            case EVENT_CARD.NATURAL_DAM_BREAKS:
                return new NaturalDamBreaks(game);
            case EVENT_CARD.NIGHT_ATTACK:
                return new NightAttack(game);
            case EVENT_CARD.NIGHT_HOWLING:
                return new NightHowling(game);
            case EVENT_CARD.OTTERS:
                return new Otters(game);
            case EVENT_CARD.POISONING:
                return new Poisoning(game);
            case EVENT_CARD.PRECIPICE:
                return new Precipice(game);
            case EVENT_CARD.PREDATOR_IN_THE_VICINITY:
                return new PredatorInTheVicinity(game);
            case EVENT_CARD.PREDATOR_IS_NEAR:
                return new PredatorIsNear(game);
            case EVENT_CARD.PREDATORS:
                return new Predators(game);
            case EVENT_CARD.PREDATORS_IN_THE_WOODS:
                return new PredatorsInTheWoods(game);
            case EVENT_CARD.RAGING_RIVER:
                return new RagingRiver(game);
            case EVENT_CARD.RAIN:
                return new Rain(game);
            case EVENT_CARD.RAVENOUS_PREDATORS:
                return new RavenousPredators(game);
            case EVENT_CARD.RAVISHING_HURRICANE:
                return new RavishingHurricane(game);
            case EVENT_CARD.RAVISHING_WINDSTORM:
                return new RavishingWindstorm(game);
            case EVENT_CARD.ROUGH_PASSAGE:
                return new RoughPassage(game);
            case EVENT_CARD.SEARCHING_FOR_A_NEW_PATH:
                return new SearchingForANewPath(game);
            case EVENT_CARD.SLEEPLESS_NIGHT:
                return new SleeplessNight(game);
            case EVENT_CARD.SLOW_WORK:
                return new SlowWork(game);
            case EVENT_CARD.SMOKE_ON_THE_HORIZON:
                return new SmokeOnTheHorizon(game);
            case EVENT_CARD.STORM:
                return new Storm(game);
            case EVENT_CARD.STORM_DAMAGE:
                return new StormDamage(game);
            case EVENT_CARD.STROKE_OF_FATE:
                return new StrokeOfFate(game);
            case EVENT_CARD.STRONG_WIND:
                return new StrongWind(game);
            case EVENT_CARD.TERMITES:
                return new Termites(game);
            case EVENT_CARD.THE_ISLAND_FIGHTS_BACK:
                return new TheIslandFightsBack(game);
            case EVENT_CARD.THUNDERSTORM:
                return new Thunderstorm(game);
            case EVENT_CARD.UNUSUALLY_COLD_NIGHT:
                return new UnusuallyColdNight(game);
            case EVENT_CARD.VERTIGO:
                return new Vertigo(game);
            case EVENT_CARD.WEAKNESS:
                return new Weakness(game);
            case EVENT_CARD.WINTER_DEPRESSION:
                return new WinterDepression(game);
            case EVENT_CARD.WRECKED_BALLOON:
                return new WreckedBalloon(game);
        }
    }
}
