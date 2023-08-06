import {CreatureMysteryCard} from "./CreatureMysteryCard/CreatureMysteryCard";
import {IMysteryCard} from "../../../../../../interfaces/MysteryService/MysteryCard";
import {IGame} from "../../../../../../interfaces/Game";
import {IPlayerCharacter} from "../../../../../../interfaces/Characters/Character";
import {CONSTRUCTION} from "../../../../../../interfaces/ConstructionService/Construction";

export class Gorilla
    extends CreatureMysteryCard
    implements IMysteryCard {
    constructor(game: IGame) {
        super(game, "gorilla", "goryl", true, "goryl w obozie");
    }

    triggerDrawEffect(drawer: IPlayerCharacter) {
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
