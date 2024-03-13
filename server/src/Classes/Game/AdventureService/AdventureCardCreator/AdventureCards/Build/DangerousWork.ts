import {BuildAdventureCard} from "./BuildAdventureCard/BuildAdventureCard";
import {IAdventureCard} from "@shared/types/Game/AdventureService/AdventureCard";
import {IGame} from "@shared/types/Game/Game";
import {ADVENTURE_CARD_BUILD} from "@shared/types/Game/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";
import {ACTION} from "@shared/types/Game/ACTION";

export class DangerousWork
    extends BuildAdventureCard
    implements IAdventureCard {

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_BUILD.DANGEROUS_WORK,
            "",
            false,
            game,
            "discard",
            ""
        );
    }

    resolveOption1(resolver: IPlayerCharacter) {
        this._game.actionService.setReRollToken(ACTION.BUILD, true, this.name);
        this._game.actionService.setAdventureToken(ACTION.BUILD, true, this.name);
    }
}
