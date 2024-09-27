import {CreatureMysteryCard} from "./CreatureMysteryCard/CreatureMysteryCard";
import {IMysteryCard} from "@shared/types/Game/MysteryService/MysteryCard";
import {IGame} from "@shared/types/Game/Game";
import {BasicResources} from "../../../../ResourceService/BasicResources";
import {ICharacter} from "@shared/types/Game/Characters/Character";
import {CREATURE_MYSTERY_CARD} from "@shared/types/Game/MysteryService/MYSTERY_CARD";
import { BeastStats } from "@shared/types/Game/Beasts/Beast";

export class Gremlins extends CreatureMysteryCard {
    constructor(game: IGame) {
        super(game, CREATURE_MYSTERY_CARD.GREMLINS, true, "gremlins have tracked you down", "fight");
    }

    private _beastStats: BeastStats = {
        name: "gremlins",
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
