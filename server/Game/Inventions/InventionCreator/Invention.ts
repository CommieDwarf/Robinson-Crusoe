import {
    IInvention,
    IInventionRenderData,
    INVENTION,
    INVENTION_TYPE,
    InventionRequirements,
} from "../../../../interfaces/InventionService/Invention";
import {CHARACTER, ICharacter,} from "../../../../interfaces/Characters/Character";
import {IBasicResources} from "../../../../interfaces/Resources/Resources";
import {BasicResources} from "../../ResourceService/BasicResources";
import {IGame} from "../../../../interfaces/Game";
import {AssignablePawnsItem} from "../../AssignablePawnsItem/AssignablePawnsItem";
import {ACTION, ACTION_ITEM} from "../../../../interfaces/ACTION";

export class Invention extends AssignablePawnsItem implements IInvention {
    protected readonly _name: INVENTION;
    protected declare readonly _namePL: string;
    protected _locked = true;
    protected readonly _requirements: InventionRequirements;
    protected readonly _resourceChoice: boolean = false;
    //temporary fixed value
    protected readonly _inventionType: INVENTION_TYPE;
    protected _committedResources: IBasicResources = new BasicResources();
    protected _built = false;
    protected _cost: IBasicResources | null;
    protected readonly _belongsTo: CHARACTER | null = null;
    protected readonly _usable: boolean = false;
    protected _used: boolean = false;
    protected readonly _logSource = `karta pomysłu: ${this.namePL}`;

    constructor(
        name: INVENTION,
        requirements: InventionRequirements,
        inventionType: INVENTION_TYPE,
        cost: IBasicResources | null,
        game: IGame
    ) {
        super(ACTION.BUILD, ACTION_ITEM.INVENTION, game);
        this._name = name;
        this._requirements = requirements;
        this._inventionType = inventionType;
        this._cost = cost;

    }

    get renderData(): IInventionRenderData {
        return {
            name: this.name,
            locked: this.locked,
            inventionType: this._inventionType,
            committedResources: this._committedResources.renderData,
            isBuilt: this.isBuilt,
            ...super.getRenderData(),
        };
    }

    get requiredPawnAmount(): number {
        return this._requiredPawnAmount;
    }

    get resourceChoice(): boolean {
        return this._resourceChoice;
    }

    get belongsTo(): CHARACTER | null {
        return this._belongsTo;
    }

    get cost(): IBasicResources | null {
        return this._cost;
    }

    set cost(value: IBasicResources | null) {
        this._cost = value;
    }

    get isBuilt(): boolean {
        return this._built;
    }

    set isBuilt(value: boolean) {
        this._built = value;
    }

    get name(): INVENTION {
        return this._name;
    }

    get locked(): boolean {
        return this._locked;
    }

    set locked(value: boolean) {
        this._locked = value;
    }

    get usable(): boolean {
        return this._usable;
    }

    get used(): boolean {
        return this._used;
    }

    set used(value: boolean) {
        this._used = value;
    }


    get inventionType(): INVENTION_TYPE {
        return this._inventionType;
    }

    get committedResources(): IBasicResources {
        return this._committedResources;
    }

    set committedResources(resources: IBasicResources) {
        this._committedResources = resources;
    }

    get requirements(): InventionRequirements {
        return this._requirements;
    }

    get namePL(): string {
        return this._namePL;
    }

    protected getLeader(): ICharacter {
        const leader = this._game.actionSlotService.getPawn(
            "invention-" + this.name + "-leader-0"
        )?.character;
        if (!leader) {
            throw new Error("Couldn't find leader.");
        }
        return leader;
    }

    public onBuild() {
        return;
    }

    public onDestruction() {
        return;
    }

    public onNextRound() {
        return;
    }

    public use(character: ICharacter) {
        return;
    }
}
