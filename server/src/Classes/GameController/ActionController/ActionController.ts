import {ACTION_CONTROLLER_ACTION} from "@shared/types/CONTROLLER_ACTION";
import {IGame} from "@shared/types/Game/Game";
import {ActionHandler, GameControllerInterface} from "../../../types/GameController/Controllers";
import {IPlayer} from "@shared/types/Game/PlayerService/Player";
import {SetBibleUsageArgs} from "@shared/types/ActionArgMap";

export class ActionController implements GameControllerInterface {

    private _game: IGame;

    constructor(game: IGame) {
        this._game = game;
    }

    public getActionHandlers(): Map<ACTION_CONTROLLER_ACTION, ActionHandler> {
        const handlers = new Map<ACTION_CONTROLLER_ACTION, ActionHandler>();
        handlers.set(ACTION_CONTROLLER_ACTION.SET_BIBLE_USAGE, this.setBibleUsage.bind(this));
        handlers.set(ACTION_CONTROLLER_ACTION.SET_NEXT_ACTION, this.setNextAction.bind(this));
        handlers.set(ACTION_CONTROLLER_ACTION.ROLL_ACTION_DICES, this.rollActionDices.bind(this));
        handlers.set(ACTION_CONTROLLER_ACTION.RESOLVE_ACTION, this.resolveAction.bind(this));
        handlers.set(ACTION_CONTROLLER_ACTION.RESOLVE_ADVENTURE, this.resolveAdventure.bind(this));
        handlers.set(ACTION_CONTROLLER_ACTION.REROLL_ACTION_DICE, this.reRollActionDice.bind(this));
        return handlers;
    }


    private setBibleUsage(player: IPlayer, actionId: string, value: boolean): void {
        this._game.actionService.setBibleUsage(actionId, value);
    }

    private setNextAction(player: IPlayer): void {
        this._game.actionService.setNextAction();
    }

    private rollActionDices(player: IPlayer, actionId: string): void {
        this._game.actionService.rollDices(actionId);
    }

    private resolveAction(player: IPlayer, actionId: string): void {
        this._game.actionService.resolve(actionId);
    }

    private resolveAdventure(player: IPlayer, option: 1 | 2): void {
        this._game.adventureService.resolveAdventureCard(option, player.getCharacter().name);
    }

    private reRollActionDice(player: IPlayer, resolvableItemID: string): void {
        this._game.actionService.reRollSuccess(resolvableItemID);
    }
}
