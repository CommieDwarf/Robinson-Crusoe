import {GatherAdventureCard} from "./GatherAdventureCard/GatherAdventureCard";
import {IAdventureCard} from "../../../../../../interfaces/AdventureService/AdventureCard";
import {IGame} from "../../../../../../interfaces/Game";
import {ADVENTURE_CARD_GATHER} from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import {CONSTRUCTION} from "../../../../../../interfaces/ConstructionService/Construction";
import {IPlayerCharacter} from "../../../../../../interfaces/Characters/PlayerCharacter";

export class Nestlings extends GatherAdventureCard implements IAdventureCard {
    protected _eventNamePL = "wściekłe ptaszysko";

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_GATHER.NESTLINGS,
            "pisklaki",
            true,
            game,
            "discard",
            "shuffle"
        );
    }

    option1(resolver: IPlayerCharacter) {
    }

    option2(resolver: IPlayerCharacter) {
        const playerAmount = this._game.playerService.players.length;
        this._game.resourceService.addBasicResourceToOwned(
            "food",
            playerAmount,
            this._namePL
        );
        this.shuffleIntoEventDeck();
    }

    triggerEventEffect() {
        this._game.constructionService.lvlDownOrGetHurt(
            CONSTRUCTION.ROOF,
            1,
            this._eventNamePL
        );
    }
}
