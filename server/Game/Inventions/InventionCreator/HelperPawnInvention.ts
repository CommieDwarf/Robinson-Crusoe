import {Invention} from "./Invention";
import {
    IInvention,
    INVENTION,
    INVENTION_TYPE,
    InventionRequirements,
} from "../../../../interfaces/InventionService/Invention";
import {IGame} from "../../../../interfaces/Game";
import {IBasicResources} from "../../../../interfaces/Resources/Resources";
import {PAWN_HELPER_ACTION} from "../../../../interfaces/Pawns/Pawn";
import {PawnHelper} from "../../PawnService/Pawn/PawnHelper";
import {IPlayerCharacter} from "../../../../interfaces/Characters/Character";
import {IPlayerCharacter} from "../../../../interfaces/Characters/PlayerCharacter";
import {SingleResourceRequirement} from "../../../../interfaces/ResourceCommitableItem/ResourceCommittableItem";

export class HelperPawnInvention extends Invention implements IInvention {
    protected _pawnHelperAction: PAWN_HELPER_ACTION;
    protected _character: IPlayerCharacter | null = null;
    protected _pawnID = "";

    constructor(
        name: INVENTION,
        requirements: InventionRequirements,
        type: INVENTION_TYPE,
        game: IGame,
        pawnHelperAction: PAWN_HELPER_ACTION,
        resourceCost: SingleResourceRequirement | null = null,
        optionalResource: SingleResourceRequirement | null = null,
    ) {
        super(name, requirements, type, game, resourceCost, optionalResource);
        this._pawnHelperAction = pawnHelperAction;
    }

    onBuild() {
        this._character = this.getLeader();
        if (this._character.name === "friday") {
            this._character = this._game.playerService.primePlayer.getCharacter();
        }

        const helperPawn = new PawnHelper(
            this._character as IPlayerCharacter,
            false,
            this._pawnHelperAction
        );
        this._pawnID = helperPawn.draggableId;
        this._character.pawnService.addPawn(helperPawn);
    }

    onDestruction() {
        this._character?.pawnService.removePawn(this._pawnID, "pawns");
        this._character = null;
        this._pawnID = "";
    }
}
