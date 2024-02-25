import {IMysteryCard} from "../../../../../../interfaces/MysteryService/MysteryCard";
import {IGame} from "../../../../../../interfaces/Game";
import {TrapMysteryCard} from "./TrapMysteryCard/TrapMysteryCard";
import {IPlayerCharacter} from "../../../../../../interfaces/Characters/PlayerCharacter";
import {ICharacter} from "../../../../../../interfaces/Characters/Character";

export class BlowGun extends TrapMysteryCard implements IMysteryCard {
    constructor(game: IGame) {
        super(game, "blow gun", "dmuchawka");
    }

    triggerDrawEffect(drawer: ICharacter) {
        //TODO: implement 1 pawn off action.
    }
}
