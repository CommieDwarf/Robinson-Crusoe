import {MysteryCard} from "../../MysteryCard";
import {
    ITreasureMysteryCard,
    MYSTERY_CARD_TYPE
} from "../../../../../../../interfaces/MysteryService/MysteryCard";
import {IGame} from "../../../../../../../interfaces/Game";
import {PAWN_HELPER_ACTION} from "../../../../../../../interfaces/Pawns/Pawn";
import {Pawn} from "../../../../../PawnService/Pawn/Pawn";
import {IPawnService} from "../../../../../../../interfaces/Pawns/PawnService";
import {PawnService} from "../../../../../PawnService/PawnService";


export abstract class TreasureMysteryCard extends MysteryCard implements ITreasureMysteryCard {


    protected _type = MYSTERY_CARD_TYPE.TREASURE;
    protected _uses: number;

    protected _pawnService: IPawnService<ITreasureMysteryCard> = new PawnService(this._game, this);

    protected constructor(
        game: IGame,
        name: string,
        namePL: string,
        shuffleable: boolean,
        eventName: string,
        uses: number,
        eventLabel: string = "",
        drawLabel: string = "",
    ) {
        super(game, name, namePL, shuffleable, eventName, eventLabel, drawLabel);
        this._uses = uses;

    }


    get renderData() {
        return {
            ...super.getRenderData(),
            uses: this.uses,
            pawnService: this._pawnService?.renderData || null,
        };
    }


    get uses(): number {
        return this._uses;
    }

    get pawnService(): IPawnService<ITreasureMysteryCard> | null {
        return this._pawnService;
    }


    addToResources() {
        if (this._game.phaseService.phase === "action") {
            this._game.resourceService.addTreasureToFuture(this);
        } else {
            this._game.resourceService.addTreasureToOwned(this);
        }
    }

    removeFromOwnedResources() {
        this._game.resourceService.removeTreasureFromOwned(this);
    }

}
