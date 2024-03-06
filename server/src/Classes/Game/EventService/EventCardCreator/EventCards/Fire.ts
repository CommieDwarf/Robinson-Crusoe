import {EventCard} from "../EventCard";
import {IEventCard} from "@shared/types/Game/EventService/EventCard";
import {IGame} from "@shared/types/Game/Game";
import {INVENTION_STARTER} from "@shared/types/Game/InventionService/Invention";
import {EVENT_CARD} from "@shared/types/Game/EventService/EVENT_CARD";
import {ACTION} from "@shared/types/Game/ACTION";

export class Fire extends EventCard implements IEventCard {
    protected readonly _namePL = "fire";
    protected readonly _resolutionPL = "walka z ogniem";

    constructor(game: IGame) {
        super(
            EVENT_CARD.FIRE,
            ACTION.EXPLORE,
            {
                pawns: 1,
                invention: INVENTION_STARTER.SHOVEL,
                construction: null,
                resource: null,
                optionalResource: null,
            },
            game
        );
    }

    triggerEventEffect() {
        this._game.resourceService.blockedProductionRound = this._game.round;
    }

    triggerThreatEffect() {
        this._game.resourceService.blockedProductionRound = this._game.round;
    }

    fullFill() {
        const leader = this.getLeaderCharacter();
        this._game.characterService.incrDetermination(leader, 2, this.name);
    }
}
