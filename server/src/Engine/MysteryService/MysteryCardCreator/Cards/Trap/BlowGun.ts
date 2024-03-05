import {IMysteryCard} from "../../../../../types/MysteryService/MysteryCard";
import {IGame} from "../../../../../types/Game";
import {TrapMysteryCard} from "./TrapMysteryCard/TrapMysteryCard";
import {ICharacter} from "../../../../../types/Characters/Character";

export class BlowGun extends TrapMysteryCard implements IMysteryCard {
    constructor(game: IGame) {
        super(game, "blow gun", "dmuchawka");
    }

    triggerDrawEffect(drawer: ICharacter) {
        //TODO: implement 1 pawn off action.
    }
}
