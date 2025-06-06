import {GatherAdventureCard} from "./GatherAdventureCard/GatherAdventureCard";
import {IAdventureCard} from "@shared/types/Game/AdventureService/AdventureCard";
import {IGame} from "@shared/types/Game/Game";
import {ADVENTURE_CARD_GATHER} from "@shared/types/Game/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";

export class UnexpectedDiscovery
    extends GatherAdventureCard
    implements IAdventureCard {

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_GATHER.UNEXPECTED_DISCOVERY,
            "",
            false,
            game,
            "discard",
            ""
        );
    }

    resolveOption1(resolver: IPlayerCharacter) {
        this._game.tokenService.addRandomTokensToOwned(1);
    }
}
