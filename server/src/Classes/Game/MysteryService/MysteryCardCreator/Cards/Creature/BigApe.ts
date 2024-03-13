import {CreatureMysteryCard} from "./CreatureMysteryCard/CreatureMysteryCard";
import {IGame} from "@shared/types/Game/Game";
import {BeastStats} from "../../../../BeastService/BeastCreator/BeastCreator";
import {BasicResources} from "../../../../ResourceService/BasicResources";
import {ICharacter} from "@shared/types/Game/Characters/Character";
import {CREATURE_MYSTERY_CARD} from "@shared/types/Game/MysteryService/MYSTERY_CARD";

export class BigApe
    extends CreatureMysteryCard {
    constructor(game: IGame) {
        super(game, CREATURE_MYSTERY_CARD.BIG_APE, true, "night demon", "fight");
    }

    triggerDrawEffect(drawer: ICharacter) {
        this.shuffleIntoEventDeck();
    }

    triggerEventEffect() {
        const beastStats: BeastStats = {
            name: "big ape",
            strength: 4,
            weaponLoss: 0,
            reward: new BasicResources(0, 0, 0, 2)
        }
        this._game.beastService.fightCustomBeast(this._game.playerService.primePlayer.getCharacter(), beastStats);
    }
}
