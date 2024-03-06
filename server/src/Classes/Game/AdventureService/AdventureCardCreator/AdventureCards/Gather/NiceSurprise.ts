import {GatherAdventureCard} from "./GatherAdventureCard/GatherAdventureCard";
import {IAdventureCard} from "@shared/types/Game/AdventureService/AdventureCard";
import {IGame} from "@shared/types/Game/Game";
import {ADVENTURE_CARD_GATHER} from "@shared/types/Game/AdventureService/ADVENTURE_CARD";
import {CONSTRUCTION} from "@shared/types/Game/ConstructionService/Construction";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";

export class NiceSurprise
    extends GatherAdventureCard
    implements IAdventureCard {
    protected _eventNamePL = "zapadnięty dach";

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_GATHER.NICE_SURPRISE,
            "okazja",
            true,
            game,
            "discard",
            "shuffle"
        );
    }

    option1(resolver: IPlayerCharacter) {
    }

    option2(resolver: IPlayerCharacter) {
        this._game.resourceService.addBasicResourceToOwned("wood", 3, this._namePL);
        this.shuffleIntoEventDeck();
    }

    triggerEventEffect() {
        this._game.constructionService.setDividedLvlByTwoRoundedDown(
            CONSTRUCTION.ROOF,
            this._eventNamePL
        );
    }
}
