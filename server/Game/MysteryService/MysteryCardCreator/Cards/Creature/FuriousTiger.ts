import {CreatureMysteryCard} from "./CreatureMysteryCard/CreatureMysteryCard";
import {IMysteryCard} from "../../../../../../interfaces/MysteryService/MysteryCard";
import {IGame} from "../../../../../../interfaces/Game";
import {BeastStats} from "../../../../BeastService/BeastCreator/BeastCreator";
import {BasicResources} from "../../../../ResourceService/BasicResources";
import {IPlayerCharacter} from "../../../../../../interfaces/Characters/PlayerCharacter";

export class FuriousTiger extends CreatureMysteryCard implements IMysteryCard {
    constructor(game: IGame) {
        super(game, "furious tiger", "rozszalały tygrys", false, "", "", "Walcz");
    }

    triggerDrawEffect(drawer: IPlayerCharacter) {
        const beastStats: BeastStats = {
            name: this._name,
            namePL: this._namePL,
            strength: 4,
            weaponLoss: 0,
            reward: new BasicResources()
        }

        this._game.beastService.fightCustomBeast(drawer, beastStats)
    }
}
