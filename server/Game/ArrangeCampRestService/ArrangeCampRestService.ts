import {IArrangeCampRestService} from "../../../interfaces/RestArrangeCampService/ArrangeCampRestService";
import {IGame} from "../../../interfaces/Game";
import {TREASURE_MYSTERY_CARD} from "../../../interfaces/MysteryService/MYSTERY_CARD";
import {IPlayerCharacter} from "../../../interfaces/Characters/PlayerCharacter";
import {INVENTION_NORMAL} from "../../../interfaces/InventionService/Invention";

export class ArrangeCampRestService implements IArrangeCampRestService {
    // TODO: IMPLEMENT CHOICE BETWEEN BED EFFECT OR NORMAL EFFECT.
    private readonly _game: IGame;


    private _arrangeCampBonus: "determination" | "morale" | null = null;
    private _pawnAmount = {
        rest: 0,
        arrangeCamp: 0,
    };

    constructor(game: IGame) {
        this._game = game;
    }

    get renderData() {
        return {
            arrangeCampBonus: this._arrangeCampBonus,
            pawnAmount: this._pawnAmount,
        };
    }


    get arrangeCampBonus(): "determination" | "morale" | null {
        return this._arrangeCampBonus;
    }

    get pawnAmount(): { rest: number; arrangeCamp: number } {
        return this._pawnAmount;
    }

    public incrPawnAmount(action: "rest" | "arrangeCamp") {
        this._pawnAmount[action]++;
    }

    public decrPawnAmount(action: "rest" | "arrangeCamp") {
        this._pawnAmount[action]--;
    }

    public rest(character: IPlayerCharacter) {
        const bedBuilt = this._game.inventionService.isBuilt(INVENTION_NORMAL.BED);
        const hammockOwned = this._game.mysteryService.hasTresureCard(TREASURE_MYSTERY_CARD.HAMMOCK);
        let healAmount = bedBuilt ? 2 : 1;
        this._game.characterService.heal(character, healAmount, "Odpoczynek");
        if (bedBuilt || hammockOwned) {
            this._game.characterService.incrDetermination(character, 1, "Odpoczynek");
        }
    }


    public arrangeCamp(character: IPlayerCharacter) {
    }
}
