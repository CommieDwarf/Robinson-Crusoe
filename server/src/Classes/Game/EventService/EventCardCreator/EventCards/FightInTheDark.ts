import {EventCard} from "../EventCard";
import {EVENT_TYPE, IEventCard,} from "@shared/types/Game/EventService/EventCard";
import {IGame} from "@shared/types/Game/Game";
import {EVENT_CARD} from "@shared/types/Game/EventService/EVENT_CARD";
import {CONSTRUCTION} from "@shared/types/Game/ConstructionService/Construction";

export class FightInTheDark extends EventCard implements IEventCard {
    protected readonly _namePL = "walka w ciemnościach";
    protected readonly _resolutionPL = "tropienie drapieżnika";

    constructor(game: IGame) {
        super(
            EVENT_CARD.FIGHT_IN_THE_DARK,
            EVENT_TYPE.BOOK,
            {
                pawns: 1,
                invention: null,
                construction: {
                    type: CONSTRUCTION.WEAPON,
                    lvl: 2,
                },
                resource: null, optionalResource: null,
            },
            game
        );
    }

    triggerEventEffect() {


        if (this._game.beastService.deckCount > 0) {
            this._game.beastService.removeBeastFromDeck();
        }
    }

    triggerThreatEffect() {
        //TODO: set hungry animals dice to weather.
    }

    fullFill() {
        this.incrDetermination(1);
    }
}
