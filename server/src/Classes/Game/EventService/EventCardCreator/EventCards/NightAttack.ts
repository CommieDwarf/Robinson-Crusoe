import {EventCard} from "../EventCard";
import {IEventCard} from "@shared/types/Game/EventService/EventCard";
import {IGame} from "@shared/types/Game/Game";
import {EVENT_CARD} from "@shared/types/Game/EventService/EVENT_CARD";
import {CONSTRUCTION} from "@shared/types/Game/ConstructionService/Construction";
import {ACTION} from "@shared/types/Game/ACTION";

export class NightAttack extends EventCard implements IEventCard {
    protected readonly _namePL = "nocny atak";
    protected readonly _resolutionPL = "w poszukiwaniu bestii";

    constructor(game: IGame) {
        super(
            EVENT_CARD.NIGHT_ATTACK,
            ACTION.EXPLORE,
            {
                pawns: 1,
                invention: null,
                construction: {
                    type: CONSTRUCTION.WEAPON,
                    lvl: 3,
                },
                resource: null, optionalResource: null,
            },
            game
        );
    }

    triggerEventEffect() {
        this._game.characterService.hurtAllPlayerCharacters(1, this._name);
    }

    triggerThreatEffect() {
        if (this._game.beastService.deckCount > 0) {
            this._game.beastService.removeBeastFromDeck();
        }
    }

    fullFill() {
    }
}
