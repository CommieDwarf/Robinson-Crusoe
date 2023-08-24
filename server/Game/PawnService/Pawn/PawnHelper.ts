import {
    IPawnHelper,
    IPawnHelperRenderData,
    PAWN_HELPER_ACTION,
} from "../../../../interfaces/Pawns/Pawn";
import {IPlayerCharacter} from "../../../../interfaces/Characters/PlayerCharacter";
import {Pawn} from "./Pawn";
import {getCardPawnDraggableId} from "../../../../utils/getCardPawnDraggableId";
import {IInvention} from "../../../../interfaces/InventionService/Invention";

export class PawnHelper extends Pawn implements IPawnHelper {

    private readonly _action: PAWN_HELPER_ACTION;
    private readonly _disposable: boolean;
    private _disposed = false;
    private readonly _card: IInvention | null = null;

    constructor(
        character: IPlayerCharacter,
        disposable: boolean,
        action: PAWN_HELPER_ACTION,
        card?: IInvention,
    ) {
        super(character, character.pawnService.pawns.length + 1);
        if (card) {
            this._draggableId = getCardPawnDraggableId(card.name, "invention");
            this._card = card;
        }
        this._action = action;
        this._disposable = disposable;
    }

    get renderData(): IPawnHelperRenderData {
        return {
            ...super.getRenderData(),
            action: this._action,
            disposable: this._disposable,
            cardName: this._card?.name || null,
        };
    }

    get action(): PAWN_HELPER_ACTION {
        return this._action;
    }

    get disposable(): boolean {
        return this._disposable;
    }

    get disposed(): boolean {
        return this._disposed;
    }

    get card(): IInvention | null {
        return this._card;
    }
}
