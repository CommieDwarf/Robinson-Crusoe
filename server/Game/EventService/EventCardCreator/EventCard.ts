import {
    EVENT_TYPE,
    EventResolveRequirements,
    IEventCard,
    IEventCardRenderData,
} from "../../../../interfaces/EventService/EventCard";
import {IGame} from "../../../../interfaces/Game";
import {v4 as uuidv4} from "uuid";
import {IPawn} from "../../../../interfaces/Pawns/Pawn";
import {EVENT_CARD, WRECKAGE_CARD,} from "../../../../interfaces/EventService/EVENT_CARD";
import {ICharacter} from "../../../../interfaces/Characters/Character";
import {ACTION, ACTION_ITEM, AdventureAction} from "../../../../interfaces/ACTION";
import {AssignablePawnsItem} from "../../AssignablePawnsItem/AssignablePawnsItem";

//TODO: implement name translations

export abstract class EventCard extends AssignablePawnsItem implements IEventCard {
    protected declare _namePL: string;
    protected declare _resolutionPL: string;
    protected readonly _id = uuidv4();
    protected readonly _name: string;
    protected readonly _cardType: AdventureAction | EVENT_TYPE;
    protected readonly _requirements: EventResolveRequirements;

    protected constructor(
        name: EVENT_CARD | WRECKAGE_CARD,
        type: AdventureAction | EVENT_TYPE,
        requirements: EventResolveRequirements,
        game: IGame
    ) {
        super(ACTION.THREAT, ACTION_ITEM.THREAT, game);
        this._name = name;
        this._cardType = type;
        this._requirements = requirements;
        this._requiredPawnAmount = this._requirements.pawns;
    }

    get renderData(): IEventCardRenderData {
        return {
            id: this.id,
            name: this.name,
            cardType: this._cardType,
            ...super.getRenderData(),
        };
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get namePL(): string {
        return this._namePL;
    }

    get resolutionPL(): string {
        return this._resolutionPL;
    }

    get cardType(): EVENT_TYPE | AdventureAction {
        return this._cardType;
    }


    protected getLeaderCharacter(): ICharacter {
        const slot = this._game.eventService.getSlotByCardID(this.id);
        const pawn = this._game.actionSlotService.getPawn(
            `threat-${slot}-leader-0`
        );
        if (!pawn) {
            throw new Error("Can't find leader pawn");
        }
        return pawn.character;
    }

    protected getHelperPawn(): IPawn | null {
        const slot = this._game.eventService.getSlotByCardID(this.id);
        return this._game.actionSlotService.getPawn(`threat-${slot}-helper-1`);
    }

    get requirements(): EventResolveRequirements {
        return this._requirements;
    }

    public setAdventureToken() {
        if (
            this._cardType === ACTION.BUILD ||
            this._cardType === ACTION.EXPLORE ||
            this._cardType === ACTION.GATHER
        ) {
            this._game.actionService.setAdventureToken(this._cardType, true, this.namePL);
        }
    }

    triggerEventEffect() {
    }

    triggerThreatEffect() {
        throw new Error("triggerThreatEffect() not implemented");
    }

    fullFill() {
        throw new Error("fullFill() not implemented");
    }

    protected incrDetermination(amount: number) {
        this._game.characterService.incrDetermination(
            this.getLeaderCharacter(),
            amount,
            this._resolutionPL
        );
    }
}
