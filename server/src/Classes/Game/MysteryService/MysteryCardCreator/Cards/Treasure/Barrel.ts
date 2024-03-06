import {TreasureMysteryCard} from "./TreasureMysteryCard/TreasureMysteryCard";
import {IGame} from "@shared/types/Game/Game";
import {StorageCard} from "@shared/types/Game/MysteryService/StorageCard";
import {ICharacter} from "@shared/types/Game/Characters/Character";

export class Barrel extends TreasureMysteryCard implements StorageCard {
    constructor(game: IGame) {
        super(game, "barrel", "beczka", false, "", 1);
    }

    private _used: boolean = false;
    private _stored = {
        food: 2,
        wood: 0,
        leather: 0,
        dryFood: 0,
    };

    triggerDrawEffect(drawer: ICharacter) {
        this.addToResources();
    }

    use(): void {
        if (!this._used) {
            this._game.characterService.healAllCharacters(1, this._namePL);
            this._used = true;
            super.use();
        }
    }

    deposit() {
        if (
            this._used &&
            this._stored.food < 2 &&
            this._game.resourceService.canAffordResource("food", 1)
        ) {
            this._game.resourceService.spendBasicResourceIfPossible("food", 1, "");
            this._stored.food++;
        }
    }

    withdraw() {
        if (this._stored.food > 0) {
            this._stored.food--;
            this._game.resourceService.addBasicResourceToOwned("food", 1, "");
        }
    }

    getRenderData() {
        return {...super.getRenderData(), stored: this._stored};
    }
}
