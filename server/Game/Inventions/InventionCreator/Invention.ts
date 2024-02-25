import {
    CardPawnHelper, CardPawnHelperRenderData,
    IInvention,
    IInventionRenderData,
    INVENTION,
    INVENTION_TYPE,
    InventionRequirements, InventionResource,
} from "../../../../interfaces/InventionService/Invention";
import {CHARACTER, ICharacter} from "../../../../interfaces/Characters/Character";
import {IGame} from "../../../../interfaces/Game";
import {ACTION, ACTION_ITEM} from "../../../../interfaces/ACTION";
import {ResourceCommittableItem} from "../../ResourceCommittableItem/ResourceCommittableItem";
import {SingleResourceRequirement} from "../../../../interfaces/ResourceCommitableItem/ResourceCommittableItem";
import {IPlayerCharacter} from "../../../../interfaces/Characters/PlayerCharacter";
import {PAWN_HELPER_ACTION} from "../../../../interfaces/Pawns/Pawn";
import {PawnHelper} from "../../PawnService/Pawn/PawnHelper";


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
    protected _onBuildDelayed = false;
    protected _helperPawn: CardPawnHelper | null = null;


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
        const helperPawn: CardPawnHelperRenderData | null = this._helperPawn ? {
            pawn: this._helperPawn.pawn?.renderData || null,
            action: this._helperPawn.action
        } : null;
        return {
            name: this.name,
            locked: this.locked,
            inventionType: this._inventionType,
            isBuilt: this.isBuilt,
            ...super.getResourceCommittableRenderData(),
            helperPawn,
            usable: this._usable && !this._used,
        };
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

    get helperPawn() {
        return this._helperPawn;
    }

    protected initHelperPawn(action: PAWN_HELPER_ACTION) {
        const pawn = new PawnHelper(this._game.localPlayer.getCharacter(), false, action, this)
        this._helperPawn = {
            pawn,
            action,
        }
        this._game.otherPawns.push(pawn);
    }

    public resetHelperPawn() {
        if (this._helperPawn) {
            const pawn = this._game.otherPawns.find((pawn) => pawn.card === this);
            if (pawn) {
                this._helperPawn.pawn = pawn;
            }
        }
    }

    public unsetPawn() {
        if (this._helperPawn) {
            this._helperPawn.pawn = null;
        }
    }

    protected destroyPawn() {
        this._helperPawn = null;
        this._game.otherPawns = this._game.otherPawns.filter((pawn) => pawn.card !== this);
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

    public use(character: IPlayerCharacter) {
        return;
    }
}
