import {IGame} from "@shared/types/Game/Game";
import {DISCOVERY_TOKEN, IToken,} from "@shared/types/Game/TokenService/Token";
import {Candles} from "../Tokens/Candles";
import {FallenTree} from "../Tokens/FallenTree";
import {LargeLeaves} from "../Tokens/LargeLeaves";
import {OldMachete} from "../Tokens/OldMachete";
import {Poison} from "../Tokens/Poison";
import {Herbs} from "../Tokens/Herbs";
import {Goat} from "../Tokens/Goat";
import {ThornyBushes} from "../Tokens/ThornyBushes";
import {Tobacco} from "../Tokens/Tobacco";
import {Treasure} from "../Tokens/Treasure";
import {Vegetables} from "../Tokens/Vegetables";
import {Castaways1} from "../Tokens/Castaways/Castaways1";
import {Castaways2} from "../Tokens/Castaways/Castaways2";
import {Castaways3} from "../Tokens/Castaways/Castaways3";
import {Castaways4} from "../Tokens/Castaways/Castaways4";
import {NourishingLarvae} from "../Tokens/NourishingLarvae";
import {HealingHerbs} from "../Tokens/HealingHerbs";
import {ICreator} from "@shared/types/Game/Creator/Creator";

export class TokenCreator implements ICreator<IToken, DISCOVERY_TOKEN> {
    private readonly _game: IGame;
    private _counter = 0;

    constructor(game: IGame) {
        this._game = game;
    }


    create(discoveryToken: DISCOVERY_TOKEN) {
        const game = this._game;
        switch (discoveryToken) {
            case DISCOVERY_TOKEN.CANDLES:
                return new Candles(game, this.getId());
            case DISCOVERY_TOKEN.FALLEN_TREE:
                return new FallenTree(game, this.getId());
            case DISCOVERY_TOKEN.GOAT:
                return new Goat(game, this.getId());
            case DISCOVERY_TOKEN.HEALING_HERBS:
                return new HealingHerbs(game, this.getId());
            case DISCOVERY_TOKEN.HERBS:
                return new Herbs(game, this.getId());
            case DISCOVERY_TOKEN.NOURISHING_LARVAE:
                return new NourishingLarvae(game, this.getId());
            case DISCOVERY_TOKEN.LARGE_LEAVES:
                return new LargeLeaves(game, this.getId());
            case DISCOVERY_TOKEN.OLD_MACHETE:
                return new OldMachete(game, this.getId());
            case DISCOVERY_TOKEN.POISON:
                return new Poison(game, this.getId());
            case DISCOVERY_TOKEN.THORNY_BUSHES:
                return new ThornyBushes(game, this.getId());
            case DISCOVERY_TOKEN.TOBACCO:
                return new Tobacco(game, this.getId());
            case DISCOVERY_TOKEN.TREASURE:
                return new Treasure(game, this.getId());
            case DISCOVERY_TOKEN.VEGETABLES:
                return new Vegetables(game, this.getId());
            case DISCOVERY_TOKEN.SCENARIO_1:
                return new Castaways1(game, this.getId());
            case DISCOVERY_TOKEN.SCENARIO_2:
                return new Castaways2(game, this.getId());
            case DISCOVERY_TOKEN.SCENARIO_3:
                return new Castaways3(game, this.getId());
            case DISCOVERY_TOKEN.SCENARIO_4:
                return new Castaways4(game, this.getId());
        }
    }

    private getId() {
        return (this._counter++).toString();
    }
}
