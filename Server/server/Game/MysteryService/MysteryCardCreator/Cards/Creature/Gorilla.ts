import {CreatureMysteryCard} from "./CreatureMysteryCard/CreatureMysteryCard";
import {IMysteryCard} from "../../../../../../../interfaces/MysteryService/MysteryCard";
import {IGame} from "../../../../../../../interfaces/Game";
import {CONSTRUCTION} from "../../../../../../../interfaces/ConstructionService/Construction";
import {IPlayerCharacter} from "../../../../../../../interfaces/Characters/PlayerCharacter";
import {ICharacter} from "../../../../../../../interfaces/Characters/Character";

export class Gorilla
    extends CreatureMysteryCard
    implements IMysteryCard {
    constructor(game: IGame) {
        super(game, "gorilla", "goryl", true, "goryl w obozie");
    }

    triggerDrawEffect(drawer: ICharacter) {
        this._game.characterService.hurt(drawer, 2, this._namePL);
        this.shuffleIntoEventDeck();
    }

    triggerEventEffect() {
        this._game.constructionService.lvlDownOrGetHurt(
            CONSTRUCTION.WEAPON,
            2,
            this._namePL
        );
    }
}
