import {TreasureMysteryCard} from "./TreasureMysteryCard/TreasureMysteryCard";
import {IGame} from "@shared/types/Game/Game";
import {StorageCard} from "@shared/types/Game/MysteryService/StorageCard";
import {ICharacter} from "@shared/types/Game/Characters/Character";
import {TREASURE_MYSTERY_CARD} from "@shared/types/Game/MysteryService/MYSTERY_CARD";

export class Barrel extends TreasureMysteryCard implements StorageCard {
    constructor(game: IGame) {
        super(game, TREASURE_MYSTERY_CARD.BARREL, false, "", 1);
    }

    private _used: boolean = false;
    private _stored = {
        food: 0,
        wood: 0,
        leather: 0,
        dryFood: 0,
    };

    triggerDrawEffect(drawer: ICharacter) {
        this.addToResources();
    }

    use(): void {
        if (!this._used) {
            this._game.characterService.healAllCharacters(1, this._name);
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

    getPawnOwnerRenderData() {
        return {...super.getPawnOwnerRenderData(), stored: this._stored};
    }
}
