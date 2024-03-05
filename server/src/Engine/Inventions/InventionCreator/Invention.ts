import {
    IInvention,
    IInventionRenderData,
    INVENTION,
    INVENTION_TYPE,
    InventionRequirements,
    InventionResource,
} from "../../../types/InventionService/Invention";
import {IGame} from "../../../types/Game";
import {ACTION, ACTION_ITEM} from "../../../types/ACTION";
import {ResourceCommittableItem} from "../../ResourceCommittableItem/ResourceCommittableItem";
import {SingleResourceRequirement} from "../../../types/ResourceCommitableItem/ResourceCommittableItem";
import {IPlayerCharacter} from "../../../types/Characters/PlayerCharacter";
import {IPawnService} from "../../../types/Pawns/PawnService";
import {CHARACTER} from "../../../types/Characters/Character";
import {PawnService} from "../../PawnService/PawnService";


export class Invention extends ResourceCommittableItem<InventionResource> implements IInvention {


    protected readonly _name: INVENTION;
    protected declare readonly _namePL: string;
    protected _locked = true;
    protected readonly _requirements: InventionRequirements;
    protected readonly _resourceChoice: boolean = false;
    //temporary fixed value
    protected readonly _inventionType: INVENTION_TYPE;
    protected _built = false;
    protected readonly _belongsTo: CHARACTER | null = null;
    protected readonly _usable: boolean = false;
    protected _used: boolean = false;
    protected readonly _logSource = `karta pomysłu: ${this.namePL}`;

    protected _pawnService: IPawnService<IInvention> = new PawnService<IInvention>(this._game, this);


    constructor(
        name: INVENTION,
        requirements: InventionRequirements,
        inventionType: INVENTION_TYPE,
        game: IGame,
        resourceCost: SingleResourceRequirement<InventionResource> | null = null,
        optionalResource: SingleResourceRequirement<InventionResource> | null = null,
    ) {

        super(ACTION.BUILD, ACTION_ITEM.INVENTION, game, resourceCost, optionalResource);
        this._name = name;
        this._requirements = requirements;
        this._inventionType = inventionType;
    }

    get renderData(): IInventionRenderData {
        return {
            ...this.getRenderData(),
            pawnService: this._pawnService.renderData
        }
    }

    getRenderData(): Omit<IInventionRenderData, "pawnService"> {
        return {
            name: this.name,
            locked: this.locked,
            inventionType: this._inventionType,
            isBuilt: this.isBuilt,
            ...super.getResourceCommittableRenderData(),
            usable: this._usable && !this._used,
        };
    }


    get pawnService(): IPawnService<IInvention> {
        return this._pawnService;
    }


    get resourceChoice(): boolean {
        return this._resourceChoice;
    }

    get belongsTo(): CHARACTER | null {
        return this._belongsTo;
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


    get requirements(): InventionRequirements {
        return this._requirements;
    }

    get namePL(): string {
        return this._namePL;
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

    public use(character: IPlayerCharacter) {
        return;
    }
}
