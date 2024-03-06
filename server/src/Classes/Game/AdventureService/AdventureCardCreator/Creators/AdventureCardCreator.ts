import {IGame} from "@shared/types/Game/Game";
import {
    ADVENTURE_CARD_BUILD,
    ADVENTURE_CARD_EXPLORE,
    ADVENTURE_CARD_GATHER,
} from "@shared/types/Game/AdventureService/ADVENTURE_CARD";
import {AfterTheHurricane} from "../AdventureCards/Gather/AfterTheHurricane";
import {EndOfSource} from "../AdventureCards/Gather/EndOfSource";
import {EyesInTheBushes} from "../AdventureCards/Gather/EyesInTheBushes";
import {Fruit} from "../AdventureCards/Gather/Fruit";
import {Furs} from "../AdventureCards/Gather/Furs";
import {GoldCoin} from "../AdventureCards/Gather/GoldCoin";
import {Mushrooms} from "../AdventureCards/Gather/Mushrooms";
import {Nestlings} from "../AdventureCards/Gather/Nestlings";
import {NewFlock} from "../AdventureCards/Gather/NewFlock";
import {NiceSurprise} from "../AdventureCards/Gather/NiceSurprise";
import {PathOfAPredator} from "../AdventureCards/Gather/PathOfAPredator";
import {PiratesChest} from "../AdventureCards/Gather/PiratesChest";
import {Shortage} from "../AdventureCards/Gather/Shortage";
import {SignsOfAPredator} from "../AdventureCards/Gather/SignsOfAPredator";
import {Skeleton} from "../AdventureCards/Gather/Skeleton";
import {Spider} from "../AdventureCards/Gather/Spider";
import {SurpriseInTheBushes} from "../AdventureCards/Gather/SurpriseInTheBushes";
import {TracksOfAPredator} from "../AdventureCards/Gather/TracksOfAPredator";
import {TwistedAnkle} from "../AdventureCards/Gather/TwistedAnkle";
import {UnbelievableEffort} from "../AdventureCards/Gather/UnbelievableEffort";
import {UnexpectedDiscovery} from "../AdventureCards/Gather/UnexpectedDiscovery";
import {UnexpectedTroubles} from "../AdventureCards/Gather/UnexpectedTroubles";
import {Viper} from "../AdventureCards/Gather/Viper";
import {WeatherBreakdown} from "../AdventureCards/Gather/WeatherBreakdown";
import {WinterFreezing} from "../AdventureCards/Gather/WinterFreezing";
import {WinterIsComing} from "../AdventureCards/Gather/WinterIsComing";
import {Accident} from "../AdventureCards/Build/Accident";
import {Breakdown} from "../AdventureCards/Build/Breakdown";
import {BrokenLever} from "../AdventureCards/Build/BrokenLever";
import {ComingToTerms} from "../AdventureCards/Build/ComingToTerms";
import {Construction} from "../AdventureCards/Build/Construction";
import {ConstructionIsWeak} from "../AdventureCards/Build/ConstructionIsWeak";
import {CutHead} from "../AdventureCards/Build/CutHead";
import {DangerousWork} from "../AdventureCards/Build/DangerousWork";
import {DarkCloudsInTheSky} from "../AdventureCards/Build/DarkCloudsInTheSky";
import {FastWork} from "../AdventureCards/Build/FastWork";
import {FearOfTheBeasts} from "../AdventureCards/Build/FearOfTheBeasts";
import {HardWork} from "../AdventureCards/Build/HardWork";
import {HowlingInTheBushes} from "../AdventureCards/Build/HowlingInTheBushes";
import {HungryPredator} from "../AdventureCards/Build/HungryPredator";
import {InAHurry} from "../AdventureCards/Build/InAHurry";
import {LaboriousWork} from "../AdventureCards/Build/LaboriousWork";
import {LackOfHope} from "../AdventureCards/Build/LackOfHope";
import {MonkeysWatchYou} from "../AdventureCards/Build/MonkeysWatchYou";
import {NastyWound} from "../AdventureCards/Build/NastyWound";
import {PredatorInTheCamp} from "../AdventureCards/Build/PredatorInTheCamp";
import {Savings} from "../AdventureCards/Build/Savings";
import {Sting} from "../AdventureCards/Build/Sting";
import {Tired} from "../AdventureCards/Build/Tired";
import {ToolsBreak} from "../AdventureCards/Build/ToolsBreak";
import {ToolsInspection} from "../AdventureCards/Build/ToolsInspection";
import {Unmotivated} from "../AdventureCards/Build/Unmotivated";
import {VisitOfAPredator} from "../AdventureCards/Build/VisitOfAPredator";
import {WindStorm} from "../AdventureCards/Build/WindStorm";
import {YouNeedABiggerCamp} from "../AdventureCards/Build/YouNeedABiggerCamp";
import {Bamboo} from "../AdventureCards/Explore/Bamboo";
import {Carcass} from "../AdventureCards/Explore/Carcass";
import {ColdWind} from "../AdventureCards/Explore/ColdWind";
import {DangerousTerrain} from "../AdventureCards/Explore/DangerousTerrain";
import {EmptyForest} from "../AdventureCards/Explore/EmptyForest";
import {Flu} from "../AdventureCards/Explore/Flu";
import {ItWillRain} from "../AdventureCards/Explore/ItWillRain";
import {Lost} from "../AdventureCards/Explore/Lost";
import {LostInTheThicket} from "../AdventureCards/Explore/LostInTheThicket";
import {LostInTheWoods} from "../AdventureCards/Explore/LostInTheWoods";
import {Misadventure} from "../AdventureCards/Explore/Misadventure";
import {OldGrave} from "../AdventureCards/Explore/OldGrave";
import {OldHut} from "../AdventureCards/Explore/OldHut";
import {Puma} from "../AdventureCards/Explore/Puma";
import {RemainsOfASettlement} from "../AdventureCards/Explore/RemainsOfASettlement";
import {RuinedHut} from "../AdventureCards/Explore/RuinedHut";
import {SecretCave} from "../AdventureCards/Explore/SecretCave";
import {Shrine} from "../AdventureCards/Explore/Shrine";
import {SignsOfFire} from "../AdventureCards/Explore/SignsOfFire";
import {StormOnTheHorizon} from "../AdventureCards/Explore/StormOnTheHorizon";
import {SurprisingDiscovery} from "../AdventureCards/Explore/SurprisingDiscovery";
import {Swamp} from "../AdventureCards/Explore/Swamp";
import {TheresSomethingInTheAir} from "../AdventureCards/Explore/TheresSomethingInTheAir";
import {ThornyBush} from "../AdventureCards/Explore/ThornyBush";
import {Tiger} from "../AdventureCards/Explore/Tiger";
import {Vipers} from "../AdventureCards/Explore/Vipers";
import {WildBerries} from "../AdventureCards/Explore/WildBerries";
import {WildDog} from "../AdventureCards/Explore/WildDog";
import {WrongTrack} from "../AdventureCards/Explore/WrongTrack";
import {AdventureCardStacks} from "@shared/types/Game/AdventureService/AdventureService";
import {IAdventureCard} from "@shared/types/Game/AdventureService/AdventureCard";

