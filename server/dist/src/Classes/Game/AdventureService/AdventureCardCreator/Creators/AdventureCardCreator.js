"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdventureCardCreator = void 0;
const ADVENTURE_CARD_1 = require("../../../../../shared/types/Game/AdventureService/ADVENTURE_CARD");
const AfterTheHurricane_1 = require("../AdventureCards/Gather/AfterTheHurricane");
const EndOfSource_1 = require("../AdventureCards/Gather/EndOfSource");
const EyesInTheBushes_1 = require("../AdventureCards/Gather/EyesInTheBushes");
const Fruit_1 = require("../AdventureCards/Gather/Fruit");
const Furs_1 = require("../AdventureCards/Gather/Furs");
const GoldCoin_1 = require("../AdventureCards/Gather/GoldCoin");
const Mushrooms_1 = require("../AdventureCards/Gather/Mushrooms");
const Nestlings_1 = require("../AdventureCards/Gather/Nestlings");
const NewFlock_1 = require("../AdventureCards/Gather/NewFlock");
const NiceSurprise_1 = require("../AdventureCards/Gather/NiceSurprise");
const PathOfAPredator_1 = require("../AdventureCards/Gather/PathOfAPredator");
const PiratesChest_1 = require("../AdventureCards/Gather/PiratesChest");
const Shortage_1 = require("../AdventureCards/Gather/Shortage");
const SignsOfAPredator_1 = require("../AdventureCards/Gather/SignsOfAPredator");
const Skeleton_1 = require("../AdventureCards/Gather/Skeleton");
const Spider_1 = require("../AdventureCards/Gather/Spider");
const SurpriseInTheBushes_1 = require("../AdventureCards/Gather/SurpriseInTheBushes");
const TracksOfAPredator_1 = require("../AdventureCards/Gather/TracksOfAPredator");
const TwistedAnkle_1 = require("../AdventureCards/Gather/TwistedAnkle");
const UnbelievableEffort_1 = require("../AdventureCards/Gather/UnbelievableEffort");
const UnexpectedDiscovery_1 = require("../AdventureCards/Gather/UnexpectedDiscovery");
const UnexpectedTroubles_1 = require("../AdventureCards/Gather/UnexpectedTroubles");
const Viper_1 = require("../AdventureCards/Gather/Viper");
const WeatherBreakdown_1 = require("../AdventureCards/Gather/WeatherBreakdown");
const WinterFreezing_1 = require("../AdventureCards/Gather/WinterFreezing");
const WinterIsComing_1 = require("../AdventureCards/Gather/WinterIsComing");
const Accident_1 = require("../AdventureCards/Build/Accident");
const Breakdown_1 = require("../AdventureCards/Build/Breakdown");
const BrokenLever_1 = require("../AdventureCards/Build/BrokenLever");
const ComingToTerms_1 = require("../AdventureCards/Build/ComingToTerms");
const Construction_1 = require("../AdventureCards/Build/Construction");
const ConstructionIsWeak_1 = require("../AdventureCards/Build/ConstructionIsWeak");
const CutHead_1 = require("../AdventureCards/Build/CutHead");
const DangerousWork_1 = require("../AdventureCards/Build/DangerousWork");
const DarkCloudsInTheSky_1 = require("../AdventureCards/Build/DarkCloudsInTheSky");
const FastWork_1 = require("../AdventureCards/Build/FastWork");
const FearOfTheBeasts_1 = require("../AdventureCards/Build/FearOfTheBeasts");
const HardWork_1 = require("../AdventureCards/Build/HardWork");
const HowlingInTheBushes_1 = require("../AdventureCards/Build/HowlingInTheBushes");
const HungryPredator_1 = require("../AdventureCards/Build/HungryPredator");
const InAHurry_1 = require("../AdventureCards/Build/InAHurry");
const LaboriousWork_1 = require("../AdventureCards/Build/LaboriousWork");
const LackOfHope_1 = require("../AdventureCards/Build/LackOfHope");
const MonkeysWatchYou_1 = require("../AdventureCards/Build/MonkeysWatchYou");
const NastyWound_1 = require("../AdventureCards/Build/NastyWound");
const PredatorInTheCamp_1 = require("../AdventureCards/Build/PredatorInTheCamp");
const Savings_1 = require("../AdventureCards/Build/Savings");
const Sting_1 = require("../AdventureCards/Build/Sting");
const Tired_1 = require("../AdventureCards/Build/Tired");
const ToolsBreak_1 = require("../AdventureCards/Build/ToolsBreak");
const ToolsInspection_1 = require("../AdventureCards/Build/ToolsInspection");
const Unmotivated_1 = require("../AdventureCards/Build/Unmotivated");
const VisitOfAPredator_1 = require("../AdventureCards/Build/VisitOfAPredator");
const WindStorm_1 = require("../AdventureCards/Build/WindStorm");
const YouNeedABiggerCamp_1 = require("../AdventureCards/Build/YouNeedABiggerCamp");
const Bamboo_1 = require("../AdventureCards/Explore/Bamboo");
const Carcass_1 = require("../AdventureCards/Explore/Carcass");
const ColdWind_1 = require("../AdventureCards/Explore/ColdWind");
const DangerousTerrain_1 = require("../AdventureCards/Explore/DangerousTerrain");
const EmptyForest_1 = require("../AdventureCards/Explore/EmptyForest");
const Flu_1 = require("../AdventureCards/Explore/Flu");
const ItWillRain_1 = require("../AdventureCards/Explore/ItWillRain");
const Lost_1 = require("../AdventureCards/Explore/Lost");
const LostInTheThicket_1 = require("../AdventureCards/Explore/LostInTheThicket");
const LostInTheWoods_1 = require("../AdventureCards/Explore/LostInTheWoods");
const Misadventure_1 = require("../AdventureCards/Explore/Misadventure");
const OldGrave_1 = require("../AdventureCards/Explore/OldGrave");
const OldHut_1 = require("../AdventureCards/Explore/OldHut");
const Puma_1 = require("../AdventureCards/Explore/Puma");
const RemainsOfASettlement_1 = require("../AdventureCards/Explore/RemainsOfASettlement");
const RuinedHut_1 = require("../AdventureCards/Explore/RuinedHut");
const SecretCave_1 = require("../AdventureCards/Explore/SecretCave");
const Shrine_1 = require("../AdventureCards/Explore/Shrine");
const SignsOfFire_1 = require("../AdventureCards/Explore/SignsOfFire");
const StormOnTheHorizon_1 = require("../AdventureCards/Explore/StormOnTheHorizon");
const SurprisingDiscovery_1 = require("../AdventureCards/Explore/SurprisingDiscovery");
const Swamp_1 = require("../AdventureCards/Explore/Swamp");
const TheresSomethingInTheAir_1 = require("../AdventureCards/Explore/TheresSomethingInTheAir");
const ThornyBush_1 = require("../AdventureCards/Explore/ThornyBush");
const Tiger_1 = require("../AdventureCards/Explore/Tiger");
const Vipers_1 = require("../AdventureCards/Explore/Vipers");
const WildBerries_1 = require("../AdventureCards/Explore/WildBerries");
const WildDog_1 = require("../AdventureCards/Explore/WildDog");
const WrongTrack_1 = require("../AdventureCards/Explore/WrongTrack");
class AdventureCardCreator {
    constructor(game) {
        this.implemented = {
            build: [ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.ACCIDENT,
                ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.BREAKDOWN,
                ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.BROKEN_LEVER,
                ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.CONSTRUCTION,
                ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.CONSTRUCTION_IS_WEAK,
                ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.CUT_HEAD,
                ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.DANGEROUS_WORK,
                ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.DARK_CLOUDS_IN_THE_SKY,
                ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.HARD_WORK,
                ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.IN_A_HURRY,
                ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.LABORIOUS_WORK,
                ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.MONKEYS_WATCH_YOU,
                ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.NASTY_WOUND,
                ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.SAVINGS,
                ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.TIRED,
                ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.UNMOTIVATED,
                ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.WIND_STORM
            ],
            explore: [
                ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.CARCASS,
                ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.COLD_WIND,
                ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.DANGEROUS_TERRAIN,
                ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.IT_WILL_RAIN,
                ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.LOST_IN_THE_WOODS,
                ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.OLD_GRAVE,
                ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.OLD_HUT,
                ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.REMAINS_OF_A_SETTLEMENT,
                ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.SHRINE,
                ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.STORM_ON_THE_HORIZON,
                ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.SWAMP,
                ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.THERES_SOMETHING_IN_THE_AIR,
            ],
            gather: [
                ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.AFTER_THE_HURRICANE,
                ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.END_OF_SOURCE,
                ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.GOLD_COIN,
                ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.MUSHROOMS,
                ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.NESTLINGS,
                ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.NEW_FLOCK,
                ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.NICE_SURPRISE,
                ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.SHORTAGE,
                ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.SIGNS_OF_A_PREDATOR,
                ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.TRACKS_OF_A_PREDATOR,
                ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.UNBELIEVABLE_EFFORT,
                ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.UNEXPECTED_DISCOVERY,
                ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.UNEXPECTED_TROUBLES,
                ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.VIPER,
                ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.WEATHER_BREAKDOWN,
                ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.WINTER_FREEZING,
                ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.WINTER_IS_COMING,
            ]
        };
        this._game = game;
    }
    createAllCards() {
        return {
            gather: this.createAllGatherCards(),
            explore: this.createAllExploreCards(),
            build: this.createAllBuildCards(),
        };
    }
    createAllBuildCards() {
        return Object.values(ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD).map((card) => this.createBuildCard(card));
    }
    createAllExploreCards() {
        return Object.values(ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE).map((card) => this.createExploreCard(card));
    }
    createAllGatherCards() {
        return Object.values(ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER).map((card) => this.createGatherCard(card));
    }
    createGatherCard(card) {
        const game = this._game;
        switch (card) {
            case ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.AFTER_THE_HURRICANE:
                return new AfterTheHurricane_1.AfterTheHurricane(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.END_OF_SOURCE:
                return new EndOfSource_1.EndOfSource(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.EYES_IN_THE_BUSHES:
                return new EyesInTheBushes_1.EyesInTheBushes(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.FRUIT:
                return new Fruit_1.Fruit(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.FURS:
                return new Furs_1.Furs(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.GOLD_COIN:
                return new GoldCoin_1.GoldCoin(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.MUSHROOMS:
                return new Mushrooms_1.Mushrooms(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.NESTLINGS:
                return new Nestlings_1.Nestlings(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.NEW_FLOCK:
                return new NewFlock_1.NewFlock(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.NICE_SURPRISE:
                return new NiceSurprise_1.NiceSurprise(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.PATH_OF_A_PREDATOR:
                return new PathOfAPredator_1.PathOfAPredator(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.PIRATES_CHEST:
                return new PiratesChest_1.PiratesChest(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.SHORTAGE:
                return new Shortage_1.Shortage(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.SIGNS_OF_A_PREDATOR:
                return new SignsOfAPredator_1.SignsOfAPredator(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.SKELETON:
                return new Skeleton_1.Skeleton(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.SPIDER:
                return new Spider_1.Spider(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.SURPRISE_IN_THE_BUSHES:
                return new SurpriseInTheBushes_1.SurpriseInTheBushes(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.TRACKS_OF_A_PREDATOR:
                return new TracksOfAPredator_1.TracksOfAPredator(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.TWISTED_ANKLE:
                return new TwistedAnkle_1.TwistedAnkle(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.UNBELIEVABLE_EFFORT:
                return new UnbelievableEffort_1.UnbelievableEffort(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.UNEXPECTED_DISCOVERY:
                return new UnexpectedDiscovery_1.UnexpectedDiscovery(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.UNEXPECTED_TROUBLES:
                return new UnexpectedTroubles_1.UnexpectedTroubles(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.VIPER:
                return new Viper_1.Viper(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.WEATHER_BREAKDOWN:
                return new WeatherBreakdown_1.WeatherBreakdown(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.WINTER_FREEZING:
                return new WinterFreezing_1.WinterFreezing(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.WINTER_IS_COMING:
                return new WinterIsComing_1.WinterIsComing(game);
        }
    }
    createBuildCard(card) {
        const game = this._game;
        switch (card) {
            case ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.ACCIDENT:
                return new Accident_1.Accident(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.BREAKDOWN:
                return new Breakdown_1.Breakdown(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.BROKEN_LEVER:
                return new BrokenLever_1.BrokenLever(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.COMING_TO_TERMS:
                return new ComingToTerms_1.ComingToTerms(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.CONSTRUCTION:
                return new Construction_1.Construction(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.CONSTRUCTION_IS_WEAK:
                return new ConstructionIsWeak_1.ConstructionIsWeak(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.CUT_HEAD:
                return new CutHead_1.CutHead(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.DANGEROUS_WORK:
                return new DangerousWork_1.DangerousWork(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.DARK_CLOUDS_IN_THE_SKY:
                return new DarkCloudsInTheSky_1.DarkCloudsInTheSky(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.FAST_WORK:
                return new FastWork_1.FastWork(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.FEAR_OF_THE_BEASTS:
                return new FearOfTheBeasts_1.FearOfTheBeasts(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.HARD_WORK:
                return new HardWork_1.HardWork(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.HOWLING_IN_THE_BUSHES:
                return new HowlingInTheBushes_1.HowlingInTheBushes(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.HUNGRY_PREDATOR:
                return new HungryPredator_1.HungryPredator(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.IN_A_HURRY:
                return new InAHurry_1.InAHurry(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.LABORIOUS_WORK:
                return new LaboriousWork_1.LaboriousWork(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.LACK_OF_HOPE:
                return new LackOfHope_1.LackOfHope(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.MONKEYS_WATCH_YOU:
                return new MonkeysWatchYou_1.MonkeysWatchYou(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.NASTY_WOUND:
                return new NastyWound_1.NastyWound(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.PREDATOR_IN_THE_CAMP:
                return new PredatorInTheCamp_1.PredatorInTheCamp(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.SAVINGS:
                return new Savings_1.Savings(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.STING:
                return new Sting_1.Sting(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.TIRED:
                return new Tired_1.Tired(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.TOOLS_BREAK:
                return new ToolsBreak_1.ToolsBreak(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.TOOLS_INSPECTION:
                return new ToolsInspection_1.ToolsInspection(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.UNMOTIVATED:
                return new Unmotivated_1.Unmotivated(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.VISIT_OF_A_PREDATOR:
                return new VisitOfAPredator_1.VisitOfAPredator(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.WIND_STORM:
                return new WindStorm_1.WindStorm(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.YOU_NEED_A_BIGGER_CAMP:
                return new YouNeedABiggerCamp_1.YouNeedABiggerCamp(game);
        }
    }
    createExploreCard(card) {
        const game = this._game;
        switch (card) {
            case ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.BAMBOO:
                return new Bamboo_1.Bamboo(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.CARCASS:
                return new Carcass_1.Carcass(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.COLD_WIND:
                return new ColdWind_1.ColdWind(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.DANGEROUS_TERRAIN:
                return new DangerousTerrain_1.DangerousTerrain(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.EMPTY_FOREST:
                return new EmptyForest_1.EmptyForest(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.FLU:
                return new Flu_1.Flu(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.IT_WILL_RAIN:
                return new ItWillRain_1.ItWillRain(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.LOST:
                return new Lost_1.Lost(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.LOST_IN_THE_THICKET:
                return new LostInTheThicket_1.LostInTheThicket(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.LOST_IN_THE_WOODS:
                return new LostInTheWoods_1.LostInTheWoods(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.MISADVENTURE:
                return new Misadventure_1.Misadventure(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.OLD_GRAVE:
                return new OldGrave_1.OldGrave(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.OLD_HUT:
                return new OldHut_1.OldHut(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.PUMA:
                return new Puma_1.Puma(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.REMAINS_OF_A_SETTLEMENT:
                return new RemainsOfASettlement_1.RemainsOfASettlement(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.RUINED_HUT:
                return new RuinedHut_1.RuinedHut(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.SECRET_CAVE:
                return new SecretCave_1.SecretCave(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.SHRINE:
                return new Shrine_1.Shrine(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.SIGNS_OF_FIRE:
                return new SignsOfFire_1.SignsOfFire(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.STORM_ON_THE_HORIZON:
                return new StormOnTheHorizon_1.StormOnTheHorizon(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.SURPRISING_DISCOVERY:
                return new SurprisingDiscovery_1.SurprisingDiscovery(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.SWAMP:
                return new Swamp_1.Swamp(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.THERES_SOMETHING_IN_THE_AIR:
                return new TheresSomethingInTheAir_1.TheresSomethingInTheAir(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.THORNY_BUSH:
                return new ThornyBush_1.ThornyBush(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.TIGER:
                return new Tiger_1.Tiger(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.VIPERS:
                return new Vipers_1.Vipers(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.WILD_BERRIES:
                return new WildBerries_1.WildBerries(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.WILD_DOG:
                return new WildDog_1.WildDog(game);
            case ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.WRONG_TRACK:
                return new WrongTrack_1.WrongTrack(game);
        }
    }
}
exports.AdventureCardCreator = AdventureCardCreator;
//# sourceMappingURL=AdventureCardCreator.js.map