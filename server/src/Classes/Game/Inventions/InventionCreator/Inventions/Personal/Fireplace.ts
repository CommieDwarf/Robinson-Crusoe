import {Invention} from "../../Invention";
import {
    IInvention,
    INVENTION_PERSONAL,
    INVENTION_STARTER,
    INVENTION_TYPE,
} from "@shared/types/Game/InventionService/Invention";
import {IGame} from "@shared/types/Game/Game";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";

export class Fireplace extends Invention implements IInvention {
    protected _usable = true;
    protected readonly _namePL = "palenisko";
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
        this._game.characterService.heal(character, 2, this._namePL);
        this.usedInRound = this._game.round;
    }
}
