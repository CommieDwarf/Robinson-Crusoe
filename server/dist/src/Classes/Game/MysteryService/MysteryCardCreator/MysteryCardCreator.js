"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MysteryCardCreator = void 0;
const MYSTERY_CARD_1 = require("@shared/types/Game/MysteryService/MYSTERY_CARD");
const BlowGun_1 = require("./Cards/Trap/BlowGun");
const BluntSpear_1 = require("./Cards/Trap/BluntSpear");
const Collapse_1 = require("./Cards/Trap/Collapse");
const Confused_1 = require("./Cards/Trap/Confused");
const HiddenRope_1 = require("./Cards/Trap/HiddenRope");
const Net_1 = require("./Cards/Trap/Net");
const Poison_1 = require("./Cards/Trap/Poison");
const SharpBlade_1 = require("./Cards/Trap/SharpBlade");
const SpiderWeb_1 = require("./Cards/Trap/SpiderWeb");
const StrangeDisease_1 = require("./Cards/Trap/StrangeDisease");
const TerribleScream_1 = require("./Cards/Trap/TerribleScream");
const TrapDoor_1 = require("./Cards/Trap/TrapDoor");
const UnfortunateAdventure_1 = require("./Cards/Trap/UnfortunateAdventure");
const AShinyJewel_1 = require("./Cards/Creature/AShinyJewel");
const Bats_1 = require("./Cards/Creature/Bats");
const BigApe_1 = require("./Cards/Creature/BigApe");
const Bite_1 = require("./Cards/Creature/Bite");
const FuriousTiger_1 = require("./Cards/Creature/FuriousTiger");
const GiantSnake_1 = require("./Cards/Creature/GiantSnake");
const Gorilla_1 = require("./Cards/Creature/Gorilla");
const Gremlins_1 = require("./Cards/Creature/Gremlins");
const Savage_1 = require("./Cards/Creature/Savage");
const Scorpion_1 = require("./Cards/Creature/Scorpion");
const Snake_1 = require("./Cards/Creature/Snake");
const Spiders_1 = require("./Cards/Creature/Spiders");
const UnleashedBeast_1 = require("./Cards/Creature/UnleashedBeast");
const AmuletWithPortraitOfBeautifulLady_1 = require("./Cards/Treasure/AmuletWithPortraitOfBeautifulLady");
const AntiqueRapier_1 = require("./Cards/Treasure/AntiqueRapier");
const Backpack_1 = require("./Cards/Treasure/Backpack");
const Barrel_1 = require("./Cards/Treasure/Barrel");
const Blankets_1 = require("./Cards/Treasure/Blankets");
const BottleOfWine_1 = require("./Cards/Treasure/BottleOfWine");
const Boxes_1 = require("./Cards/Treasure/Boxes");
const Candles_1 = require("./Cards/Treasure/Candles");
const CaptainStonesSpyglass_1 = require("./Cards/Treasure/CaptainStonesSpyglass");
const Crocks_1 = require("./Cards/Treasure/Crocks");
const Gold_1 = require("./Cards/Treasure/Gold");
const Hammock_1 = require("./Cards/Treasure/Hammock");
const Hatched_1 = require("./Cards/Treasure/Hatched");
const Helmet_1 = require("./Cards/Treasure/Helmet");
const HerbalMixture_1 = require("./Cards/Treasure/HerbalMixture");
const OldClothes_1 = require("./Cards/Treasure/OldClothes");
const OldMap_1 = require("./Cards/Treasure/OldMap");
const OldRifle_1 = require("./Cards/Treasure/OldRifle");
const ProtectiveAmulet_1 = require("./Cards/Treasure/ProtectiveAmulet");
const Ropes_1 = require("./Cards/Treasure/Ropes");
const Sabre_1 = require("./Cards/Treasure/Sabre");
const TreasureMap_1 = require("./Cards/Treasure/TreasureMap");
const CeremonialBowl_1 = require("./Cards/Treasure/CeremonialBowl");
const Compass_1 = require("./Cards/Treasure/Compass");
const CaveWithFurs_1 = require("./Cards/Treasure/CaveWithFurs");
class MysteryCardCreator {
    constructor(game) {
        this.implemented = {
            treasure: [
                MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.AMULET_WITH_PORTRAIT_OF_BEAUTIFUL_LADY,
                MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.ANTIQUE_RAPIER,
                MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.BARREL,
                MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.BLANKETS,
                MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.BOTTLE_OF_WINE,
                MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.BOXES,
                MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.CANDLES,
                MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.CAVE_WITH_FURS,
                MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.COMPASS,
                MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.CROCKS,
                MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.GOLD,
                MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.HAMMOCK,
                MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.HATCHED,
                MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.HELMET,
                MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.OLD_CLOTHES,
                MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.OLD_MAP,
                MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.OLD_RIFLE,
                MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.SABRE,
            ],
            creature: [
                MYSTERY_CARD_1.CREATURE_MYSTERY_CARD.A_SHINY_JEWEL,
                MYSTERY_CARD_1.CREATURE_MYSTERY_CARD.BATS,
                MYSTERY_CARD_1.CREATURE_MYSTERY_CARD.BIG_APE,
                MYSTERY_CARD_1.CREATURE_MYSTERY_CARD.BITE,
                MYSTERY_CARD_1.CREATURE_MYSTERY_CARD.FURIOUS_TIGER,
                MYSTERY_CARD_1.CREATURE_MYSTERY_CARD.GIANT_SNAKE,
                MYSTERY_CARD_1.CREATURE_MYSTERY_CARD.GORILLA,
                MYSTERY_CARD_1.CREATURE_MYSTERY_CARD.GREMLINS,
                MYSTERY_CARD_1.CREATURE_MYSTERY_CARD.SAVAGE,
                MYSTERY_CARD_1.CREATURE_MYSTERY_CARD.SCORPION,
                MYSTERY_CARD_1.CREATURE_MYSTERY_CARD.SNAKE,
                MYSTERY_CARD_1.CREATURE_MYSTERY_CARD.SPIDERS,
                MYSTERY_CARD_1.CREATURE_MYSTERY_CARD.UNLEASHED_BEAST
            ],
            trap: [
                MYSTERY_CARD_1.TRAP_MYSTERY_CARD.BLUNT_SPEAR,
                MYSTERY_CARD_1.TRAP_MYSTERY_CARD.COLLAPSE,
                MYSTERY_CARD_1.TRAP_MYSTERY_CARD.HIDDEN_ROPE,
                MYSTERY_CARD_1.TRAP_MYSTERY_CARD.NET,
                MYSTERY_CARD_1.TRAP_MYSTERY_CARD.POISON,
                MYSTERY_CARD_1.TRAP_MYSTERY_CARD.SHARP_BLADE,
                MYSTERY_CARD_1.TRAP_MYSTERY_CARD.SPIDER_WEB,
                MYSTERY_CARD_1.TRAP_MYSTERY_CARD.TERRIBLE_SCREAM,
                MYSTERY_CARD_1.TRAP_MYSTERY_CARD.TRAP_DOOR,
            ]
        };
        this._game = game;
    }
    createAllMysteryCards() {
        return [
            ...this.createAllTrapCards(),
            ...this.createAllCreatureCards(),
            ...this.createAllTreasureCards(),
        ];
    }
    createAllCreatureCards() {
        return Object.values(MYSTERY_CARD_1.CREATURE_MYSTERY_CARD).map((card) => {
            return this.createCreatureCard(card);
        });
    }
    createAllTrapCards() {
        return Object.values(MYSTERY_CARD_1.TRAP_MYSTERY_CARD).map((card) => {
            return this.createTrapCard(card);
        });
    }
    createAllTreasureCards() {
        return Object.values(MYSTERY_CARD_1.TREASURE_MYSTERY_CARD).map((card) => {
            return this.createTreasureCard(card);
        });
    }
    createCreatureCard(card) {
        const game = this._game;
        switch (card) {
            case MYSTERY_CARD_1.CREATURE_MYSTERY_CARD.A_SHINY_JEWEL:
                return new AShinyJewel_1.AShinyJewel(game);
            case MYSTERY_CARD_1.CREATURE_MYSTERY_CARD.BATS:
                return new Bats_1.Bats(game);
            case MYSTERY_CARD_1.CREATURE_MYSTERY_CARD.BIG_APE:
                return new BigApe_1.BigApe(game);
            case MYSTERY_CARD_1.CREATURE_MYSTERY_CARD.BITE:
                return new Bite_1.Bite(game);
            case MYSTERY_CARD_1.CREATURE_MYSTERY_CARD.FURIOUS_TIGER:
                return new FuriousTiger_1.FuriousTiger(game);
            case MYSTERY_CARD_1.CREATURE_MYSTERY_CARD.GIANT_SNAKE:
                return new GiantSnake_1.GiantSnake(game);
            case MYSTERY_CARD_1.CREATURE_MYSTERY_CARD.GORILLA:
                return new Gorilla_1.Gorilla(game);
            case MYSTERY_CARD_1.CREATURE_MYSTERY_CARD.GREMLINS:
                return new Gremlins_1.Gremlins(game);
            case MYSTERY_CARD_1.CREATURE_MYSTERY_CARD.SAVAGE:
                return new Savage_1.Savage(game);
            case MYSTERY_CARD_1.CREATURE_MYSTERY_CARD.SCORPION:
                return new Scorpion_1.Scorpion(game);
            case MYSTERY_CARD_1.CREATURE_MYSTERY_CARD.SNAKE:
                return new Snake_1.Snake(game);
            case MYSTERY_CARD_1.CREATURE_MYSTERY_CARD.SPIDERS:
                return new Spiders_1.Spiders(game);
            case MYSTERY_CARD_1.CREATURE_MYSTERY_CARD.UNLEASHED_BEAST:
                return new UnleashedBeast_1.UnleashedBeast(game);
        }
    }
    createTrapCard(card) {
        const game = this._game;
        switch (card) {
            case MYSTERY_CARD_1.TRAP_MYSTERY_CARD.BLOW_GUN:
                return new BlowGun_1.BlowGun(game);
            case MYSTERY_CARD_1.TRAP_MYSTERY_CARD.BLUNT_SPEAR:
                return new BluntSpear_1.BluntSpear(game);
            case MYSTERY_CARD_1.TRAP_MYSTERY_CARD.COLLAPSE:
                return new Collapse_1.Collapse(game);
            case MYSTERY_CARD_1.TRAP_MYSTERY_CARD.CONFUSED:
                return new Confused_1.Confused(game);
            case MYSTERY_CARD_1.TRAP_MYSTERY_CARD.HIDDEN_ROPE:
                return new HiddenRope_1.HiddenRope(game);
            case MYSTERY_CARD_1.TRAP_MYSTERY_CARD.NET:
                return new Net_1.Net(game);
            case MYSTERY_CARD_1.TRAP_MYSTERY_CARD.POISON:
                return new Poison_1.Poison(game);
            case MYSTERY_CARD_1.TRAP_MYSTERY_CARD.SHARP_BLADE:
                return new SharpBlade_1.SharpBlade(game);
            case MYSTERY_CARD_1.TRAP_MYSTERY_CARD.SPIDER_WEB:
                return new SpiderWeb_1.SpiderWeb(game);
            case MYSTERY_CARD_1.TRAP_MYSTERY_CARD.STRANGE_DISEASE:
                return new StrangeDisease_1.StrangeDisease(game);
            case MYSTERY_CARD_1.TRAP_MYSTERY_CARD.TERRIBLE_SCREAM:
                return new TerribleScream_1.TerribleScream(game);
            case MYSTERY_CARD_1.TRAP_MYSTERY_CARD.TRAP_DOOR:
                return new TrapDoor_1.TrapDoor(game);
            case MYSTERY_CARD_1.TRAP_MYSTERY_CARD.UNFORTUNATE_ADVENTURE:
                return new UnfortunateAdventure_1.UnfortunateAdventure(game);
        }
    }
    createTreasureCard(card) {
        const game = this._game;
        switch (card) {
            case MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.AMULET_WITH_PORTRAIT_OF_BEAUTIFUL_LADY:
                return new AmuletWithPortraitOfBeautifulLady_1.AmuletWithPortraitOfBeautifulLady(game);
            case MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.ANTIQUE_RAPIER:
                return new AntiqueRapier_1.AntiqueRapier(game);
            case MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.BACKPACK:
                return new Backpack_1.Backpack(game);
            case MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.BARREL:
                return new Barrel_1.Barrel(game);
            case MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.BLANKETS:
                return new Blankets_1.Blankets(game);
            case MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.BOTTLE_OF_WINE:
                return new BottleOfWine_1.BottleOfWine(game);
            case MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.BOXES:
                return new Boxes_1.Boxes(game);
            case MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.CANDLES:
                return new Candles_1.Candles(game);
            case MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.CAPTAIN_STONES_SPYGLASS:
                return new CaptainStonesSpyglass_1.CaptainStonesSpyglass(game);
            case MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.CAVE_WITH_FURS:
                return new CaveWithFurs_1.CaveWithFurs(game);
            case MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.CEREMONIAL_BOWL:
                return new CeremonialBowl_1.CeremonialBowl(game);
            case MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.COMPASS:
                return new Compass_1.Compass(game);
            case MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.CROCKS:
                return new Crocks_1.Crocks(game);
            case MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.GOLD:
                return new Gold_1.Gold(game);
            case MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.HAMMOCK:
                return new Hammock_1.Hammock(game);
            case MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.HATCHED:
                return new Hatched_1.Hatched(game);
            case MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.HELMET:
                return new Helmet_1.Helmet(game);
            case MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.HERBAL_MIXTURE:
                return new HerbalMixture_1.HerbalMixture(game);
            case MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.OLD_CLOTHES:
                return new OldClothes_1.OldClothes(game);
            case MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.OLD_MAP:
                return new OldMap_1.OldMap(game);
            case MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.OLD_RIFLE:
                return new OldRifle_1.OldRifle(game);
            case MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.PROTECTIVE_AMULET:
                return new ProtectiveAmulet_1.ProtectiveAmulet(game);
            case MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.ROPES:
                return new Ropes_1.Ropes(game);
            case MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.SABRE:
                return new Sabre_1.Sabre(game);
            case MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.TREASURE_MAP:
                return new TreasureMap_1.TreasureMap(game);
        }
    }
}
exports.MysteryCardCreator = MysteryCardCreator;
//# sourceMappingURL=MysteryCardCreator.js.map