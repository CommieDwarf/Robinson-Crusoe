import {IArrangeCampRestService} from "../../types/RestArrangeCampService/ArrangeCampRestService";
import {IGame} from "../../types/Game";
import {TREASURE_MYSTERY_CARD} from "../../types/MysteryService/MYSTERY_CARD";
import {INVENTION_NORMAL} from "../../types/InventionService/Invention";
import {ITEM} from "../../types/Equipment/Item";
import {ICharacter} from "../../types/Characters/Character";

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

    public rest(character: ICharacter) {
        const bedBuilt = this._game.inventionService.isBuilt(INVENTION_NORMAL.BED);
        const hammockOwned = this._game.mysteryService.hasTreasureCard(TREASURE_MYSTERY_CARD.HAMMOCK);
        let healAmount = bedBuilt ? 2 : 1;
        this._game.characterService.heal(character, healAmount, "Odpoczynek");
        if (bedBuilt || hammockOwned) {
            this._game.characterService.incrDetermination(character, 1, "Odpoczynek");
        }
    }


    public arrangeCamp(character: ICharacter, useBible: boolean) {
        const characterService = this._game.characterService;
        let determination = 2;
        let logSource = "Porządkowanie obozu"
        if (useBible) {
            logSource += " (Biblia)"
            determination = 3;
            characterService.heal(character, 1, logSource);
            this._game.equipmentService.useItem(ITEM.BIBLE)
        }
        this._game.moraleService.lvlUp(1, character.namePL);
        characterService.incrDetermination(character, determination, logSource);
    }
}
