import {BuildAdventureCard} from "./BuildAdventureCard/BuildAdventureCard";
import {IAdventureCard} from "../../../../../../../interfaces/AdventureService/AdventureCard";
import {IGame} from "../../../../../../../interfaces/Game";
import {ADVENTURE_CARD_BUILD} from "../../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "../../../../../../../interfaces/Characters/PlayerCharacter";
import {ACTION} from "../../../../../../../interfaces/ACTION";

export class DangerousWork
    extends BuildAdventureCard
    implements IAdventureCard {
    protected _eventNamePL = "";

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_BUILD.DANGEROUS_WORK,
            "niebezpieczna praca",
            false,
            game,
            "discard",
            ""
        );
    }

    option1(resolver: IPlayerCharacter) {
        this._game.actionService.setReRollToken(ACTION.BUILD, true, this._namePL);
        this._game.actionService.setAdventureToken(ACTION.BUILD, true, this._namePL);
    }
}
