import {CreatureMysteryCard} from "./CreatureMysteryCard/CreatureMysteryCard";
import {IMysteryCard} from "../../../../../types/MysteryService/MysteryCard";
import {IGame} from "../../../../../types/Game";
import {BeastStats} from "../../../../BeastService/BeastCreator/BeastCreator";
import {BasicResources} from "../../../../ResourceService/BasicResources";
import {ICharacter} from "../../../../../types/Characters/Character";

export class Gremlins extends CreatureMysteryCard implements IMysteryCard {
    constructor(game: IGame) {
        super(game, "gremlins", "gremliny", true, "gremliny was wytropiły", "walcz", "walcz");
    }

    private _beastStats: BeastStats = {
        name: "gremlins",
        namePL: "gremliny",
        strength: 0,
        weaponLoss: 0,
        reward: new BasicResources(),
    }

    triggerDrawEffect(drawer: ICharacter) {
        //TODO: implement custom beast fight;

        this._game.beastService.fightCustomBeast(drawer, this._beastStats);
        this.shuffleIntoEventDeck();
        this._drawResolved = true;
    }

    triggerEventEffect() {
        this._beastStats.strength = 3;
        this._game.beastService.fightCustomBeast(this._game.playerService.primePlayer.getCharacter(), this._beastStats);
        this.shuffleIntoEventDeck();
    }
}
