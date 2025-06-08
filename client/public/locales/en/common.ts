// import { LOG_CODE } from "@shared/types/Game/ChatLog/LOG_CODE";
// import {
//   ADVENTURE_CARD_BUILD,
//   ADVENTURE_CARD_EXPLORE,
//   ADVENTURE_CARD_GATHER,
// } from "@shared/types/Game/AdventureService/ADVENTURE_CARD";
// import {
//   CREATURE_MYSTERY_CARD,
//   TRAP_MYSTERY_CARD,
//   TREASURE_MYSTERY_CARD,
// } from "@shared/types/Game/MysteryService/MYSTERY_CARD";
// import { ITEM } from "@shared/types/Game/Equipment/Item";
// import { ABILITY } from "@shared/types/Game/Skill/ABILITY";
// import { ALERT_CODE } from "@shared/types/ALERT_CODE";
// import { SESSION_CONNECTION_ERROR_CODE } from "@shared/types/Errors/SESSION_CONNECTION_ERROR_CODE";
// import { INVENTION_PERSONAL } from "@shared/types/Game/InventionService/Invention";
// import { DISCOVERY_TOKEN } from "@shared/types/Game/TokenService/Token";
// import { SCENARIO } from "@shared/types/Game/ScenarioService/SCENARIO";
// import { PAWN_HELPER_ACTION } from "@shared/types/Game/Pawns/Pawn";
// import { SYSTEM_MSG } from "@shared/types/ChatService/ChatService";
// import { WRECKAGE_CARD } from "@shared/types/Game/EventService/EVENT_CARD";
// import { UI_TOUR_STEP_ID } from "../../../types/UITour/UI_TOUR_STEP_ID";
// import { GUIDE_CONTENT } from "../../../components/Game/UI/Guide/Contents/Contents";
// import { PHASE } from "@shared/types/Game/PhaseService/Phase";
// import { ACTION } from "@shared/types/Game/ACTION";
//
// export const en = {
//   character: {
//     cook: "Cook",
//     explorer: "Explorer",
//     carpenter: "Carpenter",
//     soldier: "Soldier",
//     friday: "Friday",
//     dog: "Dog",
//   },
//   scenario: {
//     castaways: {
//       name: "castaways",
//       description: `You are castaways on a deserted island. It’s the end of summer, and
//           you must prepare for the coming winter — build a shelter, a roof, and a palisade.
//           It will be hard to survive the difficult months of autumn and winter ahead. You
//           will also need a pile of wood that you can set on fire, hoping that some ship
//           passing on the horizon will notice you.`,
//       objective: `To win, players must create the Fire item and build the wood pile
//           shown on the scenario card. If these conditions are met in the 10th, 11th, 12th
//           round, the players win.`,
//       mechanics: `The pile consists of 15 wood tokens. Players can place wood on the
//           pile before the Action phase. In one round, any amount of wood can be placed on
//           the pile, but no more than one building stage of the pile can be completed. (At
//           first, 1 wood token, then a maximum of 2 tokens, and so on.) Wood placed on the
//           pile cannot be taken back from it.`,
//       winNarrative: `Despite numerous hardships and difficult conditions on the island,
//           you managed to survive. A passing ship spotted your burning woodpile and came to
//           rescue you..`,
//       defeatNarrative_missedObjective: `Unfortunately, you failed to build and light the
//           woodpile in time. Despite your desperate cries, the passing ship did not notice
//           you. It seems you are stuck here forever.`,
//       defeatNarrative_death: `The conditions on the island proved too dangerous. Your
//           efforts to survive were insufficient. Player {{player}} has breathed their last.
//           You will remain forever in the shadow of this cursed island.`,
//       putOnPileButton: `Put on pile`,
//       woodPile: "wood pile",
//     },
//   },
//   ability: {
//     [ABILITY.GRANDMAS_RECIPE]: {
//       name: "Grandma's Recipe",
//       description: `Discard 2 $determination$ to heal 2 $heart$ by discarding 1$food$.`,
//       comment: "After my grandma's soup, you'll definitely feel better.",
//     },
//     [ABILITY.HOOCH]: {
//       name: "Hooch",
//       description: `Discard 3 $determination$ to remove 1 $rain-cloud$ or convert 1
//           $snow-cloud$ into 1 $rain-cloud$.`,
//       comment: `I know it's cold and all, but I've got something to warm your body and
//           clear your mind.`,
//     },
//     [ABILITY.SCROUNGER]: {
//       name: "Scrounger",
//       description: `Discard 2 $determination$ to $reroll$ any gather die during your
//           Action.`,
//       comment: `When I say we'll find it, we will. You just have to know where to look!`,
//     },
//     [ABILITY.STONE_SOUP]: {
//       name: "Stone Soup",
//       description: `Discard 3 $determination$ to gain 1 $food$.`,
//       comment: `No ingredients? No problem, just a challenge. A good cook can handle
//           anything!`,
//     },
//     [ABILITY.LUCKY]: {
//       name: `Lucky`,
//       description: `Discard 2 $determination$ to $reroll$ any green die during your
//           Action.`,
//       comment: `Looks like luck is on my side today!`,
//     },
//     [ABILITY.RECONNAISSANCE]: {
//       name: `Reconnaissance`,
//       description: `Discard 2 $determination$ to draw 3 Island tiles from the stack,
//           choose 1 and place it on top of the stack.`,
//       comment: `Back to the wilderness? Finally!`,
//     },
//     [ABILITY.MOTIVATIONAL_SPEECH]: {
//       name: `Motivational Speech`,
//       description: `Discard 3 $determination$ to increase $morale$.`,
//       comment: `Don't worry! I've been through worse and came out unscathed.`,
//     },
//     [ABILITY.SCOUTING]: {
//       name: `Scouting`,
//       description: `Discard 3 $determination$ to draw 2 $discovery$ cards and choose 1.`,
//       comment: `That's interesting. I'll take a closer look.`,
//     },
//     [ABILITY.ECONOMICAL_CONSTRUCTION]: {
//       name: `Economical Construction`,
//       description: `Discard 2 $determination$ to use 1 less $wood$ during one of your
//           Actions of any type.`,
//       comment: `Not enough materials? What are you talking about? We've got plenty!`,
//     },
//     [ABILITY.CRAFTSMANSHIP]: {
//       name: `Craftsmanship`,
//       description: `Discard 2 $determination$ to $reroll$ any brown die during your
//           Action.`,
//       comment: `I could do this with my eyes closed.`,
//     },
//     [ABILITY.A_NEW_IDEA]: {
//       name: `A New Idea`,
//       description: `Discard 3 $determination$ to draw 5 Idea cards and choose 1.`,
//       comment: `I think I know how to improve our camp…`,
//     },
//     [ABILITY.HANDYMAN]: {
//       name: `Handyman`,
//       description: `Discard 3 $determination$ to gain a one-time
//           $${PAWN_HELPER_ACTION.BUILD}$.`,
//       comment: `It's pretty simple, will take just a few moments.`,
//     },
//     [ABILITY.TRACKING]: {
//       name: `Tracking`,
//       description: `Discard 2 $determination$ to look at the top card of the Hunting
//           deck and place it back on top or bottom of the deck.`,
//       comment: `A tiger just passed by here. A big tiger…`,
//     },
//     [ABILITY.THE_HUNT]: {
//       name: `The Hunt`,
//       description: `Discard 4 $determination$ to take the top card of the Beast deck and
//           place it on top of the Hunting deck without looking at it.`,
//       comment: `Here kitty kitty, beastie!`,
//     },
//     [ABILITY.FRENZY]: {
//       name: `Frenzy`,
//       description: `Discard 3 $determination$ to temporarily gain +3 $weapon$ for the
//           next fight.`,
//       comment: `Now I'm really furious. I swear, you won't like me like this!`,
//     },
//     [ABILITY.DEFENSIVE_PLAN]: {
//       name: `Defensive Plan`,
//       description: `Discard 3 $determination$ to increase the level of $palisade$ or
//           $weapon$ by 1.`,
//       comment: `And you, cook, secure the left flank…`,
//     },
//     [ABILITY.FRIDAYS_ABILITY]: {
//       name: `Action Die Reroll`,
//       description: `Discard 3 $determination$ to reroll any action die.`,
//     },
//   },
//   personalInventionDescription: {
//     [INVENTION_PERSONAL.SPEAR]: `+3 $weapon$`,
//     [INVENTION_PERSONAL.FIREPLACE]: `$food$ -> +2 $heart$ (during night phase)`,
//     [INVENTION_PERSONAL.SHORTCUT]: `+1 resource from a chosen tile around the camp
//         during production phase`,
//     [INVENTION_PERSONAL.SNARE]: `+1 $food$ (on the camp tile)`,
//   },
//
//   phase: {
//     phase: `$t(phase.{{phase}}) Phase`,
//     event: `event`,
//     morale: `morale`,
//     production: `production`,
//     preAction: `pre-action`,
//     action: `action`,
//     weather: `weather`,
//     night: `night`,
//   },
//
//   resource: {
//     food: `food`,
//     dryFood: `dry food`,
//     wood: `wood`,
//     leather: `leather`,
//   },
//
//   action: {
//     action: `$t(translation:action.{{action}}) action`,
//     threat: `threat`,
//     hunt: `hunt`,
//     build: `build`,
//     gather: `gather`,
//     explore: `explore`,
//     "arrange camp": `arrange camp`,
//     rest: `rest`,
//   },
//
//   construction: {
//     shelter: `shelter`,
//     shelter_genitive: `shelter's`,
//     palisade: `palisade`,
//     palisade_genitive: `palisade's`,
//     roof: "roof",
//     roof_genitive: "roof's",
//     weapon: "weapon",
//     weapon_genitive: "weapon's",
//   },
//
//   adventureOptionLabel: {
//     shuffle: `shuffle`,
//     discard: `discard`,
//     keep: `keep`,
//   },
//
//   bodyPart: {
//     head: `head`,
//     stomach: `stomach`,
//     arm: `arm`,
//     leg: `leg`,
//   },
//
//   weatherToken: {
//     rain: `rain`,
//     rain_genitive: `rain's`,
//     snow: `snow`,
//     snow_genitive: `snow's`,
//     storm: `storm`,
//     storm_genitive: `storm's`,
//   },
//   dice: {
//     weather: "weather dice",
//     rain: "rain dice",
//     beast: "hungry animals dice",
//   },
//
//   tokens: {
//     adventure: `adventure`,
//     adventure_genitive: `adventure's`,
//     reroll: `reroll`,
//     reroll_genitive: `reroll's`,
//     "discovery token": `discovery token`,
//   },
//
//   eventCard: {
//     [WRECKAGE_CARD.SUPPLY_CRATES]: `Supply crates`,
//   },
//   adventureCard: {
//     [ADVENTURE_CARD_BUILD.ACCIDENT]: `Accident`,
//     [ADVENTURE_CARD_BUILD.BREAKDOWN]: `Breakdown`,
//     [ADVENTURE_CARD_BUILD.BROKEN_LEVER]: `Broken Lever`,
//     [ADVENTURE_CARD_BUILD.COMING_TO_TERMS]: `Coming to Terms`,
//     [ADVENTURE_CARD_BUILD.CONSTRUCTION]: `Construction`,
//     [ADVENTURE_CARD_BUILD.CONSTRUCTION_IS_WEAK]: `Construction is Weak`,
//     [ADVENTURE_CARD_BUILD.CUT_HEAD]: `Cut Head`,
//     [ADVENTURE_CARD_BUILD.DANGEROUS_WORK]: `Dangerous Work`,
//     [ADVENTURE_CARD_BUILD.DARK_CLOUDS_IN_THE_SKY]: `Dark Clouds in the Sky`,
//     [ADVENTURE_CARD_BUILD.FAST_WORK]: `Fast Work`,
//     [ADVENTURE_CARD_BUILD.FEAR_OF_THE_BEASTS]: `Fear of the Beasts`,
//     [ADVENTURE_CARD_BUILD.HARD_WORK]: `Hard Work`,
//     [ADVENTURE_CARD_BUILD.HOWLING_IN_THE_BUSHES]: `Howling in the Bushes`,
//     [ADVENTURE_CARD_BUILD.HUNGRY_PREDATOR]: `Hungry Predator`,
//     [ADVENTURE_CARD_BUILD.IN_A_HURRY]: `In a Hurry`,
//     [ADVENTURE_CARD_BUILD.LABORIOUS_WORK]: `Laborious Work`,
//     [ADVENTURE_CARD_BUILD.LACK_OF_HOPE]: `Lack of Hope`,
//     [ADVENTURE_CARD_BUILD.MONKEYS_WATCH_YOU]: `Monkeys Watch You`,
//     [ADVENTURE_CARD_BUILD.NASTY_WOUND]: `Nasty Wound`,
//     [ADVENTURE_CARD_BUILD.PREDATOR_IN_THE_CAMP]: `Predator in the Camp`,
//     [ADVENTURE_CARD_BUILD.SAVINGS]: `Savings`,
//     [ADVENTURE_CARD_BUILD.STING]: `Sting`,
//     [ADVENTURE_CARD_BUILD.TIRED]: `Tired`,
//     [ADVENTURE_CARD_BUILD.TOOLS_BREAK]: `Tools Break`,
//     [ADVENTURE_CARD_BUILD.TOOLS_INSPECTION]: `Tools Inspection`,
//     [ADVENTURE_CARD_BUILD.UNMOTIVATED]: `Unmotivated`,
//     [ADVENTURE_CARD_BUILD.VISIT_OF_A_PREDATOR]: `Visit of a Predator`,
//     [ADVENTURE_CARD_BUILD.WIND_STORM]: `Wind Storm`,
//     [ADVENTURE_CARD_BUILD.YOU_NEED_A_BIGGER_CAMP]: `You Need a Bigger Camp`,
//
//     [ADVENTURE_CARD_EXPLORE.BAMBOO]: `Bamboo`,
//     [ADVENTURE_CARD_EXPLORE.CARCASS]: `Carcass`,
//     [ADVENTURE_CARD_EXPLORE.COLD_WIND]: `Cold Wind`,
//     [ADVENTURE_CARD_EXPLORE.DANGEROUS_TERRAIN]: `Dangerous Terrain`,
//     [ADVENTURE_CARD_EXPLORE.EMPTY_FOREST]: `Empty Forest`,
//     [ADVENTURE_CARD_EXPLORE.FLU]: `Flu`,
//     [ADVENTURE_CARD_EXPLORE.IT_WILL_RAIN]: `It Will Rain`,
//     [ADVENTURE_CARD_EXPLORE.LOST]: `Lost`,
//     [ADVENTURE_CARD_EXPLORE.LOST_IN_THE_THICKET]: `Lost in the Thicket`,
//     [ADVENTURE_CARD_EXPLORE.LOST_IN_THE_WOODS]: `Lost in the Woods`,
//     [ADVENTURE_CARD_EXPLORE.MISADVENTURE]: `Misadventure`,
//     [ADVENTURE_CARD_EXPLORE.OLD_GRAVE]: `Old Grave`,
//     [ADVENTURE_CARD_EXPLORE.OLD_HUT]: `Old Hut`,
//     [ADVENTURE_CARD_EXPLORE.PUMA]: `Puma`,
//     [ADVENTURE_CARD_EXPLORE.REMAINS_OF_A_SETTLEMENT]: `Remains of a Settlement`,
//     [ADVENTURE_CARD_EXPLORE.RUINED_HUT]: `Ruined Hut`,
//     [ADVENTURE_CARD_EXPLORE.SECRET_CAVE]: `Secret Cave`,
//     [ADVENTURE_CARD_EXPLORE.SHRINE]: `Shrine`,
//     [ADVENTURE_CARD_EXPLORE.SIGNS_OF_FIRE]: `Signs of Fire`,
//     [ADVENTURE_CARD_EXPLORE.STORM_ON_THE_HORIZON]: `Storm on the Horizon`,
//     [ADVENTURE_CARD_EXPLORE.SURPRISING_DISCOVERY]: `Surprising Discovery`,
//     [ADVENTURE_CARD_EXPLORE.SWAMP]: `Swamp`,
//     [ADVENTURE_CARD_EXPLORE.THERES_SOMETHING_IN_THE_AIR]: `There's Something in the Air`,
//     [ADVENTURE_CARD_EXPLORE.THORNY_BUSH]: `Thorny Bush`,
//     [ADVENTURE_CARD_EXPLORE.TIGER]: `Tiger`,
//     [ADVENTURE_CARD_EXPLORE.VIPERS]: `Vipers`,
//     [ADVENTURE_CARD_EXPLORE.WILD_BERRIES]: `Wild Berries`,
//     [ADVENTURE_CARD_EXPLORE.WILD_DOG]: `Wild Dog`,
//     [ADVENTURE_CARD_EXPLORE.WRONG_TRACK]: `Wrong Track`,
//
//     [ADVENTURE_CARD_GATHER.AFTER_THE_HURRICANE]: `After the Hurricane`,
//     [ADVENTURE_CARD_GATHER.END_OF_SOURCE]: `End of Source`,
//     [ADVENTURE_CARD_GATHER.EYES_IN_THE_BUSHES]: `Eyes in the Bushes`,
//     [ADVENTURE_CARD_GATHER.FRUIT]: `Fruit`,
//     [ADVENTURE_CARD_GATHER.FURS]: `Furs`,
//     [ADVENTURE_CARD_GATHER.GOLD_COIN]: `Gold Coin`,
//     [ADVENTURE_CARD_GATHER.MUSHROOMS]: `Mushrooms`,
//     [ADVENTURE_CARD_GATHER.NESTLINGS]: `Nestlings`,
//     [ADVENTURE_CARD_GATHER.NEW_FLOCK]: `New Flock`,
//     [ADVENTURE_CARD_GATHER.NICE_SURPRISE]: `Nice Surprise`,
//     [ADVENTURE_CARD_GATHER.PATH_OF_A_PREDATOR]: `Path of a Predator`,
//     [ADVENTURE_CARD_GATHER.PIRATES_CHEST]: `Pirate's Chest`,
//     [ADVENTURE_CARD_GATHER.SHORTAGE]: `Shortage`,
//     [ADVENTURE_CARD_GATHER.SIGNS_OF_A_PREDATOR]: `Signs of a Predator`,
//     [ADVENTURE_CARD_GATHER.SKELETON]: `Skeleton`,
//     [ADVENTURE_CARD_GATHER.SPIDER]: `Spider`,
//     [ADVENTURE_CARD_GATHER.SURPRISE_IN_THE_BUSHES]: `Surprise in the Bushes`,
//     [ADVENTURE_CARD_GATHER.TRACKS_OF_A_PREDATOR]: `Tracks of a Predator`,
//     [ADVENTURE_CARD_GATHER.TWISTED_ANKLE]: `Twisted Ankle`,
//     [ADVENTURE_CARD_GATHER.UNBELIEVABLE_EFFORT]: `Unbelievable Effort`,
//     [ADVENTURE_CARD_GATHER.UNEXPECTED_DISCOVERY]: `Unexpected Discovery`,
//     [ADVENTURE_CARD_GATHER.UNEXPECTED_TROUBLES]: `Unexpected Troubles`,
//     [ADVENTURE_CARD_GATHER.VIPER]: `Viper`,
//     [ADVENTURE_CARD_GATHER.WEATHER_BREAKDOWN]: `Weather Breakdown`,
//     [ADVENTURE_CARD_GATHER.WINTER_FREEZING]: `Winter Freezing`,
//     [ADVENTURE_CARD_GATHER.WINTER_IS_COMING]: `Winter is Coming`,
//   },
//   adventureCardEvent: {
//     // BUILD
//     gangrene: `gangrene`,
//     "it's going well": `it's going well`,
//     "lack of ideas": `lack of ideas`,
//     "stronger construction": `stronger construction`,
//     "bang!": `bang!`,
//     headache: `headache`,
//     "heavy rain is over": `heavy rain is over`,
//     "haste makes waste": `haste makes waste`,
//     "expensive protection": `expensive protection`,
//     "the beast is here!": `the beast is here!`,
//     revisit: `revisit`,
//     "snap!": `snap!`,
//     "monkeys in the camp!": `monkeys in the camp!`,
//     infection: `infection`,
//     "what goes around...": `what goes around...`,
//     "bad construction": `bad construction`,
//     shivers: `shivers`,
//     dispute: `dispute`,
//     "broken tools": `broken tools`,
//     "tools are breaking": `tools are breaking`,
//     "night visit": `night visit`,
//     "natural palisade": `natural palisade`,
//     "camp expansion": `camp expansion`,
//     // EXPLORE
//     "wood snap!": `wood snap!`,
//     diarrhea: `diarrhea`,
//     snow: `snow`,
//     "hungry predators": `hungry predators`,
//     "sore throat": `sore throat`,
//     "detached clouds": `detached clouds`,
//     "swollen ankle": `swollen ankle`,
//     "memories of dead castaway": `memories of dead castaway`,
//     "ghost of a castaway": `ghost of a castaway`,
//     "puma is attacking!": `puma is attacking!`,
//     epidemic: `epidemic`,
//     "restless dreams": `restless dreams`,
//     "awakening of the beast": `awakening of the beast`,
//     nightmares: `nightmares`,
//     storm: `storm`,
//     "cursed island": `cursed island`,
//     "swollen arm": `swollen arm`,
//     "the tiger has found you": `the tiger has found you`,
//     fewer: `fever`,
//     indigestion: `indigestion`,
//     "old buddy": `old buddy`,
//
//     // GATHER
//     "another hurricane": `another hurricane`,
//     "unexpected visit": `unexpected visit`,
//     stomachache: `stomachache`,
//     insects: `insects`,
//     "cursed coin": `cursed coin`,
//     "angry bird": `angry bird`,
//     "all is gone": `all is gone`,
//     "collapsed roof": `collapsed roof`,
//     "attack of a beast": `attack of a beast`,
//     curse: `curse`,
//     "memories of the dead explorer": `memories of the dead explorer`,
//     "neck bite": `neck bite`,
//     memories: `memories`,
//     "attack of a hungry predator": `attack of a hungry predator`,
//     "sore arms": `sore arms`,
//     bite: `bite`,
//     frost: `frost`,
//   },
//   item: {
//     [ITEM.BIBLE]: `bible`,
//     [ITEM.BISCUITS]: `biscuits`,
//     [ITEM.EMPTY_BOTTLE]: `empty bottle`,
//     [ITEM.FLASK_OF_RUM]: `flask of rum`,
//     [ITEM.HAMMER]: `hammer`,
//     [ITEM.PISTOL]: `pistol`,
//     [ITEM.STORM_GLASS]: `storm glass`,
//     [ITEM.TOBACCO]: `pipe and tobacco`,
//   },
//
//   mysteryCard: {
//     [CREATURE_MYSTERY_CARD.A_SHINY_JEWEL]: `big jewel`,
//     [CREATURE_MYSTERY_CARD.BATS]: `bats`,
//     [CREATURE_MYSTERY_CARD.BIG_APE]: `big ape`,
//     [CREATURE_MYSTERY_CARD.BITE]: `bite`,
//     [CREATURE_MYSTERY_CARD.FURIOUS_TIGER]: `furious tiger`,
//     [CREATURE_MYSTERY_CARD.GIANT_SNAKE]: `giant snake`,
//     [CREATURE_MYSTERY_CARD.GORILLA]: `gorilla`,
//     [CREATURE_MYSTERY_CARD.GREMLINS]: `gremlins`,
//     [CREATURE_MYSTERY_CARD.SAVAGE]: `savage`,
//     [CREATURE_MYSTERY_CARD.SCORPION]: `scorpion`,
//     [CREATURE_MYSTERY_CARD.SNAKE]: `snake`,
//     [CREATURE_MYSTERY_CARD.SPIDERS]: `spiders`,
//     [CREATURE_MYSTERY_CARD.UNLEASHED_BEAST]: `unleashed beast`,
//
//     [TRAP_MYSTERY_CARD.BLOW_GUN]: `blowgun`,
//     [TRAP_MYSTERY_CARD.BLUNT_SPEAR]: `blunt spear`,
//     [TRAP_MYSTERY_CARD.COLLAPSE]: `collapse`,
//     [TRAP_MYSTERY_CARD.CONFUSED]: `confused`,
//     [TRAP_MYSTERY_CARD.HIDDEN_ROPE]: `hidden rope`,
//     [TRAP_MYSTERY_CARD.NET]: `net`,
//     [TRAP_MYSTERY_CARD.POISON]: `poison`,
//     [TRAP_MYSTERY_CARD.SHARP_BLADE]: `sharp blade`,
//     [TRAP_MYSTERY_CARD.SPIDER_WEB]: `spider web`,
//     [TRAP_MYSTERY_CARD.STRANGE_DISEASE]: `strange disease`,
//     [TRAP_MYSTERY_CARD.TERRIBLE_SCREAM]: `terrible scream`,
//     [TRAP_MYSTERY_CARD.TRAP_DOOR]: `trap door`,
//     [TRAP_MYSTERY_CARD.UNFORTUNATE_ADVENTURE]: `unfortunate adventure`,
//
//     [TREASURE_MYSTERY_CARD.AMULET_WITH_PORTRAIT_OF_BEAUTIFUL_LADY]: `amulet with portrait of beautiful lady`,
//     [TREASURE_MYSTERY_CARD.ANTIQUE_RAPIER]: `antique rapier`,
//     [TREASURE_MYSTERY_CARD.BACKPACK]: `backpack`,
//     [TREASURE_MYSTERY_CARD.BARREL]: `barrel`,
//     [TREASURE_MYSTERY_CARD.BLANKETS]: `blankets`,
//     [TREASURE_MYSTERY_CARD.BOTTLE_OF_WINE]: `bottle of wine`,
//     [TREASURE_MYSTERY_CARD.BOXES]: `boxes`,
//     [TREASURE_MYSTERY_CARD.CANDLES]: `candles`,
//     [TREASURE_MYSTERY_CARD.CAPTAIN_STONES_SPYGLASS]: `Captain Stone's spyglass`,
//     [TREASURE_MYSTERY_CARD.CAVE_WITH_FURS]: `cave with furs`,
//     [TREASURE_MYSTERY_CARD.CEREMONIAL_BOWL]: `ceremonial bowl`,
//     [TREASURE_MYSTERY_CARD.COMPASS]: `compass`,
//     [TREASURE_MYSTERY_CARD.CROCKS]: `crocks`,
//     [TREASURE_MYSTERY_CARD.GOLD]: `gold!`,
//     [TREASURE_MYSTERY_CARD.HAMMOCK]: `hammock`,
//     [TREASURE_MYSTERY_CARD.HATCHED]: `hatchet`,
//     [TREASURE_MYSTERY_CARD.HELMET]: `helmet`,
//     [TREASURE_MYSTERY_CARD.HERBAL_MIXTURE]: `herbal mixture`,
//     [TREASURE_MYSTERY_CARD.OLD_CLOTHES]: `set of old clothes`,
//     [TREASURE_MYSTERY_CARD.OLD_MAP]: `old map`,
//     [TREASURE_MYSTERY_CARD.OLD_RIFLE]: `old rifle`,
//     [TREASURE_MYSTERY_CARD.PROTECTIVE_AMULET]: `protective amulet`,
//     [TREASURE_MYSTERY_CARD.ROPES]: `ropes`,
//     [TREASURE_MYSTERY_CARD.SABRE]: `sabre`,
//     [TREASURE_MYSTERY_CARD.TREASURE_MAP]: `treasure map`,
//   },
//   mysteryCardEvent: {
//     "night demon": `night demon`,
//     "gorilla in the camp": `gorilla in the camp`,
//     "Gremlins have tracked you down": `Gremlins have tracked you down`,
//     "failed hunt": `failed hunt`,
//     "curse defeated!": `curse defeated!`,
//   },
//   invention: {
//     basket: `basket`,
//     bed: `bed`,
//     belts: `belts`,
//     bow: `bow`,
//     cellar: `cellar`,
//     corral: `corral`,
//     diary: `diary`,
//     drums: `drums`,
//     furnace: `furnace`,
//     lantern: `lantern`,
//     moat: `moat`,
//     pit: `pit`,
//     raft: `raft`,
//     sack: `sack`,
//     shield: `shield`,
//     sling: `sling`,
//     wall: `wall`,
//     fireplace: `fireplace`,
//     shortcut: `shortcut`,
//     snare: `snare`,
//     spear: `spear`,
//     axe: `axe`,
//     mast: `mast`,
//     bricks: `bricks`,
//     dam: `dam`,
//     fire: `fire`,
//     knife: `knife`,
//     map: `map`,
//     map_accusative: `map`,
//     medicine: `medicine`,
//     pot: `pots`,
//     rope: `rope`,
//     shovel: `shovel`,
//   },
//   beast: {
//     alligator: `alligator`,
//     bear: `bear`,
//     birds: `birds`,
//     boa: `boa`,
//     chamois: `chamois`,
//     cheetah: `cheetah`,
//     fox: `fox`,
//     goats: `goats`,
//     gorilla: `gorilla`,
//     iguana: `iguana`,
//     jaguar: `jaguar`,
//     puma: `puma`,
//     tapir: `tapir`,
//     tiger: `tiger`,
//     "wild dog": `wild dog`,
//     "wild pig": `wild pig`,
//   },
//   discoveryToken: {
//     [DISCOVERY_TOKEN.CANDLES]: `Candles`,
//     [DISCOVERY_TOKEN.FALLEN_TREE]: `Fallen tree`,
//     [DISCOVERY_TOKEN.GOAT]: `Goat`,
//     [DISCOVERY_TOKEN.HEALING_HERBS]: `Healing herbs`,
//     [DISCOVERY_TOKEN.HERBS]: `Herbs`,
//     [DISCOVERY_TOKEN.LARGE_LEAVES]: `Large leaves`,
//     [DISCOVERY_TOKEN.NOURISHING_LARVAE]: `Nourishing larvae`,
//     [DISCOVERY_TOKEN.OLD_MACHETE]: `Old machete`,
//     [DISCOVERY_TOKEN.POISON]: `Poison`,
//     [`${DISCOVERY_TOKEN.SCENARIO_1}_${SCENARIO.CASTAWAYS}`]: `Herbs`,
//     [`${DISCOVERY_TOKEN.SCENARIO_2}_${SCENARIO.CASTAWAYS}`]: `Olive oil`,
//     [`${DISCOVERY_TOKEN.SCENARIO_3}_${SCENARIO.CASTAWAYS}`]: `Pirate saber`,
//     [`${DISCOVERY_TOKEN.SCENARIO_4}_${SCENARIO.CASTAWAYS}`]: `Medallion with woman's
//         portrait`,
//     [DISCOVERY_TOKEN.THORNY_BUSHES]: `Thorny bushes`,
//     [DISCOVERY_TOKEN.TOBACCO]: `Tobacco`,
//     [DISCOVERY_TOKEN.TREASURE]: `Treasure`,
//     [DISCOVERY_TOKEN.VEGETABLES]: `Vegetables`,
//   },
//   cardListTab: {
//     inventions: `inventions`,
//     "mystery cards": `Mystery cards`,
//     items: `items`,
//   },
//   alerts: {
//     [ALERT_CODE.NOT_ENOUGH_MATERIALS_FOR_ACTION]: `Not enough materials to perform this
//         action.`,
//     [ALERT_CODE.NOT_ENOUGH_DETERMINATION_FOR_ABILITY]: `Not enough determination points
//         to use this ability.`,
//     [ALERT_CODE.BEAST_DECK_IS_EMPTY]: `The beast deck is empty.`,
//     [ALERT_CODE.PLAYERS_NOT_READY_FOR_ACTION]: `Players must signal readiness.`,
//     [ALERT_CODE.CHANGE_PHASE_IS_PRIME_PLAYER_ACTION]: `Phase change is decided by the
//         prime player.`,
//     [ALERT_CODE.MISSING_PAWN_LEADER]: `Leader pawn is missing on the main action slot.`,
//     [ALERT_CODE.MISSING_PAWN_HELPER]: `Helper pawns are missing.`,
//   },
//   pickObject: {
//     [ABILITY.RECONNAISSANCE]: {
//       source: `$t(translation:ability.${ABILITY.RECONNAISSANCE}.name)`,
//       description: `Choose a tile to be placed on top of the deck.`,
//     },
//     [ABILITY.SCOUTING]: {
//       source: `$t(translation:ability.${ABILITY.SCOUTING}.name)`,
//       description: `Draw a token.`,
//     },
//     [ABILITY.A_NEW_IDEA]: {
//       source: `$t(translation:ability.${ABILITY.A_NEW_IDEA}.name)`,
//       description: `Draw an idea card.`,
//     },
//     [ABILITY.TRACKING]: {
//       source: `$t(translation:ability.${ABILITY.TRACKING}.name)`,
//       description: "",
//       effectLabel: `To the bottom`,
//       secondaryEffectLabel: `To the top`,
//     },
//     [ABILITY.DEFENSIVE_PLAN]: {
//       source: `$t(translation:ability.${ABILITY.DEFENSIVE_PLAN}.name)`,
//       description: `$t(translation:ability.${ABILITY.DEFENSIVE_PLAN}.comment)`,
//       effectLabel: `+$weapon$`,
//       secondaryEffectLabel: `+$palisade$`,
//     },
//   },
//   other: {
//     yes: "yes",
//     no: "no",
//     shuffle: `shuffle`,
//     discard: `discard`,
//     keep: `keep`,
//     "sleeping under open sky": `sleeping under open sky`,
//     "unfulfilled demand": `unfulfilled demand`,
//     fight: `fight`,
//     level: `level`,
//     use: `use`,
//     order: `order`,
//     scenario: `scenario`,
//     round: `round`,
//     "action order": `action order`,
//     objective: `objective`,
//     description: `description`,
//     mechanics: `mechanics`,
//     "wood pile": `wood pile`,
//     "camp movement": `camp movement`,
//     "food rotted": `food rotted`,
//     confirm: `confirm`,
//     cancel: `cancel`,
//     ability: `ability`,
//     draw: `draw`,
//     finish: `finish`,
//     hour: `hour`,
//     hour_accusative_one: `hour`,
//     hour_accusative_few: `hours`,
//     hour_accusative_many: `hours`,
//     male: `male`,
//     female: `female`,
//     owned: "owned",
//     future: "future",
//     close: "close",
//     next: "next",
//     abilityPreview: "ability preview",
//     invention: "invention",
//     pageNotFound: "Page not found",
//     backToHomePage: "Back to home page",
//     dice: "dice",
//   },
//   gameSettings: {
//     difficulty: `Difficulty level`,
//     scaled: `Scaled by number of players`,
//     custom: `Custom`,
//     startingItems: "starting items",
//     playerAmount: "player amount",
//     saveGame: "save game",
//     restart: "restart",
//     finishGame: "finish game",
//     savedGames: "saved games",
//     load: "load",
//     delete: "delete",
//   },
//   generalSettings: {
//     title: "General Settings",
//     UIGuide: `User interface tour`,
//   },
//   userProfile: {
//     accountSettings: `Account settings`,
//     passwordChange: `Change password`,
//     backToProfile: `Back to profile`,
//   },
//   menu: {
//     refresh: `refresh`,
//     "create game": `create game`,
//     "load game": `load game`,
//     "join with game code": `join with game code`,
//     join: `join`,
//     name: `name`,
//     host: `host`,
//     players: `players`,
//     scenario: `scenario`,
//     mainMenu: "main menu",
//     guide: "guide",
//     password: `password`,
//     public: `public`,
//     "private game": `private game`,
//     "enter password": `enter password`,
//     error: `error`,
//     save: `save`,
//     "invitation code": `invitation code`,
//     "copy to clipboard": `copy to clipboard`,
//     show: `show`,
//     hide: `hide`,
//     "sign in": `sign in`,
//     "sign up": `sign up`,
//     "sign out": `sign out`,
//     "signing in": `signing in`,
//     "signing up": `signing up`,
//     "new account": `new account`,
//     username: `username`,
//     "repeat password": `repeat password`,
//     "already have an account?": `already have an account?`,
//     "don't have an account yet?": `don't have an account yet?`,
//     "create one": `create one`,
//     "quick game": `quick game`,
//     settings: `settings`,
//     multiplayer: `multiplayer`,
//     "default game name": `user's game {{username}}`,
//     win: `win`,
//     defeat: `defeat`,
//     "rounds survived": `rounds survived`,
//     "to menu": `to menu`,
//     "to lobby": `to lobby`,
//     "server connection lost": `Server connection lost`,
//     "another connection attempt in": `Another connection attempt in {{seconds}} seconds.`,
//     "login request limit reached": `You have entered incorrect password too many times.
//         Your account is temporarily locked for {{tryAfter}} minutes.`,
//   },
//   guide: {
//     contents: {
//       [GUIDE_CONTENT.INTRODUCTION]: "Introduction",
//       [GUIDE_CONTENT.EVENT_PHASE]: `$t(translation:phase.phase, {"phase": "event"})`,
//       [GUIDE_CONTENT.MORALE_PHASE]: `$t(translation:phase.phase, {"phase": "morale"})`,
//       [GUIDE_CONTENT.ACTION_PHASE_PLANNING]: "Action planning",
//       [GUIDE_CONTENT.THREAT_ACTION]: `$t(translation:action.action, {"action": "threat"})`,
//       [GUIDE_CONTENT.HUNT_ACTION]: `$t(translation:action.action, {"action": "hunt"})`,
//       [GUIDE_CONTENT.BUILD_ACTION]: `$t(translation:action.action, {"action": "build"})`,
//       [GUIDE_CONTENT.GATHER_ACTION]: `$t(translation:action.action, {"action": "gather"})`,
//       [GUIDE_CONTENT.EXPLORATION_ACTION]: `$t(translation:action.action, {"action": "explore"})`,
//       [GUIDE_CONTENT.ARRANGE_CAMP_ACTION]: `$t(translation:action.arrange camp)`,
//       [GUIDE_CONTENT.REST_ACTION]: `$t(translation:action.action, {"action": "rest"})`,
//       [GUIDE_CONTENT.ACTION_PHASE_RESOLVE]: `Action phase resolve`,
//       [GUIDE_CONTENT.WEATHER]: `$t(translation:phase.phase, {"phase": "weather"})`,
//       [GUIDE_CONTENT.NIGHT]: `$t(translation:phase.phase, {"phase": "night"})`,
//     },
//     pages: {
//       introduction: {
//         gameObjective: {
//           title: "Game Objective",
//           paragraph: `Robinson Crusoe is a cooperative game. Players either win
//                   together (if they manage to survive and achieve the goal defined by the
//                   Scenario), or lose together (if at least one Character dies or if they
//                   fail to meet the Scenario’s objective within the specified number of
//                   rounds).`,
//         },
//         roundProgression: {
//           title: `Round Progression`,
//           paragraph: `The game lasts for several rounds, the number of which is
//                  defined on the Scenario card. Each round is divided into phases, which
//                  are resolved in the following order:`,
//         },
//         phaseDescription: {
//           [PHASE.EVENT]: `During this phase, the top card from the Event deck is
//                   drawn and resolved.`,
//           [PHASE.MORALE]: `This phase is resolved only by the First Player, who
//                   discards or gains Determination tokens based on the position on the
//                   Morale track.`,
//           [PHASE.PRODUCTION]: `Players receive resources from sources located on the
//                   Island tile where the players' Camp is situated.`,
//           [PHASE.ACTION]: `This is the most important phase of the round, during
//                   which players first plan their actions together and then carry them out.`,
//           [PHASE.WEATHER]: `Players must face the weather, which is determined
//                   by dice rolls and/or Weather tokens.`,
//           [PHASE.NIGHT]: `During this phase, players must, among other things, feed
//                   themselves and will suffer if they do not have Shelter.`,
//         },
//       },
//       eventPage: {
//         title: `$t(translation:phase.phase)`,
//         paragraph1: `In this phase, an event card is drawn and placed on the threat space.`,
//         li1: `<strong>Adventure icon</strong> means that during the next action of the
//             type matching the icon's color, an adventure card will be resolved
//             (in this case, exploration).`,
//         li2: `<strong>Book icon</strong> triggers an effect specific to the scenario
//             (described on the scenario card).`,
//         li3: `<strong>Event Effect</strong> triggers an effect (usually negative) when
//             the card is drawn.`,
//         li4: `<strong>Threat Action</strong> is an action that players must perform to
//             remove the card from the threat space.`,
//         li5: `<strong>Threat Effect</strong> is the effect that will be triggered if the
//             card is pushed off the threat spaces.`,
//         paragraph2: `If, when drawing an event card, there is already a card on the
//             threat space, the new card replaces it, pushing the existing one to the left,
//             which in turn pushes any card already on the left space. If the card on the
//             left space is pushed out, it disappears and its threat effect is triggered.`,
//       },
//       moralePage: {
//         section1: {
//           title: `Morale Phase`,
//           paragraph1: `In this phase, the morale level is checked. Based on it, determination tokens <Icon icon="determination"/> are either granted to or taken from the <strong>first</strong> player <Icon icon="star"/>.`,
//           paragraph2: `Determination <Icon icon="determination"/> is needed for characters to use their abilities.`,
//           ul1: {
//             li1: `The player discards or receives an amount of determination tokens <Icon icon="determination"/> equal to the morale level.`,
//             li2: `If the morale level <Icon icon="morale-arrow"/> is negative, the first player <Icon icon="star"/> loses determination tokens.`,
//             li3: `If the player lacks the required tokens to discard, they receive a wound for each missing token according to the <strong>unmet requirements</strong> rule.`,
//             li4: `If morale is 3, the player receives 3 determination tokens <Icon icon="determination"/> and heals 1 wound <Icon icon="heart"/>.`,
//           },
//         },
//         section2: {
//           title: `Unmet Requirements`,
//           paragraph1: `If the game requires a player to discard a resource they don’t have, they receive a wound for each missing resource. For example:`,
//           li: `2 food resources <Icon icon="food"/> are required from tiles adjacent to the camp, and these resources then become unavailable. If there is only 1 food resource available around the camp, each player receives 1 wound.`,
//           paragraph2: `In cases where the rule says IF POSSIBLE, players do not receive wounds for missing resources.`,
//         },
//       },
//       actionPage: {
//         section1: {
//           paragraph1: `This is the most important phase of the game and consists of two stages: Planning and Resolving Actions.`,
//         },
//         section2: {
//           title1: `Planning`,
//           paragraph1: `During the Action Planning stage, players do not take individual turns, but instead decide together which Actions they want to perform during the current round. Then, they mark their choices by assigning their pawns to specific Actions.`,
//           paragraph2: `Pawns represent the activity of a Character on the island, so with two pawns, each player can take up to two actions. However, some Actions require more than one pawn to be successfully carried out.`,
//           paragraph3: `Each type of Action (except the Threat Action) can be taken multiple times in the same round and by different players.`,
//           paragraph4: `The available Actions are:`,
//           actionDescription: {
//             [ACTION.THREAT]: `<strong>Threat Action</strong> – this action is taken to prevent the effect of a Threat from being triggered, as shown on a specific Event card on the board in the Threat Action field. Completing this Action grants the player the benefits listed on the card (e.g., Determination tokens or other resources).`,
//             [ACTION.HUNT]: `<strong>Hunting</strong> – allows the player to obtain more food and hides, but usually results in receiving Wounds.`,
//             [ACTION.BUILD]: `<strong>Building</strong> – allows players to build Shelter, Roof, Palisade, or Weapons, and to turn Ideas into Items.`,
//             [ACTION.GATHER]: `<strong>Gathering Resources</strong> – allows players to obtain resources available on discovered Island tiles.`,
//             [ACTION.EXPLORE]: `<strong>Exploration</strong> – allows players to discover new parts of the island.`,
//             [ACTION.ARRANGE_CAMP]: `<strong>Arranging Camp</strong> – allows the player to gain 2 Determination tokens and increase Morale by 1 (in a 4-player game, the player chooses whether to receive Determination tokens or increase Morale).`,
//             [ACTION.REST]: `<strong>Resting</strong> – allows the player to heal 1 Wound.`,
//           },
//         },
//         section3: {
//           paragraph1: `To plan an action, drag a pawn onto the action space.`,
//           li1: `- placing a pawn in this slot means the character performs the given action.`,
//           li2: `- this is a support slot. Pawns placed here only assist and do not suffer any consequences of the action.`,
//         },
//       },
//       threatPage: {
//         section1: {
//           ul1: {
//             li1: `At the beginning of each round, a new Event card is drawn which contains a specific Threat Action. Players may choose to perform this Action to prevent the Threat effect from taking place later.`,
//             li2: `Each Threat Action is a one-time Action available on a specific card. After resolving it, the card is discarded.`,
//             li3: `To perform a Threat Action, players must assign the number of pawns shown on the card (1 or 2) and meet certain additional requirements (for example: having food or wood to discard, having a minimum weapon level, etc.).`,
//           },
//           paragraph1: `Possible requirements for performing a Threat Action:`,
//           ul2: {
//             li1: `The action requires assigning 1 pawn.`,
//             li2: `Performing the Action requires having Weapons at level 1 (or higher). When resolving the Action, the Weapon level is not decreased. If players do not meet the required Weapon level, they cannot take the Action.`,
//             li3: `Performing the Action requires possessing (and discarding during resolution) 1 of the specified resources.`,
//             li4: `Performing the Action requires possessing the specified crafted Item. The Item is not lost.`,
//           },
//         },
//       },
//       huntPage: {
//         section1: {
//           ul1: {
//             li1: `Hunting always requires using 2 pawns.`,
//             li2: `Hunting is only possible if there is a Hunting deck on the board containing at least one Beast card. Each Beast card allows for one hunt.`,
//             li3: `You can go hunting even if the Weapon level is 0.`,
//             li4: `Hunting always ends in success (unless the hunting character dies from wounds).`,
//           },
//           ul2: {
//             li1: `<strong>Beast strength</strong> – if it is higher than the Weapon level <Icon icon="weapon"/>, the player takes damage for each missing level.`,
//             li2: `<strong>Weapon level reduction</strong> – the number by which the Weapon level decreases after the hunt. For each missing level, the player takes damage.`,
//             li3: `<strong>Obtained food</strong> – added to the upcoming resources.`,
//             li4: `<strong>Obtained hide</strong> – added to the upcoming resources.`,
//           },
//         },
//       },
//       buildPage: {
//         section1: {
//           ul1: {
//             li1: `Building requires using 1 or 2 pawns.`,
//             li2: `When using only 1 pawn, during the resolution of the Action, the player must roll the Building dice to check whether the Action is successful, whether they receive Wounds, or whether an Adventure occurs.`,
//             li3: `Assigning 2 pawns to the Action guarantees success, and the player does not have to roll any dice.`,
//             li4: `This Action allows you to build a Shelter, Roof, Palisade, or Weapon, or to transform Ideas into Items.`,
//           },
//         },
//         section2: {
//           ul1: {
//             li1: `<strong>Shelter</strong> <br />During the Night phase, it protects from receiving Wounds caused by sleeping under the open sky. A Shelter is required before building a Roof or Palisade. Once built, a Shelter cannot be lost (unless specified by Scenario rules). Note that some Island tiles may provide natural Shelter.`,
//             li2: `<strong>Roof</strong> <br />
//         Protects against weather effects during the Weather phase. To build a Roof, a Shelter must already be present – either constructed or provided by a natural Shelter on the Island tile where the Camp is located.`,
//             li3: `<strong>Palisade</strong> <br />
//         Protects against Storm effects and other in-game effects (e.g., wild animal attacks). To build a Palisade, a Shelter must already be present – either constructed or provided by a natural Shelter on the Island tile where the Camp is located.`,
//             li4: `<strong>Weapon</strong> <br />
//         Primarily used during Hunting. The higher the Weapon level, the lower the chance the player will receive Wounds during a Beast encounter.`,
//             li5: `<strong>Items</strong> <br />
//         Crafting some Items usually provides an additional effect that can be very useful to players (e.g., the “Map” provides an extra pawn for Exploration Actions).`,
//           },
//           paragraph1: `When constructing (Shelter, Roof, or Palisade), you can choose which type of resource to use.`,
//         },
//       },
//       gatherPage: {
//         section1: {
//           ul1: {
//             li1: `Gathering Resources requires using 1 or 2 pawns.`,
//             li2: `When using only 1 pawn, during the resolution of the Action, the player must roll the Gathering dice to determine if the Action is successful, whether they receive Wounds, or whether an Adventure occurs.`,
//             li3: `Assigning 2 pawns to the Action guarantees success, and the player does not have to roll any dice.`,
//             li4: `During a single Action, a player gathers resources from only one chosen Source. Each Source provides one unit of a resource (this amount may be modified by the effects of certain Items, Adventures, Events, etc.).`,
//             li5: `The further a tile is from the Camp, the more pawns the Action on it will require.`,
//           },
//         },
//         section2: {
//           paragraph1: `Possible resources to gather:`,
//           ul1: {
//             li1: `<strong>Food source <Icon icon="food"/></strong>`,
//             li2: `<strong>Food source <Icon icon="food"/></strong>`,
//             li3: `<strong>Wood source <Icon icon="wood"/></strong>`,
//           },
//         },
//       },
//       explorePage: {
//         section1: {
//           ul1: {
//             li1: `Exploration requires using 1 or 2 pawns.`,
//             li2: `When using only 1 pawn, during the resolution of the Action, the player must roll the Exploration dice to determine whether the Action is successful, whether they receive Wounds, or whether an Adventure occurs.`,
//             li3: `The further the tile is from the Camp, the more pawns the Action on it will require.`,
//           },
//           ul2: {
//             li1: `<strong>Resource source</strong> (in this case, food <Icon icon="food"/>)`,
//             li2: `<strong>Beast</strong> – a random Beast card is added to the Hunting deck after a successful exploration.`,
//             li3: `<strong>Discovery tokens</strong> – added to future resources after a successful exploration.`,
//             li4: `<strong>Natural shelter</strong> – having the Camp on this tile works similarly to having a built Shelter, but with important differences.`,
//             li5: `<strong>Totem</strong> – the effect is described on the Scenario card.`,
//             li6: `<strong>Terrain type</strong> – some actions require a discovered tile with a specific type of terrain (e.g., building the "Knife" invention card requires a discovered tile with Mountain terrain).`,
//           },
//         },
//       },
//       arrangeCampPage: {
//         section1: {
//           ul1: {
//             li1: `Arranging the Camp requires using 1 pawn.`,
//             li2: `Arranging the Camp allows the player to gain 2 Determination tokens and increase Morale by 1 level (in a 4-player game, the player must choose one or the other).`,
//             li3: `Each player pawn assigned to the Arrange the Camp Action is resolved separately, which means that if a player assigns both their pawns to this Action, they will resolve it twice and therefore gain 4 Determination tokens and increase Morale by 2 levels.`,
//           },
//         },
//       },
//       restPage: {
//         section1: {
//           ul1: {
//             li1: `Resting requires using 1 pawn.`,
//             li2: `Resting allows the player to heal 1 Wound.`,
//             li3: `Each player pawn assigned to Rest is resolved separately, which means that if a player assigns both of their pawns to Rest, they will resolve it twice and therefore heal 2 Wounds.`,
//           },
//         },
//       },
//       actionResolvePage: {
//         title: `Resolving Actions`,
//         section1: {
//           paragraph1: `
//       Once you have allocated all your pawns, click the compass icon
//       <Icon icon="compass"/>, to proceed to the action resolution phase
//       (in a multiplayer game, all players must indicate readiness).`,
//           paragraph2: `During the action phase, all gained resources, discovery tokens,
//         and treasure cards are placed in the <strong>future resources</strong>.`,
//           paragraph3: `After the action phase, the resources are moved to the
//         <strong>owned resources</strong> and become available to the players.`,
//         },
//         section2: {
//           title: `Rolling Dice`,
//           paragraph1: `For actions such as <strong>exploration</strong>,
//       <strong>gathering resources</strong>, and <strong>building</strong>,
//       it is possible to assign 1 pawn less. In that case, the player rolls 3 dice,
//       and the success of the action depends on the result of one of them.`,
//           ul1: {
//             li1: `<strong>Success</strong> – The action was successful.`,
//             li2: `<strong>Determination tokens</strong> – The action failed.
//         The player receives 2 determination tokens.`,
//             li3: `<strong>Adventure</strong> – The player resolves an adventure card.`,
//             li4: `<strong>Wound</strong> – The player receives a wound.`,
//             li5: `<strong>Blank</strong> – Nothing happens.`,
//           },
//         },
//       },
//       weatherPage: {
//         section1: {
//           paragraph1: `In this phase, players must face the weather conditions
//             on the island. Weather is determined by rolling dice. The type of dice
//             rolled in each round is specified on the scenario card.`,
//         },
//         section2: {
//           title: `Weather Dice`,
//           ul: {
//             li1: `<strong>Rain Die</strong>`,
//             li2: `<strong>Snow Die</strong>`,
//             li3: `<strong>Hungry Animals Die</strong>`,
//           },
//         },
//         section3: {
//           title: `Weather Tokens`,
//           ul1: {
//             li1: `During the game, up to 3 types of tokens can be placed in the weather area.`,
//             li2: `If a given token is already present in the weather area, nothing happens.`,
//           },
//           ul2: {
//             li1: `<strong>Rain Cloud Token</strong> – represents 1 rain cloud.`,
//             li2: `<strong>Snow Cloud Token</strong> – represents 1 snow cloud.`,
//             li3: `<strong>Storm Token</strong> – reduces the <Icon icon="palisade"/> palisade level by 1.`,
//           },
//         },
//         section4: {
//           title: `Clouds`,
//           paragraph1: `There are two types of clouds on the Rain and Snow dice:`,
//           ul1: {
//             li1: `<strong>Rain Cloud</strong>`,
//             li2: `<strong>Snow Cloud</strong>`,
//           },
//         },
//         section5: {
//           title: `Resolving Clouds`,
//           ul1: {
//             li1: `Count all snow clouds (from dice and tokens). For each snow cloud, discard 1 <Icon icon="wood"/> wood (to stay warm).`,
//             li2: `Count all clouds (from dice and tokens) and compare the total to the roof level.
//                 <Icon icon="roof"/> The roof level indicates how many clouds it protects against.`,
//             li3: `For each missing level of roof protection, discard 1
//                  <Icon icon="food"/> food and 1 <Icon icon="wood"/> wood (to stay warm).`,
//             li4: `For each resource the players cannot discard, each player receives 1 wound.`,
//             li5: `All weather tokens are discarded.`,
//           },
//         },
//         section6: {
//           title: `Hungry Animals`,
//           paragraph1: `The Hungry Animals die shows the following effects affecting players:`,
//           ul1: {
//             li1: `A fight against a beast with strength 3 is resolved. (<strong>First player</strong> fights,
//          the weapon level does not decrease.)`,
//             li2: `The <Icon icon="palisade"/> palisade level decreases by 1.`,
//             li3: `Players discard 1 <Icon icon="food"/> food.`,
//           },
//         },
//       },
//       nightPage: {
//         section1: {
//           ul1: {
//             li1: `During the Night phase, each player must eat a meal. To do this,
//                 1 food must be discarded per player. If the players don't have enough food,
//                 they must jointly decide who will go without. Each player who doesn't have
//                 food discarded for them receives 2 Wounds.`,
//             li2: `During the Night phase, players may decide to move the Camp to an adjacent tile.
//                 This choice affects which resources players will receive in the next round
//                 during the Production phase, and which tiles/areas will be adjacent for
//                 purposes such as Gathering Resources and Exploration, etc.`,
//             li3: `If players have not built a Shelter (and their Camp is not located on
//                 an Island tile with a natural Shelter), each player receives 1 Wound for
//                 sleeping under the open sky.`,
//             li4: `If the players do not have non-perishable food or an Item ("Cellar")
//                 or Treasure ("Crates" or "Barrel") that allows food storage, all remaining
//                 food after the Night phase spoils and is discarded.`,
//             li5: `After the Night phase, character abilities are refreshed and can be used again.`,
//           },
//         },
//       },
//     },
//   },
//   UITour: {
//     prompt: {
//       question: `Would you like a guided tour of the game interface?`,
//       dontAskAgain: `Don\`t ask again`,
//     },
//     steps: {
//       [UI_TOUR_STEP_ID.PHASE]: {
//         content:
//           "This is where the current phase is displayed. Click on " +
//           "<strong><em>$t(other.order)</em></strong> to continue.",
//       },
//       [UI_TOUR_STEP_ID.PHASE_LIST]: {
//         content: `Each round consists of <strong>6 phases</strong>, which are resolved
//             in the order shown in this list.`,
//       },
//       [UI_TOUR_STEP_ID.MORALE]: {
//         title: `Morale`,
//         content: `<span>This panel shows the current level of <em>morale</em>
//             (<Icon icon="morale-arrow" />) and the associated amount of gained or lost
//             <em>determination</em> (<Icon icon="determination" />). It is required to
//             use the character’s abilities.</span>`,
//       },
//       [UI_TOUR_STEP_ID.MAP]: {
//         title: `Map`,
//         content: `The island map consists of hexagonal tiles, each representing a
//             different terrain area. Here you can drag pawns to gather resources and/or
//             explore.
//             <ul>
//               <li>
//                 <strong>Zooming in and out</strong> – to adjust the map view, use the mouse wheel or the “+” and “−” buttons.
//               </li>
//               <li>
//                 <strong>Moving the map</strong> – to see other parts of the island, hold down the left mouse button and drag the map in the desired direction.
//               </li>
//             </ul>`,
//       },
//       [UI_TOUR_STEP_ID.RESOURCES]: {
//         title: `Resources`,
//         content: `
//             Here you can track the resources belonging to your team. They are divided into 2 categories.
//             <ul>
//               <li>
//                 <strong>Future resources</strong> (at the top) – resources you have gained during the current Action Phase but do not yet possess. They become <strong>owned resources</strong> after all actions are resolved.
//               </li>
//               <li>
//                 <strong>Owned resources</strong> (at the bottom) – these are in your possession and you can use them.
//               </li>
//             </ul>`,
//       },
//       [UI_TOUR_STEP_ID.CONSTRUCTIONS]: {
//         title: "Constructions and Weapon",
//         content: `To survive on a deserted island, you need to ensure proper shelter and
//             weapons. Building them requires a specific amount of one of the resources
//             shown next to the construction. If you have both types of required resources,
//             you can choose which one to use by clicking on its icon.
//             <ul>
//               <li>
//                 <strong>Shelter</strong> (<Icon icon="shelter" />) - protects players
//                   while sleeping, preventing damage from sleeping outdoors. Only 1 level
//                   can be built.
//               </li>
//               <li>
//                 <strong>Roof</strong> (<Icon icon="roof" />) - protects players and
//                   resources from weather conditions.
//               </li>
//               <li>
//                 <strong>Palisade</strong> (<Icon icon="palisade" />) - protects players
//                 from wild animals.
//               </li>
//               <li>
//                 <strong>Weapon</strong> (<Icon icon="weapon" />) - used for hunting beasts.
//                 The more dangerous the beast, the higher weapon level is needed to survive
//                 unscathed.
//               </li>`,
//       },
//       [UI_TOUR_STEP_ID.CARDS]: {
//         title: `Owned Cards`,
//         content: `There are 3 types of cards here:
//             <ul>
//               <li>Invention cards</li>
//               <li>Mystery cards</li>
//               <li>Items</li>
//             </ul>
//             Switch between them by clicking on the tabs.`,
//       },
//       [UI_TOUR_STEP_ID.THREAT]: {
//         title: "Threat Actions",
//         content: `At the beginning of each round, during the first phase, a new event
//             card is placed here.
//             <br />
//             Perform the actions associated with them to receive rewards and avoid negative
//              consequences.`,
//       },
//       [UI_TOUR_STEP_ID.ARRANGE_REST]: {
//         title: "Camp arranging nad resting",
//         content: `These slots are used for planning rest and camp arranging actions.
//             <ul>
//               <li>
//                 An unlimited number of pawns can be assigned to each of these actions.
//               </li>
//               <li>Each action always succeeds.</li>
//             </ul>`,
//       },
//       [UI_TOUR_STEP_ID.CHARACTER]: {
//         title: "Character Card",
//         content: `This section contains information about your character and side
//             characters.`,
//       },
//       [UI_TOUR_STEP_ID.CHARACTER_IMG]: {
//         title: `Character`,
//         content: `This is your character. Within this area, wounds received on specific
//             body parts will be displayed.`,
//       },
//       [UI_TOUR_STEP_ID.CHARACTER_EXPENDABLES]: {
//         title: `Personal resources`,
//         content: `Your character has resources that can only be used by them.
//             <ul>
//               <li>Weapon level (<Icon icon="weapon" />) – used during hunting.</li>
//               <li>Determination tokens (<Icon icon="determination" />) – required to use abilities.</li>
//             </ul>`,
//       },
//       [UI_TOUR_STEP_ID.CHARACTER_PAWNS]: {
//         title: `Pawns`,
//         content: `Pawns are used to plan actions. They represent the time your character
//            spends performing a specific task. During the action phase, drag them onto the
//            appropriate slots to plan your next moves.`,
//       },
//       [UI_TOUR_STEP_ID.CHARACTER_ABILITIES]: {
//         title: "Abilities",
//         content: `Here is the list of your character's abilities.
//             <ul>
//               <li>Some abilities can only be used in specific situations.</li>
//               <li>Skills related to dice rerolls are used directly in the action resolve window.</li>
//             </ul>`,
//       },
//       [UI_TOUR_STEP_ID.CHARACTER_SIDE_CHARACTERS]: {
//         title: "Side Characters",
//         content: `Here are the side characters and their pawns.
//           <ul>
//             <li>Every player has access to and control over them.</li>
//             <li>The dog has no health and does not take damage.</li>
//             <li>The dog can only be used as an assistant for hunting or exploration actions.</li>
//           </ul>`,
//       },
//       [UI_TOUR_STEP_ID.HEALTH]: {
//         title: "Health",
//         content: `Here is your character's health.
//             <ul>
//               <li>For each damage point received, the health marker moves to the right.</li>
//               <li>If the health marker passes the arrow (<Icon icon="morale-arrow" />), the team's morale decreases by 1.</li>
//               <li>When the marker reaches the end, the character dies and the players lose.</li>
//             </ul>
//             `,
//       },
//       [UI_TOUR_STEP_ID.SCENARIO_BUTTON]: {
//         title: "Scenario card",
//         content: `Here is the button that slides out the scenario card.
//             Click it to continue.`,
//       },
//       [UI_TOUR_STEP_ID.SCENARIO]: {
//         title: "Scenario card",
//         content: `Here you can find information about the course of the game and the
//             victory conditions for the scenario.`,
//       },
//       [UI_TOUR_STEP_ID.SCENARIO_ROUNDS]: {
//         title: "Weather",
//         content: `The game consists of up to 12 rounds, with dice placed above them that
//             are rolled during the Weather phase. In each round, the outcome of these dice
//             rolls will affect the weather conditions you’ll have to face.`,
//       },
//       [UI_TOUR_STEP_ID.SCENARIO_INFO]: {
//         title: "Scenario Description",
//         content: `Before starting the game, don’t forget to review the scenario
//             information and its mechanics.`,
//       },
//       [UI_TOUR_STEP_ID.WEATHER]: {
//         content: `Temporary tokens will be placed here and counted during the Weather
//             phase.`,
//       },
//       [UI_TOUR_STEP_ID.DISCOVERY_TOKENS]: {
//         content: `Discovery tokens gained during map exploration will be placed here.`,
//       },
//       [UI_TOUR_STEP_ID.NEXT_PHASE]: {
//         content: `This is the main button that controls the flow of the game. Clicking
//             it will advance to the next phase.`,
//       },
//       [UI_TOUR_STEP_ID.MENU]: {
//         content: `Click to expand the menu.`,
//       },
//       [UI_TOUR_STEP_ID.MENU_PLAYERS]: {
//         content: `This button opens a window with information about other players’
//             characters.`,
//       },
//       [UI_TOUR_STEP_ID.MENU_SETTINGS]: {
//         content: `In the settings, you can restart, save, or return the game to the lobby.`,
//       },
//       [UI_TOUR_STEP_ID.MENU_GUIDE]: {
//         content: `The guide provides a more detailed description of the game rules.`,
//       },
//       [UI_TOUR_STEP_ID.MENU_EXIT]: {
//         content: `In the main menu options, you can reset the UI guide.`,
//       },
//     },
//   },
//   form: {
//     emailDoNotExist: `No account found linked to the provided email address. Please
//         check if the address is correct, or create a new account if you don't have one yet.`,
//     codeSentOnAdress: `A message with a reset code was sent to the address:`,
//     checkSpam: `If you don't see the message in your inbox, please check the spam folder.`,
//     enterCodeHere: `Enter the code here:`,
//     confirmCode: `Confirm Code`,
//     mailNotArrived: `Mail didn't arrive?`,
//     sendAgain: `Send again`,
//     signInNewPassword: `You can now sign in with your new password.`,
//     backToSignIn: `Back to sign in`,
//     sending: `Sending`,
//     sendLink: `Send link`,
//     send: `Send`,
//     sendEmailInstructions: `Enter your email address linked to your account, and we will
//         send you a password reset link.`,
//     enterCodeInstructions: ``,
//     "forgotPassword?": `Forgot password?`,
//     changePassword: `Change password`,
//     newPassword: `New password`,
//     passwordChanged: `Password changed`,
//     invalidCode: `The entered code is invalid or has expired.`,
//     resetPasswordTokenExpired: `Password reset token has expired.`,
//     oldPassword: `old password`,
//     incorrectCredentials: `The entered email or password is incorrect.`,
//     passwordsMustBeSame: `Passwords must be the same.`,
//     usernameTaken: `Username is already taken.`,
//     emailTaken: `This email is already in use.`,
//     invalidEmail: `The provided email address is invalid.`,
//     passwordTooShort: `Password must be at least {{amount}} characters long.`,
//   },
//   toast: {
//     "copied to clipboard": `Copied to clipboard!`,
//     "game saved": `Game saved!`,
//     "unable to save game": `Unable to save game!`,
//     "game restarted": `Game was restarted by the host`,
//     "request limit reached": `Request limit reached. Try again in {{tryAfter}} seconds.`,
//   },
//   error: {
//     [SESSION_CONNECTION_ERROR_CODE.SESSION_NOT_FOUND]: `Session not found`,
//     [SESSION_CONNECTION_ERROR_CODE.GAME_IN_PROGRESS]: `Game already in progress`,
//     [SESSION_CONNECTION_ERROR_CODE.SESSION_FULL]: `Session is full`,
//     [SESSION_CONNECTION_ERROR_CODE.INCORRECT_PASSWORD]: `Incorrect password`,
//     kicked: `You have been kicked`,
//     connectError: `There was a problem connecting to the server. Please check your
//         internet connection and try again.`,
//     serverError: `Server error. Please try again later.`,
//     somethingWentWrong: `Something went wrong`,
//     disconnected: `Disconnected`,
//   },
//   emailActivation: {
//     title: `Verify your email`,
//     instructions: `A verification link has been sent to your email address. To complete
//         the registration process, click the link in the received message. If you don't see
//         the email, please check the Spam or Promotions folder.`,
//     gotNoMessages: `Didn't receive the message?`,
//     sendAgain: `Send again`,
//     sent: `Sent`,
//   },
//   systemMessages: {
//     [SYSTEM_MSG.PLAYER_HAS_JOINED_SESSION]: `{{subject1}} has joined the session.`,
//     [SYSTEM_MSG.PLAYER_HAS_LEFT_SESSION]: `{{subject1}} has left the session.`,
//     [SYSTEM_MSG.ONLY_PRESENT_PLAYERS_CAN_JOIN]: `Only players present at the game save can
//       join the session.`,
//     [SYSTEM_MSG.GAME_TERMINATED]: `The game was terminated by the host.`,
//     [SYSTEM_MSG.GAME_RESTARTED]: `Game restarted.`,
//   },
//   logMessages: {
//     [LOG_CODE.WEATHER_TOKEN_SET]: `Placed the $t(translation:weatherToken.{{subject1}})
//       token on the adventure tile.`,
//     [LOG_CODE.WEATHER_CLOUD_DECREMENTED]: `Removed {{amount}}
//       $t(translation:weatherToken.{{subject1}}) cloud(s).`,
//     [LOG_CODE.WEATHER_CLOUD_INCREMENTED]: `Added {{amount}}
//       $t(translation:weatherToken.{{subject1}}) cloud(s).`,
//     [LOG_CODE.ACTION_GOT_TOKEN]: `Placed the $t(translation:tokens.{{subject1}}) token on
//       the $t(translation:action.{{subject2}}) tile.`,
//     [LOG_CODE.ACTION_LOST_TOKEN]: `Removed the $t(translation:tokens.{{subject1}}) token
//       from the $t(translation:action.{{subject2}}) tile.`,
//     [LOG_CODE.OWNED_RESOURCE_ADDED]: `Added {{amount}}
//       $t(translation:resource.{{subject1}}) to owned resources.`,
//     [LOG_CODE.FUTURE_RESOURCE_ADDED]: `Added {{amount}}
//       $t(translation:resource.{{subject1}}) to future resources.`,
//     [LOG_CODE.OWNED_RESOURCE_REMOVED]: `Discarded {{amount}}
//       $t(translation:resource.{{subject1}}) from owned resources.`,
//     [LOG_CODE.CAMP_MOVED]: `Moved the camp.`,
//     [LOG_CODE.TILE_MODIFIER_ADDED]: ``,
//     [LOG_CODE.TILE_MODIFIER_REMOVED]: ``,
//     [LOG_CODE.WOOD_ADDED_TO_PILE]: `Added wood to the pile.`,
//     [LOG_CODE.MORALE_INCREASED_TO_LVL]: `Morale increased to level {{amount}}.`,
//     [LOG_CODE.MORALE_DECREASED_TO_LVL]: `Morale decreased to level {{amount}}.`,
//     [LOG_CODE.INVENTION_BUILT]: `Built $t(translation:invention.{{subject1}}).`,
//     [LOG_CODE.GAME_WON]: `Game won!`,
//     [LOG_CODE.GAME_LOST]: `Game lost!`,
//     [LOG_CODE.FOOD_ROTTED]: `Food has rotted.`,
//     [LOG_CODE.CHARACTER_EATS]: `$t(translation:character.{{subject1}}) consumes
//       $t(translation:resource.{{subject2}}).`,
//     [LOG_CODE.BEAST_MOVED_TO_BOTTOM_OF_DECK]: `Beast moved to the bottom of the deck.`,
//     [LOG_CODE.BEAST_GOT_HUNTED]: `Tracked nad hunted $t(translation:beast.{{subject1}}).`,
//     [LOG_CODE.BEAST_SHUFFLED_INTO_EVENT_DECK]: `Shuffled the beast into the event deck.`,
//     [LOG_CODE.CONSTRUCTION_UPGRADED]: `Upgraded $t(translation:construction.{{subject1}})
//       to level {{amount}}.`,
//     [LOG_CODE.CONSTRUCTION_DOWNGRADED]: `$t(translation:construction.{{subject1}}) level
//       dropped to {{amount}}.`,
//     [LOG_CODE.ITEM_GRANTED]: `Received $t(translation:item.{{subject1}}).`,
//     [LOG_CODE.CHARACTER_USED_TOKEN]: `$t(translation:character.{{subject1}}) used token:
//       $t(translation:discoveryToken.{{subject2}}).`,
//     [LOG_CODE.CHARACTER_USED_ABILITY]: `$t(translation:character.{{subject1}}) used
//       $t(translation:ability.{{subject2}}.name).`,
//     [LOG_CODE.CHARACTER_GOT_HURT]: `$t(translation:character.{{subject1}}) took {{amount}}
//       damage.`,
//     [LOG_CODE.CHARACTER_GOT_HEALED]: `$t(translation:character.{{subject1}}) healed
//       {{amount}} damage.`,
//     [LOG_CODE.RESOURCE_BOOST_REMOVED]: `Source of $t(translation:resource.{{subject1}})
//       no longer provides extra resource.`,
//     [LOG_CODE.RESOURCE_BOOST_ADDED]: `Source of $t(translation:resource.{{subject1}}
//       will provide extra resource.`,
//     [LOG_CODE.RESOURCE_DEPLETED]: `Source of $t(translation:resource.{{subject1}}) has
//       been depleted.`,
//     [LOG_CODE.RESOURCE_REPLENISHED]: `Source of $t(translation:resource.{{subject1}})
//       has been replenished.`,
//     [LOG_CODE.FUTURE_RESOURCE_REMOVED]: `Removed {{amount}}
//       $t(translation:resource.{{subject1}}) from future resources.`,
//     [LOG_CODE.CHARACTER_GOT_WOUND]: `$t(translation:character.{{subject1}}) received a
//       wound on $t(translation:bodyPart.{{subject2}}).`,
//     [LOG_CODE.CHARACTER_LOST_WOUND]: `$t(translation:character.{{subject1}}) no longer
//     suffers from a wound on $t(translation:resource.{{subject1}}).`,
//     [LOG_CODE.LOST_GAINED_TREASURES]: `Collected treasures have been lost!`,
//     [LOG_CODE.ALL_PLAYERS_GOT_DETERMINATION]: `All players gain {{amount}} determination.`,
//     [LOG_CODE.ALL_PLAYERS_LOST_DETERMINATION]: `All players lose {{amount}} determination.`,
//     [LOG_CODE.ALL_PLAYERS_GOT_HURT]: `All players take {{amount}} damage.`,
//     [LOG_CODE.ALL_PLAYERS_GOT_HEALED]: `All players heal {{amount}} damage.`,
//     [LOG_CODE.NEW_PRIME_PLAYER]: `Player {{subject1}} is now the prime player.`,
//     [LOG_CODE.CHARACTER_LOST_DETERMINATION]: `$t(translation:character.{{subject1}}) loses
//       {{amount}} determination.`,
//     [LOG_CODE.CHARACTER_GOT_DETERMINATION]: `$t(translation:character.{{subject1}}) gains
//       {{amount}} determination.`,
//   },
// };
