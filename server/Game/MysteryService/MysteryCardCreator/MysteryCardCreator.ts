import {IGame} from "../../../../interfaces/Game";
import {
    CREATURE_MYSTERY_CARD,
    TRAP_MYSTERY_CARD,
    TREASURE_MYSTERY_CARD,
} from "../../../../interfaces/MysteryService/MYSTERY_CARD";
import {BlowGun} from "./Cards/Trap/BlowGun";
import {IMysteryCard, ITreasureMysteryCard} from "../../../../interfaces/MysteryService/MysteryCard";
import {BluntSpear} from "./Cards/Trap/BluntSpear";
import {Collapse} from "./Cards/Trap/Collapse";
import {Confused} from "./Cards/Trap/Confused";
import {HiddenRope} from "./Cards/Trap/HiddenRope";
import {Net} from "./Cards/Trap/Net";
import {Poison} from "./Cards/Trap/Poison";
import {SharpBlade} from "./Cards/Trap/SharpBlade";
import {SpiderWeb} from "./Cards/Trap/SpiderWeb";
import {StrangeDisease} from "./Cards/Trap/StrangeDisease";
import {TerribleScream} from "./Cards/Trap/TerribleScream";
import {TrapDoor} from "./Cards/Trap/TrapDoor";
import {UnfortunateAdventure} from "./Cards/Trap/UnfortunateAdventure";
import {AShinyJewel} from "./Cards/Creature/AShinyJewel";
import {Bats} from "./Cards/Creature/Bats";
import {BigApe} from "./Cards/Creature/BigApe";
import {Bite} from "./Cards/Creature/Bite";
import {FuriousTiger} from "./Cards/Creature/FuriousTiger";
import {GiantSnake} from "./Cards/Creature/GiantSnake";
import {Gorilla} from "./Cards/Creature/Gorilla";
import {Gremlins} from "./Cards/Creature/Gremlins";
import {Savage} from "./Cards/Creature/Savage";
import {Scorpion} from "./Cards/Creature/Scorpion";
import {Snake} from "./Cards/Creature/Snake";
import {Spiders} from "./Cards/Creature/Spiders";
import {UnleashedBeast} from "./Cards/Creature/UnleashedBeast";
import {AmuletWithPortraitOfBeautifulLady} from "./Cards/Treasure/AmuletWithPortraitOfBeautifulLady";
import {AntiqueRapier} from "./Cards/Treasure/AntiqueRapier";
import {Backpack} from "./Cards/Treasure/Backpack";
import {Barrel} from "./Cards/Treasure/Barrel";
import {Blankets} from "./Cards/Treasure/Blankets";
import {BottleOfWine} from "./Cards/Treasure/BottleOfWine";
import {Boxes} from "./Cards/Treasure/Boxes";
import {Candles} from "./Cards/Treasure/Candles";
import {CaptainStonesSpyglass} from "./Cards/Treasure/CaptainStonesSpyglass";
import {Crocks} from "./Cards/Treasure/Crocks";
import {Gold} from "./Cards/Treasure/Gold";
import {Hammock} from "./Cards/Treasure/Hammock";
import {Hatched} from "./Cards/Treasure/Hatched";
import {Helmet} from "./Cards/Treasure/Helmet";
import {HerbalMixture} from "./Cards/Treasure/HerbalMixture";
import {OldClothes} from "./Cards/Treasure/OldClothes";
import {OldMap} from "./Cards/Treasure/OldMap";
import {OldRifle} from "./Cards/Treasure/OldRifle";
import {ProtectiveAmulet} from "./Cards/Treasure/ProtectiveAmulet";
import {Ropes} from "./Cards/Treasure/Ropes";
import {Sabre} from "./Cards/Treasure/Sabre";
import {TreasureMap} from "./Cards/Treasure/TreasureMap";
import {CeremonialBowl} from "./Cards/Treasure/CeremonialBowl";
import {Compass} from "./Cards/Treasure/Compass";
import {CaveWithFurs} from "./Cards/Treasure/CaveWithFurs";
import {IMysteryCardCreator} from "../../../../interfaces/MysteryService/MysteryCardCreator";

export class MysteryCardCreator implements IMysteryCardCreator {
    private readonly _game: IGame;

