import {BuildAdventureCard} from "./BuildAdventureCard/BuildAdventureCard";
import {IAdventureCard} from "../../../../../../../interfaces/AdventureService/AdventureCard";
import {IGame} from "../../../../../../../interfaces/Game";
import {ADVENTURE_CARD_BUILD} from "../../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import {CONSTRUCTION} from "../../../../../../../interfaces/ConstructionService/Construction";
import {IPlayerCharacter} from "../../../../../../../interfaces/Characters/PlayerCharacter";

export class HungryPredator
    extends BuildAdventureCard
    implements IAdventureCard {
    protected _eventNamePL = "rewizyta";

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_BUILD.HUNGRY_PREDATOR,
            "wygłodniały drapieżnik",
            true,
            game,
            "discard",
            "shuffle"
        );
    }

    option1(resolver: IPlayerCharacter) {
        const character = this.getPrimeCharacter();
        this._game.characterService.hurt(character, 2, this._namePL);
        this._game.resourceService.addBasicResourceToOwned("food", 2, this.namePL);
        this._game.resourceService.addBasicResourceToOwned(
            "leather",
            1,
            this.namePL
        );
    }

    option2(resolver: IPlayerCharacter) {
        this._game.resourceService.spendBasicResourceOrGetHurt(
            "food",
            1,
            this.namePL
        );
        this._game.constructionService.lvlDownOrGetHurt(
            CONSTRUCTION.PALISADE,
            1,
            this.namePL
        );
        this.shuffleIntoEventDeck();
    }

    triggerEventEffect() {
        //todo: implement fighting beast by prime player
    }
}
