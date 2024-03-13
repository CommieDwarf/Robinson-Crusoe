import {MysteryCard} from "../../MysteryCard";
import {ITreasureMysteryCard, MYSTERY_CARD_TYPE} from "@shared/types/Game/MysteryService/MysteryCard";
import {IGame} from "@shared/types/Game/Game";
import {IPawnService} from "@shared/types/Game/Pawns/PawnService";
import {PawnService} from "../../../../../PawnService/PawnService";
import {TREASURE_MYSTERY_CARD} from "@shared/types/Game/MysteryService/MYSTERY_CARD";


export abstract class TreasureMysteryCard extends MysteryCard<TREASURE_MYSTERY_CARD> implements ITreasureMysteryCard {


    protected _type = MYSTERY_CARD_TYPE.TREASURE;
    protected _uses: number;


    protected _pawnService: IPawnService<ITreasureMysteryCard> = new PawnService(this._game, this);

    protected constructor(
        game: IGame,
        name: TREASURE_MYSTERY_CARD,
        shuffleable: boolean,
        eventName: string,
        uses: number,
        eventLabel: string = "",
        drawLabel: string = "",
    ) {
        super(game, name, shuffleable, eventName, eventLabel, drawLabel);
        this._name = name;
        this._uses = uses;
    }

    get renderData() {
        return {
            ...this.getPawnOwnerRenderData(),
            pawnService: this._pawnService.renderData,
        }
    }

    getPawnOwnerRenderData() {
        return {
            ...super.getRenderData(),
            uses: this._uses
        };
    }


    get uses(): number {
        return this._uses;
    }

    get pawnService(): IPawnService<ITreasureMysteryCard> {
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
