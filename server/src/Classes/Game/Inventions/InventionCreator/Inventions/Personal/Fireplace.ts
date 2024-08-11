import {Invention} from "../../Invention";
import {
    IInvention,
    INVENTION_PERSONAL,
    INVENTION_STARTER,
    INVENTION_TYPE,
} from "@shared/types/Game/InventionService/Invention";
import {IGame} from "@shared/types/Game/Game";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";
import {CHARACTER} from "@shared/types/Game/Characters/Character";

export class Fireplace extends Invention implements IInvention {
    protected _usable = true;
    private usedInRound: number = 0;

    constructor(game: IGame) {
        super(
            INVENTION_PERSONAL.FIREPLACE,
            {terrainType: null, inventions: [INVENTION_STARTER.FIRE]},
            INVENTION_TYPE.PERSONAL,
            game
        );
    }

    use(character: IPlayerCharacter) {
        const canAfford = this._game.resourceService.canAffordResource("food", 1);
        if (!canAfford || this._game.phaseService.phase !== "night" || this.usedInRound === this._game.round) {
            return;
        }
        this._game.resourceService.owned.basic.spendResource("food", 1);
        this._game.startPickingObject(this._game.characterService.healableCharacters,
            character,
            1,
            this._name,
            "character",
            (char) => {
                this._game.characterService.heal(char, 2, this._name)
            }
        )
        this.usedInRound = this._game.round;
    }
}
