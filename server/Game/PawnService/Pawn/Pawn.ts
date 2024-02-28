import {
    IPawn, IPawnOwnerRenderData,
    PAWN_HELPER_ACTION,
} from "../../../../interfaces/Pawns/Pawn";
import {IInvention} from "../../../../interfaces/InventionService/Invention";
import {ITreasureMysteryCard} from "../../../../interfaces/MysteryService/MysteryCard";
import {v4 as uuid} from "uuid";
import {isCardInvention} from "../../../../utils/typeGuards/isCardInvention";
import {isMysteryCard} from "../../../../utils/typeGuards/isMysteryCard";
import {ICharacter} from "../../../../interfaces/Characters/Character";
import {isPlayerCharacter} from "../../../../utils/typeGuards/isPlayerCharacter";
import {isCharacter} from "../../../../utils/typeGuards/isCharacter";

export class Pawn<Owner extends IInvention | ITreasureMysteryCard | ICharacter>
    implements IPawn<Owner> {
    get draggableId(): string {
        return this._draggableId;
    }

    private readonly _action: PAWN_HELPER_ACTION | null;
    private readonly _disposable: boolean;
    private _disposed = false;
    private readonly _owner: Owner;


    constructor(
        owner: Owner,
        disposable: boolean,
        action: PAWN_HELPER_ACTION | null,
    ) {
        this._owner = owner;
        this._action = action;
        this._disposable = disposable;
        this._draggableId = this.generatePawnId();
    }


    private readonly _draggableId: string;

    get renderData() {
        // // @ts-ignore
        //
        // const ownerRenderData = {...owner} as Omit<IPawnOwnerRenderData, "pawnService">

        const gender = isCharacter(this._owner) ? this._owner.gender : null;

        return {
            action: this._action,
            disposable: this._disposable,
            draggableId: this._draggableId,
            owner: {
                name: this._owner.name,
                gender,
                type: this.ownerType,
            }
        };
    }

    get ownerType(): "mystery" | "invention" | "character" {
        if (isMysteryCard(this._owner)) {
            return "mystery"
        } else if (isCardInvention(this._owner)) {
            return "invention"
        } else {
            return "character"
        }
    }


    get action(): PAWN_HELPER_ACTION | null {
        return this._action;
    }

    get disposable(): boolean {
        return this._disposable;
    }

    get disposed(): boolean {
        return this._disposed;
    }

    get owner(): Owner {
        return this._owner;
    }

    private generatePawnId() {
        let holderType;

        if (isCardInvention(this.owner)) {
            holderType = "invention";
        } else if (isMysteryCard(this.owner)) {
            holderType = "treasure";
        } else {
            holderType = "character";
        }
        return `${this._owner.name}-pawn-${holderType}-${uuid()}`;
    }
}
