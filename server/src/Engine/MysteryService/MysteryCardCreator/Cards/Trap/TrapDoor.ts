import {TrapMysteryCard} from "./TrapMysteryCard/TrapMysteryCard";
import {IMysteryCard} from "../../../../../types/MysteryService/MysteryCard";
import {IGame} from "../../../../../types/Game";
import {ICharacter} from "../../../../../types/Characters/Character";

export class TrapDoor extends TrapMysteryCard implements IMysteryCard {
    constructor(game: IGame) {
        super(game, "trap door", "zapadnia");
    }

    triggerDrawEffect(drawer: ICharacter) {
        this._game.mysteryService.dropTreasures();
        this._game.chatLog.addMessage("Utracono obecnie zdobyte skarby", "red", this._namePL);
    }
}
