import {CreatureMysteryCard} from "./CreatureMysteryCard/CreatureMysteryCard";
import {IMysteryCard} from "@shared/types/Game/MysteryService/MysteryCard";
import {IGame} from "@shared/types/Game/Game";
import {CONSTRUCTION} from "@shared/types/Game/ConstructionService/Construction";
import {ICharacter} from "@shared/types/Game/Characters/Character";
import {CREATURE_MYSTERY_CARD} from "@shared/types/Game/MysteryService/MYSTERY_CARD";

export class Savage
    extends CreatureMysteryCard {
    constructor(game: IGame) {
        super(game, CREATURE_MYSTERY_CARD.SAVAGE, "dzikus", true, "nieudane polowanie");
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
