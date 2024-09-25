"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeastCreator = void 0;
const Beast_1 = require("./Beast");
const Beast_2 = require("../../../../shared/types/Game/Beasts/Beast");
const Alligator_1 = require("./Beasts/Alligator");
const Bear_1 = require("./Beasts/Bear");
const Birds_1 = require("./Beasts/Birds");
const Boa_1 = require("./Beasts/Boa");
const Chamois_1 = require("./Beasts/Chamois");
const Cheetah_1 = require("./Beasts/Cheetah");
const Fox_1 = require("./Beasts/Fox");
const Goats_1 = require("./Beasts/Goats");
const Gorilla_1 = require("./Beasts/Gorilla");
const Iguana_1 = require("./Beasts/Iguana");
const Jaguar_1 = require("./Beasts/Jaguar");
const Puma_1 = require("./Beasts/Puma");
const Tapir_1 = require("./Beasts/Tapir");
const Tiger_1 = require("./Beasts/Tiger");
const WildDog_1 = require("./Beasts/WildDog");
const WildPig_1 = require("./Beasts/WildPig");
class BeastCreator {
    constructor(game) {
        this._game = game;
    }
    createCustomBeast(stats) {
        return new Beast_1.Beast(stats.name, stats.strength, stats.weaponLoss, stats.reward, this._game);
    }
    create(name) {
        switch (name) {
            case Beast_2.BEAST.ALLIGATOR:
                return new Alligator_1.Alligator(this._game);
            case Beast_2.BEAST.BEAR:
                return new Bear_1.Bear(this._game);
            case Beast_2.BEAST.BIRDS:
                return new Birds_1.Birds(this._game);
            case Beast_2.BEAST.BOA:
                return new Boa_1.Boa(this._game);
            case Beast_2.BEAST.CHAMOIS:
                return new Chamois_1.Chamois(this._game);
            case Beast_2.BEAST.CHEETAH:
                return new Cheetah_1.Cheetah(this._game);
            case Beast_2.BEAST.FOX:
                return new Fox_1.Fox(this._game);
            case Beast_2.BEAST.GOATS:
                return new Goats_1.Goats(this._game);
            case Beast_2.BEAST.GORILLA:
                return new Gorilla_1.Gorilla(this._game);
            case Beast_2.BEAST.IGUANA:
                return new Iguana_1.Iguana(this._game);
            case Beast_2.BEAST.JAGUAR:
                return new Jaguar_1.Jaguar(this._game);
            case Beast_2.BEAST.PUMA:
                return new Puma_1.Puma(this._game);
            case Beast_2.BEAST.TAPIR:
                return new Tapir_1.Tapir(this._game);
            case Beast_2.BEAST.TIGER:
                return new Tiger_1.Tiger(this._game);
            case Beast_2.BEAST.WILD_DOG:
                return new WildDog_1.WildDog(this._game);
            case Beast_2.BEAST.WILD_PIG:
                return new WildPig_1.WildPig(this._game);
        }
    }
}
exports.BeastCreator = BeastCreator;
//# sourceMappingURL=BeastCreator.js.map