import {GatherAdventureCard} from "./GatherAdventureCard/GatherAdventureCard";
import {IAdventureCard} from "../../../../../../interfaces/AdventureService/AdventureCard";
import {IGame} from "../../../../../../interfaces/Game";
import {ADVENTURE_CARD_GATHER} from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import {ICharacter} from "../../../../../../interfaces/Characters/Character";

export class EndOfSource extends GatherAdventureCard implements IAdventureCard {
    protected _eventNamePL = "";

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_GATHER.END_OF_SOURCE,
            "koniec źródła",
            false,
            game,
            "discard",
            ""
        );
    }

    option1(resolver: ICharacter) {
        this.getTile().tileResourceService?.addModifier(this.getSide(), this._namePL);
    }
}
