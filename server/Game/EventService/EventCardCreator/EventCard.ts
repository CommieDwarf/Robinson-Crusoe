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
import {ACTION, ACTION_ITEM, AdventureAction} from "../../../../interfaces/ACTION";
import {ResourceCommittableItem} from "../../ResourceCommittableItem/ResourceCommittableItem";
import {IPlayerCharacter} from "../../../../interfaces/Characters/PlayerCharacter";
import {IBasicResourcesAmount} from "../../../../interfaces/Resources/Resources";

//TODO: implement name translations

export abstract class EventCard extends ResourceCommittableItem<keyof IBasicResourcesAmount> implements IEventCard {
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
        const resourceRequirement = requirements.resource ? {type: requirements.resource, amount: 1} : null;
        super(ACTION.THREAT, ACTION_ITEM.THREAT, game, resourceRequirement);
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
            meetsRequirement: this.meetsRequirement(),
            ...super.getResourceCommittableRenderData(),
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


    public meetsRequirement() {
        const meetsResource = this._requirements.resource ? this._game.resourceService.canAffordResource(this._requirements.resource, 1) : true;
        const meetsConstruction = this._requirements.construction ? this._game.constructionService.getConstruction(this._requirements.construction.type).lvl >= this._requirements.construction.lvl : true;
        const meetsInvention = this._requirements.invention ? this._game.inventionService.isBuilt(this._requirements.invention) : true;

        return meetsResource && meetsConstruction && meetsInvention;
    }

    protected getLeaderCharacter(): IPlayerCharacter {
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
