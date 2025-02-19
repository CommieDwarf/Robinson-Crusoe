import { IPlayer } from "@shared/types/Game/PlayerService/Player";
import { STORAGE_ACTION } from "../GameController";
import { MYSTERY_CONTROLLER_ACTION } from "@shared/types/CONTROLLER_ACTION";
import { IGame } from "@shared/types/Game/Game";
import {
	ActionHandler,
	GameControllerInterface,
} from "../../../shared/types/GameController/Controllers";

export class MysteryController implements GameControllerInterface {
	private _game: IGame;

	constructor(game: IGame) {
		this._game = game;
	}

	public getActionHandlers(): Map<MYSTERY_CONTROLLER_ACTION, ActionHandler> {
		const handlers = new Map<MYSTERY_CONTROLLER_ACTION, ActionHandler>();
		handlers.set(
			MYSTERY_CONTROLLER_ACTION.RESOLVE_EVENT_MYSTERY,
			this.resolveEventMystery.bind(this)
		);
		handlers.set(
			MYSTERY_CONTROLLER_ACTION.TRIGGER_MYSTERY_DRAW_EFFECT,
			this.triggerMysteryDrawEffect.bind(this)
		);
		handlers.set(
			MYSTERY_CONTROLLER_ACTION.USE_TREASURE_CARD,
			this.useTreasureCard.bind(this)
		);
		handlers.set(
			MYSTERY_CONTROLLER_ACTION.DRAW_MYSTERY_CARD,
			this.drawMysteryCard.bind(this)
		);
		handlers.set(
			MYSTERY_CONTROLLER_ACTION.FINISH_DRAWING_MYSTERY_CARDS,
			this.finishDrawingMysteryCards.bind(this)
		);
		handlers.set(
			MYSTERY_CONTROLLER_ACTION.MANAGE_CARD_STORAGE,
			this.manageCardStorage.bind(this)
		);
		return handlers;
	}

	private resolveEventMystery(player: IPlayer): void {
		this._game.eventService.resolveEventMystery(player.getCharacter());
	}

	private triggerMysteryDrawEffect(player: IPlayer): void {
		this._game.mysteryService.triggerDrawEffect();
	}

	private useTreasureCard(player: IPlayer, cardName: string): void {
		this._game.mysteryService.useCard(player.getCharacter(), cardName);
	}

	private drawMysteryCard(player: IPlayer): void {
		this._game.mysteryService.drawCard();
	}

	private finishDrawingMysteryCards(player: IPlayer): void {
		this._game.mysteryService.finish();
	}

	private manageCardStorage(
		player: IPlayer,
		cardName: string,
		action: STORAGE_ACTION
	): void {
		switch (action) {
			case STORAGE_ACTION.WITHDRAW:
				this._game.mysteryService.withdrawResource(cardName);
				break;
			case STORAGE_ACTION.DEPOSIT:
				this._game.mysteryService.depositResource(cardName);
				break;
		}
	}
}
