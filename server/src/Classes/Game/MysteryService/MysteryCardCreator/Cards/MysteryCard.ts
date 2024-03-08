import {
    IBaseMysteryCard, IMysteryCard,
    IMysteryCardRenderData,
    MYSTERY_CARD_TYPE,
} from "@shared/types/Game/MysteryService/MysteryCard";
import {IGame} from "@shared/types/Game/Game";
import {ICharacter} from "@shared/types/Game/Characters/Character";
import {MysteryCardName} from "@shared/types/Game/MysteryService/MYSTERY_CARD";


export abstract class MysteryCard<Name extends MysteryCardName> implements IMysteryCard {
    protected declare _name: Name
    protected readonly _namePL: string;
    protected readonly _shuffleable: boolean;
    private readonly _eventName: string;
    protected readonly _game: IGame;
    protected declare readonly _type: MYSTERY_CARD_TYPE;
    protected readonly _requiresTargeting: boolean = false;
    protected _uses: number = 1
    protected _usedCount: number = 0;
    protected readonly _eventLabel: string;
    protected readonly _drawLabel: string;
    protected _drawResolved: boolean = false;

    abstract get renderData(): IMysteryCardRenderData<Name>

    protected constructor(
        game: IGame,
        name: Name,
        namePL: string,
        shuffleable: boolean,
        eventName: string,
        eventLabel: string,
        drawLabel: string
    ) {
        this._game = game;
        this._name = name;
        this._namePL = namePL;
        this._shuffleable = shuffleable;
        this._eventName = eventName;
        this._eventLabel = eventLabel;
        this._drawLabel = drawLabel;
    }

    protected getRenderData(): IMysteryCardRenderData<Name> {
        return {
            name: this._name,
            namePL: this._namePL,
            type: this._type,
            shuffleable: this._shuffleable,
            eventLabel: this._eventLabel,
            drawLabel: this._drawLabel,
            drawResolved: this._drawResolved,
            usedCount: this._usedCount,
        };
    }


    get uses(): number {
        return this._uses;
    }

    get eventName(): string {
        return this._eventName;
    }

    get name(): Name {
        return this._name;
    }

    get namePL(): string {
        return this._namePL;
    }

    get type(): MYSTERY_CARD_TYPE {
        return this._type;
    }

    get shuffleable(): boolean {
        return this._shuffleable;
    }

    get requiresTarget(): boolean {
        return this._requiresTargeting;
    }

    get drawLabel(): string {
        return this._drawLabel
    }

    set drawResolved(value: boolean) {
        this._drawResolved = value;
    }

    get drawResolved() {
        return this._drawResolved;
    }

    protected addCardAsReminder() {
        this._game.mysteryService.addCardAsReminder(this);
    }

    protected removeCardAsReminder() {
        this._game.mysteryService.removeCardAsReminder(this);
    }

    protected shuffleIntoEventDeck() {
        if (!this._shuffleable) {
            throw new Error(
                "shuffleIntoEventDeck method is used but card is marked as unshuffleable. " +
                this._name
            );
        }
        this._game.eventService.shuffleCardInToDeck(this);
    }

    use(...args: any[]): void {
        this._usedCount++;
    }

    triggerDrawEffect(drawer: ICharacter) {
    }

    triggerEventEffect() {
    }
}