    public implemented = {
        treasure: [
            TREASURE_MYSTERY_CARD.AMULET_WITH_PORTRAIT_OF_BEAUTIFUL_LADY,
            TREASURE_MYSTERY_CARD.ANTIQUE_RAPIER,
            TREASURE_MYSTERY_CARD.BARREL,
            TREASURE_MYSTERY_CARD.BLANKETS,
            TREASURE_MYSTERY_CARD.BOTTLE_OF_WINE,
            TREASURE_MYSTERY_CARD.BOXES,
            TREASURE_MYSTERY_CARD.CANDLES,
            TREASURE_MYSTERY_CARD.CAVE_WITH_FURS,
            TREASURE_MYSTERY_CARD.COMPASS,
            TREASURE_MYSTERY_CARD.CROCKS,
            TREASURE_MYSTERY_CARD.GOLD,
            TREASURE_MYSTERY_CARD.HAMMOCK,
            TREASURE_MYSTERY_CARD.HATCHED,
            TREASURE_MYSTERY_CARD.HELMET,
            TREASURE_MYSTERY_CARD.OLD_CLOTHES,
            TREASURE_MYSTERY_CARD.OLD_MAP,
            TREASURE_MYSTERY_CARD.OLD_RIFLE,
            TREASURE_MYSTERY_CARD.SABRE,
        ],
        creature: [
            CREATURE_MYSTERY_CARD.A_SHINY_JEWEL,
            CREATURE_MYSTERY_CARD.BATS,
            CREATURE_MYSTERY_CARD.BIG_APE,
            CREATURE_MYSTERY_CARD.BITE,
            CREATURE_MYSTERY_CARD.FURIOUS_TIGER,
            CREATURE_MYSTERY_CARD.GIANT_SNAKE,
            CREATURE_MYSTERY_CARD.GORILLA,
            CREATURE_MYSTERY_CARD.GREMLINS,
            CREATURE_MYSTERY_CARD.SAVAGE,
            CREATURE_MYSTERY_CARD.SCORPION,
            CREATURE_MYSTERY_CARD.SNAKE,
            CREATURE_MYSTERY_CARD.SPIDERS,
            CREATURE_MYSTERY_CARD.UNLEASHED_BEAST
        ],
        trap: [
            TRAP_MYSTERY_CARD.BLUNT_SPEAR,
            TRAP_MYSTERY_CARD.COLLAPSE,
            TRAP_MYSTERY_CARD.HIDDEN_ROPE,
            TRAP_MYSTERY_CARD.NET,
            TRAP_MYSTERY_CARD.POISON,
            TRAP_MYSTERY_CARD.SHARP_BLADE,
            TRAP_MYSTERY_CARD.SPIDER_WEB,
            TRAP_MYSTERY_CARD.TERRIBLE_SCREAM,
            TRAP_MYSTERY_CARD.TRAP_DOOR,
        ]
    }

    constructor(game: IGame) {
        this._game = game;
    }

    public createAllMysteryCards(): IMysteryCard[] {
        return [
            ...this.createAllTrapCards(),
            ...this.createAllCreatureCards(),
            ...this.createAllTreasureCards(),
        ];
    }

    public createAllCreatureCards(): IMysteryCard[] {
        return Object.values(CREATURE_MYSTERY_CARD).map((card) => {
            return this.createCreatureCard(card);
        });
    }

    public createAllTrapCards(): IMysteryCard[] {
        return Object.values(TRAP_MYSTERY_CARD).map((card) => {
            return this.createTrapCard(card);
        });
    }

    public createAllTreasureCards(): IMysteryCard[] {
        return Object.values(TREASURE_MYSTERY_CARD).map((card) => {
            return this.createTreasureCard(card);
        });
    }

    public createCreatureCard(card: CREATURE_MYSTERY_CARD): IMysteryCard {
        const game = this._game;
        switch (card) {
            case CREATURE_MYSTERY_CARD.A_SHINY_JEWEL:
                return new AShinyJewel(game);
            case CREATURE_MYSTERY_CARD.BATS:
                return new Bats(game);
            case CREATURE_MYSTERY_CARD.BIG_APE:
                return new BigApe(game);
            case CREATURE_MYSTERY_CARD.BITE:
                return new Bite(game);
            case CREATURE_MYSTERY_CARD.FURIOUS_TIGER:
                return new FuriousTiger(game);
            case CREATURE_MYSTERY_CARD.GIANT_SNAKE:
                return new GiantSnake(game);
            case CREATURE_MYSTERY_CARD.GORILLA:
                return new Gorilla(game);
            case CREATURE_MYSTERY_CARD.GREMLINS:
                return new Gremlins(game);
            case CREATURE_MYSTERY_CARD.SAVAGE:
                return new Savage(game);
            case CREATURE_MYSTERY_CARD.SCORPION:
                return new Scorpion(game);
            case CREATURE_MYSTERY_CARD.SNAKE:
                return new Snake(game);
            case CREATURE_MYSTERY_CARD.SPIDERS:
                return new Spiders(game);
            case CREATURE_MYSTERY_CARD.UNLEASHED_BEAST:
                return new UnleashedBeast(game);
        }
    }

