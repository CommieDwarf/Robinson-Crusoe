import {GatherAdventureCard} from "./GatherAdventureCard/GatherAdventureCard";
import {IAdventureCard} from "../../../../../types/AdventureService/AdventureCard";
import {IGame} from "../../../../../types/Game";
import {ADVENTURE_CARD_GATHER} from "../../../../../types/AdventureService/ADVENTURE_CARD";
import {IPlayerCharacter} from "../../../../../types/Characters/PlayerCharacter";

export class TwistedAnkle
    extends GatherAdventureCard
    implements IAdventureCard {
    protected _eventNamePL = "spuchnięta kostka";

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_GATHER.TWISTED_ANKLE,
            "skręcona kostka",
            false,
            game,
            "shuffle",
            ""
        );
    }

    option1(resolver: IPlayerCharacter) {
        this.setResolver(resolver);
        resolver.setWound("leg", this._action, this._namePL);
        this.shuffleIntoEventDeck();
    }

    triggerEventEffect() {
        //TODO: Character with wound can only rest, arrange camp and build.
        //TODO: discard wound
    }
}
