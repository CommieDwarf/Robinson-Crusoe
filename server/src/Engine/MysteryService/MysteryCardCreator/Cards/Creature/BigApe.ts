import {CreatureMysteryCard} from "./CreatureMysteryCard/CreatureMysteryCard";
import {IMysteryCard} from "../../../../../types/MysteryService/MysteryCard";
import {IGame} from "../../../../../types/Game";
import {BeastStats} from "../../../../BeastService/BeastCreator/BeastCreator";
import {BasicResources} from "../../../../ResourceService/BasicResources";
import {ICharacter} from "../../../../../types/Characters/Character";

export class BigApe
    extends CreatureMysteryCard
    implements IMysteryCard {
    constructor(game: IGame) {
        super(game, "big ape", "wielka małpa", true, "nocny demon", "Walcz");
    }

    triggerDrawEffect(drawer: ICharacter) {
        this.shuffleIntoEventDeck();
    }

    triggerEventEffect() {
        const beastStats: BeastStats = {
            name: "big ape",
            namePL: "wielka małpa",
            strength: 4,
            weaponLoss: 0,
            reward: new BasicResources(0, 0, 0, 2)
        }
        this._game.beastService.fightCustomBeast(this._game.playerService.primePlayer.getCharacter(), beastStats);
    }
}
