import {IGame} from "@shared/types/Game/Game";
import {TreasureMysteryCard} from "./TreasureMysteryCard/TreasureMysteryCard";
import {IMysteryCard} from "@shared/types/Game/MysteryService/MysteryCard";
import {ICharacter} from "@shared/types/Game/Characters/Character";
import {TREASURE_MYSTERY_CARD} from "@shared/types/Game/MysteryService/MYSTERY_CARD";

export class AmuletWithPortraitOfBeautifulLady
    extends TreasureMysteryCard {
    protected readonly _requiresTargeting = true;

    constructor(game: IGame) {
        super(
            game,
            TREASURE_MYSTERY_CARD.AMULET_WITH_PORTRAIT_OF_BEAUTIFUL_LADY,
            false,
            "",
            1
        );
    }

    triggerDrawEffect(drawer: ICharacter) {
        this.addToResources();
    }

    use() {
        this._game.characterService.markThresholdsForRemoval(2);
        super.use();
    }

}
