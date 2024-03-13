import {IGame} from "@shared/types/Game/Game";
import {ADVENTURE_CARD} from "@shared/types/Game/AdventureService/ADVENTURE_CARD";
import {AdventureAction} from "@shared/types/Game/ACTION";
import {
    AdventureOptionLabel,
    IAdventureCard,
    IAdventureEventOption, IAdventureEventOptionRenderData,
} from "@shared/types/Game/AdventureService/AdventureCard";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";

export abstract class AdventureCard implements IAdventureCard {


    protected readonly _name: ADVENTURE_CARD;
    protected readonly _eventName: string;
    protected readonly _shouldDecide: boolean;
    protected readonly _game: IGame;
    protected declare readonly _action: AdventureAction;
    protected readonly _option1Label: AdventureOptionLabel;
    protected readonly _option2Label: AdventureOptionLabel;
    protected readonly _eventOption1: IAdventureEventOption | null = null;
    protected readonly _eventOption2: IAdventureEventOption | null = null;
    protected _resolver: IPlayerCharacter | null = null;


    protected constructor(
        name: ADVENTURE_CARD,
        eventName: string,
        shouldDecide: boolean,
        game: IGame,
        option1Label: AdventureOptionLabel,
        option2Label: AdventureOptionLabel
    ) {
        this._name = name;
        this._eventName = eventName;
        this._shouldDecide = shouldDecide;
        this._game = game;
        this._option1Label = option1Label;
        this._option2Label = option2Label;
    }

    get renderData() {
        return {
            name: this._name,
            shouldDecide: this._shouldDecide,
            action: this._action,
            option1Label: this._option1Label,
            option2Label: this._option2Label,
            eventOption1: this._eventOption1 && this.getEventOptionRenderData(this._eventOption1),
            eventOption2: this._eventOption2 && this.getEventOptionRenderData(this._eventOption2)
        };
    }


    get eventOption1(): IAdventureEventOption | null {
        return this._eventOption1;
    }

    get eventOption2(): IAdventureEventOption | null {
        return this._eventOption2;
    }

    get option1Label(): string {
        return this._option1Label;
    }

    get option2Label(): string {
        return this._option2Label;
    }

    get action(): AdventureAction {
        return this._action;
    }

    get shouldDecide(): boolean {
        return this._shouldDecide;
    }

    get name(): ADVENTURE_CARD {
        return this._name;
    }

    get eventName(): string {
        return this._eventName;
    }


    private getEventOptionRenderData(eventOption: IAdventureEventOption): IAdventureEventOptionRenderData {
        return {
            label: eventOption.label,
        }
    }


    resolveOption1(resolver: IPlayerCharacter) {
    }

    resolveOption2(resolver: IPlayerCharacter) {
        if (!this._shouldDecide) {
            throw new Error(
                "Option2 method is triggered but card is marked as shouldn't decide" +
                this._name
            );
        }
    }

    protected startDrawingMysteryCards(
        creature: number,
        trap: number,
        treasure: number,
        resolver: IPlayerCharacter,
        max: number = Infinity,
    ) {
        this._game.mysteryService.startDrawingCards(
            creature,
            trap,
            treasure,
            resolver,
            max
        );
    }

    triggerEventEffect() {
    }

    protected setResolver(resolver: IPlayerCharacter) {
        this._resolver = resolver;
    }

    protected getResolver(): IPlayerCharacter {
        if (!this._resolver) {
            throw new Error("Resolver is null.");
        }
        return this._resolver;
    }

    protected shuffleIntoEventDeck() {
        this._game.eventService.shuffleCardInToDeck(this);
    }

    protected getPrimeCharacter() {
        return this._game.playerService.primePlayer.getCharacter();
    }
}