export class AdventureCardCreator {
    private readonly _game: IGame;

    public implemented = {
        build: [ADVENTURE_CARD_BUILD.ACCIDENT,
            ADVENTURE_CARD_BUILD.BREAKDOWN,
            ADVENTURE_CARD_BUILD.BROKEN_LEVER,
            ADVENTURE_CARD_BUILD.CONSTRUCTION,
            ADVENTURE_CARD_BUILD.CONSTRUCTION_IS_WEAK,
            ADVENTURE_CARD_BUILD.CUT_HEAD,
            ADVENTURE_CARD_BUILD.DANGEROUS_WORK,
            ADVENTURE_CARD_BUILD.DARK_CLOUDS_IN_THE_SKY,
            ADVENTURE_CARD_BUILD.HARD_WORK,
            ADVENTURE_CARD_BUILD.IN_A_HURRY,
            ADVENTURE_CARD_BUILD.LABORIOUS_WORK,
            ADVENTURE_CARD_BUILD.MONKEYS_WATCH_YOU,
            ADVENTURE_CARD_BUILD.NASTY_WOUND,
            ADVENTURE_CARD_BUILD.SAVINGS,
            ADVENTURE_CARD_BUILD.TIRED,
            ADVENTURE_CARD_BUILD.UNMOTIVATED,
            ADVENTURE_CARD_BUILD.WIND_STORM
        ],
        explore: [
            ADVENTURE_CARD_EXPLORE.CARCASS,
            ADVENTURE_CARD_EXPLORE.COLD_WIND,
            ADVENTURE_CARD_EXPLORE.DANGEROUS_TERRAIN,
            ADVENTURE_CARD_EXPLORE.IT_WILL_RAIN,
            ADVENTURE_CARD_EXPLORE.LOST_IN_THE_WOODS,
            ADVENTURE_CARD_EXPLORE.OLD_GRAVE,
            ADVENTURE_CARD_EXPLORE.OLD_HUT,
            ADVENTURE_CARD_EXPLORE.REMAINS_OF_A_SETTLEMENT,
            ADVENTURE_CARD_EXPLORE.SHRINE,
            ADVENTURE_CARD_EXPLORE.STORM_ON_THE_HORIZON,
            ADVENTURE_CARD_EXPLORE.SWAMP,
            ADVENTURE_CARD_EXPLORE.THERES_SOMETHING_IN_THE_AIR,
        ],
        gather: [
            ADVENTURE_CARD_GATHER.AFTER_THE_HURRICANE,
            ADVENTURE_CARD_GATHER.END_OF_SOURCE,
            ADVENTURE_CARD_GATHER.GOLD_COIN,
            ADVENTURE_CARD_GATHER.MUSHROOMS,
            ADVENTURE_CARD_GATHER.NESTLINGS,
            ADVENTURE_CARD_GATHER.NEW_FLOCK,
            ADVENTURE_CARD_GATHER.NICE_SURPRISE,
            ADVENTURE_CARD_GATHER.SHORTAGE,
            ADVENTURE_CARD_GATHER.SIGNS_OF_A_PREDATOR,
            ADVENTURE_CARD_GATHER.TRACKS_OF_A_PREDATOR,
            ADVENTURE_CARD_GATHER.UNBELIEVABLE_EFFORT,
            ADVENTURE_CARD_GATHER.UNEXPECTED_DISCOVERY,
            ADVENTURE_CARD_GATHER.UNEXPECTED_TROUBLES,
            ADVENTURE_CARD_GATHER.VIPER,
            ADVENTURE_CARD_GATHER.WEATHER_BREAKDOWN,
            ADVENTURE_CARD_GATHER.WINTER_FREEZING,
            ADVENTURE_CARD_GATHER.WINTER_IS_COMING,
        ]
    }

    constructor(game: IGame) {
        this._game = game;
    }

    public createAllCards(): AdventureCardStacks {
        return {
            gather: this.createAllGatherCards(),
            explore: this.createAllExploreCards(),
            build: this.createAllBuildCards(),
        };
    }

    public createAllBuildCards(): IAdventureCard[] {
        return Object.values(ADVENTURE_CARD_BUILD).map((card) =>
            this.createBuildCard(card)
        );
    }

    public createAllExploreCards(): IAdventureCard[] {
        return Object.values(ADVENTURE_CARD_EXPLORE).map((card) =>
            this.createExploreCard(card)
        );
    }

    public createAllGatherCards(): IAdventureCard[] {
        return Object.values(ADVENTURE_CARD_GATHER).map((card) =>
            this.createGatherCard(card)
        );
    }

    public createGatherCard(card: ADVENTURE_CARD_GATHER) {
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

    public createBuildCard(card: ADVENTURE_CARD_BUILD) {
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

    public createExploreCard(card: ADVENTURE_CARD_EXPLORE) {
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
            case ADVENTURE_CARD_EXPLORE.LOST_IN_THE_WOODS:
                return new LostInTheWoods(game);
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
