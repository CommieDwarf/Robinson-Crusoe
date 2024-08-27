import {IPawn, PAWN_HELPER_ACTION,} from "@shared/types/Game/Pawns/Pawn";
import {IInvention} from "@shared/types/Game/InventionService/Invention";
import {ITreasureMysteryCard} from "@shared/types/Game/MysteryService/MysteryCard";
import {isInventionRenderData} from "@shared/utils/typeGuards/isInventionRenderData";
import {isMysteryCard} from "@shared/utils/typeGuards/isMysteryCard";
import {ICharacter} from "@shared/types/Game/Characters/Character";

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
        counter: number,
    ) {
        this._owner = owner;
        this._action = action;
        this._disposable = disposable;
        this._draggableId = this.generatePawnId(counter);
    }


    private readonly _draggableId: string;

    get renderData() {
        return {
            action: this._action,
            disposable: this._disposable,
            draggableId: this._draggableId,
            owner: this._owner.getPawnOwnerRenderData(),
        };
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

    private generatePawnId(counter: number) {
        let owner;

        if (isInventionRenderData(this.owner)) {
            owner = "invention";
        } else if (isMysteryCard(this.owner)) {
            owner = "treasure";
        } else {
            owner = "character";
        }

        return `${this._owner.name}-pawn-${owner}-${counter}`
    }
}
