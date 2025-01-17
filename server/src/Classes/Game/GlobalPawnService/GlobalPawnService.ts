import {IPawn} from "@shared/types/Game/Pawns/Pawn";
import {isPawnPlacementAllowed} from "@shared/utils/isPawnPlacementAllowed";
import {IGame} from "@shared/types/Game/Game";
import {getItemFromDroppableId} from "../../../utils/getItemFromDroppableId";
import {isCommittableResourcesItem} from "@shared/utils/typeGuards/isCommittableResourcesItem";
import {IResourceCommittableItem} from "@shared/types/Game/ResourceCommitableItem/ResourceCommittableItem";
import {IBasicResources} from "@shared/types/Game/Resources/Resources";
import {IGlobalPawnService, PawnMovementData} from "@shared/types/Game/GlobalPawnService/GlobalPawnService";


export class GlobalPawnService implements IGlobalPawnService {
    private readonly _game: IGame;

    private _itemPawns: IPawn[] = [];

    constructor(game: IGame) {
        this._game = game;
    }

    get renderData() {
        return {
            allPawns: this.allPawns.map(pawn => pawn.renderData)
        }
    }

    get itemPawns() {
        return this._itemPawns;
    }

    get allPawns() {
        let pawns: IPawn[] = [];
        this._game.characterService.allCharacters.forEach((char) => {
            pawns = pawns.concat(char.pawnService.pawns);
        });
        pawns = pawns.concat(this._itemPawns);
        return pawns;
    }

    public handlePawnMovement(source: PawnMovementData, target: PawnMovementData) {
        const pawnAtSource = this.getPawnByDraggableId(source.draggableId);
        const pawnAtTarget = target.draggableId !== "" ? this.getPawnByDraggableId(target.draggableId) : null;

        if (!this.canPawnBeMoved(pawnAtSource, target.droppableId)) {
            return;
        }
        if (pawnAtTarget && !this.canPawnBeMoved(pawnAtTarget, source.droppableId)) {
            return;
        }


        if (pawnAtTarget) {
            this.unsetPawn(target.droppableId, pawnAtTarget.draggableId);
        }
        this.unsetPawn(source.droppableId, pawnAtSource.draggableId);
        
        if (pawnAtTarget) {
            this.setPawn(source.droppableId, pawnAtTarget);
        }
        this.setPawn(target.droppableId, pawnAtSource);

    }

    public resetPawns(): void {
        this._game.characterService.resetPawns();
        this._game.actionSlotService.clearSlots();
        this._game.arrangeCampRestService.pawnAmount.rest = 0;
        this._game.arrangeCampRestService.pawnAmount.arrangeCamp = 0;
    }

    public addToItemPawns(pawn: IPawn[] | IPawn) {
        if (Array.isArray(pawn)) {
            this._itemPawns = this._itemPawns.concat(pawn)
        } else {
            this._itemPawns.push(pawn);
        }
    }

    public removeItemPawn(draggableId: string) {
        this._itemPawns = this._itemPawns.filter((pawn) => pawn.draggableId !== draggableId);
    }


    private getPawnByDraggableId(draggableId: string): IPawn {
        const pawn = this.allPawns.find((p) => p.draggableId === draggableId);
        if (!pawn) {
            throw new Error("cant find pawn with id: " + draggableId);
        }
        return pawn;
    }


    private removePawnFromOwnerFreePawns(draggableId: string) {
        const pawn = this.allPawns.find((pawn) => pawn.draggableId === draggableId);
        if (pawn) {
            pawn.owner.pawnService.removePawn(draggableId, "freePawns");
        }
    }


    private shouldCommitResources(droppableId: string): boolean {
        const item = getItemFromDroppableId(droppableId, this._game);
        return isCommittableResourcesItem(item) && Boolean(item.resourceCost) && droppableId.includes("leader");
    }

    private canCommitResources(droppableId: string, draggableId: string): boolean {
        const item = getItemFromDroppableId(droppableId, this._game);
        if (isCommittableResourcesItem(item)) {
            const pawn = this.getPawnByDraggableId(draggableId);
            return item.canCommitResource(false, pawn.owner) || item.canCommitResource(true, pawn.owner);
        } else {
            return false;
        }
    }

    private unsetPawn(droppableId: string, draggableId: string): void {
        const item = getItemFromDroppableId(droppableId, this._game);
        const pawn = this.getPawnByDraggableId(draggableId)
        if (isCommittableResourcesItem(item) && droppableId.includes("leader")) {
            item.unCommitResources(pawn.owner);
        }
        if (droppableId.includes("owner")) {
            this.removePawnFromOwnerFreePawns(draggableId);
        } else {
            this._game.actionSlotService.unsetPawn(droppableId);
        }
    }


    private setPawn(droppableId: string, pawn: IPawn): void {
        if (!this.canPawnBeMoved(pawn, droppableId)) {
            return;
        }

        const difficultySettings = this._game.difficultySettings;

        if (droppableId.includes("dog") && !difficultySettings.dog) {
            return;
        }
        if (droppableId.includes("friday") && !difficultySettings.friday) {
            return;
        }

        if (droppableId.includes("owner")) {
            pawn.owner.pawnService.copyPawnToFreePawns(pawn.draggableId);
        } else {
            if (this.shouldCommitResources(droppableId) && this.canCommitResources(droppableId, pawn.draggableId)) {
                const item = getItemFromDroppableId(droppableId, this._game) as IResourceCommittableItem<keyof IBasicResources>;
                item.commitResource(pawn.owner);
            }
            this._game.actionSlotService.setPawn(droppableId, pawn);
        }
    }


    private canPawnBeMoved(pawn: IPawn, droppableId: string): boolean {
        return isPawnPlacementAllowed(pawn.renderData, droppableId)
            && (!this.shouldCommitResources(droppableId) || this.canCommitResources(droppableId, pawn.draggableId));
    }

}
