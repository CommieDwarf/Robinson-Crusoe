import {EventCard} from "../EventCard";
import {IEventCard} from "../../../../types/EventService/EventCard";
import {IGame} from "../../../../types/Game";
import {INVENTION_STARTER} from "../../../../types/InventionService/Invention";
import {EVENT_CARD} from "../../../../types/EventService/EVENT_CARD";
import {ACTION} from "../../../../types/ACTION";

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
