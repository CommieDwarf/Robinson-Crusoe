import {EventCard} from "../EventCard";
import {IEventCard} from "@shared/types/Game/EventService/EventCard";
import {IGame} from "@shared/types/Game/Game";
import {INVENTION_STARTER} from "@shared/types/Game/InventionService/Invention";
import {EVENT_CARD} from "@shared/types/Game/EventService/EVENT_CARD";
import {ACTION} from "@shared/types/Game/ACTION";

export class BrokenTree extends EventCard implements IEventCard {
    protected readonly _namePL = "powalone drzewo";
    protected readonly _resolutionPL = "usunięcie drzewa";

    constructor(game: IGame) {
        super(
            EVENT_CARD.BROKEN_TREE,
            ACTION.BUILD,
            {
                pawns: 1,
                invention: INVENTION_STARTER.ROPE,
                construction: null,
                resource: null,
                optionalResource: null,
            },
            game
        );
    }

    triggerEventEffect() {
        this._game.characterService.hurtAllPlayerCharacters(1, this.name);
    }

    triggerThreatEffect() {
        this._game.moraleService.lvlDown(1, this._namePL);
    }

    fullFill() {
        const leader = this.getLeaderCharacter();
        this._game.characterService.incrDetermination(leader, 1, this.name);
        this._game.resourceService.addBasicResourceToOwned("wood", 1, this.name);
    }
}
