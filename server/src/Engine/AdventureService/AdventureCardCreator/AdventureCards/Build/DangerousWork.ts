import {BuildAdventureCard} from "./BuildAdventureCard/BuildAdventureCard";
import {IAdventureCard} from "../../../../../types/AdventureService/AdventureCard";
import {IGame} from "../../../../../types/Game";
import {ADVENTURE_CARD_BUILD} from "../../../../../types/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "../../../../../types/Characters/PlayerCharacter";
import {ACTION} from "../../../../../types/ACTION";

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
