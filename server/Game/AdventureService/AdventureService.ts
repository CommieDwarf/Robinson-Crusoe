import {IGame} from "../../../interfaces/Game";
import {IAdventureCard} from "../../../interfaces/AdventureService/AdventureCard";
import {AdventureAction} from "../../../interfaces/ACTION";
import {
    AdventureCardStacks,
    AdventureRelatedActionInfo,
    CurrentAdventure,
    IAdventureService,
    IAdventureServiceRenderData,
} from "../../../interfaces/AdventureService/AdventureService";
import {AdventureCardCreator} from "./AdventureCardCreator/Creators/AdventureCardCreator";
import {IResolvableItem} from "../../../interfaces/ActionService/IResolvableItem";
import {Tile} from "../TileService/TileGraph/Tile";
import {TileService} from "../TileService/TileService";
import {isAdventureAction} from "../../../utils/isAdventureAction";
import shuffle from "../../../utils/shuffleArray";

export class AdventureService implements IAdventureService {
    private readonly _game: IGame;

    private _stacks: AdventureCardStacks = {
        build: [],
        explore: [],
        gather: [],
    };


    private _currentAdventure: CurrentAdventure | null = null;

    constructor(game: IGame) {
        this._game = game;
        this._stacks = this.initCards();
    }

    get renderData(): IAdventureServiceRenderData {
        return {
            currentCard: this._currentAdventure
                ? this._currentAdventure.card.renderData
                : null,
        };
    }

    get currentAdventure() {
        return this._currentAdventure;
    }

    resolveAdventureCard(option: 1 | 2, resolverName: string) {
        if (!this._currentAdventure) {
            throw new Error("There is no current card to resolve");
        }
        const resolver = this._game.characterService.getCharacter(resolverName);
        if (option === 1 || !this._currentAdventure.card.shouldDecide) {
            this._currentAdventure.card.option1(resolver);
        } else {
            this._currentAdventure.card.option2(resolver);
        }
        this.unsetCurrentAdventure();
    }

    setCurrentAdventure(resolvableItem: IResolvableItem) {
        if (!isAdventureAction(resolvableItem.action)) {
            throw new Error(`${resolvableItem.action} action isn't adventure type`);
        }
        const card = this.popAdventureCardFromStack(resolvableItem.action);
        let relatedActionInfo = this.getRelatedActionInfo(resolvableItem);

        //Adventure Service must remember the action,
        // that triggered it for some  adventure cards effects.
        this._currentAdventure = {
            card,
            relatedActionInfo,
        };
    }

    private getRelatedActionInfo(
        resolvableItem: IResolvableItem
    ): AdventureRelatedActionInfo | null {
        if (resolvableItem.item instanceof Tile) {
            return {
                tileId: resolvableItem.item.id,
                source: TileService.getSourceSideFromDroppableId(
                    resolvableItem.droppableID
                ),
            };
        } else {
            return null;
        }
    }

    private popAdventureCardFromStack(
        adventure: AdventureAction
    ): IAdventureCard {
        const card = this._stacks[adventure].pop();
        if (!card) {
            throw new Error(`${adventure} stack is empty`);
        }
        return card;
    }

    private unsetCurrentAdventure() {
        this._currentAdventure = null;
    }

    private initCards() {
        const creator = new AdventureCardCreator(this._game);
        const implemented = creator.implemented;
        return {
            build: shuffle(implemented.build.map((card) => creator.createBuildCard(card))),
            explore: shuffle(implemented.explore.map((card) => creator.createExploreCard(card))),
            gather: shuffle(implemented.gather.map((card) => creator.createGatherCard(card)))
        }
    }
}
