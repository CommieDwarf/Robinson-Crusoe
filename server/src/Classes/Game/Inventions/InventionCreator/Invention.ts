import {
    IInvention,
    IInventionRenderData,
    INVENTION,
    INVENTION_TYPE,
    InventionRequirements,
    InventionResource,
} from "@shared/types/Game/InventionService/Invention";
import {IGame} from "@shared/types/Game/Game";
import {ACTION, ACTION_ITEM} from "@shared/types/Game/ACTION";
import {ResourceCommittableItem} from "../../ResourceCommittableItem/ResourceCommittableItem";
import {SingleResourceRequirement} from "@shared/types/Game/ResourceCommitableItem/ResourceCommittableItem";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";
import {IPawnService} from "@shared/types/Game/Pawns/PawnService";
import {CHARACTER} from "@shared/types/Game/Characters/Character";
import {PawnService} from "../../PawnService/PawnService";


export class Invention extends ResourceCommittableItem<InventionResource> implements IInvention {


    protected readonly _name: INVENTION;
    protected declare readonly _namePL: string;
    protected _locked = true;
    protected readonly _requirements: InventionRequirements;
    protected readonly _resourceChoice: boolean = false;
    protected readonly _inventionType: INVENTION_TYPE;
    protected _built = false;
    protected readonly _belongsTo: CHARACTER | null = null;
    protected _used: boolean = false;
    protected readonly _logSource;

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
        this._logSource = name;
        this._requirements = requirements;
        this._inventionType = inventionType;
    }

    get renderData(): IInventionRenderData {
        return {
            ...this.getPawnOwnerRenderData(),
            pawnService: this._pawnService.renderData
        }
    }

    getPawnOwnerRenderData(): Omit<IInventionRenderData, "pawnService"> {
        return {
            name: this.name,
            locked: this.locked,
            inventionType: this._inventionType,
            isBuilt: this.isBuilt,
            ...super.getResourceCommittableRenderData(),
            canBeUsed: this.canBeUsed,
        };
    }

    get canBeUsed() {
        return false;
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
        this._built = true;
        this.grandDeterminationIfPersonal();
        return;
    }

    public onDestruction() {
        this.isBuilt = false;
        return;
    }

    public onNextRound() {
        return;
    }

    public use(character: IPlayerCharacter) {
        return;
    }

    private grandDeterminationIfPersonal() {
        if (this._inventionType === INVENTION_TYPE.PERSONAL) {
            this._game.characterService.incrDetermination(this._belongsTo as CHARACTER, 2, this._name);
        }
    }

}
