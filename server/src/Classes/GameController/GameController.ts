import {TileController} from "./TileController/TileController";
import {MysteryController} from "./MysteryController/MysteryController";
import {CharacterController} from "./CharacterController/CharacterController";
import {ActionController} from "./ActionController/ActionController";
import {IPlayer} from "@shared/types/Game/PlayerService/Player";
import {ITEM} from "@shared/types/Game/Equipment/Item";
import {CONSTRUCTION} from "@shared/types/Game/ConstructionService/Construction";
import {IGame} from "@shared/types/Game/Game";
import {ActionHandler, BaseController, GameControllerInterface} from "../../types/GameController/Controllers";
import {CONTROLLER_ACTION, OTHER_CONTROLLER_ACTION} from "@shared/types/CONTROLLER_ACTION";
import {INVENTION} from "@shared/types/Game/InventionService/Invention";


export enum STORAGE_ACTION {
    WITHDRAW = "withdraw",
    DEPOSIT = "deposit",
}


export class GameController implements GameControllerInterface, BaseController {


    private readonly _game: IGame;
    private readonly _players: IPlayer[];

    private readonly _actionHandlers = new Map<CONTROLLER_ACTION, ActionHandler>()

    constructor(game: IGame, players: IPlayer[]) {
        this._game = game;
        this._players = players;
        this.initActionHandlers();
        this.testStuff();
    }

    get game(): IGame {
        return this._game;
    }

    public handleAction(action: CONTROLLER_ACTION, player: IPlayer, ...args: any[]): void {
        const handler = this._actionHandlers.get(action);

        if (!handler) {
            throw new Error(`There isn't matching handler to: ${action}.`);
        }
        handler(player, ...args);
    }

    private testStuff() {
        this._game.playerService.players.forEach((player) => {
            this._game.characterService.incrDetermination(player.getCharacter(), 10, "test");
        })
    }

    private initActionHandlers() {
        this.addActionHandlers(new TileController(this._game));
        this.addActionHandlers(new MysteryController(this._game));
        this.addActionHandlers(new CharacterController(this._game));
        this.addActionHandlers(new ActionController(this._game));
        this.addActionHandlers(this);
    }

    private addActionHandlers(controller: GameControllerInterface): void {
        controller.getActionHandlers().forEach((handler, action) => {
            this._actionHandlers.set(action, handler);
        });
    }


    public getActionHandlers(): Map<OTHER_CONTROLLER_ACTION, ActionHandler> {
        const handlers = new Map<OTHER_CONTROLLER_ACTION, ActionHandler>();
        handlers.set(OTHER_CONTROLLER_ACTION.ADD_WOOD_TO_PILE, this.addWoodToPile.bind(this));
        handlers.set(OTHER_CONTROLLER_ACTION.RESOLVE_EVENT_ADVENTURE, this.resolveEventAdventure.bind(this));
        handlers.set(OTHER_CONTROLLER_ACTION.ROLL_WEATHER_DICES, this.rollWeatherDices.bind(this));
        handlers.set(OTHER_CONTROLLER_ACTION.SET_NEXT_PHASE, this.setNextPhase.bind(this));
        handlers.set(OTHER_CONTROLLER_ACTION.SWITCH_COMMITTED_RESOURCES_TYPE, this.switchCommittedResourcesType.bind(this));
        handlers.set(OTHER_CONTROLLER_ACTION.USE_INVENTION, this.useInvention.bind(this));
        handlers.set(OTHER_CONTROLLER_ACTION.USE_ITEM, this.useItem.bind(this));
        handlers.set(OTHER_CONTROLLER_ACTION.USE_DISCOVERY_TOKEN, this.useDiscoveryToken.bind(this));
        handlers.set(OTHER_CONTROLLER_ACTION.PICK_OBJECT, this.pickObject.bind(this));
        return handlers;
    }


    private addWoodToPile(player: IPlayer): void {
        this._game.scenarioService.addWood(player.getCharacter());
    }


    private resolveEventAdventure(player: IPlayer, option: 1 | 2): void {
        this._game.eventService.resolveEventAdventure(option);
    }


    private rollWeatherDices(player: IPlayer): void {
        this._game.weatherService.rollDices();
    }


    private setNextPhase(player: IPlayer): void {
        this._game.phaseService.goNextPhase();
    }


    private switchCommittedResourcesType(player: IPlayer, construction: CONSTRUCTION): void {
        this._game.constructionService.switchCommittedResources(construction);
    }

    private useInvention(player: IPlayer, inventionName: INVENTION): void {
        this._game.inventionService.useInvention(inventionName, player.getCharacter());
    }

    private useItem(player: IPlayer, item: ITEM): void {
        this._game.equipmentService.useItem(item, player.getCharacter());
    }

    private useDiscoveryToken(player: IPlayer, tokenId: string): void {
        this._game.tokenService.useToken(tokenId, player.getCharacter());
    }

    private pickObject(player: IPlayer, objPickerId: string, objectIds: string[], secondaryEffect: boolean): void {
        this._game.pickObjects(objPickerId, objectIds, secondaryEffect);
    }
}
