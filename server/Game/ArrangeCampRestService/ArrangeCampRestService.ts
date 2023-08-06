import {IArrangeCampRestService} from "../../../interfaces/RestArrangeCampService/ArrangeCampRestService";
import {IPlayerCharacter} from "../../../interfaces/Characters/Character";
import {AssignablePawnsItem} from "../AssignablePawnsItem/AssignablePawnsItem";

export class ArrangeCampRestService implements IArrangeCampRestService {
    // TODO: IMPLEMENT CHOICE BETWEEN BED EFFECT OR NORMAL EFFECT.
    private _bed = false;


    private _arrangeCampBonus: "determination" | "morale" | null = null;
    private _pawnAmount = {
        rest: 0,
        arrangeCamp: 0,
    };

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

    get bed(): boolean {
        return this._bed;
    }

    set bed(value: boolean) {
        this._bed = value;
    }

    public incrPawnAmount(action: "rest" | "arrangeCamp") {
        this._pawnAmount[action]++;
    }

    public decrPawnAmount(action: "rest" | "arrangeCamp") {
        this._pawnAmount[action]--;
    }

    public rest(character: IPlayerCharacter) {
    }


    public arrangeCamp(character: IPlayerCharacter) {
    }
}
