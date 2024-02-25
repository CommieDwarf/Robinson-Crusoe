import {CreatureMysteryCard} from "./CreatureMysteryCard/CreatureMysteryCard";
import {IMysteryCard} from "../../../../../../interfaces/MysteryService/MysteryCard";
import {IGame} from "../../../../../../interfaces/Game";
import {CONSTRUCTION} from "../../../../../../interfaces/ConstructionService/Construction";
import {IPlayerCharacter} from "../../../../../../interfaces/Characters/PlayerCharacter";
import {ICharacter} from "../../../../../../interfaces/Characters/Character";

export class Savage
    extends CreatureMysteryCard
    implements IMysteryCard {
    constructor(game: IGame) {
        super(game, "savage", "dzikus", true, "nieudane polowanie");
    }

    triggerDrawEffect(drawer: ICharacter) {
        const weapon = this._game.constructionService.getConstruction(
            CONSTRUCTION.WEAPON
        );
        if (weapon.lvl > 0) {
            this._game.constructionService.lvlDownConstruction(
                CONSTRUCTION.WEAPON,
                weapon.lvl,
                this._namePL
            );
        }
        this.shuffleIntoEventDeck();
    }

    triggerEventEffect() {
        this._game.mysteryService.startDrawingCards(0, 0, 1, this._game.playerService.primePlayer.getCharacter())
    }
}
