import {EventCard} from "../EventCard";
import {IEventCard} from "../../../../types/EventService/EventCard";
import {IGame} from "../../../../types/Game";
import {CONSTRUCTION} from "../../../../types/ConstructionService/Construction";
import {EVENT_CARD} from "../../../../types/EventService/EVENT_CARD";
import {ACTION} from "../../../../types/ACTION";

export class RavishingWindstorm extends EventCard implements IEventCard {
    protected readonly _namePL = "rozszalała wichura";
    protected readonly _resolutionPL = "nowa broń";

    constructor(game: IGame) {
        super(
            EVENT_CARD.RAVISHING_WINDSTORM,
            ACTION.EXPLORE,
            {
                pawns: 1,
                invention: null,
                construction: null,
                resource: null, optionalResource: null,
            },
            game
        );
    }

    triggerEventEffect() {
        this._game.constructionService.lvlDownIfPossible(
            CONSTRUCTION.WEAPON,
            2,
            this.namePL
        );
    }

    triggerThreatEffect() {
        return;
        // nothing happens
    }

    fullFill() {
        const leader = this.getLeaderCharacter();
        this._game.characterService.incrDetermination(leader, 1, this.name);

        this._game.constructionService.lvlUpConstruction(
            CONSTRUCTION.WEAPON,
            1,
            this.name
        );
    }
}
