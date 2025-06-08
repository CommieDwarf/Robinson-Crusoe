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
// export const pl = {
//   character: {
//     cook: "Kucharz",
//     cook_female: "Kucharka",
//     explorer: "Odkrywca",
//     carpenter: "Cieśla",
//     soldier: "Żołnierz",
//     friday: "Piętaszek",
//     dog: "Pies",
//   },
//   scenario: {
//     castaways: {
//       name: "rozbitkowie",
//       description: `Jesteście rozbitkami na bezludnej wyspie.
//                         Jest koniec lata, musicie przygotować się na nadejście zimy
//                         — zbudować schronienie, dach, palisadę. Ciężko będzie przetrwać
//                         nadchodzące ciężkie miesiące jesieni i zimy. Potrzebny będzie też
//                         stos drewna, który będzie można podpalić i liczyć, że jakiś statek
//                         przepływający na horyzoncie was dostrzeże.`,
//       objective: `Aby wygrać, gracze muszą wytworzyć przedmiot Ogień oraz
//                         zbudować stos drewna przedstawiony na karcie scenariusza. Jeśli w 10.,
//                         11. czy 12. rundzie warunki te są spełnione, to gracze wygrywają.`,
//       mechanics: `Stos ma się składać z 15 znaczników drewna.
//                         Drewno na stos gracze mogą odkładać przed fazą Akcji. W jednej rundzie można
//                         odłożyć na stos dowolną ilość drewna, ale ukończyć nie więcej niż 1 etap budowy stosu.
//                         (za pierwszym razem 1 znacznik drewna, następnie max. 2 znaczniki itd.),
//                         Drewno odłożone na stos nie może być z niego zabrane.`,
//       winNarrative: `Mimo licznych przeciwności i trudnych warunków na wyspie udało wam się
//                         przetrwać. Przepływający statek dojrzał wasz płonący stos i
//                         przypłynął wam na ratunek.`,
//       defeatNarrative_missedObjective: `Niestety nie udało wam zbudować i rozpalić stosu na czas.
//                      Pomimo waszych desperackich krzyków przepływający statek was nie zauważył. Wygląda na to,
//                       że utkneliście tu na zawsze.`,
//       defeatNarrative_death: `Warunki panujące na wyspie okazały się zbyt niebezpieczne.
//                        Wasze wysiłki, by przetrwać, okazały się niewystarczające.
//                        Gracz {{player}} wyzionął ducha.
//                        Na zawsze pozostaniecie w cieniu tej przeklętej wyspy.`,
//       putOnPileButton: `Odłóż na stos`,
//       woodPile: "stos drewna",
//     },
//   },
//   ability: {
//     [ABILITY.GRANDMAS_RECIPE]: {
//       name: "Babcina Receptura",
//       name_genitive: "Babcinej Receptury",
//       description:
//         "Odrzuć 2 $determination$ aby uleczyć 2 $heart$ odrzucając 1 $food$",
//       comment: "Po zupie mojej babci na pewno poczujesz się lepiej.",
//     },
//     [ABILITY.HOOCH]: {
//       name: "Samogon",
//       name_genitive: "Samogonu",
//       description:
//         "Odrzuć 3 $determination$, aby usunąć 1 $rain-cloud$ lub zamienić 1 $snow-cloud$ w 1 $rain-cloud$",
//       comment:
//         "Wiem, że jest zimno i w ogóle, ale mam tu coś co ogrzeje ciało i rozjaśni umysł.",
//     },
//     [ABILITY.SCROUNGER]: {
//       name: "Bystre Oko",
//       name_genitive: "Bystrego Oka",
//       description:
//         "Odrzuć 2 $determination$, aby $reroll$ dowolną szarą kość podczas swojej Akcji.",
//       comment:
//         "Gdy mówię, że się znajdzie to się znajdzie. Trzeba tylko wiedzieć, gdzie szukać!",
//     },
//
//     [ABILITY.STONE_SOUP]: {
//       name: "Zupa z Gwoździa",
//       name_genitive: "Zupy z Gwoździa",
//       description: "Odrzuć 3 $determination$, aby otrzymać 1 $food$.",
//       comment:
//         "Brak składników to nie przeszkoda, to wyzwanie. Dobry kucharz poradzi sobie w każdej sytuacji!",
//     },
//     [ABILITY.LUCKY]: {
//       name: "Dziecko szczęścia",
//       name_genitive: "Dziecka szczęścia",
//       description:
//         "Odrzuć 2 $determination$, aby $reroll$ dowolną zieloną kość podczas swojej Akcji.",
//       comment: "Wygląda na to, że szczęście mi dziś sprzyja!",
//     },
//     [ABILITY.RECONNAISSANCE]: {
//       name: "Rekonesans",
//       name_genitive: "Rekonesansu",
//       description: `Odrzuć 2 $determination$, aby pociągnąć 3 kafelki Wyspy
//                         ze stosu, wybrać 1 z nich i położyć go na wierzchu stosu.`,
//       comment: "Wracamy do dziczy? Nareszcie!",
//     },
//     [ABILITY.MOTIVATIONAL_SPEECH]: {
//       name: "Mowa ku pokrzepieniu serc",
//       name_genitive: "Mowy ku pokrzepieniu serc",
//       description: `Odrzuć 3 $determination$ aby $morale$.`,
//       comment: "Nie martwcie się! Z nie takich opałów wychodziłem bez szwanku.",
//     },
//     [ABILITY.SCOUTING]: {
//       name: "Zwiad",
//       name_genitive: "Zwiadu",
//       description:
//         "Odrzuć 3 $determination$, aby pociągnąć 2 $discovery$$ i wybrać z nich 1.",
//       comment: "A to ci ciekawe. Przyjrzę się temu bliżej.",
//     },
//     [ABILITY.ECONOMICAL_CONSTRUCTION]: {
//       name: "Oszczędna konstrukcja",
//       name_genitive: "Oszczędnej konstrukcji",
//       description:
//         "Odrzuć 2 $determination$, aby zużyć 1 $wood$ mniej podczas jednej swojej Akcji dowolnego typu.",
//       comment: "Za mało materiału? O czym ty mówisz? Mamy go aż nadto!",
//     },
//     [ABILITY.CRAFTSMANSHIP]: {
//       name: "Rzemiosło",
//       name_genitive: "Rzemiosła",
//       description:
//         "Odrzuć 2 $determination$, aby $reroll$ dowolną brązową kość podczas swojej Akcji.",
//       comment: "Mógłbym to wbić z zamkniętymi oczami",
//     },
//     [ABILITY.A_NEW_IDEA]: {
//       name: "Nowy pomysł",
//       name_genitive: "Nowego pomysłu",
//       description:
//         "Odrzuć 3 $determination$, aby pociągnąć 5 kart z talii Pomysłów i wybrać 1 z nich.",
//       comment: "Zdaje się, że wiem, jak ulepszyć nasze obozowisko…",
//     },
//     [ABILITY.HANDYMAN]: {
//       name: "Złota rączka",
//       name_genitive: "Złotej rączki",
//       description: `Odrzuć 3 $determination$, aby uzyskać jednorazowego $${PAWN_HELPER_ACTION.BUILD}$.`,
//       comment: "To w sumie dość proste, zajmie ledwie parę chwil.",
//     },
//     [ABILITY.TRACKING]: {
//       name: "Tropienie",
//       name_genitive: "Tropienia",
//       description:
//         "Odrzuć 2 $determination$, aby spojrzeć na górną kartę z talii Polowania" +
//         " i umieścić ją z powrotem na wierzchu talii lub na jej spodzie.",
//       comment: "Chwilę temu przemknął tędy tygrys. Wielki tygrys…",
//     },
//     [ABILITY.THE_HUNT]: {
//       name: "Polowanie",
//       name_genitive: "Polowania",
//       description: `Odrzuć 4 $determination$, aby wziąć wierzchnią kartę z talii Bestii i położyć na wierzchu talii polowania, bez oglądania jej.`,
//       comment: "Kici-kici, bestyjko!",
//     },
//     [ABILITY.FRENZY]: {
//       name: "Furia",
//       name_genitive: "Furii",
//       description:
//         "Odrzuć 3 $determination$, a by tymczasowo otrzymać +3 $weapon$ do kolejnej walki.",
//       comment:
//         "Teraz to jestem naprawdę wściekły. Przysięgam, nie polubicie mnie takiego!",
//     },
//     [ABILITY.DEFENSIVE_PLAN]: {
//       name: "Plan zapasowy",
//       name_genitive: "Planu zapasowego",
//       description:
//         "Odrzuć 3 $determination$, aby zwiększyć poziom $palisade$ lub $weapon$ o 1.",
//       comment: "A ty, kucharzu, zabiezpieczasz lewą flankę…",
//     },
//     [ABILITY.FRIDAYS_ABILITY]: {
//       name: "Przerzut kości akcji",
//       name_genitive: "Przerzutu kości akcji",
//       description:
//         "Odrzuć 3 $determination$, aby przerzucić dowolną kość akcji.",
//     },
//   },
//   personalInventionDescription: {
//     [INVENTION_PERSONAL.SPEAR]: "+3 $weapon$",
//     [INVENTION_PERSONAL.FIREPLACE]: "$food$ -> +2$heart$ (w fazie nocy)",
//     [INVENTION_PERSONAL.SHORTCUT]:
//       "+1 surowiec z wybranego kafelka w okół obozu w fazie produkcji",
//     [INVENTION_PERSONAL.SNARE]: "+1 $food$ (na kafelku obozu)",
//   },
//   phase: {
//     phase: 'faza $t(phase.{{phase}}, {"context": "genitive"})',
//     event: "wydarzenie",
//     event_genitive: "wydarzenia",
//     morale: "morale",
//     morale_genitive: "morali",
//     production: "produkcja",
//     production_genitive: "produkcji",
//     preAction: "akcja",
//     preAction_genitive: "akcji",
//     action: "akcja",
//     action_genitive: "akcji",
//     weather: "pogoda",
//     weather_genitive: "pogody",
//     night: "noc",
//     night_genitive: "nocy",
//   },
//   resource: {
//     food: "pożywienie",
//     food_many: "pożywienia",
//     food_few: "pożywienia",
//     dryFood: "suchy prowiant",
//     dryFood_many: "suchych prowiantów",
//     dryFood_few: "suche prowianty",
//     wood: "drewno",
//     wood_many: "drewna",
//     wood_few: "drewna",
//     leather: "skóra",
//     leather_many: "skór",
//     leather_few: "skóry",
//     leather_genitive: "skórę",
//   },
//   action: {
//     action: `akcja $t(translation:action.{{action}}, {"context": "genitive"})`,
//     threat: "zagrożenie",
//     threat_genitive: "zagrożenia",
//     hunt: "polowanie",
//     hunt_genitive: "polowania",
//     build: "budowanie",
//     build_genitive: "budowania",
//     gather: "zbieranie",
//     gather_genitive: "zbierania",
//     explore: "eksploracja",
//     explore_genitive: "eksploracji",
//     "arrange camp": "porządkowanie obozu",
//     "arrange camp_genitive": "porządkowania obozu",
//     rest: "odpoczynek",
//     rest_genitive: "odpoczynku",
//   },
//   construction: {
//     shelter: "schronienie",
//     shelter_genitive: "schronienia",
//     shelter_accusative: "schronienie",
//     palisade: "palisada",
//     palisade_genitive: "palisady",
//     palisade_accusative: "palisadę",
//     roof: "dach",
//     roof_genitive: "dachu",
//     roof_accusative: "dach",
//     weapon: "broń",
//     weapon_genitive: "broni",
//     weapon_accusative: "broń",
//   },
//   adventureOptionLabel: {
//     shuffle: "wtasuj",
//     discard: "odrzuć",
//     keep: "zatrzymaj",
//   },
//   bodyPart: {
//     head_locative: "głowie",
//     stomach_locative: "brzuchu",
//     arm_locative: "ramieniu",
//     leg_locative: "nodze",
//   },
//   weatherToken: {
//     rain: "deszcz",
//     rain_genitive: "deszczu",
//     snow: "śnieg",
//     snow_genitive: "śniegu",
//     storm: "sztorm",
//     storm_genitive: "sztormu",
//   },
//   dice: {
//     weather: "Kość śniegu",
//     rain: "kość deszczu",
//     beast: "kość wygłodniałych zwierząt",
//   },
//   tokens: {
//     adventure: "przygoda",
//     adventure_genitive: "przygody",
//     reroll: "przerzut",
//     reroll_genitive: "przerzutu",
//     "discovery token": "token odkryć",
//   },
//   eventCard: {
//     [WRECKAGE_CARD.SUPPLY_CRATES]: "Skrzynie z jedzeniem",
//   },
//   adventureCard: {
//     [ADVENTURE_CARD_BUILD.ACCIDENT]: "wypadek",
//     [ADVENTURE_CARD_BUILD.BREAKDOWN]: "załamanie",
//     [ADVENTURE_CARD_BUILD.BROKEN_LEVER]: "złamana dźwignia",
//     [ADVENTURE_CARD_BUILD.COMING_TO_TERMS]: "realna ocena sytuacji",
//     [ADVENTURE_CARD_BUILD.CONSTRUCTION]: "konstrukcja",
//     [ADVENTURE_CARD_BUILD.CONSTRUCTION_IS_WEAK]: "marna konstrukcja",
//     [ADVENTURE_CARD_BUILD.CUT_HEAD]: "skaleczenie",
//     [ADVENTURE_CARD_BUILD.DANGEROUS_WORK]: "niebezpieczna praca",
//     [ADVENTURE_CARD_BUILD.DARK_CLOUDS_IN_THE_SKY]: "zachmurzone niebo",
//     [ADVENTURE_CARD_BUILD.FAST_WORK]: "pośpiech",
//     [ADVENTURE_CARD_BUILD.FEAR_OF_THE_BEASTS]: "strach przed bestiami",
//     [ADVENTURE_CARD_BUILD.HARD_WORK]: "ciężka praca",
//     [ADVENTURE_CARD_BUILD.HOWLING_IN_THE_BUSHES]: "wycie w buszu",
//     [ADVENTURE_CARD_BUILD.HUNGRY_PREDATOR]: "wygłodniały drapieżnik",
//     [ADVENTURE_CARD_BUILD.IN_A_HURRY]: "w pośpiechu",
//     [ADVENTURE_CARD_BUILD.LABORIOUS_WORK]: "mozolna praca",
//     [ADVENTURE_CARD_BUILD.LACK_OF_HOPE]: "brak nadziei!",
//     [ADVENTURE_CARD_BUILD.MONKEYS_WATCH_YOU]: "małpy Cię obserwują",
//     [ADVENTURE_CARD_BUILD.NASTY_WOUND]: "paskudna rana",
//     [ADVENTURE_CARD_BUILD.PREDATOR_IN_THE_CAMP]: "bestia w obozie",
//     [ADVENTURE_CARD_BUILD.SAVINGS]: "oszczędności",
//     [ADVENTURE_CARD_BUILD.STING]: "użądlenie",
//     [ADVENTURE_CARD_BUILD.TIRED]: "wyczerpany",
//     [ADVENTURE_CARD_BUILD.TOOLS_BREAK]: "pękniete narzędzie",
//     [ADVENTURE_CARD_BUILD.TOOLS_INSPECTION]: "kontrola narzędzi",
//     [ADVENTURE_CARD_BUILD.UNMOTIVATED]: "zdemotywowany",
//     [ADVENTURE_CARD_BUILD.VISIT_OF_A_PREDATOR]: "wizyta bestii",
//     [ADVENTURE_CARD_BUILD.WIND_STORM]: "wichura",
//     [ADVENTURE_CARD_BUILD.YOU_NEED_A_BIGGER_CAMP]: "potrzeba zmian",
//
//     [ADVENTURE_CARD_EXPLORE.BAMBOO]: "bambus",
//     [ADVENTURE_CARD_EXPLORE.CARCASS]: "padlina",
//     [ADVENTURE_CARD_EXPLORE.COLD_WIND]: "zimny wiatr",
//     [ADVENTURE_CARD_EXPLORE.DANGEROUS_TERRAIN]: "niebezpieczny teren",
//     [ADVENTURE_CARD_EXPLORE.EMPTY_FOREST]: "pusty las",
//     [ADVENTURE_CARD_EXPLORE.FLU]: "grypa",
//     [ADVENTURE_CARD_EXPLORE.IT_WILL_RAIN]: "niebo zaciąga się",
//     [ADVENTURE_CARD_EXPLORE.LOST]: "zagubiony",
//     [ADVENTURE_CARD_EXPLORE.LOST_IN_THE_THICKET]: "zagubiony w gęstwinie",
//     [ADVENTURE_CARD_EXPLORE.LOST_IN_THE_WOODS]: "zagubiony w lesie",
//     [ADVENTURE_CARD_EXPLORE.MISADVENTURE]: "nieszczęśliwy wypadek",
//     [ADVENTURE_CARD_EXPLORE.OLD_GRAVE]: "stary grób",
//     [ADVENTURE_CARD_EXPLORE.OLD_HUT]: "stara chata",
//     [ADVENTURE_CARD_EXPLORE.PUMA]: "puma!",
//     [ADVENTURE_CARD_EXPLORE.REMAINS_OF_A_SETTLEMENT]: "pozostałości osady",
//     [ADVENTURE_CARD_EXPLORE.RUINED_HUT]: "zniszczona chatka",
//     [ADVENTURE_CARD_EXPLORE.SECRET_CAVE]: "tajemnicza jaskinia",
//     [ADVENTURE_CARD_EXPLORE.SHRINE]: "kapliczka",
//     [ADVENTURE_CARD_EXPLORE.SIGNS_OF_FIRE]: "ślady ognia",
//     [ADVENTURE_CARD_EXPLORE.STORM_ON_THE_HORIZON]: "nadciąga sztorm",
//     [ADVENTURE_CARD_EXPLORE.SURPRISING_DISCOVERY]: "zaskakujące znalezisko",
//     [ADVENTURE_CARD_EXPLORE.SWAMP]: "bagniska",
//     [ADVENTURE_CARD_EXPLORE.THERES_SOMETHING_IN_THE_AIR]: "coś się szykuje",
//     [ADVENTURE_CARD_EXPLORE.THORNY_BUSH]: "kolczasty krzew",
//     [ADVENTURE_CARD_EXPLORE.TIGER]: "tygrys!",
//     [ADVENTURE_CARD_EXPLORE.VIPERS]: "żmije!",
//     [ADVENTURE_CARD_EXPLORE.WILD_BERRIES]: "dzikie jagody",
//     [ADVENTURE_CARD_EXPLORE.WILD_DOG]: "dziki pies",
//     [ADVENTURE_CARD_EXPLORE.WRONG_TRACK]: "pomylone ścieżki",
//
//     [ADVENTURE_CARD_GATHER.AFTER_THE_HURRICANE]: "po huraganie",
//     [ADVENTURE_CARD_GATHER.END_OF_SOURCE]: "koniec źródła",
//     [ADVENTURE_CARD_GATHER.EYES_IN_THE_BUSHES]: "oczy w ciemności",
//     [ADVENTURE_CARD_GATHER.FRUIT]: "owoce",
//     [ADVENTURE_CARD_GATHER.FURS]: "skóry",
//     [ADVENTURE_CARD_GATHER.GOLD_COIN]: "złota moneta!",
//     [ADVENTURE_CARD_GATHER.MUSHROOMS]: "grzyby",
//     [ADVENTURE_CARD_GATHER.NESTLINGS]: "pisklaki",
//     [ADVENTURE_CARD_GATHER.NEW_FLOCK]: "nowe stado",
//     [ADVENTURE_CARD_GATHER.NICE_SURPRISE]: "okazja",
//     [ADVENTURE_CARD_GATHER.PATH_OF_A_PREDATOR]: "ścieżka drapieżnika",
//     [ADVENTURE_CARD_GATHER.PIRATES_CHEST]: "skrzynia piratów",
//     [ADVENTURE_CARD_GATHER.SHORTAGE]: "końcówka",
//     [ADVENTURE_CARD_GATHER.SIGNS_OF_A_PREDATOR]: "ślady drapieżnika",
//     [ADVENTURE_CARD_GATHER.SKELETON]: "szkielet",
//     [ADVENTURE_CARD_GATHER.SPIDER]: "pająk",
//     [ADVENTURE_CARD_GATHER.SURPRISE_IN_THE_BUSHES]: "znalezisko w krzakach",
//     [ADVENTURE_CARD_GATHER.TRACKS_OF_A_PREDATOR]: "niebezpieczne ślady",
//     [ADVENTURE_CARD_GATHER.TWISTED_ANKLE]: "skręcona kostka",
//     [ADVENTURE_CARD_GATHER.UNBELIEVABLE_EFFORT]: "niewiarygodny wysiłek",
//     [ADVENTURE_CARD_GATHER.UNEXPECTED_DISCOVERY]: "niespodziewane znalezisko",
//     [ADVENTURE_CARD_GATHER.UNEXPECTED_TROUBLES]: "niespodziewane trudności",
//     [ADVENTURE_CARD_GATHER.VIPER]: "żmija",
//     [ADVENTURE_CARD_GATHER.WEATHER_BREAKDOWN]: "załamanie pogody",
//     [ADVENTURE_CARD_GATHER.WINTER_FREEZING]: "zimowy chłód",
//     [ADVENTURE_CARD_GATHER.WINTER_IS_COMING]: "nadchodzi zima",
//   },
//   adventureCardEvent: {
//     // BUILD
//     gangrene: "gangrena",
//     "it's going well": "dobrze idzie",
//     "lack of ideas": "brak pomysłów",
//     "stronger construction": "mocniejsza konstrukcja",
//     "bang!": "trach!",
//     headache: "ból głowy",
//     "heavy rain is over": "koniec ulewy",
//     "haste makes waste": "co nagle to po diable",
//     "expensive protection": "kosztowna ochrona",
//     "the beast is here!": "bestia jest tutaj!",
//     revisit: "rewizyta",
//     "snap!": "trzask!",
//     "monkeys in the camp!": "małpy w obozie!",
//     infection: "infekcja",
//     "what goes around...": "nosił wilk razy kilka...",
//     "bad construction": "licha konstrukcja",
//     shivers: "dreszcze",
//     dispute: "spór",
//     "broken tools": "zepsute narzędzia",
//     "tools are breaking": "narzędzia się psują",
//     "night visit": "nocna wizyta",
//     "natural palisade": "naturalna palisada",
//     "camp expansion": "rozbudowa obozowiska",
//     //EXPLORE
//     "wood snap!": "trzask łamanego drewna!",
//     diarrhea: "biegunka",
//     snow: "śnieg",
//     "hungry predators": "głodne drapieżniki",
//     "sore throat": "ból gardła",
//     "detached clouds": "oberwane chmury",
//     "swollen ankle": "spuchnięta kostka",
//     "memories of dead castaway": "wspomnienia o martwym rozbitku",
//     "ghost of a castaway": "duch rozbitka",
//     "puma is attacking!": "atak pumy!",
//     epidemic: "epidemia",
//     "restless dreams": "niespokojne sny",
//     "awakening of the beast": "przebudzenie bestii",
//     nightmares: "koszmary",
//     storm: "sztorm",
//     "cursed island": "przeklęta wyspa",
//     "swollen arm": "spuchnięte ramię",
//     "the tiger has found you": "tygrys was odnajduje",
//     fewer: "gorączka",
//     indigestion: "niestrawność",
//     "old buddy": "stary znajomy",
//     //GATHER
//     "another hurricane": "kolejny huragan",
//     "unexpected visit": "niespodziewana wizyta",
//     stomachache: "ból brzucha",
//     insects: "insekty",
//     "cursed coin": "przeklęta moneta",
//     "angry bird": "wściekłe ptaszyszko",
//     "all is gone": "wszystko przepadło",
//     "collapsed roof": "zapadnięty dach",
//     "attack of a beast": "atak bestii",
//     curse: "klątwa",
//     "memories of the dead explorer": "wspomnienia martwego odkrywcy",
//     "neck bite": "ugryzienie w kark",
//     memories: "wspomnienia",
//     "attack of a hungry predator": "atak wygłodniałego drapieżnika",
//     "sore arms": "obolałe ramiona",
//     bite: "ukąszenie",
//     frost: "przymrozek",
//   },
//
//   item: {
//     [ITEM.BIBLE]: "biblia",
//     [`${ITEM.BIBLE}_accusative`]: "biblię",
//     [ITEM.BISCUITS]: "suchary",
//     [ITEM.EMPTY_BOTTLE]: "pusta butelka",
//     [`${ITEM.EMPTY_BOTTLE}_accusative`]: "pustą butelkę",
//     [ITEM.FLASK_OF_RUM]: "flaszka rumu",
//     [`${ITEM.FLASK_OF_RUM}_accusative`]: "flaszkę rumu",
//     [ITEM.HAMMER]: "młotek",
//     [ITEM.PISTOL]: "pistolet",
//     [ITEM.STORM_GLASS]: "barometr",
//     [ITEM.TOBACCO]: "Fajka i tytoń",
//     [`${ITEM.TOBACCO}_accusative`]: "Fajkę i tytoń",
//   },
//
//   mysteryCard: {
//     [CREATURE_MYSTERY_CARD.A_SHINY_JEWEL]: "wielki klejnot",
//     [CREATURE_MYSTERY_CARD.BATS]: "nietoperze",
//     [CREATURE_MYSTERY_CARD.BIG_APE]: "wielka małpa",
//     [CREATURE_MYSTERY_CARD.BITE]: "ugryzienie",
//     [CREATURE_MYSTERY_CARD.FURIOUS_TIGER]: "rozszalały tygrys",
//     [CREATURE_MYSTERY_CARD.GIANT_SNAKE]: "ogromny wąż",
//     [CREATURE_MYSTERY_CARD.GORILLA]: "goryl",
//     [CREATURE_MYSTERY_CARD.GREMLINS]: "gremliny",
//     [CREATURE_MYSTERY_CARD.SAVAGE]: "dzikus",
//     [CREATURE_MYSTERY_CARD.SCORPION]: "skorpion",
//     [CREATURE_MYSTERY_CARD.SNAKE]: "wąż",
//     [CREATURE_MYSTERY_CARD.SPIDERS]: "pająki",
//     [CREATURE_MYSTERY_CARD.UNLEASHED_BEAST]: "bestia na wolności",
//
//     [TRAP_MYSTERY_CARD.BLOW_GUN]: "dmuchawka",
//     [TRAP_MYSTERY_CARD.BLUNT_SPEAR]: "stara dzida",
//     [TRAP_MYSTERY_CARD.COLLAPSE]: "zapadło się",
//     [TRAP_MYSTERY_CARD.CONFUSED]: "otumaniony",
//     [TRAP_MYSTERY_CARD.HIDDEN_ROPE]: "ukryta lina",
//     [TRAP_MYSTERY_CARD.NET]: "sieć",
//     [TRAP_MYSTERY_CARD.POISON]: "trucizna",
//     [TRAP_MYSTERY_CARD.SHARP_BLADE]: "ostrze",
//     [TRAP_MYSTERY_CARD.SPIDER_WEB]: "pająk",
//     [TRAP_MYSTERY_CARD.STRANGE_DISEASE]: "dziwne schorzenie",
//     [TRAP_MYSTERY_CARD.TERRIBLE_SCREAM]: "przeraźliwy krzyk",
//     [TRAP_MYSTERY_CARD.TRAP_DOOR]: "zapadnia",
//     [TRAP_MYSTERY_CARD.UNFORTUNATE_ADVENTURE]: "nieszczęśliwa przygoda",
//
//     [TREASURE_MYSTERY_CARD.AMULET_WITH_PORTRAIT_OF_BEAUTIFUL_LADY]:
//       "medalion z portretem pięknej damy",
//     [TREASURE_MYSTERY_CARD.ANTIQUE_RAPIER]: "zabytkowy rapier",
//     [TREASURE_MYSTERY_CARD.BACKPACK]: "plecak",
//     [TREASURE_MYSTERY_CARD.BARREL]: "beczka",
//     [TREASURE_MYSTERY_CARD.BLANKETS]: "koce",
//     [TREASURE_MYSTERY_CARD.BOTTLE_OF_WINE]: "butelka wina",
//     [TREASURE_MYSTERY_CARD.BOXES]: "skrzynie",
//     [TREASURE_MYSTERY_CARD.CANDLES]: "świeczki",
//     [TREASURE_MYSTERY_CARD.CAPTAIN_STONES_SPYGLASS]: "luneta kapitana Stone'a",
//     [TREASURE_MYSTERY_CARD.CAVE_WITH_FURS]: "grota ze skórami",
//     [TREASURE_MYSTERY_CARD.CEREMONIAL_BOWL]: "ceremonialna czara",
//     [TREASURE_MYSTERY_CARD.COMPASS]: "kompas",
//     [TREASURE_MYSTERY_CARD.CROCKS]: "gliniane naczynia",
//     [TREASURE_MYSTERY_CARD.GOLD]: "złoto!",
//     [TREASURE_MYSTERY_CARD.HAMMOCK]: "hamak",
//     [TREASURE_MYSTERY_CARD.HATCHED]: "siekiera",
//     [TREASURE_MYSTERY_CARD.HELMET]: "hełm",
//     [TREASURE_MYSTERY_CARD.HERBAL_MIXTURE]: "ziołowa mikstura",
//     [TREASURE_MYSTERY_CARD.OLD_CLOTHES]: "komplet starych ubrań",
//     [TREASURE_MYSTERY_CARD.OLD_MAP]: "stara mapa",
//     [TREASURE_MYSTERY_CARD.OLD_RIFLE]: "stara strzelba",
//     [TREASURE_MYSTERY_CARD.PROTECTIVE_AMULET]: "amulet ochronny",
//     [TREASURE_MYSTERY_CARD.ROPES]: "liny",
//     [TREASURE_MYSTERY_CARD.SABRE]: "szabla",
//     [TREASURE_MYSTERY_CARD.TREASURE_MAP]: "mapa skarbów",
//   },
//   mysteryCardEvent: {
//     "night demon": "nocny demon",
//     "gorilla in the camp": "goryl w obozie",
//     "Gremlins have tracked you down": "gremliny was wytropiły",
//     "failed hunt": "nieudane polowanie",
//     "curse defeated!": "klątwa pokonana!",
//   },
//   invention: {
//     basket: "koszyk",
//     bed: "łóżko",
//     belts: "pasy",
//     bow: "łuk",
//     cellar: "piwnica",
//     cellar_accusative: "piwnicę",
//     corral: "zagroda",
//     corral_accusative: "zagrodę",
//     diary: "pamiętnik",
//     drums: "bębny",
//     furnace: "piec",
//     lantern: "latarnia",
//     lantern_accusative: "latarnię",
//     moat: "ogrodzenie",
//     pit: "wilczy dół",
//     raft: "tratwa",
//     raft_accusative: "tratwę",
//     sack: "wór",
//     shield: "tarcza",
//     shield_accusative: "tarczę",
//     sling: "proca",
//     sling_accusative: "procę",
//     wall: "mur",
//     fireplace: "palenisko",
//     shortcut: "skrót",
//     snare: "wnyki",
//     spear: "dzida",
//     spear_accusative: "dzidę",
//     axe: "siekiera",
//     axe_accusative: "siekierę",
//     mast: "maszt",
//     bricks: "cegły",
//     dam: "tama",
//     dam_accusative: "tamę",
//     fire: "ogień",
//     knife: "nóż",
//     map: "mapa",
//     map_accusative: "mapę",
//     medicine: "lek",
//     pot: "naczynia",
//     rope: "lina",
//     rope_accusative: "linę",
//     shovel: "łopata",
//     shovel_accusative: "łopatę",
//   },
//   beast: {
//     alligator: "aligator",
//     alligator_accusative: "aligatora",
//     bear: "niedźwiedź",
//     bear_accusative: "niedźwiedzia",
//     birds: "ptaki",
//     boa: "boa",
//     boa_accusative: "boa'ę",
//     chamois: "kozica",
//     chamois_accusative: "kozicę",
//     cheetah: "gepard",
//     cheetah_accusative: "geparda",
//     fox: "lis",
//     fox_accusative: "lisa",
//     goats: "kozły",
//     gorilla: "goryl",
//     gorilla_accusative: "goryla",
//     iguana: "legwan",
//     iguana_accusative: "legwana",
//     jaguar: "jaguar",
//     jaguar_accusative: "jaguara",
//     puma: "puma",
//     puma_accusative: "pumę",
//     tapir: "tapir",
//     tapir_accusative: "tapira",
//     tiger: "tygrys",
//     tiger_accusative: "tygrysa",
//     "wild dog": "dziki pies",
//     "wild dog_accusative": "dzikiego psa",
//     "wild pig": "dzika świnia",
//     "wild pig_accusative": "dziką świnię",
//   },
//   discoveryToken: {
//     [DISCOVERY_TOKEN.CANDLES]: "Świece",
//     [`${DISCOVERY_TOKEN.CANDLES}_genitive`]: "Świec",
//     [DISCOVERY_TOKEN.FALLEN_TREE]: "Powalone drzewo",
//     [`${DISCOVERY_TOKEN.FALLEN_TREE}_genitive`]: "Powalonego drzewa",
//     [DISCOVERY_TOKEN.GOAT]: "Koza",
//     [DISCOVERY_TOKEN.HEALING_HERBS]: "Zioła",
//     [DISCOVERY_TOKEN.HERBS]: "Przyprawy",
//     [DISCOVERY_TOKEN.LARGE_LEAVES]: "Wielkie liście",
//     [DISCOVERY_TOKEN.NOURISHING_LARVAE]: "Pożywne larwy",
//     [DISCOVERY_TOKEN.OLD_MACHETE]: "Stara Maczeta",
//     [DISCOVERY_TOKEN.POISON]: "Trujące Pędy",
//     [`${DISCOVERY_TOKEN.SCENARIO_1}_${SCENARIO.CASTAWAYS}`]: "Zioła",
//     [`${DISCOVERY_TOKEN.SCENARIO_2}_${SCENARIO.CASTAWAYS}`]: "Oliwa",
//     [`${DISCOVERY_TOKEN.SCENARIO_3}_${SCENARIO.CASTAWAYS}`]: "Szabla pirata",
//     [`${DISCOVERY_TOKEN.SCENARIO_4}_${SCENARIO.CASTAWAYS}`]:
//       "Medalik z portretem Kobiety",
//     [DISCOVERY_TOKEN.THORNY_BUSHES]: "Cierniste krzewy",
//     [DISCOVERY_TOKEN.TOBACCO]: "Tytoń",
//     [DISCOVERY_TOKEN.TREASURE]: "Znalezisko",
//     [DISCOVERY_TOKEN.VEGETABLES]: "Jadalne kłącza",
//   },
//   cardListTab: {
//     inventions: "K. Pomysłów",
//     "mystery cards": "K. Tajemnic",
//     items: "Przedmioty",
//   },
//   alerts: {
//     [ALERT_CODE.NOT_ENOUGH_MATERIALS_FOR_ACTION]:
//       "Brakuje materiałów do wykonania tej akcji.",
//     [ALERT_CODE.NOT_ENOUGH_DETERMINATION_FOR_ABILITY]:
//       "Brakuje punktów determinacji do użycia tej umiejętności.",
//     [ALERT_CODE.BEAST_DECK_IS_EMPTY]: "Stos z bestiami jest pusty.",
//     [ALERT_CODE.PLAYERS_NOT_READY_FOR_ACTION]: "Gracze muszą zgłosić gotowość",
//     [ALERT_CODE.CHANGE_PHASE_IS_PRIME_PLAYER_ACTION]:
//       "Zmianę fazy podejmuje pierwszy gracz",
//     [ALERT_CODE.MISSING_PAWN_LEADER]: "Brakuje pionka na głównym slocie akcji",
//     [ALERT_CODE.MISSING_PAWN_HELPER]: "Brakuje pionków pomocniczych",
//   },
//   pickObject: {
//     [ABILITY.RECONNAISSANCE]: {
//       source: `$t(translation:ability.${ABILITY.RECONNAISSANCE}.name)`,
//       description:
//         "Wybierz kafelek, który zostanie umieszczony na wierzchu stosu.",
//     },
//     [ABILITY.SCOUTING]: {
//       source: `$t(translation:ability.${ABILITY.SCOUTING}.name)`,
//       description: "Dobierz token.",
//     },
//     [ABILITY.A_NEW_IDEA]: {
//       source: `$t(translation:ability.${ABILITY.A_NEW_IDEA}.name)`,
//       description: "Dobierz kartę pomysłu.",
//     },
//     [ABILITY.TRACKING]: {
//       source: `$t(translation:ability.${ABILITY.TRACKING}.name)`,
//       description: "",
//       effectLabel: "Na spód",
//       secondaryEffectLabel: "Na wierzch",
//     },
//     [ABILITY.DEFENSIVE_PLAN]: {
//       source: `$t(translation:ability.${ABILITY.DEFENSIVE_PLAN}.name)`,
//       description: `$t(translation:ability.${ABILITY.DEFENSIVE_PLAN}.comment)`,
//       effectLabel: "+$weapon$",
//       secondaryEffectLabel: "+$palisade$",
//     },
//   },
//   other: {
//     yes: "tak",
//     no: "nie",
//     shuffle: "wtasuj",
//     discard: "odrzuć",
//     keep: "zatrzymaj",
//     "sleeping under open sky": "sen pod gołym niebem",
//     "unfulfilled demand": "niespełnione wymagania",
//     fight: "walcz",
//     level: "poziom",
//     use: "użyj",
//     order: "kolejność",
//     scenario: "scenariusz",
//     round: "runda",
//     "action order": "kolejność akcji",
//     objective: "cel",
//     description: "opis",
//     mechanics: "budowa stosu",
//     "wood pile": "stos drewna",
//     "camp movement": "przeniesienie obozu",
//     "food rotted": "Jedzenie zgniło",
//     confirm: "zatwierdź",
//     cancel: "anuluj",
//     ability: "umiejętność",
//     draw: "dobierz",
//     finish: "zakończ",
//     hour: "godzina",
//     hour_accusative_one: "godzinę",
//     hour_accusative_few: "godziny",
//     hour_accusative_many: "godzin",
//     male: "mężczyzna",
//     female: "kobieta",
//     owned: "posiadane",
//     future: "przyszłe",
//     close: "zamknij",
//     next: "dalej",
//     abilityPreview: "podgląd umiejętności",
//     invention: "karta pomysłu",
//     pageNotFound: "Nie znaleziono strony",
//     backToHomePage: "Powrót do strony głównej",
//     dice: "kość",
//   },
//   gameSettings: {
//     difficulty: "Poziom trudności",
//     scaled: "Skalowany liczbą graczy",
//     custom: "Własny",
//     startingItems: "przedmioty startowe",
//     playerAmount: "liczba graczy",
//     saveGame: "zapisz grę",
//     restart: "zrestartuj",
//     finishGame: "zakończ grę",
//     savedGames: "zapisane gry",
//     load: "wczytaj",
//     delete: "usuń",
//   },
//   generalSettings: {
//     title: "Opcje",
//     UIGuide: `Przewodnik po interfejsie`,
//   },
//   userProfile: {
//     accountSettings: "Ustawienia konta",
//     passwordChange: "Zmiana hasła",
//     backToProfile: "Wróć do profilu",
//   },
//   menu: {
//     refresh: "odśwież",
//     "create game": "stwórz grę",
//     "load game": "wczytaj grę",
//     "join with game code": "dołącz wpisując kod gry",
//     join: "dołącz",
//     name: "nazwa",
//     host: "gospodarz",
//     players: "gracze",
//     scenario: "scenariusz",
//     mainMenu: "główne menu",
//     guide: "poradnik",
//     password: "hasło",
//     public: "publiczna",
//     "private game": "gra prywatna",
//     "enter password": "wpisz hasło",
//     error: "błąd",
//     save: "zapisz",
//     "invitation code": "kod zaproszenia",
//     "copy to clipboard": "kopiuj do schowka",
//     show: "pokaż",
//     hide: "ukryj",
//     "sign in": "zaloguj",
//     "sign in_reflexive pronoun": "zaloguj się",
//     "sign up": "zarejestruj",
//     "sign out": "wyloguj",
//     "signing in": "logowanie",
//     "signing up": "rejestrowanie",
//     "new account": "nowe konto",
//     username: "nazwa użytkownika",
//     "repeat password": "powtórz hasło",
//     "already have an account?": "masz już konto?",
//     "don't have an account yet?": "nie masz jeszcze konta?",
//     "create one": "stwórz nowe",
//     "quick game": "szybka gra",
//     settings: "opcje",
//     multiplayer: "wielu graczy",
//     "default game name": "gra użytkownika {{username}}",
//     win: "wygrana",
//     defeat: "przegrana",
//     "rounds survived": "przetrwane rundy",
//     "to menu": "do menu",
//     "to lobby": "do lobby",
//     "server connection lost": "Brak połączenia z serverem",
//     "another connection attempt in":
//       "Kolejna próba nastąpi za {{seconds}} sekund.",
//     "login request limit reached":
//       "Wprowadziłeś/aś błędne hasło za dużo razy. Twoje konto zostało tymczasowo zablokowane na {{tryAfter}} minut.",
//   },
//   guide: {
//     contents: {
//       [GUIDE_CONTENT.INTRODUCTION]: "Wprowadzenie",
//       [GUIDE_CONTENT.EVENT_PHASE]: `$t(translation:phase.phase, {"phase": "event"})`,
//       [GUIDE_CONTENT.MORALE_PHASE]: `$t(translation:phase.phase, {"phase": "morale"})`,
//       [GUIDE_CONTENT.ACTION_PHASE_PLANNING]: "Planowanie Akcji",
//       [GUIDE_CONTENT.THREAT_ACTION]: `$t(translation:action.action, {"action": "threat"})`,
//       [GUIDE_CONTENT.HUNT_ACTION]: `$t(translation:action.action, {"action": "hunt"})`,
//       [GUIDE_CONTENT.BUILD_ACTION]: `$t(translation:action.action, {"action": "build"})`,
//       [GUIDE_CONTENT.GATHER_ACTION]: `$t(translation:action.action, {"action": "gather"})`,
//       [GUIDE_CONTENT.EXPLORATION_ACTION]: `$t(translation:action.action, {"action": "explore"})`,
//       [GUIDE_CONTENT.ARRANGE_CAMP_ACTION]: `$t(translation:action.arrange camp)`,
//       [GUIDE_CONTENT.REST_ACTION]: `$t(translation:action.action, {"action": "rest"})`,
//       [GUIDE_CONTENT.ACTION_PHASE_RESOLVE]: `Rozstrzyganie Akcji`,
//       [GUIDE_CONTENT.WEATHER]: `$t(translation:phase.phase, {"phase": "weather"})`,
//       [GUIDE_CONTENT.NIGHT]: `$t(translation:phase.phase, {"phase": "night"})`,
//     },
//     pages: {
//       introduction: {
//         gameObjective: {
//           title: "Cel gry",
//           paragraph: `Robinson Crusoe to gra kooperacyjna. Gracze albo razem odniosą
//             zwycięstwo (jeśli uda im się przetrwać i zrealizować cel określony przez
//             Scenariusz), albo razem poniosą porażkę (jeśli przynajmniej jedna z Postaci
//             gracza zginie lub jeśli nie spełnią celu Scenariusza w określonej liczbie rund)`,
//         },
//         roundProgression: {
//           title: `Przebieg rundy`,
//           paragraph: `Gra trwa kilka rund, których liczba określona jest na karcie każdego
//           Scenariuza. Każda runda jest podzielona na fazy, które są rozpatrywane
//           w następujący sposób:`,
//         },
//         phaseDescription: {
//           [PHASE.EVENT]: `podczas niej dociągana jest i rozpatrywana wierzchnia kartę z
//               talii Wydarzenia.`,
//           [PHASE.MORALE]: `rozpatruje ją tylko Pierwszy Gracz, który odrzuca lub
//               otrzymuje żetony Determinacji zgodnie ze wskazaniem na torze Morale.`,
//           [PHASE.PRODUCTION]: `gracze otrzymują surowce, których źródła znajdują się na
//               kafelku Wyspy, na którym mieści się Obóz graczy.`,
//           [PHASE.ACTION]: `jest to najważniejsza faza w rundzie, podczas której gracze
//               najpierw wspólnie planują swoje działania, a następnie je realizują`,
//           [PHASE.WEATHER]: ` gracze muszą zmierzyć się z pogodą określoną przez rzut
//               kośćmi i/lub żetony Pogody.`,
//           [PHASE.NIGHT]: `w której gracze będą m.in. musieli się wyżywić, a także będą
//               cierpieć, jeśli nie będą posiadać Schronienia`,
//         },
//       },
//       eventPage: {
//         title: `$t(translation:phase.phase)`,
//         paragraph1: `W tej fazie dobierana jest karta wydarzenia i kładziona na polu
//           zagrożenia.`,
//         li1: `<strong>Ikona przygody</strong> oznacza, że przy kolejnej akcji
//             typu odpowiadającemu kolorowi ikony zostanie rozpatrzona karta
//             przygody (w tym przypadku exploracji).`,
//         li2: `<strong>Ikona księgi</strong> wywołuje efekt odpowiedni dla
//               konkretnego scenariusza (opisany w karcie scenariusza).`,
//         li3: `<strong>Efekt Wydarzenia</strong> wywołuje efekt (przeważnie
//               negatywny) przy dobieraniu karty.`,
//         li4: `<strong>Akcja Zagrożenia</strong> jest to akcja która gracze muszą
//               wykonać, żeby usunąć kartę z pola zagrożenia.`,
//         li5: `<strong>Efekt Zagrożenia</strong> jest to efekt który zostanie
//               wywołany jeśli karta zostanie wypchnięta z pól zagrożenia.`,
//         paragraph2: `Jeśli przy dobieraniu karty wydarzenia, na polu leży już karta, nowa
//             karta zajmuje jej miejsce, a ta przesuwana jest na pole po lewej i wypycha
//             kartę lężącą na lewym polu. Jeśli karta lewego pola zostanie wypchnięta, znika
//             i wywoływany jest jej efekt zagrożenia.`,
//       },
//       moralePage: {
//         section1: {
//           title: `Faza Morali`,
//           paragraph1: `W tej fazie sprawdzany jest poziom morali. Na jego podstawie
//           przydzialane/zabierane są żetony determinacji <Icon icon="determination"/>
//           <strong>pierwszemu </strong> <Icon icon="star"/>
//           graczowi.`,
//           paragraph2: `Determinacja <Icon icon="determination"/> jest potrzebna do używania
//           umiejętności przez postać.`,
//           ul1: {
//             li1: `Gracz odrzuca/otrzymuje ilość żetonów determinacji
//               <Icon icon="determination"/> odpowiadającą poziomowi morali`,
//             li2: `Jeśli poziom morali <Icon icon="morale-arrow"/>
//               jest ujemny, pierwszemu graczowi <Icon icon="star"/> są zabierane
//               żetony determinacji.`,
//             li3: `Jeśli graczowi brakuje żetonów do odrzucenia otrzymuje ranę zgodnie
//               z zasadą <strong>niespełnionych wymagań</strong> za każdy brakujący
//               żeton.`,
//             li4: `Jeśli morale wynosi 3, gracz dostaje 3 żetony determinacji
//                 <Icon icon="determination"/> oraz leczy 1 ranę {<Icon icon="heart"/> .`,
//           },
//         },
//         section2: {
//           title: `Niespełnione wymagania`,
//           paragraph1: `Jeśli gra każe odrzucić przez gracza jakiś zasób, a ten jego nie
//               posiada, otrzymuje ranę za każdy brakujący zasób. Np.`,
//           li: `Wymagane jest wybranie 2 zasobów z jedzeniem <Icon icon="food"/>
//               z kafelków graniczących z obozem po czym zasobe te stają się
//               niedostępne. Na kafelkach w okół obozu istnieje tylko 1 zasób z
//               jedzeniem. Gracze dostają po 1 ranie.`,
//           paragraph2: `W przypadku twierdzenia JEŚLI TO MOŻLIWE gracze nie otrzymują rany za
//               brakujące zasoby.`,
//         },
//       },
//       actionPage: {
//         section1: {
//           paragraph1: `Jest to najważniejsza faza gry i składa się z dwóch etapów:
//               Planowania i Rozpatrywania Akcji.`,
//         },
//         section2: {
//           title1: `Planowanie`,
//           paragraph1: `Podczas planowania Akcji gracze nie rozgrywają indywidualnych tur,
//              ale wspólnie decydują, które Akcje chcą wykonać w danej rundzie. Następnie
//              zaznaczają swój wybór, przypisując swoje pionki do określonych Akcji.`,
//           paragraph2: `Pionki reprezentują aktywność Postaci na wyspie, więc dysponując
//              dwoma pionkami, każdy gracz może podjąć do dwóch akcji. Jednakże, niejedna
//              Akcja wymaga przypisania więcej niż jednego pionka, aby ją wykonać.`,
//           paragraph3: `Każdy rodzaj Akcji (z wyjątkiem Akcji Zagrożenia) może być
//              podejmowany wielokrotnie w tej samej rundzie i przez różnych graczy.`,
//           paragraph4: `Dostępne są następujące Akcje:`,
//           actionDescription: {
//             [ACTION.THREAT]: `<strong>Akcja Zagrożenia</strong> - akcja ta jest
//                 podejmowana, aby zapobiec wprowadzeniu w życie efektu Zagrożenia
//                 przedstawionego na konkretnej karcie Wydarzenia znajdującej się na planszy
//                 w polu Akcji Zagrożenia. Za wykonanie tej Akcji gracz otrzymuje korzyści
//                 przedstawione na karcie (np. żetony Determinacji lub inne zasoby).`,
//             [ACTION.HUNT]: `<strong>Polowanie</strong> - pozwala graczowi uzyskać
//                 większą ilość pożywienia i skór, ale zwykle wiąże się z otrzymaniem Ran.`,
//             [ACTION.BUILD]: `<strong>Budowa</strong> – pozwala graczom budować Schronienie,
//                 Dach, Palisadę lub Broń oraz przekształcać Pomysły w Przedmioty.`,
//             [ACTION.GATHER]: `<strong>Zbieranie Surowców</strong> - pozwala graczom
//                 zdobywać zasoby dostępne na odkrytych kafelkach Wyspy.`,
//             [ACTION.EXPLORE]: `<strong>Eksploracja</strong> - pozwala graczom odkrywać
//                 wyspę.`,
//             [ACTION.ARRANGE_CAMP]: `<strong>Porządkowanie Obozu</strong> – pozwala
//                 graczowi otrzymać 2 żetony Determinacji i zwiększyć o 1 poziom Morale
//                 (w grze 4-osobowej, gracz wybiera czy otrzymuje żetony Determinacji, czy
//                 zwiększa Mo- rale).`,
//             [ACTION.REST]: `<strong>Odpoczynek</strong> – pozwala uleczyć 1 Ranę`,
//           },
//         },
//         section3: {
//           paragraph1: `Aby zaplanować akcję przeciągnij pionek na miejsce akcji.`,
//           li1: `- umieszczenie pionka w tym slocie oznacza, że dana postać
//               wykonuje daną akcję.`,
//           li2: `- jest to slot pomocniczy. Pionki na tym miejscu tylko asystują i
//               nie ponoszą żadnych konsekwencji za tą akcję.`,
//         },
//       },
//       threatPage: {
//         section1: {
//           ul1: {
//             li1: `Na początku każdej rundy dobierana jest nowa karta Wydarzenia, któ-
//                 ra zawiera określoną Akcję Zagrożenia. Gracze mogą ją wykonać, aby
//                 zapobiec późniejszemu wprowadzeniu efektu Zagrożenia danej karty`,
//             li2: `Każda Akcja Zagrożenia jest jednorazową Akcją dostępną na określo-
//                 nej karcie i po jej rozpatrzeniu karta zostaje odrzucona`,
//             li3: `Do wykonania Akcji Zagrożenia trzeba przypisać przedstawioną na
//                 karcie liczbę pionków (1 lub 2) i spełnić pewne dodatkowe wymaga-
//                 nia (na przykład: posiadać pożywienie lub drewno potrzebne do od-
//                 rzucenia, posiadać minimalny poziom broni, itp.)`,
//           },
//           paragraph1: `Możliwe wymagania do podjęcia Akcji Zagrożenia:`,
//           ul2: {
//             li1: `Akcja wymaga przypisania 1 pionka`,
//             li2: `wykonanie Akcji wymaga posiadania Broni na poziomie 1 (lub wyż-
//                 szym). W momencie rozpatrywania Akcji nie obniża się poziomu Broni
//                 o wskazaną wartość. Jeśli gracze nie dysponują określonym poziomem
//                 Broni, nie mogą podjąć takiej Akcji`,
//             li3: `wykonanie Akcji wymaga posiadania (i odrzucenia w momencie
//                 rozpatrywania) 1 przedstawionego surowca`,
//             li4: `wykonanie Akcji wymaga posiadania przedstawionego wytworzo- nego
//                 Przedmiotu. Przedmiot ten nie jest tracony.`,
//           },
//         },
//       },
//       huntPage: {
//         section1: {
//           ul1: {
//             li1: `Polowanie zawsze wymaga użycia 2 pionków.`,
//             li2: `Polowanie jest możliwe tylko, jeśli na planszy znajduje się talia
//                 Polowa- nia składająca się z przynajmniej jednej karty Bestii. Jedna
//                 karta Bestii umożliwia jedno polowanie.`,
//             li3: `Można polować nawet, jeśli poziom Broni wynosi 0`,
//             li4: `Polowanie zawsze kończy się sukcesem (z wyjątkiem kiedy postać
//                 polująca zginie od ran).`,
//           },
//           ul2: {
//             li1: `<strong>Siła bestii</strong> - jeśli jest większa od poziomu
//                 broni <Icon icon="weapon"/> gracz dostaje obrażenia za każdy brakujący
//                 poziom.`,
//             li2: `<strong>Spadek poziomu broni</strong> - liczba o jaką spada
//                 poziom broni po polowaniu. Za każdy brakujący poziom gracz
//                 dostaje obrażenia.`,
//             li3: `<strong>Zdobyte pożywienie</strong> - dodawane jest do przyszłych
//                 surowców.`,
//             li4: `<strong>Zdobyta skóra</strong> - dodawana jest do przyszłych
//                 surowców.`,
//           },
//         },
//       },
//       buildPage: {
//         section1: {
//           ul1: {
//             li1: `Budowa wymaga użycia 1 lub 2 pionków.`,
//             li2: `Używając tylko 1 pionka, podczas rozpatrywania Akcji, gracz będzie
//                 musiał rzucić kośćmi Budowy, aby sprawdzić czy będzie ona udana, czy
//                 otrzyma Rany lub czy spotka go Przygoda.`,
//             li3: `Przypisując do Akcji 2 pionki, będzie ona na pewno udana i gracz nie
//                 będzie musiał wykonywać rzutu żadnymi kośćmi.`,
//             li4: `Akcja pozwala zbudować Schronienie, Dach, Palisadę czy Broń lub
//                 przekształcać Pomysły w Przedmioty.`,
//           },
//         },
//         section2: {
//           ul1: {
//             li1: `<strong>Schronienie</strong> <br />W fazie Nocy chroni przed
//                 otrzymywaniem Ran za spanie pod gołym niebem. Schronienie
//                 umożliwia budowę Dachu i Palisady. Raz zbudowane Schronienie nie
//                 może zostać utracone (chyba że zasady Scenariusza mówią inaczej).
//                 Należy zwrócić uwagę na to, że niektóre kafelki Wyspy mogą
//                 posiadać naturalne Schronienie.`,
//             li2: `<strong>Dach</strong> <br />
//                 Chroni przed warunkami atmosferycznymi podczas fazy Pogody. Aby
//                 budować Dach, trzeba najpierw posiadać Schronienie – musi być ono
//                 albo wybudowane, albo Obóz graczy musi znajdować się na kafelku
//                 Wyspy z naturalnym Schronieniem.`,
//             li3: `<strong>Palisada</strong> <br />
//                 Chroni przed skutkami Sztormu i innymi efektami w trakcie gry (np.
//                 atakami dzikich zwierząt). Aby budować Palisadę, trzeba najpierw
//                 posiadać Schronienie – musi być ono albo wybudowane, albo Obóz
//                 graczy musi znajdować się na kafelku Wyspy z naturalnym
//                 Schronieniem.`,
//             li4: `<strong>Broń</strong> <br />
//                 Potrzebna głównie podczas Polowania. Im wyższy poziom Broni, tym
//                 mniejsze prawdopodobieństwo, że gracz otrzyma Rany podczas Walki z
//                 Bestią.`,
//             li5: `<strong>Przedmioty</strong> <br />
//                 Wytworzenie niektórych Przedmiotów zazwyczaj przynosi dodat- kowy
//                 efekt, który może okazać się dla graczy bardzo przydatny (np.
//                 „Mapa” zapewnia dodatkowy pionek do wykorzystania podczas Akcji
//                 Eksploracji).`,
//           },
//           paragraph1: `W przypadku konstrukcji (schronienia, dachu i palisady) możesz
//               zmieniać rodzaj surowca którego chcesz użyć.`,
//         },
//       },
//       gatherPage: {
//         section1: {
//           ul1: {
//             li1: `Zbieranie Surowców wymaga użycia 1 lub 2 pionków.`,
//             li2: `Używając tylko 1 pionka, podczas rozpatrywania Akcji, gracz będzie
//                 musiał rzucić kośćmi Zbierania Surowców, aby sprawdzić czy będzie
//                 ona udana, czy otrzyma Rany lub czy spotka go Przygoda.`,
//             li3: `Przypisując do Akcji 2 pionki, będzie ona na pewno udana i gracz nie
//                 będzie musiał wykonywać rzutu żadnymi kośćmi.`,
//             li4: `W ramach jednej Akcji gracz zbiera surowiec tylko z jednego, wybranego
//                 Źródła. Każde Źródło dostarcza jedną sztukę surowca (ilość ta
//                 może być modyfikowana przez efekty działania niektórych Przedmio-
//                 tów, Przygód lub Wydarzeń itp.).`,
//             li5: `Im dalej kafelek znajduje się od obozu, tym więcej akcja na nim
//                 będzie wymagała pionków.`,
//           },
//         },
//         section2: {
//           paragraph1: `Możliwe surowce do zebrania: `,
//           ul1: {
//             li1: `<strong>Żródło pożywienia <Icon icon="food"/></strong>`,
//             li2: `<strong>Żródło pożywienia <Icon icon="food"/></strong>`,
//             li3: `<strong>Żródło drewna <Icon icon="wood"/></strong>`,
//           },
//         },
//       },
//       explorePage: {
//         section1: {
//           ul1: {
//             li1: `Eksploracja wymaga użycia 1 lub 2 pionków.`,
//             li2: `Używając tylko 1 pionka, podczas rozpatrywania Akcji, gracz będzie
//                 musiał rzucić kośćmi Eksploracji, aby sprawdzić czy będzie ona
//                 udana, czy otrzyma Rany lub czy spotka go Przygoda.`,
//             li3: `Im dalej kafelek znajduje się od obozu, tym więcej akcja na nim
//                 będzie wymagała pionków.`,
//           },
//           ul2: {
//             li1: `<strong> Żródło surowca</strong> (w tym przypadku jedzenia
//                 <Icon icon="food"/>)`,
//             li2: `<strong>Bestia</strong> - losowa karta bestii dodawna do talii
//                 polowania po udanej exploracji.`,
//             li3: `<strong>Żetony odkryć</strong> - dodawane do przyszłych surowców
//                 po udanej exploracji.`,
//             li4: `<strong>Naturalne schronienie</strong> - posiadanie obozu na tym
//                 kafelku działa podobnie jak posiadanie wybudowanego schronienia
//                 lecz z istotnymi różnicami.`,
//             li5: `<strong>Totem</strong> - efekt opisany w karcie scenariusza.`,
//             li6: `<strong>Rodzaj terenu</strong> - niektóre akcje
// 								wymagają posiadanie odkrytego kafelka z
// 								konkretnym rodzajem terenu (np. budowa karty
// 								pomysłu "Nóż" wymaga posiadania odkrytego
// 								kafelka z terenem gór).`,
//           },
//         },
//       },
//       arrangeCampPage: {
//         section1: {
//           ul1: {
//             li1: `Porządkowanie Obozu wymaga użycia 1 pionka.`,
//             li2: `Porządkowanie Obozu pozwala graczowi uzyskać 2 żetony Determi- nacji
//             oraz zwiększyć Morale o 1 poziom (w przypadku rozgrywki 4-osobowej
//             gracz musi zdecydować czy wybiera jedno, czy drugie).`,
//             li3: `Każdego pionka gracza, który jest przypisany do Porządkowania Obo-
//             zu rozpatruje się oddzielnie, co oznacza, że jeśli jeden gracz
//             przypisze oba swoje pionki do Porządkowania Obozu, to będzie
//             rozpatrywał tę Akcję dwukrotnie i w rezultacie otrzyma 4 żetony
//             Determinacji oraz zwiększy Morale o 2 poziomy.`,
//           },
//         },
//       },
//       restPage: {
//         section1: {
//           ul1: {
//             li1: `Odpoczynek wymaga użycia 1 pionka.`,
//             li2: `Odpoczynek pozwala graczowi uleczyć 1 Ranę.`,
//             li3: `Każdego pionka gracza, który jest przypisany do Odpoczynku roz-
//                 patruje się oddzielnie, co oznacza, że jeśli jeden gracz przypisze
//                 oba swoje pionki do Odpoczynku, to będzie rozpatrywał go dwukrotnie
//                 i w rezultacie otrzyma uleczy 2 Rany.`,
//           },
//         },
//       },
//       actionResolvePage: {
//         title: `Rozpatrywanie Akcji`,
//         section1: {
//           paragraph1: `
//               Gdy już rozdysponujesz wszystkie pionki kliknij ikonę kompasu
//               <Icon icon="compass"/>, aby przejść do
//               rozpatrywania akcji (w przypadku gry wieloosobowej gracze muszą
//               wyrazić gotowość).`,
//           paragraph2: `Podczas wykonywania akcji wszystkie zdobyte surowce, żetony
//                 odkryć i karty skarbów umieszczane są w <strong>przyszłych surowcach
//                 </strong>.`,
//           paragraph3: `Po fazie akcji surowce umieszczane są w <strong>posiadanych
//                 surowcach</strong> i stają się dostępne dla graczy.`,
//         },
//         section2: {
//           title: `Rzucanie koścmi`,
//           paragraph1: `W akcjach takich jak <strong>exploracja</strong>,
//               <strong>zbieranie surowców</strong> oraz <strong>budowanie</strong>
//               możliwe jest przydzielenie 1 pionka mniej. W takim przypadku gracz
//               rzuca 3 koścmi, a pomyślność akcji jest zależna od wyniku rzutu jednej
//               z nich.`,
//           ul1: {
//             li1: `<strong>Sukces</strong> - Akcja się udała.`,
//             li2: `<strong>Żetony determinacji</strong> - Akcja się nie udała.
//                 Gracz dostaje 2 żetony determinacji.`,
//             li3: `<strong>Przygoda</strong> - Gracz rozpatruje kartę przygody.`,
//             li4: `<strong>Obrażenia</strong> - Gracz otrzymuje ranę.`,
//             li5: `<strong>Pusto</strong> - Nic się nie dzieje.`,
//           },
//         },
//       },
//       weatherPage: {
//         section1: {
//           paragraph1: `W tej fazie gracze muszą zmierzyć się z warunkami atmosferycznymi
//               panującymi na wyspie. Pogoda jest losowana poprzez rzut koścmi. Rodzaj
//               rzucanych kości dla każdej rundy zaznaczony jest w karcie scenariusza.`,
//         },
//         section2: {
//           title: `Kości pogody`,
//           ul: {
//             li1: `<strong>Kość deszczowa</strong>`,
//             li2: `<strong>Kość śniegu</strong>`,
//             li3: `<strong>Kość wygłodniałych zwierząt</strong>`,
//           },
//         },
//         section3: {
//           title: `Żetony pogody`,
//           ul1: {
//             li1: `W trakcie trwania gry na polu pogody mogą zostać położone 3 rodzaje
//             żetonów.`,
//             li2: `Jeśli na polu pogody istnieje już dany żeton, nic się nie dzieje.`,
//           },
//           ul2: {
//             li1: `<strong>Żeton chmury deszczowej</strong> - reprezentuje 1 chmure
//                 deszczową.`,
//             li2: `<strong>Żeton chmury zimowej</strong> - reprezentuje 1 chmure
//                 śniegową.`,
//             li3: `<strong>Żeton sztormu</strong> - niszczony jest 1 poziom
//                 <Icon icon="palisade"/> palisady.`,
//           },
//         },
//         section4: {
//           title: `Chmury`,
//           paragraph1: `Na kościach Deszczowej i Zimowej występują 2 rodzaje chmur:`,
//           ul1: {
//             li1: `<strong>Deszczowa chmura</strong>`,
//             li2: `<strong>Śniegowa chmura</strong>`,
//           },
//         },
//         section5: {
//           title: `Rozpatrywanie chmur`,
//           ul1: {
//             li1: `Sumowana jest liczba zimowych chmur (z kości oraz żetonu). Na każdą
//                 zimową chmurę odrzucane jest 1 <Icon icon="wood"/> drewno (w celu ogrzania
//                 się).`,
//             li2: `Sumowana jest liczba wszytkich chmur (z kości oraz żetonów) i
//                 porównywana z poziomem dachu. <Icon icon="roof"/> Poziom dachu wskazuje
//                 ilość chmur przed którymi chroni.`,
//             li3: `Za każdy brakujący poziom dachu odrzucane jest 1
//                 <Icon icon="food"/> jedzenie oraz 1 <Icon icon="wood"/> drewno (w celu
//                 ogrzania się).`,
//             li4: `Za każdy surowiec którego gracze nie mogą odrzucić, dostają po 1
//                 ranie.`,
//             li5: `Żetony pogody są odrzucane.`,
//           },
//         },
//         section6: {
//           title: `Wygłodniałe zwierzęta`,
//           paragraph1: `Na kości Wygłodniałych zwierząt widnieją następujące efekty wpływające
//           na graczy:`,
//           ul1: {
//             li1: ` Rozpatrywana jest walka z bestią o sile 3. (walczy <strong>pierwszy
//                 gracz</strong> poziom broni nie spada.)`,
//             li2: `Poziom <Icon icon="palisade"/> palisady spada o 1.`,
//             li3: `Gracze odrzucają 1 <Icon icon="food"/> jedzenie`,
//           },
//         },
//       },
//       nightPage: {
//         section1: {
//           ul1: {
//             li1: `W fazie Nocy każdy gracz musi zjeść posiłek. W tym celu należy
//               odrzucić po 1 pożywieniu za każdego gracza. Jeśli gracze nie
//               dysponują wystarcza- jącą ilością pożywienia, to wspólnie decydują,
//               kto nie będzie jadł. Każdy gracz, za którego nie zostanie odrzucone
//               pożywienie, otrzymuje 2 Rany`,
//             li2: `W fazie Nocy gracze mogą zdecydować o przeniesieniu Obozu na
//               sąsiedni kafelek. Od tego wyboru zależy, jakie surowce gracze
//               otrzymają w następnej rundzie w fazie Produkcji i które
//               kafelki/obszary będą sąsiadujące dla celów Zbierania Surowców oraz
//               Eksploracji, itp.`,
//             li3: `Jeśli gracze nie mają wybudowanego Schronienia (i ich Obóz nie znaj-
//               duje się na kafelku Wyspy z naturalnym Schronieniem), to każdy gracz
//               otrzymuje 1 Ranę za spanie pod gołym niebem.`,
//             li4: `Jeśli gracze nie posiadają niepsującego się pożywienia albo
//               Przedmiotu („Piwnica”) czy Skarbu („Skrzynie” lub „Beczka”), który
//               pozwala na przechowywanie pożywienia, to całe pożywienie, pozostałe
//               po fazie Nocy, psuje się i jest odrzucane.`,
//             li5: `Po fazie nocy umiejetności postaci są odświeżąne i mogą zostać
//               ponownie użyte.`,
//           },
//         },
//       },
//     },
//   },
//   UITour: {
//     prompt: {
//       question: "Czy chcesz być oprowadzony po interfejsie gry?",
//       dontAskAgain: "Nie pytaj więcej",
//     },
//     steps: {
//       [UI_TOUR_STEP_ID.PHASE]: {
//         content: `Tutaj wyświetlana jest aktualna faza. Kliknij w
//             <strong><em>$t(other.order)</em></strong>, aby kontynuować.`,
//       },
//       [UI_TOUR_STEP_ID.PHASE_LIST]: {
//         content: `Każda runda składa się z <strong>6 faz</strong>,
//             które są rozpatrywane w kolejności przedstawionej na tej liście.`,
//       },
//       [UI_TOUR_STEP_ID.MORALE]: {
//         title: `Morale`,
//         content: `<span>Ten panel przedstawia aktualny poziom <em>morali</em>
//             (<Icon icon="morale-arrow"/>) oraz powiązaną z nim ilość otrzymywanej bądź traconej
//             <em>determinacji</em> (<Icon icon="determination"/>). Jest ona wymagana do
//             posługiwania się umiejętnościami postaci.</span>`,
//       },
//       [UI_TOUR_STEP_ID.MAP]: {
//         title: `Mapa`,
//         content: `Mapa wyspy składa się z sześciokątnych kafelków, z których każdy
//             reprezentuje inny fragment terenu. Tutaj możesz przeciągać pionki w celu
//             zbierania surowców i/lub eksploracji.
//             <ul>
//               <li>
//                   <strong>Przybliżanie i oddalanie</strong> – aby
//                   dostosować widok mapy, używaj kółka myszy lub przycisków
//                   „+” i „-”.
//               </li>
//               <li>
//                   <strong>Przesuwanie mapy</strong> – aby zobaczyć inne
//                   części wyspy, przytrzymaj lewy przycisk myszy i
//                   przeciągnij mapę w wybranym kierunku.
//               </li>
//             </ul>`,
//       },
//       [UI_TOUR_STEP_ID.RESOURCES]: {
//         title: `Surowce`,
//         content: `
//             Tutaj możesz śledzić należące do Twojej drużyny surowce. Są one
//             podzielone na 2 kategorie.
//             <ul>
//               <li>
//                   <strong>Surowce przyszłe</strong> (na górze) - surowce
//                   które zdobyliście w aktualnej Fazie Akcji, ale ich
//                   jeszcze nie macie. Przechodzą one do
//                   <strong>posiadanych surowców</strong> po rozpatrzeniu
//                   wszystkich akcji.
//               </li>
//               <li>
//                   <strong>Surowce posiadane</strong> (na dole) - są w
//                   waszym posiadaniu i możecie ich używać.
//               </li>
//             </ul>`,
//       },
//       [UI_TOUR_STEP_ID.CONSTRUCTIONS]: {
//         title: `Konstrukcja i broń`,
//         content: `
//             Aby przetrwać na bezludnej wyspie, musicie zadbać o odpowiednie
//             schronienie oraz broń. Ich budowa wymaga określonej ilości
//             jednego z surowców widocznych przy danej konstrukcji. Jeśli
//             posiadasz oba rodzaje wymaganych surowców, możesz wybrać,
//             którego chcesz użyć, klikając na jego ikonę.
//             <ul>
//               <li>
//                   <strong>Schronienie</strong> (<Icon icon="shelter"/>) - chroni graczy
//                   podczas snu, co sprawia, że nie otrzymują obrażeń za
//                   spanie pod gołym niebem. Można zbudować tylko 1 poziom.
//               </li>
//               <li>
//                   <strong>Dach</strong> (<Icon icon="roof"/>)
//                   - chroni graczy i zasoby przed warunkami
//                   atmosferycznymi.
//               </li>
//               <li>
//                   <strong>Palisada</strong> (<Icon icon="palisade"/>) - chroni graczy przed dzikimi
//                   zwierzętami.
//               </li>
//               <li>
//                   <strong>Broń</strong> (<Icon icon="weapon"/>) - Służy do polowań na bestie.
//                   Im groźniejsza bestia tym potrzebny jest wyższy poziom broni, aby
//                   wybrnąć bez szwanku.
//               </li>
//             </ul>`,
//       },
//       [UI_TOUR_STEP_ID.CARDS]: {
//         title: `Posiadane Karty`,
//         content: `Tutaj mieszczą się 3 rodzaje kart
//             <ul>
//               <li>Karty pomysłów</li>
//               <li>Karty tajemnic</li>
//               <li>Przedmioty</li>
//             </ul>
//             Przełączaj się miedzy nimi klikając w zakładki.`,
//       },
//       [UI_TOUR_STEP_ID.THREAT]: {
//         title: `Akcje zagrożenia`,
//         content: `
//           Na początku każdej rundy w pierwszej fazie umieszczana jest
//           tutaj Nowa Karta wydarzenia.
//           <br />
//           Wykonuj związane z nimi akcje, aby otrzymywać nagrody i uniknać
//           negatywnych konsekwencji.`,
//       },
//       [UI_TOUR_STEP_ID.ARRANGE_REST]: {
//         title: `Akcje porządkowania obozu i odpoczynku`,
//         content: `
//             Te miejsca służą do planowania akcji odpoczynku i porzadkowania
//             obozu.
//             <ul>
//               <li>
//                   Do każdej z tych akcji można przypisać nieskończona
//                   ilośc pionków
//               </li>
//               <li>Każda akcja kończy się sukcesem</li>
//             </ul>`,
//       },
//       [UI_TOUR_STEP_ID.CHARACTER]: {
//         title: `Karta postaci`,
//         content: `Tutaj mieszczą się informacje o Twojej postaci oraz
//             postaciach pobocznych.`,
//       },
//       [UI_TOUR_STEP_ID.CHARACTER_IMG]: {
//         title: `Postać`,
//         content: `Tak wygląda twoja postać. W jej obrębie będą
//             wyświetlane otrzymywane przez nią rany dla konkretnych części ciała.`,
//       },
//       [UI_TOUR_STEP_ID.CHARACTER_EXPENDABLES]: {
//         title: `Osobiste Zasoby`,
//         content: `Twoja postać posiada zasoby które mogą
//             być użyte tylko przez nią.
//             <ul>
//               <li>Poziom broni (<Icon icon="weapon"/>) - wykorzystywany podczas polowania.</li>
//               <li>Żetony determinacji (<Icon icon="determination"/>) - potrzebne do używania umiejętności</li>
//             </ul>`,
//       },
//       [UI_TOUR_STEP_ID.CHARACTER_PAWNS]: {
//         title: `Pionki`,
//         content: `Pionki służą do planowania akcji. Reprezentują
//             one czas, który Twoja postać poświęca na wykonanie określonego zadania. W fazie
//             akcji przeciągnij je na odpowiednie pola, aby zaplanować kolejne działania.`,
//       },
//       [UI_TOUR_STEP_ID.CHARACTER_ABILITIES]: {
//         title: `Umiejętności`,
//         content: `
//             Tutaj znajdują się lista umiejetności Twojej postaci.
//             <ul>
//               <li>Niektórych umiejetności da się użyć tylko w określonych sytuacjach.</li>
//               <li>Umiejętności związane z przerzutem kości używa się bezpośrednio w oknie
//                   rozpatrywana akcji.</li>
//             </ul>`,
//       },
//       [UI_TOUR_STEP_ID.CHARACTER_SIDE_CHARACTERS]: {
//         title: `Postaci Poboczne`,
//         content: `
//             Tutaj znajdują się postaci poboczne i ich pionki.
//             <ul>
//               <li>Każdy gracz ma do nich dostęp i kontrolę.</li>
//               <li>Pies nie posiada zdrowia i nie otrzymuje obrażeń.</li>
//               <li>Psa można używać tylko jako pomocnika do akcji polowania lub eksploracji.</li>
//             </ul>`,
//       },
//       [UI_TOUR_STEP_ID.HEALTH]: {
//         title: `Zdrowie`,
//         content: `Tutaj znajduje się zdrowie Twojej postaci.
//             <ul>
//               <li>Za każdy otrzymany punkt obrażeń wskaźnik zdrowia przesuwa się w prawo</li>
//               <li>Jeśli wskaźnik zdrowia przejdzie przez strzałkę (<Icon icon="morale-arrow"/>), morale
//                   drużyny spadają o 1.
//               </li>
//               <li>Gdy wskażnik dojdzie do końca, postać umiera i gracze przegrywają.</li>
//             </ul>`,
//       },
//       [UI_TOUR_STEP_ID.SCENARIO_BUTTON]: {
//         title: `Karta Scenariusza`,
//         content: `Tutaj znajduje się przycisk który wysuwa kartę scenariusza.
//             Kliknij go aby kontynuować.`,
//       },
//       [UI_TOUR_STEP_ID.SCENARIO]: {
//         title: `Karta Scenariusza`,
//         content: `Tutaj zawarte są informacje o przebiegu rozgrywki oraz warunkach
//             zwycięstwa danego scenariusza.`,
//       },
//       [UI_TOUR_STEP_ID.SCENARIO_ROUNDS]: {
//         title: `Pogoda`,
//         content: `Gra składa się maksymalnie z 12 rund, a nad
//             nimi znajdują się kości, które będą rzucane w fazie Pogody. W każdej rundzie
//             wynik rzutu tymi kośćmi będzie wpływał na warunki pogodowe z którymi będziecie
//             musieli się mierzyć.`,
//       },
//       [UI_TOUR_STEP_ID.SCENARIO_INFO]: {
//         title: "Opis Scenariusza",
//         content: `Przed rozpoczęciem gry nie zapomnij zapoznać się
//             z informacjami o scenariuszu i jego mechanikami.`,
//       },
//       [UI_TOUR_STEP_ID.WEATHER]: {
//         content: `Tutaj będą umieszczane tymczasowe żetony, które będą
//             zliczane w fazie Pogody.`,
//       },
//       [UI_TOUR_STEP_ID.DISCOVERY_TOKENS]: {
//         content: `Tutaj będą umieszczane żetony odkryć
//             otrzymywane podczas eksploracji mapy.`,
//       },
//       [UI_TOUR_STEP_ID.NEXT_PHASE]: {
//         content: `To jest główny przycisk który steruje przebiegiem
//             rozgrywki. Klikniecie go spowoduje przejście do kolejnej fazy.`,
//       },
//       [UI_TOUR_STEP_ID.MENU]: {
//         content: `Kliknij aby rozwinąć menu.`,
//       },
//       [UI_TOUR_STEP_ID.MENU_PLAYERS]: {
//         content: `Ten przycisk otwiera okno z informacją o
//             postaciach innych graczy.`,
//       },
//       [UI_TOUR_STEP_ID.MENU_SETTINGS]: {
//         content: `W ustawieniach możesz zrestartować, zapisać lub
//             cofnąc grę do lobby.`,
//       },
//       [UI_TOUR_STEP_ID.MENU_GUIDE]: {
//         content: `Poradnik dostarcza bardziej szczegółowy opis zasad
//             gry.`,
//       },
//       [UI_TOUR_STEP_ID.MENU_EXIT]: {
//         content: `W opcjach w menu głównym możesz zresetować
//             przewodnik po UI.`,
//       },
//     },
//   },
//   form: {
//     emailDoNotExist: `Nie znaleziono konta powiązanego z podanym adresem e-mail. Proszę sprawdzić,
// 				 czy adres jest poprawny, lub założyć nowe konto, jeśli jeszcze go nie posiadasz.`,
//     codeSentOnAdress: "Wyslano wiadomość z kodem resetującym na adres:",
//     checkSpam:
//       "Jeśli nie widzisz wiadomości w swojej skrzynce, sprawdź w folderze" +
//       " spam.",
//     enterCodeHere: "Wprowadź kod tutaj:",
//     confirmCode: "Zatwierdź Kod",
//     mailNotArrived: "Wiadomość nie dotarła?",
//     sendAgain: "Wyślij ponownie",
//     signInNewPassword: "Możesz teraz zalogować się nowym hasłem.",
//     backToSignIn: `Powrót do logowania`,
//     sending: "Wysyłanie",
//     sendLink: "Wyślij link",
//     send: "Wyślij",
//     sendEmailInstructions:
//       "Wprowadź swój adres e-mail powiązany z kontem, a wyślemy Ci link do zresetowania hasła.",
//     enterCodeInstructions: "",
//     "forgotPassword?": "Zapomniałeś hasła?",
//     changePassword: "Zmień hasło",
//     newPassword: "Nowe hasło",
//     passwordChanged: "Hasło zmienione",
//     invalidCode: "Wprowadzony kod jest błędny lub mineła jego ważność.",
//     resetPasswordTokenExpired: "Token do resetowania hasła wygasł.",
//     oldPassword: "stare hasło",
//     incorrectCredentials: "Wprowadzony e-mail lub hasło jest nieprawidłowe.",
//     passwordsMustBeSame: "Hasła muszą być takie same.",
//     usernameTaken: "Nazwa użytkownika jest już zajęta.",
//     emailTaken: "Ten e-mail jest już używany.",
//     invalidEmail: "Podany adres e-mail jest nieprawidłowy.",
//     passwordTooShort: "Hasło musi mieć co najmniej {{amount}} znaków.",
//   },
//   toast: {
//     "copied to clipboard": "Skopiowano do schowka!",
//     "game saved": "Zapisano grę!",
//     "unable to save game": "Nie udało się zapisać gry!",
//     "game restarted": "Gra została zrestartowana przez gospodarza",
//     "request limit reached":
//       "Limit zapytań wyczerpany. Spróbuj za {{tryAfter}} sekund.",
//   },
//   error: {
//     [SESSION_CONNECTION_ERROR_CODE.SESSION_NOT_FOUND]: "Nie znaleziono sesji",
//     [SESSION_CONNECTION_ERROR_CODE.GAME_IN_PROGRESS]: "Gra już się zaczeła",
//     [SESSION_CONNECTION_ERROR_CODE.SESSION_FULL]: "Sesja jest pełna",
//     [SESSION_CONNECTION_ERROR_CODE.INCORRECT_PASSWORD]: "nieprawidłowe hasło",
//     kicked: "Zostałeś wyrzucony",
//     connectError: `Wystąpił problem z połączeniem z serwerem. Sprawdź swoje
// 									połączenie internetowe i spróbuj ponownie.`,
//     serverError: "Błąd serwera. Spróbuj ponownie później.",
//     somethingWentWrong: "Coś poszło nie tak",
//     disconnected: "Rozłączono",
//   },
//   emailActivation: {
//     title: "Zweryfikuj swój e-mail",
//     instructions: `Na Twój adres e-mail został wysłany link
// 							weryfikacyjny. Aby dokończyć proces rejestracji,
// 							kliknij w link w otrzymanej wiadomości. Jeśli nie
// 							widzisz e-maila, sprawdź folder Spam lub Oferty`,
//     gotNoMessages: "Nie dostałeś wiadomości?",
//     sendAgain: "Wyślij jeszcze raz",
//     sent: "Wysłano",
//   },
//   systemMessages: {
//     [SYSTEM_MSG.PLAYER_HAS_JOINED_SESSION]: "{{subject1}} dołączył do sesji.",
//     [SYSTEM_MSG.PLAYER_HAS_LEFT_SESSION]: "{{subject1}} wyszedł z sesji.",
//     [SYSTEM_MSG.ONLY_PRESENT_PLAYERS_CAN_JOIN]:
//       "Tylko gracze obecni przy zapisie gry mogą dołączyć do sesji.",
//     [SYSTEM_MSG.GAME_TERMINATED]: "Gra została zakończona przez gospodarza",
//     [SYSTEM_MSG.GAME_RESTARTED]: "Restart gry",
//   },
//   logMessages: {
//     [LOG_CODE.WEATHER_TOKEN_SET]:
//       'Położono token $t(translation:weatherToken.{{subject1}}, {"context": "genitive"}) na polu przygody.',
//     [LOG_CODE.WEATHER_CLOUD_DECREMENTED]: `Odjęto {{amount}} chmurkę $t(translation:weatherToken.{{subject1}}, {"context": "genitive"}).`,
//     [LOG_CODE.WEATHER_CLOUD_INCREMENTED]: `Dodano {{amount}} chmurkę $t(translation:weatherToken.{{subject1}}, {"context": "genitive"}).`,
//     [LOG_CODE.ACTION_GOT_TOKEN]:
//       'Położono token $t(translation:tokens.{{subject1}}, {"context": "genitive"}) na polu $t(translation:action.{{subject2}}, {"context": "genitive"}).',
//     [LOG_CODE.ACTION_LOST_TOKEN]:
//       'Zabrano token $t(translation:tokens.{{subject1}}, {"context": "genitive"}) z pola $t(translation:action.{{subject2}}, {"context": "genitive"}).',
//     [LOG_CODE.OWNED_RESOURCE_ADDED]:
//       'Dodano {{amount}} $t(translation:resource.{{subject1}}, {"count": {{amount}}, "context": "genitive"}) do posiadanych surowców.',
//     [LOG_CODE.FUTURE_RESOURCE_ADDED]:
//       'Dodano {{amount}} $t(translation:resource.{{subject1}}, {"count": {{amount}}, "context": "genitive"}) do przyszłych surowców.',
//     [LOG_CODE.OWNED_RESOURCE_REMOVED]:
//       'Odrzucono {{amount}} $t(translation:resource.{{subject1}}, {"count": {{amount}}, "context": "genitive"}) z posiadanych surowców.',
//     [LOG_CODE.CAMP_MOVED]: "Przeniesiono obóz.",
//     [LOG_CODE.TILE_MODIFIER_ADDED]: "",
//     [LOG_CODE.TILE_MODIFIER_REMOVED]: "",
//     [LOG_CODE.WOOD_ADDED_TO_PILE]: "Dodano drewno na stos.",
//     [LOG_CODE.MORALE_INCREASED_TO_LVL]:
//       "Morale zwiększyły się do poziomu {{amount}}.",
//     [LOG_CODE.MORALE_DECREASED_TO_LVL]:
//       "Morale zmniejszyły sie do poziomu {{amount}}.",
//     [LOG_CODE.INVENTION_BUILT]:
//       'Zbudowano $t(translation:invention.{{subject1}}, {"context": "accusative"}).',
//     [LOG_CODE.GAME_WON]: "Gra wygrana!",
//     [LOG_CODE.GAME_LOST]: "Gra przegrana!",
//     [LOG_CODE.FOOD_ROTTED]: "Jedzenie zgniło.",
//     [LOG_CODE.CHARACTER_EATS]:
//       "$t(translation:character.{{subject1}}) spożywa $t(translation:resource.{{subject2}}).",
//     [LOG_CODE.BEAST_MOVED_TO_BOTTOM_OF_DECK]:
//       "Bestia została przeniesiona na dno talii.",
//     [LOG_CODE.BEAST_GOT_HUNTED]:
//       'Upolowano $t(translation:beast.{{subject1}}, {"context": "accusative"}).',
//     [LOG_CODE.BEAST_SHUFFLED_INTO_EVENT_DECK]:
//       "Wtasowano bestię do talii wydarzeń.",
//     [LOG_CODE.CONSTRUCTION_UPGRADED]:
//       'Ulepszono $t(translation:construction.{{subject1}}, {"context": "accusative"}) do poziomu {{amount}}.',
//     [LOG_CODE.CONSTRUCTION_DOWNGRADED]:
//       'Poziom $t(translation:construction.{{subject1}}, {"context": "genitive"}) spadł do poziomu {{amount}}.',
//     [LOG_CODE.ITEM_GRANTED]:
//       'Otrzymano $t(translation:item.{{subject1}}, {"context": "accusative"}).',
//     [LOG_CODE.CHARACTER_USED_TOKEN]:
//       '$t(translation:character.{{subject1}}) użył tokenu: $t(translation:discoveryToken.{{subject2}}, {"context": "genitive"}).',
//     [LOG_CODE.CHARACTER_USED_ABILITY]:
//       '$t(translation:character.{{subject1}}) użył $t(translation:ability.{{subject2}}.name, {"context": "genitive"}).',
//     [LOG_CODE.CHARACTER_GOT_HURT]:
//       "$t(translation:character.{{subject1}}) otrzymał {{amount}} obrażeń.",
//     [LOG_CODE.CHARACTER_GOT_HEALED]:
//       "$t(translation:character.{{subject1}}) został uleczony z {{amount}} obrażeń.",
//     [LOG_CODE.RESOURCE_BOOST_REMOVED]:
//       'Źródło $t(translation:resource.{{subject1}}, {"context": "genitive"}) nie daje już dodatkowego surowca.',
//     [LOG_CODE.RESOURCE_BOOST_ADDED]:
//       'Źródło $t(translation:resource.{{subject1}}, {"context": "genitive"}) będzie dawać dodatkowy surowiec.',
//     [LOG_CODE.RESOURCE_DEPLETED]:
//       'Źródło $t(translation:resource.{{subject1}}, {"context": "genitive"}) zostało wyczerpane.',
//     [LOG_CODE.RESOURCE_REPLENISHED]:
//       'Źródło $t(translation:resource.{{subject1}}, {"context": "genitive"}) zostało odnowione.',
//     [LOG_CODE.FUTURE_RESOURCE_REMOVED]:
//       'Zabrano {{amount}} $t(translation:resource.{{subject1}}, {"count": {{amount}}}) z przyszłych surowców',
//     [LOG_CODE.CHARACTER_GOT_WOUND]:
//       '$t(translation:character.{{subject1}}) otrzymał ranę na $t(translation:bodyPart.{{subject2}}, {"context": "locative"})',
//     [LOG_CODE.CHARACTER_LOST_WOUND]:
//       '$t(translation:character.{{subject1}}, {"context": "dative"}) nie dokucza już rana na $t(translation:resource.{{subject1}}, {"context": "locative"}).',
//     [LOG_CODE.LOST_GAINED_TREASURES]: "Zebrane skarby zostały utracone!",
//     [LOG_CODE.ALL_PLAYERS_GOT_DETERMINATION]:
//       "Wszyscy gracze otrzymują {{amount}} deteterminacji.",
//     [LOG_CODE.ALL_PLAYERS_LOST_DETERMINATION]:
//       "Wszyscy gracze tracą {{amount}} determinacji.",
//     [LOG_CODE.ALL_PLAYERS_GOT_HURT]:
//       "Wszyscy gracze otrzymują {{amount}} obrażeń.",
//     [LOG_CODE.ALL_PLAYERS_GOT_HEALED]:
//       "Wszyscy gracze leczą się z {{amount}} obrażeń.",
//     [LOG_CODE.NEW_PRIME_PLAYER]:
//       "Gracz {{subject1}} jest teraz pierwszym graczem.",
//     [LOG_CODE.CHARACTER_LOST_DETERMINATION]:
//       "$t(translation:character.{{subject1}}) traci {{amount}} determinacji.",
//     [LOG_CODE.CHARACTER_GOT_DETERMINATION]:
//       "$t(translation:character.{{subject1}}) zyskuje {{amount}} determinacji.",
//   },
// };