    public createTrapCard(card: TRAP_MYSTERY_CARD): IMysteryCard {
        const game = this._game;
        switch (card) {
            case TRAP_MYSTERY_CARD.BLOW_GUN:
                return new BlowGun(game);
            case TRAP_MYSTERY_CARD.BLUNT_SPEAR:
                return new BluntSpear(game);
            case TRAP_MYSTERY_CARD.COLLAPSE:
                return new Collapse(game);
            case TRAP_MYSTERY_CARD.CONFUSED:
                return new Confused(game);
            case TRAP_MYSTERY_CARD.HIDDEN_ROPE:
                return new HiddenRope(game);
            case TRAP_MYSTERY_CARD.NET:
                return new Net(game);
            case TRAP_MYSTERY_CARD.POISON:
                return new Poison(game);
            case TRAP_MYSTERY_CARD.SHARP_BLADE:
                return new SharpBlade(game);
            case TRAP_MYSTERY_CARD.SPIDER_WEB:
                return new SpiderWeb(game);
            case TRAP_MYSTERY_CARD.STRANGE_DISEASE:
                return new StrangeDisease(game);
            case TRAP_MYSTERY_CARD.TERRIBLE_SCREAM:
                return new TerribleScream(game);
            case TRAP_MYSTERY_CARD.TRAP_DOOR:
                return new TrapDoor(game);
            case TRAP_MYSTERY_CARD.UNFORTUNATE_ADVENTURE:
                return new UnfortunateAdventure(game);
        }
    }

    public createTreasureCard(card: TREASURE_MYSTERY_CARD): ITreasureMysteryCard {
        const game = this._game;
        switch (card) {
            case TREASURE_MYSTERY_CARD.AMULET_WITH_PORTRAIT_OF_BEAUTIFUL_LADY:
                return new AmuletWithPortraitOfBeautifulLady(game);
            case TREASURE_MYSTERY_CARD.ANTIQUE_RAPIER:
                return new AntiqueRapier(game);
            case TREASURE_MYSTERY_CARD.BACKPACK:
                return new Backpack(game);
            case TREASURE_MYSTERY_CARD.BARREL:
                return new Barrel(game);
            case TREASURE_MYSTERY_CARD.BLANKETS:
                return new Blankets(game);
            case TREASURE_MYSTERY_CARD.BOTTLE_OF_WINE:
                return new BottleOfWine(game);
            case TREASURE_MYSTERY_CARD.BOXES:
                return new Boxes(game);
            case TREASURE_MYSTERY_CARD.CANDLES:
                return new Candles(game);
            case TREASURE_MYSTERY_CARD.CAPTAIN_STONES_SPYGLASS:
                return new CaptainStonesSpyglass(game);
            case TREASURE_MYSTERY_CARD.CAVE_WITH_FURS:
                return new CaveWithFurs(game);
            case TREASURE_MYSTERY_CARD.CEREMONIAL_BOWL:
                return new CeremonialBowl(game);
            case TREASURE_MYSTERY_CARD.COMPASS:
                return new Compass(game);
            case TREASURE_MYSTERY_CARD.CROCKS:
                return new Crocks(game);
            case TREASURE_MYSTERY_CARD.GOLD:
                return new Gold(game);
            case TREASURE_MYSTERY_CARD.HAMMOCK:
                return new Hammock(game);
            case TREASURE_MYSTERY_CARD.HATCHED:
                return new Hatched(game);
            case TREASURE_MYSTERY_CARD.HELMET:
                return new Helmet(game);
            case TREASURE_MYSTERY_CARD.HERBAL_MIXTURE:
                return new HerbalMixture(game);
            case TREASURE_MYSTERY_CARD.OLD_CLOTHES:
                return new OldClothes(game);
            case TREASURE_MYSTERY_CARD.OLD_MAP:
                return new OldMap(game);
            case TREASURE_MYSTERY_CARD.OLD_RIFLE:
                return new OldRifle(game);
            case TREASURE_MYSTERY_CARD.PROTECTIVE_AMULET:
                return new ProtectiveAmulet(game);
            case TREASURE_MYSTERY_CARD.ROPES:
                return new Ropes(game);
            case TREASURE_MYSTERY_CARD.SABRE:
                return new Sabre(game);
            case TREASURE_MYSTERY_CARD.TREASURE_MAP:
                return new TreasureMap(game);
        }
    }


}
