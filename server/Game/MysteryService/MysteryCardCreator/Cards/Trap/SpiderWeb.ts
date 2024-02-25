import {TrapMysteryCard} from "./TrapMysteryCard/TrapMysteryCard";
import {IMysteryCard} from "../../../../../../interfaces/MysteryService/MysteryCard";
import {IGame} from "../../../../../../interfaces/Game";
import {INVENTION_STARTER} from "../../../../../../interfaces/InventionService/Invention";
import {IPlayerCharacter} from "../../../../../../interfaces/Characters/PlayerCharacter";
import {ICharacter} from "../../../../../../interfaces/Characters/Character";

export class SpiderWeb extends TrapMysteryCard implements IMysteryCard {
    constructor(game: IGame) {
        super(game, "spider web", "pająk");
    }

    private _drawer: ICharacter | null = null;

    triggerDrawEffect(drawer: ICharacter) {
        this._game.characterService.hurt(drawer, 1, this._namePL);
        this._drawer = drawer;
        this._game.phaseService.addPhaseEffect(this.phaseEffect);
        this._game.mysteryService.addCardAsReminder(this);
    }


    private phaseEffect = () => {
        if (this._game.phaseService.phase === "night") {
            if (!this._drawer) {
                throw new Error("Drawer is " + this._drawer);
            }
            if (!this._game.inventionService.isBuilt(INVENTION_STARTER.MEDICINE)) {
                this._game.characterService.hurt(this._drawer, 1, this._namePL);
            }
        }
    }
}
