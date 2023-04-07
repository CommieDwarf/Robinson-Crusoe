import {
    CONSTRUCTION,
    IConstruction,
    IConstructionRenderData,
} from "../../../interfaces/ConstructionService/Construction";
import {IBasicResources} from "../../../interfaces/Resources/Resources";
import {BasicResources} from "../ResourceService/BasicResources";
import {AssignablePawnsItem} from "../AssignablePawnsItem/AssignablePawnsItem";
import {ACTION, ACTION_ITEM} from "../../../interfaces/ACTION";
import {IGame} from "../../../interfaces/Game";

export class Construction extends AssignablePawnsItem implements IConstruction {

    private readonly _name: CONSTRUCTION;
    private readonly _namePL: string;
    private _lvl = 0;
    private _committedResources: IBasicResources = new BasicResources();
    private _cost: IBasicResources;
    private _locked: boolean;
    private _resourceChoice: boolean = true;

    constructor(
        name: CONSTRUCTION,
        namePL: string,
        cost: BasicResources,
        locked: boolean,
        game: IGame,
    ) {
        super(ACTION.BUILD, ACTION_ITEM.CONSTRUCTION, game);
        this._name = name;
        this._namePL = namePL;
        this._cost = cost;
        this._locked = locked;
    }

    get renderData(): IConstructionRenderData {
        return {
            committedResources: this.committedResources.renderData,
            cost: this.cost.renderData,
            locked: this.locked,
            lvl: this.lvl,
            name: this.name,
            ...super.getRenderData(),
        };
    }

    get resourceChoice(): boolean {
        return this._resourceChoice;
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

    get committedResources(): IBasicResources {
        return this._committedResources;
    }

    set committedResources(resources: IBasicResources) {
        this._committedResources = resources;
    }

    get cost(): IBasicResources {
        return this._cost;
    }

    set cost(value: IBasicResources) {
        this._cost = value;
    }

    get locked(): boolean {
        return this._locked;
    }

    set locked(value: boolean) {
        this._locked = value;
    }


    incrementLvl(num: number) {
        this._lvl += num;
    }

    decrementLvl(num: number) {
        this._lvl -= num;
    }
}
