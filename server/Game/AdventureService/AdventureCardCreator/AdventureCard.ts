import {IGame} from "../../../../interfaces/Game";
import {ADVENTURE_CARD} from "../../../../interfaces/AdventureService/ADVENTURE_CARD";
import {ACTION, AdventureAction} from "../../../../interfaces/ACTION";
import {
    AdventureOptionLabel,
    IAdventureCard,
} from "../../../../interfaces/AdventureService/AdventureCard";
import {ICharacter} from "../../../../interfaces/Characters/Character";

export abstract class AdventureCard implements IAdventureCard {
    protected readonly _name: ADVENTURE_CARD;
    protected readonly _namePL: string;
    protected readonly _shouldDecide: boolean;
    protected readonly _eventNamePL: string = "";
    protected readonly _game: IGame;
    protected declare readonly _action: AdventureAction;
    protected readonly _option1Label: AdventureOptionLabel;
    protected readonly _option2Label: AdventureOptionLabel;

    protected constructor(
        name: ADVENTURE_CARD,
        namePL: string,
        shouldDecide: boolean,
        game: IGame,
        option1Label: AdventureOptionLabel,
        option2Label: AdventureOptionLabel
    ) {
        this._name = name;
        this._namePL = namePL;
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
        };
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

    get namePL(): string {
        return this._namePL;
    }

    get eventNamePL(): string {
        return this._eventNamePL;
    }

    option1(resolver: ICharacter) {
    }

    option2(resolver: ICharacter) {
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
        resolver: ICharacter
    ) {
        this._game.mysteryService.startDrawingCards(
            creature,
            trap,
            treasure,
            resolver
        );
    }

    triggerEventEffect() {
    }

    protected shuffleIntoEventDeck() {
        this._game.eventService.shuffleCardInToDeck(this);
    }

    protected getPrimeCharacter() {
        return this._game.playerService.primePlayer.getCharacter();
    }
}
