import {BuildAdventureCard} from "./BuildAdventureCard/BuildAdventureCard";
import {IAdventureCard, IAdventureEventOption} from "../../../../../../interfaces/AdventureService/AdventureCard";
import {IGame} from "../../../../../../interfaces/Game";
import {ADVENTURE_CARD_BUILD} from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import {CONSTRUCTION} from "../../../../../../interfaces/ConstructionService/Construction";
import {IPlayerCharacter} from "../../../../../../interfaces/Characters/PlayerCharacter";

export class MonkeysWatchYou
    extends BuildAdventureCard
    implements IAdventureCard {
    protected _eventNamePL = "małpy w obozie!";
    protected _eventOptions: IAdventureEventOption[] | null = [
        {
            label: "dach",
            resolve: () => {
                this._game.constructionService.setDividedLvlByTwo(CONSTRUCTION.ROOF, this._eventNamePL)
            },
            canBeResolved: () => {
                return this._game.constructionService.isBuilt(CONSTRUCTION.ROOF)
            },

        },
        {
            label: "palisada",
            resolve: () => {
                this._game.constructionService.setDividedLvlByTwo(CONSTRUCTION.PALISADE, this._eventNamePL)
            },
            canBeResolved: () => {
                return this._game.constructionService.isBuilt(CONSTRUCTION.PALISADE)
            },
        }
    ]

    constructor(game: IGame) {
        super(
            ADVENTURE_CARD_BUILD.MONKEYS_WATCH_YOU,
            "małpy Cię obserwują",
            false,
            game,
            "shuffle",
            ""
        );
    }

    option1(resolver: IPlayerCharacter) {
        this.shuffleIntoEventDeck();
    }

    triggerEventEffect() {
    }
}
