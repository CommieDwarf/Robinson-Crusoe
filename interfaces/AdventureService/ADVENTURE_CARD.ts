import {dupa} from "./test";


console.log(dupa);

export enum ADVENTURE_CARD_EXPLORE {
    BAMBOO = "bamboo",
    CARCASS = "carcass",
    COLD_WIND = "cold wind",
    DANGEROUS_TERRAIN = "dangerous terrain",
    EMPTY_FOREST = "empty forest",
    FLU = "flu",
    IT_WILL_RAIN = "it will rain",
    LOST = "lost",
    LOST_IN_THE_THICKET = "lost in the thicket",
    LOST_IN_THE_WOODS = "lost in the woods",
    MISADVENTURE = "misadventure",
    OLD_GRAVE = "old grave",
    OLD_HUT = "old hut",
    PUMA = "puma",
    REMAINS_OF_A_SETTLEMENT = "remains of a settlement",
    RUINED_HUT = "ruined hut",
    SECRET_CAVE = "secret cave",
    SHRINE = "shrine",
    SIGNS_OF_FIRE = "signs of fire",
    STORM_ON_THE_HORIZON = "storm on the horizon",
    SURPRISING_DISCOVERY = "surprising discovery",
    SWAMP = "swamp",
    THERES_SOMETHING_IN_THE_AIR = "there's something in the air",
    THORNY_BUSH = "thorny bush",
    TIGER = "tiger",
    VIPERS = "vipers",
    WILD_BERRIES = "wild berries",
    WILD_DOG = "wild dog",
    WRONG_TRACK = "wrong track",
}

export enum ADVENTURE_CARD_BUILD {
    ACCIDENT = "accident",
    BREAKDOWN = "breakdown",
    BROKEN_LEVER = "broken lever",
    COMING_TO_TERMS = "coming to terms",
    CONSTRUCTION = "construction",
    CONSTRUCTION_IS_WEAK = "construction is weak",
    CUT_HEAD = "cut head",
    DANGEROUS_WORK = "dangerous work",
    DARK_CLOUDS_IN_THE_SKY = "dark clouds in the sky",
    FAST_WORK = "fast work",
    FEAR_OF_THE_BEASTS = "fear of the beasts",
    HARD_WORK = "hard work",
    HOWLING_IN_THE_BUSHES = "howling in the bushes",
    HUNGRY_PREDATOR = "hungry predator",
    IN_A_HURRY = "in a hurry",
    LABORIOUS_WORK = "laborious work",
    LACK_OF_HOPE = "lack of hope",
    MONKEYS_WATCH_YOU = "monkeys watch you",
    NASTY_WOUND = "nasty wound",
    PREDATOR_IN_THE_CAMP = "predator in the camp",
    SAVINGS = "savings",
    STING = "string",
    TIRED = "tired",
    TOOLS_BREAK = "tools break",
    TOOLS_INSPECTION = "tools inspection",
    UNMOTIVATED = "unmotivated",
    VISIT_OF_A_PREDATOR = "visit of a predator",
    WIND_STORM = "wind storm",
    YOU_NEED_A_BIGGER_CAMP = "you need a bigger camp",
}

export enum ADVENTURE_CARD_GATHER {
    AFTER_THE_HURRICANE = "after the hurricane",
    END_OF_SOURCE = "end of source",
    EYES_IN_THE_BUSHES = "eyes in the bushes",
    FRUIT = "fruit",
    FURS = "furs",
    GOLD_COIN = "gold coin",
    MUSHROOMS = "mushrooms",
    NESTLINGS = "nestlings",
    NEW_FLOCK = "new flock",
    NICE_SURPRISE = "nice surprise",
    PATH_OF_A_PREDATOR = "path of a predator",
    PIRATES_CHEST = "pirate's chest",
    SHORTAGE = "shortage",
    SIGNS_OF_A_PREDATOR = "signs of a predator",
    SKELETON = "skeleton",
    SPIDER = "spider",
    SURPRISE_IN_THE_BUSHES = "surprise in the bushes",
    TRACKS_OF_A_PREDATOR = "tracks of a predator",
    TWISTED_ANKLE = "twisted ankle",
    UNBELIEVABLE_EFFORT = "unbelievable effort",
    UNEXPECTED_DISCOVERY = "unexpected discovery",
    UNEXPECTED_TROUBLES = "unexpected troubles",
    VIPER = "viper",
    WEATHER_BREAKDOWN = "weather breakdown",
    WINTER_FREEZING = "winter freezing",
    WINTER_IS_COMING = "winter is coming",
}

export type ADVENTURE_CARD =
    | ADVENTURE_CARD_BUILD
    | ADVENTURE_CARD_GATHER
    | ADVENTURE_CARD_EXPLORE;


