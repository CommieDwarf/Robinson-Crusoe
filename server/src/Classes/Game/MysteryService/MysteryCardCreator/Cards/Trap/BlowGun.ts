import {IMysteryCard} from "@shared/types/Game/MysteryService/MysteryCard";
import {IGame} from "@shared/types/Game/Game";
import {TrapMysteryCard} from "./TrapMysteryCard/TrapMysteryCard";
import {ICharacter} from "@shared/types/Game/Characters/Character";

export class BlowGun extends TrapMysteryCard implements IMysteryCard {
    constructor(game: IGame) {
        super(game, "blow gun", "dmuchawka");
    }

    triggerDrawEffect(drawer: ICharacter) {
        //TODO: implement 1 pawn off action.
    }
}
