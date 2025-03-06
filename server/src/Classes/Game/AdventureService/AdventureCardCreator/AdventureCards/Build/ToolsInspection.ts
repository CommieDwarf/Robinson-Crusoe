import {BuildAdventureCard} from "./BuildAdventureCard/BuildAdventureCard";
import {IAdventureCard} from "@shared/types/Game/AdventureService/AdventureCard";
import {IGame} from "@shared/types/Game/Game";
import {ADVENTURE_CARD_BUILD} from "@shared/types/Game/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";

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

    resolveOption1(resolver: IPlayerCharacter) {
    }

    triggerEventEffect() {
    }
}
