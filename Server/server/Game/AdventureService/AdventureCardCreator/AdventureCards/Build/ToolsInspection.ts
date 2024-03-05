import {BuildAdventureCard} from "./BuildAdventureCard/BuildAdventureCard";
import {IAdventureCard} from "../../../../../../../interfaces/AdventureService/AdventureCard";
import {IGame} from "../../../../../../../interfaces/Game";
import {ADVENTURE_CARD_BUILD} from "../../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "../../../../../../../interfaces/Characters/PlayerCharacter";

export class ToolsInspection
    extends BuildAdventureCard
    implements IAdventureCard {
    protected _eventNamePL = "zepsute narzędzia";

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_BUILD.TOOLS_INSPECTION,
            "kontrola narzędzi",
            false,
            game,
            "shuffle",
            ""
        );
    }

    option1(resolver: IPlayerCharacter) {
        //TODO: implement marks on 2 inventions
    }

    triggerEventEffect() {
        //TODO: implement flip marked inventions
    }
}
