import {IGame} from "@shared/types/Game/Game";
import {IAdventureCard} from "@shared/types/Game/AdventureService/AdventureCard";
import {AdventureAction} from "@shared/types/Game/ACTION";
import {
    AdventureCardStacks,
    AdventureRelatedActionInfo,
    CurrentAdventure,
    IAdventureService,
    IAdventureServiceRenderData,
} from "@shared/types/Game/AdventureService/AdventureService";
import {AdventureCardCreator} from "./AdventureCardCreator/Creators/AdventureCardCreator";
import {IResolvableItem} from "@shared/types/Game/ActionService/IResolvableItem";
import {Tile} from "../TileService/Tile/Tile";
import {TileService} from "../TileService/TileService";
import {isPlayerCharacter} from "@shared/utils/typeGuards/isPlayerCharacter";
import {isAdventureAction} from "@shared/utils/typeGuards/isAdventureAction";
import shuffle from "@shared/utils/shuffleArray";
import {ICharacter} from "@shared/types/Game/Characters/Character";
import {IPlayer} from "@shared/types/Game/PlayerService/Player";

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
            currentAdventure: this._currentAdventure
                ? {
                    card: this._currentAdventure.card.renderData,
                    player: this._currentAdventure.player.renderData,
                }
                : null,
        };
    }

    get currentAdventure() {
        return this._currentAdventure;
    }


    resolveAdventureCard(option: 1 | 2, playerCharacterName: string): void {
        if (!this._currentAdventure) {
            throw new Error("There is no current card to resolve!");
        }
        const resolver = this._game.characterService.getCharacter(playerCharacterName);
        if (!isPlayerCharacter(resolver)) {
            throw new Error("Side character shouldn't have opportunity to resolve adventure card!")
        }
        if (option === 1 || !this._currentAdventure.card.shouldDecide) {
            this._currentAdventure.card.resolveOption1(resolver);
        } else {
            this._currentAdventure.card.resolveOption2(resolver);
        }
        this.unsetCurrentAdventure();
    }

    setCurrentAdventure(resolvableItem: IResolvableItem) {
        if (!isAdventureAction(resolvableItem.action)) {
            throw new Error(`${resolvableItem.action} action isn't adventure type`);
        }
        const card = this.popAdventureCardFromStack(resolvableItem.action);
        let relatedActionInfo = this.getRelatedActionInfo(resolvableItem);

        //AdventureCardResolve Service must remember the action,
        // that triggered it for some  adventure cards effects.
        this._currentAdventure = {
            card,
            relatedActionInfo,
            player: this._game.playerService.players.find((player => player.getCharacter().name === resolvableItem.leaderPawn.owner.name)) as IPlayer
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
            build: shuffle(implemented.build.map((card) => creator.createBuildCard(card)), this._game.getRandomNumber),
            explore: shuffle(implemented.explore.map((card) => creator.createExploreCard(card)), this._game.getRandomNumber),
            gather: shuffle(implemented.gather.map((card) => creator.createGatherCard(card)), this._game.getRandomNumber)
        }
    }
}
