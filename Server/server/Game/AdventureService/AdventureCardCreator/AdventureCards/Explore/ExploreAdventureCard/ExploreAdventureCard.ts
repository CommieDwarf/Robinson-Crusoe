import {AdventureCard} from "../../../AdventureCard";
import {ACTION} from "../../../../../../../../interfaces/ACTION";
import {ADVENTURE_CARD_EXPLORE} from "../../../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import {IGame} from "../../../../../../../../interfaces/Game";
import {AdventureOptionLabel} from "../../../../../../../../interfaces/AdventureService/AdventureCard";

export abstract class ExploreAdventureCard extends AdventureCard {
    protected readonly _action = ACTION.EXPLORE;

    protected constructor(
        name: ADVENTURE_CARD_EXPLORE,
        namePL: string,
        decide: boolean,
        game: IGame,
        option1Label: AdventureOptionLabel,
        option2Label: AdventureOptionLabel
    ) {
        super(name, namePL, decide, game, option1Label, option2Label);
    }

    protected getTile() {
        const id = this._game.adventureService.currentAdventure?.relatedActionInfo?.tileId;
        if (id) {
            return this._game.tileService.getTile(id);
        } else {
            throw new Error("Can't find related tile. Id: " + id);
        }
    }
}
