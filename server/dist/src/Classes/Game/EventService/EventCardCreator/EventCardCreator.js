"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventCardCreator = void 0;
const EVENT_CARD_1 = require("@shared/types/Game/EventService/EVENT_CARD");
const SupplyCrates_1 = require("./WreckageCards/SupplyCrates");
const CaptainsChest_1 = require("./WreckageCards/CaptainsChest");
const WreckedLifeboat_1 = require("./WreckageCards/WreckedLifeboat");
const Argument_1 = require("./EventCards/Argument");
const AwfulWeather_1 = require("./EventCards/AwfulWeather");
const BadFeelings_1 = require("./EventCards/BadFeelings");
const Bear_1 = require("./EventCards/Bear");
const BodyOnTheBeach_1 = require("./EventCards/BodyOnTheBeach");
const BrokenTree_1 = require("./EventCards/BrokenTree");
const CallOfTheWild_1 = require("./EventCards/CallOfTheWild");
const Catastrophe_1 = require("./EventCards/Catastrophe");
const ChronicTiredness_1 = require("./EventCards/ChronicTiredness");
const CloudBurst_1 = require("./EventCards/CloudBurst");
const ColdRain_1 = require("./EventCards/ColdRain");
const Council_1 = require("./EventCards/Council");
const CulledArea_1 = require("./EventCards/CulledArea");
const DangerousNight_1 = require("./EventCards/DangerousNight");
const Depression_1 = require("./EventCards/Depression");
const Despondency_1 = require("./EventCards/Despondency");
const Devastation_1 = require("./EventCards/Devastation");
const Disaster_1 = require("./EventCards/Disaster");
const Drought_1 = require("./EventCards/Drought");
const Earthquake_1 = require("./EventCards/Earthquake");
const ExhaustingNight_1 = require("./EventCards/ExhaustingNight");
const Fight_1 = require("./EventCards/Fight");
const FightInTheDark_1 = require("./EventCards/FightInTheDark");
const Fire_1 = require("./EventCards/Fire");
const Flood_1 = require("./EventCards/Flood");
const FoulWeather_1 = require("./EventCards/FoulWeather");
const Frost_1 = require("./EventCards/Frost");
const HeavyClouds_1 = require("./EventCards/HeavyClouds");
const HeavyRain_1 = require("./EventCards/HeavyRain");
const HeavyRainIsComing_1 = require("./EventCards/HeavyRainIsComing");
const HighWater_1 = require("./EventCards/HighWater");
const HowlingFromTheWoods_1 = require("./EventCards/HowlingFromTheWoods");
const Jaguar_1 = require("./EventCards/Jaguar");
const Landslide_1 = require("./EventCards/Landslide");
const LossOfHope_1 = require("./EventCards/LossOfHope");
const MemoriesOfTheCruise_1 = require("./EventCards/MemoriesOfTheCruise");
const MessInTheCamp_1 = require("./EventCards/MessInTheCamp");
const Mist_1 = require("./EventCards/Mist");
const NaturalDamBreaks_1 = require("./EventCards/NaturalDamBreaks");
const NightAttack_1 = require("./EventCards/NightAttack");
const NightHowling_1 = require("./EventCards/NightHowling");
const Otters_1 = require("./EventCards/Otters");
const Poisoning_1 = require("./EventCards/Poisoning");
const Precipice_1 = require("./EventCards/Precipice");
const PredatorInTheVicinity_1 = require("./EventCards/PredatorInTheVicinity");
const PredatorIsNear_1 = require("./EventCards/PredatorIsNear");
const Predators_1 = require("./EventCards/Predators");
const PredatorsInTheWoods_1 = require("./EventCards/PredatorsInTheWoods");
const RagingRiver_1 = require("./EventCards/RagingRiver");
const Rain_1 = require("./EventCards/Rain");
const RavenousPredators_1 = require("./EventCards/RavenousPredators");
const RavishingHurricane_1 = require("./EventCards/RavishingHurricane");
const RavishingWindstorm_1 = require("./EventCards/RavishingWindstorm");
const RoughPassage_1 = require("./EventCards/RoughPassage");
const SearchingForANewPath_1 = require("./EventCards/SearchingForANewPath");
const SleeplessNight_1 = require("./EventCards/SleeplessNight");
const SlowWork_1 = require("./EventCards/SlowWork");
const SmokeOnTheHorizon_1 = require("./EventCards/SmokeOnTheHorizon");
const Storm_1 = require("./EventCards/Storm");
const StormDamage_1 = require("./EventCards/StormDamage");
const StrokeOfFate_1 = require("./EventCards/StrokeOfFate");
const StrongWind_1 = require("./EventCards/StrongWind");
const Termites_1 = require("./EventCards/Termites");
const TheIslandFightsBack_1 = require("./EventCards/TheIslandFightsBack");
const Thunderstorm_1 = require("./EventCards/Thunderstorm");
const UnusuallyColdNight_1 = require("./EventCards/UnusuallyColdNight");
const Vertigo_1 = require("./EventCards/Vertigo");
const Weakness_1 = require("./EventCards/Weakness");
const WinterDepression_1 = require("./EventCards/WinterDepression");
const WreckedBalloon_1 = require("./EventCards/WreckedBalloon");
const FlyingSurprise_1 = require("./EventCards/FlyingSurprise");
class EventCardCreator {
    constructor(game) {
        this.implemented = [
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
        ];
        this._game = game;
    }
    create(eventCard) {
        const game = this._game;
        switch (eventCard) {
            case EVENT_CARD_1.WRECKAGE_CARD.CAPTAINS_CHEST:
                return new CaptainsChest_1.CaptainsChest(game);
            case EVENT_CARD_1.WRECKAGE_CARD.SUPPLY_CRATES:
                return new SupplyCrates_1.SupplyCrates(game);
            case EVENT_CARD_1.WRECKAGE_CARD.WRECKED_LIFEBOAT:
                return new WreckedLifeboat_1.WreckedLifeboat(game);
            case EVENT_CARD_1.EVENT_CARD.ARGUMENT:
                return new Argument_1.Argument(game);
            case EVENT_CARD_1.EVENT_CARD.AWFUL_WEATHER: //+
                return new AwfulWeather_1.AwfulWeather(game);
            case EVENT_CARD_1.EVENT_CARD.BAD_FEELINGS: //-
                return new BadFeelings_1.BadFeelings(game);
            case EVENT_CARD_1.EVENT_CARD.BEAR:
                return new Bear_1.Bear(game);
            case EVENT_CARD_1.EVENT_CARD.BODY_ON_THE_BEACH:
                return new BodyOnTheBeach_1.BodyOnTheBeach(game);
            case EVENT_CARD_1.EVENT_CARD.BROKEN_TREE:
                return new BrokenTree_1.BrokenTree(game);
            case EVENT_CARD_1.EVENT_CARD.CALL_OF_THE_WILD:
                return new CallOfTheWild_1.CallOfTheWild(game);
            case EVENT_CARD_1.EVENT_CARD.CATASTROPHE:
                return new Catastrophe_1.Catastrophe(game);
            case EVENT_CARD_1.EVENT_CARD.CHRONIC_TIREDNESS:
                return new ChronicTiredness_1.ChronicTiredness(game);
            case EVENT_CARD_1.EVENT_CARD.CLOUDBURST:
                return new CloudBurst_1.CloudBurst(game);
            case EVENT_CARD_1.EVENT_CARD.COLD_RAIN:
                return new ColdRain_1.ColdRain(game);
            case EVENT_CARD_1.EVENT_CARD.COUNCIL:
                return new Council_1.Council(game);
            case EVENT_CARD_1.EVENT_CARD.CULLED_AREA:
                return new CulledArea_1.CulledArea(game);
            case EVENT_CARD_1.EVENT_CARD.DANGEROUS_NIGHT:
                return new DangerousNight_1.DangerousNight(game);
            case EVENT_CARD_1.EVENT_CARD.DEPRESSION:
                return new Depression_1.Depression(game);
            case EVENT_CARD_1.EVENT_CARD.DESPONDENCY:
                return new Despondency_1.Despondency(game);
            case EVENT_CARD_1.EVENT_CARD.DEVASTATION:
                return new Devastation_1.Devastation(game);
            case EVENT_CARD_1.EVENT_CARD.DISASTER:
                return new Disaster_1.Disaster(game);
            case EVENT_CARD_1.EVENT_CARD.DROUGHT:
                return new Drought_1.Drought(game);
            case EVENT_CARD_1.EVENT_CARD.EARTHQUAKE:
                return new Earthquake_1.Earthquake(game);
            case EVENT_CARD_1.EVENT_CARD.EXHAUSTING_NIGHT:
                return new ExhaustingNight_1.ExhaustingNight(game);
            case EVENT_CARD_1.EVENT_CARD.FIGHT:
                return new Fight_1.Fight(game);
            case EVENT_CARD_1.EVENT_CARD.FIGHT_IN_THE_DARK:
                return new FightInTheDark_1.FightInTheDark(game);
            case EVENT_CARD_1.EVENT_CARD.FIRE:
                return new Fire_1.Fire(game);
            case EVENT_CARD_1.EVENT_CARD.FLOOD:
                return new Flood_1.Flood(game);
            case EVENT_CARD_1.EVENT_CARD.FLYING_SURPRISE:
                return new FlyingSurprise_1.FlyingSurprise(game);
            case EVENT_CARD_1.EVENT_CARD.FOUL_WEATHER:
                return new FoulWeather_1.FoulWeather(game);
            case EVENT_CARD_1.EVENT_CARD.FROST:
                return new Frost_1.Frost(game);
            case EVENT_CARD_1.EVENT_CARD.HEAVY_CLOUDS:
                return new HeavyClouds_1.HeavyClouds(game);
            case EVENT_CARD_1.EVENT_CARD.HEAVY_RAIN:
                return new HeavyRain_1.HeavyRain(game);
            case EVENT_CARD_1.EVENT_CARD.HEAVY_RAIN_IS_COMING:
                return new HeavyRainIsComing_1.HeavyRainIsComing(game);
            case EVENT_CARD_1.EVENT_CARD.HIGH_WATER:
                return new HighWater_1.HighWater(game);
            case EVENT_CARD_1.EVENT_CARD.HOWLING_FROM_THE_WOODS:
                return new HowlingFromTheWoods_1.HowlingFromTheWoods(game);
            case EVENT_CARD_1.EVENT_CARD.JAGUAR:
                return new Jaguar_1.Jaguar(game);
            case EVENT_CARD_1.EVENT_CARD.LANDSLIDE:
                return new Landslide_1.Landslide(game);
            case EVENT_CARD_1.EVENT_CARD.LOSS_OF_HOPE:
                return new LossOfHope_1.LossOfHope(game);
            case EVENT_CARD_1.EVENT_CARD.MEMORIES_OF_THE_CRUISE:
                return new MemoriesOfTheCruise_1.MemoriesOfTheCruise(game);
            case EVENT_CARD_1.EVENT_CARD.MESS_IN_THE_CAMP:
                return new MessInTheCamp_1.MessInTheCamp(game);
            case EVENT_CARD_1.EVENT_CARD.MIST:
                return new Mist_1.Mist(game);
            case EVENT_CARD_1.EVENT_CARD.NATURAL_DAM_BREAKS:
                return new NaturalDamBreaks_1.NaturalDamBreaks(game);
            case EVENT_CARD_1.EVENT_CARD.NIGHT_ATTACK:
                return new NightAttack_1.NightAttack(game);
            case EVENT_CARD_1.EVENT_CARD.NIGHT_HOWLING:
                return new NightHowling_1.NightHowling(game);
            case EVENT_CARD_1.EVENT_CARD.OTTERS:
                return new Otters_1.Otters(game);
            case EVENT_CARD_1.EVENT_CARD.POISONING:
                return new Poisoning_1.Poisoning(game);
            case EVENT_CARD_1.EVENT_CARD.PRECIPICE:
                return new Precipice_1.Precipice(game);
            case EVENT_CARD_1.EVENT_CARD.PREDATOR_IN_THE_VICINITY:
                return new PredatorInTheVicinity_1.PredatorInTheVicinity(game);
            case EVENT_CARD_1.EVENT_CARD.PREDATOR_IS_NEAR:
                return new PredatorIsNear_1.PredatorIsNear(game);
            case EVENT_CARD_1.EVENT_CARD.PREDATORS:
                return new Predators_1.Predators(game);
            case EVENT_CARD_1.EVENT_CARD.PREDATORS_IN_THE_WOODS:
                return new PredatorsInTheWoods_1.PredatorsInTheWoods(game);
            case EVENT_CARD_1.EVENT_CARD.RAGING_RIVER:
                return new RagingRiver_1.RagingRiver(game);
            case EVENT_CARD_1.EVENT_CARD.RAIN:
                return new Rain_1.Rain(game);
            case EVENT_CARD_1.EVENT_CARD.RAVENOUS_PREDATORS:
                return new RavenousPredators_1.RavenousPredators(game);
            case EVENT_CARD_1.EVENT_CARD.RAVISHING_HURRICANE:
                return new RavishingHurricane_1.RavishingHurricane(game);
            case EVENT_CARD_1.EVENT_CARD.RAVISHING_WINDSTORM:
                return new RavishingWindstorm_1.RavishingWindstorm(game);
            case EVENT_CARD_1.EVENT_CARD.ROUGH_PASSAGE:
                return new RoughPassage_1.RoughPassage(game);
            case EVENT_CARD_1.EVENT_CARD.SEARCHING_FOR_A_NEW_PATH:
                return new SearchingForANewPath_1.SearchingForANewPath(game);
            case EVENT_CARD_1.EVENT_CARD.SLEEPLESS_NIGHT:
                return new SleeplessNight_1.SleeplessNight(game);
            case EVENT_CARD_1.EVENT_CARD.SLOW_WORK:
                return new SlowWork_1.SlowWork(game);
            case EVENT_CARD_1.EVENT_CARD.SMOKE_ON_THE_HORIZON:
                return new SmokeOnTheHorizon_1.SmokeOnTheHorizon(game);
            case EVENT_CARD_1.EVENT_CARD.STORM:
                return new Storm_1.Storm(game);
            case EVENT_CARD_1.EVENT_CARD.STORM_DAMAGE:
                return new StormDamage_1.StormDamage(game);
            case EVENT_CARD_1.EVENT_CARD.STROKE_OF_FATE:
                return new StrokeOfFate_1.StrokeOfFate(game);
            case EVENT_CARD_1.EVENT_CARD.STRONG_WIND:
                return new StrongWind_1.StrongWind(game);
            case EVENT_CARD_1.EVENT_CARD.TERMITES:
                return new Termites_1.Termites(game);
            case EVENT_CARD_1.EVENT_CARD.THE_ISLAND_FIGHTS_BACK:
                return new TheIslandFightsBack_1.TheIslandFightsBack(game);
            case EVENT_CARD_1.EVENT_CARD.THUNDERSTORM:
                return new Thunderstorm_1.Thunderstorm(game);
            case EVENT_CARD_1.EVENT_CARD.UNUSUALLY_COLD_NIGHT:
                return new UnusuallyColdNight_1.UnusuallyColdNight(game);
            case EVENT_CARD_1.EVENT_CARD.VERTIGO:
                return new Vertigo_1.Vertigo(game);
            case EVENT_CARD_1.EVENT_CARD.WEAKNESS:
                return new Weakness_1.Weakness(game);
            case EVENT_CARD_1.EVENT_CARD.WINTER_DEPRESSION:
                return new WinterDepression_1.WinterDepression(game);
            case EVENT_CARD_1.EVENT_CARD.WRECKED_BALLOON:
                return new WreckedBalloon_1.WreckedBalloon(game);
        }
    }
}
exports.EventCardCreator = EventCardCreator;
//# sourceMappingURL=EventCardCreator.js.map