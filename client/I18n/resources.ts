import {LOG_CODE} from "@shared/types/Game/ChatLog/LOG_CODE";
import {
    ADVENTURE_CARD_BUILD,
    ADVENTURE_CARD_EXPLORE,
    ADVENTURE_CARD_GATHER
} from "@shared/types/Game/AdventureService/ADVENTURE_CARD";
import {
    CREATURE_MYSTERY_CARD,
    TRAP_MYSTERY_CARD,
    TREASURE_MYSTERY_CARD
} from "@shared/types/Game/MysteryService/MYSTERY_CARD";
import {ITEM} from "@shared/types/Game/Equipment/Item";
import {ABILITY} from "@shared/types/Game/Skill/ABILITY";
import {ALERT_CODE} from "@shared/types/ALERT_CODE";
import {SESSION_JOIN_ERROR_CODE} from "@shared/types/Errors/SESSION_JOIN_ERROR_CODE";


export const resources = {
    "pl": {
        "translation": {
            character: {
                cook: "kucharz",
                cook_female: "kucharka",
                explorer: "odkrywca",
                carpenter: "cieśla",
                soldier: "żołnierz",
                friday: "piętaszek",
                dog: "pies",
            },
            scenario: {
                castaways: {
                    name: "rozbitkowie",
                    description: `Jesteście rozbitkami na bezludnej wyspie.
                        Jest koniec lata, musicie przygotować się na nadejście zimy
                        — zbudować schronienie, dach, palisadę. Ciężko będzie przetrwać 
                        nadchodzące ciężkie miesiące jesieni i zimy. Potrzebny będzie też
                        stos drewna, który będzie można podpalić i liczyć, że jakiś statek 
                        przepływający na horyzoncie was dostrzeże.`,
                    objective: `Aby wygrać, gracze muszą wytworzyć przedmiot Ogień oraz
                        zbudować stos drewna przedstawiony na karcie scenariusza. Jeśli w 10.,
                        11. czy 12. rundzie warunki te są spełnione, to gracze wygrywają.`,
                    mechanics: `Stos ma się składać z 15 znaczników drewna.
                        Drewno na stos gracze mogą odkładać przed fazą Akcji. W jednej rundzie można
                        odłożyć na stos dowolną ilość drewna, ale ukończyć nie więcej niż 1 etap budowy stosu. 
                        (za pierwszym razem 1 znacznik drewna, następnie max. 2 znaczniki itd.), 
                        Drewno odłożone na stos nie może być z niego zabrane.`
                }
            },
            ability: {
                [ABILITY.GRANDMAS_RECIPE]: {
                    name: "Babcina Beceptura",
                    name_genitive: "Babcinej Receptury",
                    description: "Odrzuć 2 \$determination\$ aby uleczyć 2 \$heart\$ odrzucając 1 \$food\$",
                    comment: "Po zupie mojej babci na pewno poczujesz się lepiej."
                },
                [ABILITY.HOOCH]: {
                    name: "Samogon",
                    name_genitive: "Samogonu",
                    description: "Odrzuć 3 $determination$, aby usunąć 1 $rain-cloud$ lub zamienić 1 $snow-cloud$ w 1 $rain-cloud$",
                    comment: "Wiem, że jest zimno i w ogóle, ale mam tu coś co ogrzeje ciało i rozjaśni umysł."

                },
                [ABILITY.SCROUNGER]: {
                    name: "Bystre Oko",
                    name_genitive: "Bystrego Oka",
                    description: "Odrzuć 2 \$determination\$, aby \$reroll\$ dowolną szarą kość podczas swojej Akcji.",
                    comment: "Gdy mówię, że się znajdzie to się znajdzie. Trzeba tylko wiedzieć, gdzie szukać!"
                },

                [ABILITY.STONE_SOUP]: {
                    name: "Zupa z Gwoździa",
                    name_genitive: "Zupy z Gwoździa",
                    description: "Odrzuć 3 \$determination\$, aby otrzymać 1 \$food\$.",
                    comment: "Brak składników to nie przeszkoda, to wyzwanie. Dobry kucharz poradzi sobie w każdej sytuacji!"
                },
                [ABILITY.LUCKY]: {
                    name: "Dziecko szczęścia",
                    name_genitive: "Dziecka szczęścia",
                    description: "Odrzuć 2 \$determination\$, aby \$reroll\$ dowolną zieloną kość podczas swojej Akcji.",
                    comment: "Wygląda na to, że szczęście mi dziś sprzyja!",
                },
                [ABILITY.RECONNAISSANCE]: {
                    name: "Rekonesans",
                    name_genitive: "Rekonesansu",
                    description: `Odrzuć 2 \$determination\$, aby pociągnąć 3 kafelki Wyspy
                        ze stosu, wybrać 1 z nich i położyć go na wierzchu stosu.`,
                    comment: "Wracamy do dziczy? Nareszcie!"
                },
                [ABILITY.MOTIVATIONAL_SPEECH]: {
                    name: "Mowa ku pokrzepieniu serc",
                    name_genitive: "Mowy ku pokrzepieniu serc",
                    description: `Odrzuć 3 \$determination\$ aby \$morale\$.`,
                    comment: "Nie martwcie się! Z nie takich opałów wychodziłem bez szwanku."
                },
                [ABILITY.SCOUTING]: {
                    name: "Zwiad",
                    name_genitive: "Zwiadu",
                    description: "Odrzuć 3 \$determination\$, aby pociągnąć 2 \$discovery$\$ i wybrać z nich 1.",
                    comment: "A to ci ciekawe. Przyjrzę się temu bliżej."
                },
                [ABILITY.ECONOMICAL_CONSTRUCTION]: {
                    name: "Oszczędna konstrukcja",
                    name_genitive: "Oszczędnej konstrukcji",
                    description: "Odrzuć 2 \$determination\$, aby zużyć 1 \$wood\$ mniej podczas jednej swojej Akcji dowolnego typu.",
                    comment: "Za mało materiału? O czym ty mówisz? Mamy go aż nadto!"
                },
                [ABILITY.CRAFTSMANSHIP]: {
                    name: "Rzemiosło",
                    name_genitive: "Rzemiosła",
                    description: "Odrzuć 2 \$determination\$, aby \$reroll\$ dowolną brązową kość podczas swojej Akcji.",
                    comment: "Mógłbym to wbić z zamkniętymi oczami"
                },
                [ABILITY.A_NEW_IDEA]: {
                    name: "Nowy pomysł",
                    name_genitive: "Nowego pomysłu",
                    description: "Odrzuć 3 \$determination\$, aby pociągnąć 5 kart z talii Pomysłów i wybrać1 z nich.",
                    comment: "Zdaje się, że wiem, jak ulepszyć nasze obozowisko…"
                },
                [ABILITY.HANDYMAN]: {
                    name: "Złota rączka",
                    name_genitive: "Złotej rączki",
                    description: "Odrzuć 3 \$determination\$, aby uzyskać dodatkowego \$build-pawn\$ podczas Akcji Budowy, którą wykonujesz",
                    comment: "To w sumie dość proste, zajmie ledwie parę chwil."
                },
                [ABILITY.TRACKING]: {
                    name: "Tropienie",
                    name_genitive: "Tropienia",
                    description: "Odrzuć 2 \$determination\$, aby spojrzeć na górną kartę z talii Polowania" +
                        " i umieścić ją z powrotem na wierzchu talii lub na jej spodzie.",
                    comment: "Chwilę temu przemknął tędy tygrys. Wielki tygrys…"
                },
                [ABILITY.THE_HUNT]: {
                    name: "Polowanie",
                    name_genitive: "Polowania",
                    description: "Odrzuć 4 \$determination\$, aby wziąć wierzchnią kartę z talii Bestii i położyć na wierzchu" +
                        "talii Polowania, bez oglądania jej.",
                    comment: "Kici-kici, bestyjko!",
                },
                [ABILITY.FRENZY]: {
                    name: "Furia",
                    name_genitive: "Furii",
                    description: "Odrzuć 3 \$determination\$, a by tymczasowo otrzymać +3 \$weapon\$ podczas swojej akcji.",
                    comment: "Teraz to jestem naprawdę wściekły. Przysięgam, nie polubicie mnie takiego!"
                },
                [ABILITY.DEFENSIVE_PLAN]: {
                    name: "Plan zapasowy",
                    name_genitive: "Planu zapasowego",
                    description: "Odrzuć 3 \$determination\$, aby zwiększyć poziom \$palisade\$ lub \$weapon\$ o 1.",
                    comment: "A ty, kucharzu, zabiezpieczasz lewą flankę…"
                }

            },
            "phase": {
                "phase": "faza $t(phase.{{phase}}, {\"context\": \"genitive\"})",
                "event": "wydarzenie",
                "event_genitive": "wydarzenia",
                "morale": "morale",
                "morale_genitive": "morali",
                "production": "produkcja",
                "production_genitive": "produkcji",
                "preAction": "akcja",
                "preAction_genitive": "akcji",
                "action": "akcja",
                "action_genitive": "akcji",
                "weather": "pogoda",
                "weather_genitive": "pogody",
                "night": "noc",
                "night_genitive": "nocy"
            },
            "resource": {
                "food": "pożywienie",
                "food_many": "pożywienia",
                "food_few": "pożywienia",
                "dryFood": "suchy prowiant",
                "dryFood_many": "suchych prowiantów",
                "dryFood_few": "suche prowianty",
                "wood": "drewno",
                "wood_many": "drewna",
                "wood_few": "drewna",
                "leather": "skóra",
                "leather_many": "skór",
                "leather_few": "skóry"
            },
            "action": {
                "threat": "zagrożenie",
                "threat_genitive": "zagrożenia",
                "hunt": "polowanie",
                "hunt_genitive": "polowania",
                "build": "budowanie",
                "build_genitive": "budowania",
                "gather": "zbieranie",
                "gather_genitive": "zbierania",
                "explore": "eksploracja",
                "explore_genitive": "eksploracji",
                "arrange camp": "porządkowanie obozu",
                "arrange camp_genitive": "porządkowania obozu",
                "rest": "odpoczynek",
                "rest_genitive": "odpoczynku"
            },
            "construction": {
                "shelter": "schronienie",
                "shelter_genitive": "schronienia",
                "shelter_accusative": "schronienie",
                "palisade": "palisada",
                "palisade_genitive": "palisady",
                "palisade_accusative": "palisadę",
                "roof": "dach",
                "roof_genitive": "dachu",
                "roof_accusative": "dach",
                "weapon": "broń",
                "weapon_genitive": "broni",
                "weapon_accusative": "broń"
            },
            "adventureOptionLabel": {
                "shuffle": "wtasuj",
                "discard": "odrzuć",
                "keep": "zatrzymaj"
            },
            "bodyPart": {
                "head_locative": "głowie",
                "stomach_locative": "brzuchu",
                "arm_locative": "ramieniu",
                "leg_locative": "nodze"
            },
            weatherToken: {
                rain: "deszcz",
                rain_genitive: "deszczu",
                snow: "śnieg",
                snow_genitive: "śniegu",
                storm: "sztorm",
                storm_genitive: "sztormu"
            },
            tokens: {
                adventure: "przygoda",
                adventure_genitive: "przygody",
                reroll: "przerzut",
                reroll_genitive: "przerzutu",
            },
            adventureCard: {
                [ADVENTURE_CARD_BUILD.ACCIDENT]: "wypadek",
                [ADVENTURE_CARD_BUILD.BREAKDOWN]: "załamanie",
                [ADVENTURE_CARD_BUILD.BROKEN_LEVER]: "złamana dźwignia",
                [ADVENTURE_CARD_BUILD.COMING_TO_TERMS]: "realna ocena sytuacji",
                [ADVENTURE_CARD_BUILD.CONSTRUCTION]: "konstrukcja",
                [ADVENTURE_CARD_BUILD.CONSTRUCTION_IS_WEAK]: "marna konstrukcja",
                [ADVENTURE_CARD_BUILD.CUT_HEAD]: "skaleczenie",
                [ADVENTURE_CARD_BUILD.DANGEROUS_WORK]: "niebezpieczna praca",
                [ADVENTURE_CARD_BUILD.DARK_CLOUDS_IN_THE_SKY]: "zachmurzone niebo",
                [ADVENTURE_CARD_BUILD.FAST_WORK]: "pośpiech",
                [ADVENTURE_CARD_BUILD.FEAR_OF_THE_BEASTS]: "strach przed bestiami",
                [ADVENTURE_CARD_BUILD.HARD_WORK]: "ciężka praca",
                [ADVENTURE_CARD_BUILD.HOWLING_IN_THE_BUSHES]: "wycie w buszu",
                [ADVENTURE_CARD_BUILD.HUNGRY_PREDATOR]: "wygłodniały drapieżnik",
                [ADVENTURE_CARD_BUILD.IN_A_HURRY]: "w pośpiechu",
                [ADVENTURE_CARD_BUILD.LABORIOUS_WORK]: "mozolna praca",
                [ADVENTURE_CARD_BUILD.LACK_OF_HOPE]: "brak nadziei!",
                [ADVENTURE_CARD_BUILD.MONKEYS_WATCH_YOU]: "małpy Cię obserwują",
                [ADVENTURE_CARD_BUILD.NASTY_WOUND]: "paskudna rana",
                [ADVENTURE_CARD_BUILD.PREDATOR_IN_THE_CAMP]: "bestia w obozie",
                [ADVENTURE_CARD_BUILD.SAVINGS]: "oszczędności",
                [ADVENTURE_CARD_BUILD.STING]: "użądlenie",
                [ADVENTURE_CARD_BUILD.TIRED]: "wyczerpany",
                [ADVENTURE_CARD_BUILD.TOOLS_BREAK]: "pękniete narzędzie",
                [ADVENTURE_CARD_BUILD.TOOLS_INSPECTION]: "kontrola narzędzi",
                [ADVENTURE_CARD_BUILD.UNMOTIVATED]: "zdemotywowany",
                [ADVENTURE_CARD_BUILD.VISIT_OF_A_PREDATOR]: "wizyta bestii",
                [ADVENTURE_CARD_BUILD.WIND_STORM]: "wichura",
                [ADVENTURE_CARD_BUILD.YOU_NEED_A_BIGGER_CAMP]: "potrzeba zmian",

                [ADVENTURE_CARD_EXPLORE.BAMBOO]: "bambus",
                [ADVENTURE_CARD_EXPLORE.CARCASS]: "padlina",
                [ADVENTURE_CARD_EXPLORE.COLD_WIND]: "zimny wiatr",
                [ADVENTURE_CARD_EXPLORE.DANGEROUS_TERRAIN]: "niebezpieczny teren",
                [ADVENTURE_CARD_EXPLORE.EMPTY_FOREST]: "pusty las",
                [ADVENTURE_CARD_EXPLORE.FLU]: "grypa",
                [ADVENTURE_CARD_EXPLORE.IT_WILL_RAIN]: "niebo zaciąga się",
                [ADVENTURE_CARD_EXPLORE.LOST]: "zagubiony",
                [ADVENTURE_CARD_EXPLORE.LOST_IN_THE_THICKET]: "zagubiony w gęstwinie",
                [ADVENTURE_CARD_EXPLORE.LOST_IN_THE_WOODS]: "zagubiony w lesie",
                [ADVENTURE_CARD_EXPLORE.MISADVENTURE]: "nieszczęśliwy wypadek",
                [ADVENTURE_CARD_EXPLORE.OLD_GRAVE]: "stary grób",
                [ADVENTURE_CARD_EXPLORE.OLD_HUT]: "stara chata",
                [ADVENTURE_CARD_EXPLORE.PUMA]: "puma!",
                [ADVENTURE_CARD_EXPLORE.REMAINS_OF_A_SETTLEMENT]: "pozostałości osady",
                [ADVENTURE_CARD_EXPLORE.RUINED_HUT]: "zniszczona chatka",
                [ADVENTURE_CARD_EXPLORE.SECRET_CAVE]: "tajemnicza jaskinia",
                [ADVENTURE_CARD_EXPLORE.SHRINE]: "kapliczka",
                [ADVENTURE_CARD_EXPLORE.SIGNS_OF_FIRE]: "ślady ognia",
                [ADVENTURE_CARD_EXPLORE.STORM_ON_THE_HORIZON]: "nadciąga sztorm",
                [ADVENTURE_CARD_EXPLORE.SURPRISING_DISCOVERY]: "zaskakujące znalezisko",
                [ADVENTURE_CARD_EXPLORE.SWAMP]: "bagniska",
                [ADVENTURE_CARD_EXPLORE.THERES_SOMETHING_IN_THE_AIR]: "coś się szykuje",
                [ADVENTURE_CARD_EXPLORE.THORNY_BUSH]: "kolczasty krzew",
                [ADVENTURE_CARD_EXPLORE.TIGER]: "tygrys!",
                [ADVENTURE_CARD_EXPLORE.VIPERS]: "żmije!",
                [ADVENTURE_CARD_EXPLORE.WILD_BERRIES]: "dzikie jagody",
                [ADVENTURE_CARD_EXPLORE.WILD_DOG]: "dziki pies",
                [ADVENTURE_CARD_EXPLORE.WRONG_TRACK]: "pomylone ścieżki",

                [ADVENTURE_CARD_GATHER.AFTER_THE_HURRICANE]: "po huraganie",
                [ADVENTURE_CARD_GATHER.END_OF_SOURCE]: "koniec źródła",
                [ADVENTURE_CARD_GATHER.EYES_IN_THE_BUSHES]: "oczy w ciemności",
                [ADVENTURE_CARD_GATHER.FRUIT]: "owoce",
                [ADVENTURE_CARD_GATHER.FURS]: "skóry",
                [ADVENTURE_CARD_GATHER.GOLD_COIN]: "złota moneta!",
                [ADVENTURE_CARD_GATHER.MUSHROOMS]: "grzyby",
                [ADVENTURE_CARD_GATHER.NESTLINGS]: "pisklaki",
                [ADVENTURE_CARD_GATHER.NEW_FLOCK]: "nowe stado",
                [ADVENTURE_CARD_GATHER.NICE_SURPRISE]: "okazja",
                [ADVENTURE_CARD_GATHER.PATH_OF_A_PREDATOR]: "ścieżka drapieżnika",
                [ADVENTURE_CARD_GATHER.PIRATES_CHEST]: "skrzynia piratów",
                [ADVENTURE_CARD_GATHER.SHORTAGE]: "końcówka",
                [ADVENTURE_CARD_GATHER.SIGNS_OF_A_PREDATOR]: "ślady drapieżnika",
                [ADVENTURE_CARD_GATHER.SKELETON]: "szkielet",
                [ADVENTURE_CARD_GATHER.SPIDER]: "pająk",
                [ADVENTURE_CARD_GATHER.SURPRISE_IN_THE_BUSHES]: "znalezisko w krzakach",
                [ADVENTURE_CARD_GATHER.TRACKS_OF_A_PREDATOR]: "niebezpieczne ślady",
                [ADVENTURE_CARD_GATHER.TWISTED_ANKLE]: "skręcona kostka",
                [ADVENTURE_CARD_GATHER.UNBELIEVABLE_EFFORT]: "niewiarygodny wysiłek",
                [ADVENTURE_CARD_GATHER.UNEXPECTED_DISCOVERY]: "niespodziewane znalezisko",
                [ADVENTURE_CARD_GATHER.UNEXPECTED_TROUBLES]: "niespodziewane trudności",
                [ADVENTURE_CARD_GATHER.VIPER]: "żmija",
                [ADVENTURE_CARD_GATHER.WEATHER_BREAKDOWN]: "załamanie pogody",
                [ADVENTURE_CARD_GATHER.WINTER_FREEZING]: "zimowy chłód",
                [ADVENTURE_CARD_GATHER.WINTER_IS_COMING]: "nadchodzi zima",
            },
            adventureCardEvent: {
                // BUILD
                "gangrene": "gangrena",
                "it's going well": "dobrze idzie",
                "lack of ideas": "brak pomysłów",
                "stronger construction": "mocniejsza konstrukcja",
                "bang!": "trach!",
                "headache": "ból głowy",
                "heavy rain is over": "koniec ulewy",
                "haste makes waste": "co nagle to po diable",
                "expensive protection": "kosztowna ochrona",
                "the beast is here!": "bestia jest tutaj!",
                "revisit": "rewizyta",
                "snap!": "trzask!",
                "monkeys in the camp!": "małpy w obozie!",
                "infection": "infekcja",
                "what goes around...": "nosił wilk razy kilka...",
                "bad construction": "licha konstrukcja",
                "shivers": "dreszcze",
                "dispute": "spór",
                "broken tools": "zepsute narzędzia",
                "tools are breaking": "narzędzia się psują",
                "night visit": "nocna wizyta",
                "natural palisade": "naturalna palisada",
                "camp expansion": "rozbudowa obozowiska",
                //EXPLORE
                "wood snap!": "trzask łamanego drewna!",
                "diarrhea": "biegunka",
                "snow": "śnieg",
                "hungry predators": "głodne drapieżniki",
                "sore throat": "ból gardła",
                "detached clouds": "oberwane chmury",
                "swollen ankle": "spuchnięta kostka",
                "memories of dead castaway": "wspomnienia o martwym rozbitku",
                "ghost of a castaway": "duch rozbitka",
                "puma is attacking!": "atak pumy!",
                "epidemic": "epidemia",
                "restless dreams": "niespokojne sny",
                "awakening of the beast": "przebudzenie bestii",
                "nightmares": "koszmary",
                "storm": "sztorm",
                "cursed island": "przeklęta wyspa",
                "swollen arm": "spuchnięte ramię",
                "the tiger has found you": "tygrys was odnajduje",
                "fewer": "gorączka",
                "indigestion": "niestrawność",
                "old buddy": "stary znajomy",
                //GATHER
                "another hurricane": "kolejny huragan",
                "unexpected visit": "niespodziewana wizyta",
                "stomachache": "ból brzucha",
                "insects": "insekty",
                "cursed coin": "przeklęta moneta",
                "angry bird": "wściekłe ptaszyszko",
                "all is gone": "wszystko przepadło",
                "collapsed roof": "zapadnięty dach",
                "attack of a beast": "atak bestii",
                "curse": "klątwa",
                "memories of the dead explorer": "wspomnienia martwego odkrywcy",
                "neck bite": "ugryzienie w kark",
                "memories": "wspomnienia",
                "attack of a hungry predator": "atak wygłodniałego drapieżnika",
                "sore arms": "obolałe ramiona",
                "bite": "ukąszenie",
                "frost": "przymrozek",
            },

            item: {
                [ITEM.BIBLE]: "biblia",
                [`${ITEM.BIBLE}_accusative`]: "biblię",
                [ITEM.BISCUITS]: "suchary",
                [ITEM.EMPTY_BOTTLE]: "pusta butelka",
                [`${ITEM.EMPTY_BOTTLE}_accusative`]: "pustą butelkę",
                [ITEM.FLASK_OF_RUM]: "flaszka rumu",
                [`${ITEM.FLASK_OF_RUM}_accusative`]: "flaszkę rumu",
                [ITEM.HAMMER]: "młotek",
                [ITEM.PISTOL]: "pistolet",
                [ITEM.STORM_GLASS]: "barometr",
                [ITEM.TOBACCO]: "Fajka i tytoń",
                [`${ITEM.TOBACCO}_accusative`]: "Fajkę i tytoń"
            },

            mysteryCard: {
                [CREATURE_MYSTERY_CARD.A_SHINY_JEWEL]: "wielki klejnot",
                [CREATURE_MYSTERY_CARD.BATS]: "nietoperze",
                [CREATURE_MYSTERY_CARD.BIG_APE]: "wielka małpa",
                [CREATURE_MYSTERY_CARD.BITE]: "ugryzienie",
                [CREATURE_MYSTERY_CARD.FURIOUS_TIGER]: "rozszalały tygrys",
                [CREATURE_MYSTERY_CARD.GIANT_SNAKE]: "ogromny wąż",
                [CREATURE_MYSTERY_CARD.GORILLA]: "goryl",
                [CREATURE_MYSTERY_CARD.GREMLINS]: "gremliny",
                [CREATURE_MYSTERY_CARD.SAVAGE]: "dzikus",
                [CREATURE_MYSTERY_CARD.SCORPION]: "skorpion",
                [CREATURE_MYSTERY_CARD.SNAKE]: "wąż",
                [CREATURE_MYSTERY_CARD.SPIDERS]: "pająki",
                [CREATURE_MYSTERY_CARD.UNLEASHED_BEAST]: "bestia na wolności",

                [TRAP_MYSTERY_CARD.BLOW_GUN]: "dmuchawka",
                [TRAP_MYSTERY_CARD.BLUNT_SPEAR]: "stara dzida",
                [TRAP_MYSTERY_CARD.COLLAPSE]: "zapadło się",
                [TRAP_MYSTERY_CARD.CONFUSED]: "otumaniony",
                [TRAP_MYSTERY_CARD.HIDDEN_ROPE]: "ukryta lina",
                [TRAP_MYSTERY_CARD.NET]: "sieć",
                [TRAP_MYSTERY_CARD.POISON]: "trucizna",
                [TRAP_MYSTERY_CARD.SHARP_BLADE]: "ostrze",
                [TRAP_MYSTERY_CARD.SPIDER_WEB]: "pająk",
                [TRAP_MYSTERY_CARD.STRANGE_DISEASE]: "dziwne schorzenie",
                [TRAP_MYSTERY_CARD.TERRIBLE_SCREAM]: "przeraźliwy krzyk",
                [TRAP_MYSTERY_CARD.TRAP_DOOR]: "zapadnia",
                [TRAP_MYSTERY_CARD.UNFORTUNATE_ADVENTURE]: "nieszczęśliwa przygoda",

                [TREASURE_MYSTERY_CARD.AMULET_WITH_PORTRAIT_OF_BEAUTIFUL_LADY]: "medalion z portretem pięknej damy",
                [TREASURE_MYSTERY_CARD.ANTIQUE_RAPIER]: "zabytkowy rapier",
                [TREASURE_MYSTERY_CARD.BACKPACK]: "plecak",
                [TREASURE_MYSTERY_CARD.BARREL]: "beczka",
                [TREASURE_MYSTERY_CARD.BLANKETS]: "koce",
                [TREASURE_MYSTERY_CARD.BOTTLE_OF_WINE]: "butelka wina",
                [TREASURE_MYSTERY_CARD.BOXES]: "skrzynie",
                [TREASURE_MYSTERY_CARD.CANDLES]: "świeczki",
                [TREASURE_MYSTERY_CARD.CAPTAIN_STONES_SPYGLASS]: "luneta kapitana Stone'a",
                [TREASURE_MYSTERY_CARD.CAVE_WITH_FURS]: "grota ze skórami",
                [TREASURE_MYSTERY_CARD.CEREMONIAL_BOWL]: "ceremonialna czara",
                [TREASURE_MYSTERY_CARD.COMPASS]: "kompas",
                [TREASURE_MYSTERY_CARD.CROCKS]: "gliniane naczynia",
                [TREASURE_MYSTERY_CARD.GOLD]: "złoto!",
                [TREASURE_MYSTERY_CARD.HAMMOCK]: "hamak",
                [TREASURE_MYSTERY_CARD.HATCHED]: "siekiera",
                [TREASURE_MYSTERY_CARD.HELMET]: "hełm",
                [TREASURE_MYSTERY_CARD.HERBAL_MIXTURE]: "ziołowa mikstura",
                [TREASURE_MYSTERY_CARD.OLD_CLOTHES]: "komplet starych ubrań",
                [TREASURE_MYSTERY_CARD.OLD_MAP]: "stara mapa",
                [TREASURE_MYSTERY_CARD.OLD_RIFLE]: "stara strzelba",
                [TREASURE_MYSTERY_CARD.PROTECTIVE_AMULET]: "amulet ochronny",
                [TREASURE_MYSTERY_CARD.ROPES]: "liny",
                [TREASURE_MYSTERY_CARD.SABRE]: "szabla",
                [TREASURE_MYSTERY_CARD.TREASURE_MAP]: "mapa skarbów",
            },
            mysteryCardEvent: {
                "night demon": "nocny demon",
                "gorilla in the camp": "goryl w obozie",
                "Gremlins have tracked you down": "gremliny was wytropiły",
                "failed hunt": "nieudane polowanie",
                "curse defeated!": "klątwa pokonana!"
            },
            invention: {
                basket: "koszyk",
                bed: "łóżko",
                belts: "pasy",
                bow: "łuk",
                cellar: "piwnica",
                cellar_accusative: "piwnicę",
                corral: "zagroda",
                corral_accusative: "zagrodę",
                diary: "pamiętnik",
                drums: "bębny",
                furnace: "piec",
                lantern: "latarnia",
                lantern_accusative: "latarnię",
                moat: "ogrodzenie",
                pit: "wilczy dół",
                raft: "tratwa",
                raft_accusative: "tratwę",
                sack: "wór",
                shield: "tarcza",
                shield_accusative: "tarczę",
                sling: "proca",
                sling_accusative: "procę",
                wall: "mur",
                fireplace: "palenisko",
                shortcut: "skrót",
                snare: "wnyki",
                spear: "dzida",
                spear_accusative: "dzidę",
                axe: "siekiera",
                axe_accusative: "siekierę",
                mast: "maszt",
                bricks: "cegły",
                dam: "tama",
                dam_accusative: "tamę",
                fire: "ogień",
                knife: "knife",
                map: "mapa",
                map_accusative: "mapę",
                medicine: "lek",
                pot: "naczynia",
                rope: "lina",
                rope_accusative: "linę",
                shovel: "łopata",
                shovel_accusative: "łopatę",
            },
            beast: {
                alligator: "aligator",
                alligator_accusative: "aligatora",
                bear: "niedźwiedź",
                bear_accusative: "niedźwiedzia",
                birds: "ptaki",
                boa: "boa",
                boa_accusative: "boa'ę",
                chamois: "kozica",
                chamois_accusative: "kozicę",
                cheetah: "gepard",
                cheetah_accusative: "geparda",
                fox: "lis",
                fox_accusative: "lisa",
                goats: "kozły",
                gorilla: "goryl",
                gorilla_accusative: "goryla",
                iguana: "legwan",
                iguana_accusative: "legwana",
                jaguar: "jaguar",
                jaguar_accusative: "jaguara",
                puma: "puma",
                puma_accusative: "pumę",
                tapir: "tapir",
                tapir_accusative: "tapira",
                tiger: "tygrys",
                tiger_accusative: "tygrysa",
                "wild dog": "dziki pies",
                "wild dog_accusative": "dzikiego psa",
                "wild pig": "dzika świnia",
                "wild pig_accusative": "dziką świnię"
            },
            discoveryToken: {},
            cardListTab: {
                "inventions": "K. Pomysłów",
                "mystery cards": "K. Tajemnic",
                "items": "Przedmioty",
            },
            alerts: {
                [ALERT_CODE.NOT_ENOUGH_MATERIALS_FOR_ACTION]: "Brakuje materiałów do wykonania tej akcji.",
                [ALERT_CODE.NOT_ENOUGH_DETERMINATION_FOR_ABILITY]: "Brakuje punktów determinacji do użycia tej umiejętności.",
                [ALERT_CODE.BEAST_DECK_IS_EMPTY]: "Stos z bestiami jest pusty."
            },
            pickObject: {
                [ABILITY.RECONNAISSANCE]: {
                    source: `$t(translation:ability.${ABILITY.RECONNAISSANCE}.name)`,
                    description: "Wybierz kafelek, który zostanie umieszczony na wierzchu stosu.",
                },
                [ABILITY.SCOUTING]: {
                    source: `$t(translation:ability.${ABILITY.SCOUTING}.name)`,
                    description: "Dobierz token."
                },
                [ABILITY.A_NEW_IDEA]: {
                    source: `$t(translation:ability.${ABILITY.A_NEW_IDEA}.name)`,
                    description: "Dobierz kartę pomysłu."
                },
                [ABILITY.TRACKING]: {
                    source: `$t(translation:ability.${ABILITY.TRACKING}.name)`,
                    description: "",
                    effectLabel: "Na wierzch",
                    secondaryEffectLabel: "Na spód"
                },
                [ABILITY.DEFENSIVE_PLAN]: {
                    source: `$t(translation:ability.${ABILITY.DEFENSIVE_PLAN}.name)`,
                    description: `$t(translation:ability.${ABILITY.DEFENSIVE_PLAN}.comment)`,
                    effectLabel: "+\$palisade\$",
                    secondaryEffectLabel: "+\$weapon\$"
                }
            },
            other: {
                "sleeping under open sky": "sen pod gołym niebem",
                "unfulfilled demand": "niespełnione wymagania",
                "fight": "walcz",
                "level": "poziom",
                "use": "użyj",
                "order": "kolejność",
                "scenario": "scenariusz",
                "round": "runda",
                "action order": "kolejność akcji",
                "objective": "cel",
                "description": "opis",
                "mechanics": "budowa stosu",
                "wood pile": "stos drewna",
                "camp movement": "przeniesienie obozu",
                "confirm": "zatwierdź",
                "cancel": "anuluj",
                "ability": "umiejętność"
            },
            menu: {
                "refresh": "odśwież",
                "create game": "stwórz grę",
                "join with game code": "dołącz wpisując kod gry",
                "join": "dołącz",
                "name": "nazwa",
                "host": "gospodarz",
                "players": "gracze",
                "scenario": "scenariusz",
                "password": "hasło",
                "public": "publiczna",
                "private game": "gra prywatna",
                "enter password": "wpisz hasło",
                "error": "błąd",
            },
            error: {
                [SESSION_JOIN_ERROR_CODE.SESSION_NOT_FOUND]: "Nie znaleziono sesji",
                [SESSION_JOIN_ERROR_CODE.GAME_IN_PROGRESS]: "Gra już się zaczeła",
                [SESSION_JOIN_ERROR_CODE.SESSION_FULL]: "Sesja jest pełna",
                [SESSION_JOIN_ERROR_CODE.INCORRECT_PASSWORD]: "nieprawidłowe hasło",
            }
        },


        logMessages: {
            [LOG_CODE.WEATHER_TOKEN_SET]: "Położono token $t(translation:weatherToken.{{subject1}}, {\"context\": \"genitive\"}) na polu przygody.",
            [LOG_CODE.ACTION_GOT_TOKEN]: "Położono token $t(translation:tokens.{{subject2}}, {\"context\": \"genitive\"}) na polu $t(translation:action.{{subject1}}, {\"context\": \"genitive\"}).",
            [LOG_CODE.ACTION_LOST_TOKEN]: "Zabrano token $t(translation:tokens.{{subject2}}, {\"context\": \"genitive\"}) z pola $t(translation:action.{{subject1}}, {\"context\": \"genitive\"}).",
            [LOG_CODE.OWNED_RESOURCE_ADDED]: "Dodano {{amount}} $t(translation:resource.{{subject1}}, {\"count\": {{amount}}}) do posiadanych surowców.",
            [LOG_CODE.FUTURE_RESOURCE_ADDED]: "Dodano {{amount}} $t(translation:resource.{{subject1}}, {\"count\": {{amount}}}) do przyszłych surowców.",
            [LOG_CODE.OWNED_RESOURCE_REMOVED]: "Odrzucono {{amount}} $t(translation:resource.{{subject1}}, {\"count\": {{amount}}}) z posiadanych surowców.",
            [LOG_CODE.CAMP_MOVED]: "Przeniesiono obóz.",
            [LOG_CODE.TILE_MODIFIER_ADDED]: "",
            [LOG_CODE.TILE_MODIFIER_REMOVED]: "",
            [LOG_CODE.WOOD_ADDED_TO_PILE]: "Dodano drewno na stos.",
            [LOG_CODE.MORALE_INCREASED_TO_LVL]: "Morale zwiększyły się do poziomu {{amount}}-ego.",
            [LOG_CODE.MORALE_DECREASED_TO_LVL]: "Morale zmniejszyły sie do poziomu {{amount}}-ego.",
            [LOG_CODE.INVENTION_BUILT]: "Zbudowano $t(translation:invention.{{subject1}}, {\"context\": \"accusative\"}).",
            [LOG_CODE.GAME_WON]: "Gra wygrana!",
            [LOG_CODE.GAME_LOST]: "Gra przegrana!",
            [LOG_CODE.FOOD_ROTTED]: "Jedzenie zgniło.",
            [LOG_CODE.CHARACTER_EATS]: "$t(translation:character.{{subject1}}) spożywa $t(translation:resource.{{subject2}}).",
            [LOG_CODE.BEAST_MOVED_TO_BOTTOM_OF_DECK]: "Bestia została przeniesiona na dno talii.",
            [LOG_CODE.BEAST_GOT_HUNTED]: "Upolowano $t(translation:beast.{{subject1}}, {\"context\": \"accusative\"}).",
            [LOG_CODE.BEAST_SHUFFLED_INTO_EVENT_DECK]: "Wtasowano bestię do talii wydarzeń.",
            [LOG_CODE.CONSTRUCTION_UPGRADED]: "Ulepszono $t(translation:construction.{{subject1}}, {\"context\": \"accusative\"}) do poziomu {{amount}}-ego.",
            [LOG_CODE.CONSTRUCTION_DOWNGRADED]: "Poziom $t(translation:construction.{{subject1}}, {\"context\": \"accusative\"}) spadł do poziomu {{amount}}-ego.",
            [LOG_CODE.ITEM_GRANTED]: "Otrzymano $t(translation:item.{{subject1}}, {\"context\"\: \"accusative\"}).",
            [LOG_CODE.CHARACTER_USED_TOKEN]: "$t(translation:character.{{subject1}}) użył tokenu $t(translation:discoveryToken.{{subject2}}, {\"context\": \"genitive\"}).",
            [LOG_CODE.CHARACTER_USED_ABILITY]: "$t(translation:character.{{subject1}}) użył $t(translation:ability.{{subject2}}.name, {\"context\": \"genitive\"}).",
            [LOG_CODE.CHARACTER_GOT_HURT]: "$t(translation:character).{{subject1}} otrzymał {{amount}} obrażeń.",
            [LOG_CODE.RESOURCE_BOOST_REMOVED]: "Źródło $t(translation:resource.{{subject1}}, {\"context\": \"genitive\"}) nie daje już dodatkowego surowca.",
            [LOG_CODE.RESOURCE_BOOST_ADDED]: "Źródło $t(translation:resource.{{subject1}}, {\"context\": \"genitive\"}) będzie dawać dodatkowy surowiec.",
            [LOG_CODE.RESOURCE_DEPLETED]: "Źródło $t(translation:resource.{{subject1}}, {\"context\": \"genitive\"}) zostało wyczerpane.",
            [LOG_CODE.RESOURCE_REPLENISHED]: "Źródło $t(translation:resource.{{subject1}}, {\"context\": \"genitive\"}) zostało odnowione.",
            [LOG_CODE.FUTURE_RESOURCE_REMOVED]: "Zabrano {{amount}} $t(translation:resource.{{subject1}}, {\"count\": {{amount}}}) z przyszłych surowców",
            [LOG_CODE.CHARACTER_GOT_WOUND]: "$t(translation:character.{{subject1}}) otrzymał ranę na $t(translation:bodyPart.{{subject2}}, {\"context\": \"locative\"})",
            [LOG_CODE.CHARACTER_LOST_WOUND]: "$t(translation:character.{{subject1}}, {\"context\": \"dative\"}) nie dokucza już rana na $t(translation:resource.{{subject1}}, {\"context\": \"locative\"}).",
            [LOG_CODE.LOST_GAINED_TREASURES]: "Zebrane skarby zostały utracone!",
            [LOG_CODE.ALL_PLAYERS_GOT_DETERMINATION]: "Wszyscy gracze otrzymują {{amount}} deteterminacji.",
            [LOG_CODE.ALL_PLAYERS_LOST_DETERMINATION]: "Wszyscy gracze tracą {{amount}} determinacji.",
            [LOG_CODE.ALL_PLAYERS_GOT_HURT]: "Wszyscy gracze otrzymują {{amount}} obrażeń.",
            [LOG_CODE.ALL_PLAYERS_GOT_HEALED]: "Wszyscy gracze leczą się z {{amount}} obrażeń.",
        },

    }
}
