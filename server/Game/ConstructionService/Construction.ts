import {
    CONSTRUCTION,
    IConstruction,
    IConstructionRenderData,
} from "../../../interfaces/ConstructionService/Construction";
import {ACTION, ACTION_ITEM} from "../../../interfaces/ACTION";
import {IGame} from "../../../interfaces/Game";
import {ResourceCommittableItem} from "../ResourceCommittableItem/ResourceCommittableItem";
import {SingleResourceRequirement} from "../../../interfaces/ResourceCommitableItem/ResourceCommittableItem";

export class Construction extends ResourceCommittableItem implements IConstruction {


    private readonly _name: CONSTRUCTION;
    private readonly _namePL: string;
    private _lvl = 0;
    private _locked: boolean;
    private _resourceChoice: boolean = true;

    private _temporaryBoost: number = 0;

    constructor(
        name: CONSTRUCTION,
        namePL: string,
        locked: boolean,
        game: IGame,
        resourceCost: SingleResourceRequirement,
        optionalCost: SingleResourceRequirement | null,
    ) {
        super(ACTION.BUILD, ACTION_ITEM.CONSTRUCTION, game, resourceCost, optionalCost);
        this._name = name;
        this._namePL = namePL;
        this._locked = locked;
    }

    get renderData(): IConstructionRenderData {
        return {
            locked: this.locked,
            lvl: this.lvl,
            name: this.name,
            temporaryBoost: this._temporaryBoost,
            ...super.getResourceCommittableRenderData(),
        };
    }

    get boostedLvl(): number {
        return this._lvl + this._temporaryBoost;
    }

    get resourceChoice(): boolean {
        return this._resourceChoice;
    }

    get temporaryBoost(): number {
        return this._temporaryBoost;
    }

    set lvl(value: number) {
        this._lvl = value;
    }

    get name(): CONSTRUCTION {
        return this._name;
    }

    get namePL(): string {
        return this._namePL;
    }

    get lvl(): number {
        return this._lvl;
    }


    get locked(): boolean {
        return this._locked;
    }

    set locked(value: boolean) {
        this._locked = value;
    }

    public incrTemporaryBoost(value: number) {
        this._temporaryBoost += value;
    }

    public resetTemporaryBoost() {
        this._temporaryBoost = 0;
    }


    incrementLvl(num: number) {
        this._lvl += num;
    }

    decrementLvl(num: number) {
        this._lvl -= num;
    }
}
