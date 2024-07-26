import {CHARACTER_CONTROLLER_ACTION} from "@shared/types/CONTROLLER_ACTION";
import {IPlayer} from "@shared/types/Game/PlayerService/Player";
import {IGame} from "@shared/types/Game/Game";
import {ActionHandler, GameControllerInterface} from "../../../types/GameController/Controllers";
import {ABILITY} from "@shared/types/Game/Skill/ABILITY";
import {PawnMovementData} from "@shared/types/Game/GlobalPawnService/GlobalPawnService";


export class CharacterController implements GameControllerInterface {
    private _game: IGame;

    constructor(game: IGame) {
        this._game = game;
    }

    public getActionHandlers(): Map<CHARACTER_CONTROLLER_ACTION, ActionHandler> {
        const handlers = new Map<CHARACTER_CONTROLLER_ACTION, ActionHandler>();
        handlers.set(CHARACTER_CONTROLLER_ACTION.MOVE_PAWN, this.movePawn.bind(this));
        handlers.set(CHARACTER_CONTROLLER_ACTION.REMOVE_HEALTH_THRESHOLD, this.removeHealthThreshold.bind(this));
        handlers.set(CHARACTER_CONTROLLER_ACTION.USE_ABILITY, this.useAbility.bind(this));
        return handlers;
    }


    private movePawn(player: IPlayer, source: PawnMovementData, target: PawnMovementData): void {
        this._game.globalPawnService.handlePawnMovement(source, target);
    }


    private removeHealthThreshold(player: IPlayer, num: number): void {
        this._game.characterService.removeMoraleThreshold(player.getCharacter(), num);
    }

    private useAbility(player: IPlayer, ability: ABILITY, target: any): void {
        player.getCharacter().useAbility(ability, target);
    }
}
