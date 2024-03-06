import {BuildAdventureCard} from "./BuildAdventureCard/BuildAdventureCard";
import {IAdventureCard, IAdventureEventOption} from "@shared/types/Game/AdventureService/AdventureCard";
import {IGame} from "@shared/types/Game/Game";
import {ADVENTURE_CARD_BUILD} from "@shared/types/Game/AdventureService/ADVENTURE_CARD";
import {CONSTRUCTION} from "@shared/types/Game/ConstructionService/Construction";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";

export class MonkeysWatchYou
    extends BuildAdventureCard
    implements IAdventureCard {
    protected _eventNamePL = "małpy w obozie!";
    protected _eventOptions: IAdventureEventOption[] | null = [
        {
            label: "dach",
            resolve: () => {
                this._game.constructionService.setDividedLvlByTwoRoundedDown(CONSTRUCTION.ROOF, this._eventNamePL)
            },
            canBeResolved: () => {
                return this._game.constructionService.isBuilt(CONSTRUCTION.ROOF)
            },

        },
        {
            label: "palisada",
            resolve: () => {
                this._game.constructionService.setDividedLvlByTwoRoundedDown(CONSTRUCTION.PALISADE, this._eventNamePL)
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
