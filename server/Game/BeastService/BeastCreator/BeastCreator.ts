import {Beast} from "./Beast";
import {IGame} from "../../../../interfaces/Game";
import {BEAST} from "../../../../interfaces/Beasts/Beast";
import {ICreator} from "../../../../interfaces/Creator/Creator";
import {Alligator} from "./Beasts/Alligator";
import {Bear} from "./Beasts/Bear";
import {Birds} from "./Beasts/Birds";
import {Boa} from "./Beasts/Boa";
import {Chamois} from "./Beasts/Chamois";
import {Cheetah} from "./Beasts/Cheetah";
import {Fox} from "./Beasts/Fox";
import {Goats} from "./Beasts/Goats";
import {Gorilla} from "./Beasts/Gorilla";
import {Iguana} from "./Beasts/Iguana";
import {Jaguar} from "./Beasts/Jaguar";
import {Puma} from "./Beasts/Puma";
import {Tapir} from "./Beasts/Tapir";
import {Tiger} from "./Beasts/Tiger";
import {WildDog} from "./Beasts/WildDog";
import {WildPig} from "./Beasts/WildPig";
import {IBasicResources} from "../../../../interfaces/Resources/Resources";

export interface BeastStats {
    name: string,
    namePL: string,
    strength: number,
    weaponLoss: number,
    reward: IBasicResources,
}

export class BeastCreator implements ICreator<Beast, BEAST> {
    private readonly _game: IGame;

    constructor(game: IGame) {
        this._game = game;
    }

    createCustomBeast(stats: BeastStats) {
        return new Beast(
            stats.name,
            stats.namePL,
            stats.strength,
            stats.weaponLoss,
            stats.reward,
            this._game
        );
    }

    create(name: BEAST) {
        switch (name) {
            case BEAST.ALLIGATOR:
                return new Alligator(this._game);
            case BEAST.BEAR:
                return new Bear(this._game);
            case BEAST.BIRDS:
                return new Birds(this._game);
            case BEAST.BOA:
                return new Boa(this._game);
            case BEAST.CHAMOIS:
                return new Chamois(this._game);
            case BEAST.CHEETAH:
                return new Cheetah(this._game);
            case BEAST.FOX:
                return new Fox(this._game);
            case BEAST.GOATS:
                return new Goats(this._game);
            case BEAST.GORILLA:
                return new Gorilla(this._game);
            case BEAST.IGUANA:
                return new Iguana(this._game);
            case BEAST.JAGUAR:
                return new Jaguar(this._game);
            case BEAST.PUMA:
                return new Puma(this._game);
            case BEAST.TAPIR:
                return new Tapir(this._game);
            case BEAST.TIGER:
                return new Tiger(this._game);
            case BEAST.WILD_DOG:
                return new WildDog(this._game);
            case BEAST.WILD_PIG:
                return new WildPig(this._game);
        }
    }
}
