import {
	IResolvableItem,
	Item,
	RESOLVE_ITEM_STATUS,
} from "@shared/types/Game/ActionService/IResolvableItem";
import {
	CONSTRUCTION,
	IConstruction,
} from "@shared/types/Game/ConstructionService/Construction";
import { Invention } from "../Inventions/InventionCreator/Invention";
import { ACTION, AdventureAction } from "@shared/types/Game/ACTION";
import { isTile } from "@shared/utils/typeGuards/isTile";
import { isAdventureAction } from "@shared/utils/typeGuards/isAdventureAction";
import { IInvention } from "@shared/types/Game/InventionService/Invention";
import { IPawn } from "@shared/types/Game/Pawns/Pawn";
import { RollDiceService } from "../RollDiceService/RollDiceService";
import { EventCard } from "../EventService/EventCardCreator/EventCard";
import { isCommittableResourcesItem } from "@shared/utils/typeGuards/isCommittableResourcesItem";
import { Tile } from "../TileService/Tile/Tile";
import { Beast } from "../BeastService/BeastCreator/Beast";
import { IBeast } from "@shared/types/Game/Beasts/Beast";
import {
	ActionDice,
	ActionDiceResults,
} from "@shared/types/Game/RollDice/RollDice";
import { ITile } from "@shared/types/Game/TileService/ITile";
import { IEventCard } from "@shared/types/Game/EventService/EventCard";
import { IGame } from "@shared/types/Game/Game";
import { ICharacter } from "@shared/types/Game/Characters/Character";
import { Construction } from "../ConstructionService/Construction";

export class ResolvableItem implements IResolvableItem {
	private readonly _item: Item;
	private readonly _leaderPawn: IPawn<ICharacter>;
	private readonly _action: ACTION;
	private readonly _game: IGame;
	private _resolved: boolean = false;
	private _helperAmount: number = 0;
	private _reRolledSuccess = false;
	private _reRolledDice = null;

	private readonly _droppableID: string;
	private _resolveStatus: RESOLVE_ITEM_STATUS = RESOLVE_ITEM_STATUS.PENDING;
	private _rollDiceResults: ActionDiceResults | null = null;

	private _bibleChecked: boolean = false;

	constructor(
		item: Item,
		action: ACTION,
		leaderPawn: IPawn<ICharacter>,
		game: IGame,
		droppableID: string
	) {
		this._item = item;
		this._leaderPawn = leaderPawn;
		this._action = action;
		this._game = game;
		this._droppableID = droppableID;
	}

	get renderData() {
		let itemRenderData;
		if (this._item === ACTION.REST || this._item === ACTION.ARRANGE_CAMP) {
			itemRenderData = this._item;
		} else {
			itemRenderData = this._item.renderData;
		}

		return {
			item: itemRenderData,
			id: this.id,
			leaderPawn: this._leaderPawn.renderData,
			resolved: this._resolved,
			action: this._action,
			droppableID: this._droppableID,
			resolveStatus: this._resolveStatus,
			shouldRollDices: this.shouldRollDices,
			rollDiceResults: this.rollDiceResults,
			shouldReRollSuccess: this.shouldReRollSuccess,
			reRolledSuccess: this._reRolledSuccess,
			reRolledDice: this._reRolledDice,
			bibleChecked: this._bibleChecked,
			canBibleBeUsed: this.canBibleBeUsed(),
		};
	}

	get reRolledDice(): ActionDice | null {
		return this._reRolledDice;
	}

	get rollDiceResults(): ActionDiceResults | null {
		return this._rollDiceResults;
	}

	get helperAmount(): number {
		return this._helperAmount;
	}

	set helperAmount(value: number) {
		this._helperAmount = value;
	}

	set resolveStatus(value: RESOLVE_ITEM_STATUS) {
		this._resolveStatus = value;
	}

	get resolveStatus(): RESOLVE_ITEM_STATUS {
		return this._resolveStatus;
	}

	get droppableID(): string {
		return this._droppableID;
	}

	get action() {
		return this._action;
	}

	get id(): string {
		return this.droppableID;
	}

	get item(): Item {
		return this._item;
	}

	get leaderPawn(): IPawn<ICharacter> {
		return this._leaderPawn;
	}

	get resolved(): boolean {
		return this._resolved;
	}

	set resolved(value: boolean) {
		this._resolved = value;
	}

	get reRolledSuccess(): boolean {
		return this._reRolledSuccess;
	}

	get shouldReRollSuccess() {
		if (
			this._rollDiceResults?.success.result === "success" &&
			isAdventureAction(this._action) &&
			this._game.actionService.reRollTokens[this._action] &&
			!this._reRolledSuccess
		) {
			{
				return true;
			}
		}
		return false;
	}

	rollDices() {
		if (!isAdventureAction(this._action) || !this.shouldRollDices) {
			return;
		}
		this._rollDiceResults = RollDiceService.getActionRollDiceResults(
			this._action,
			this._game.getRandomNumber
		);
	}

	public reRollDice(dice: ActionDice, action: AdventureAction) {
		if (this._rollDiceResults) {
			this._rollDiceResults[dice] =
				RollDiceService.getActionRollDiceResult(
					action,
					dice,
					this._game.getRandomNumber
				);
		}
	}

	reRollSuccess() {
		if (!this.shouldReRollSuccess) {
			return;
		}
		if (isAdventureAction(this._action) && this._rollDiceResults) {
			this._rollDiceResults.success =
				RollDiceService.getActionRollDiceResult(
					this._action,
					"success",
					this._game.getRandomNumber
				);
			this._reRolledSuccess = true;
		}
	}

	resolve() {
		if (this.shouldReRollSuccess) {
			return;
		}
		if (this._rollDiceResults) {
			this.applyRollDiceEffects();
		}
		const item = this._item;

		if (isTile(item) && item.modifiers.greaterDanger) {
			if (
				this._game.constructionService.getConstruction(
					CONSTRUCTION.WEAPON
				).lvl === 0 &&
				item.modifiers.greaterDanger.setInRound !== this._game.round
			) {
				this._game.characterService.hurt(
					this._leaderPawn.owner as ICharacter,
					1,
					"Zagrożenie na kafelku - brak broni."
				);
			}
		}

		if (this.resolveStatus === RESOLVE_ITEM_STATUS.FAILURE) {
			if (isCommittableResourcesItem(item)) {
				item.unCommitResources(this._leaderPawn.owner);
			}
			return;
		}

		if (isCommittableResourcesItem(item)) {
			item.consumeCommittedResources();
		}
		this.resolveStatus = RESOLVE_ITEM_STATUS.SUCCESS;
		switch (true) {
			case item instanceof Construction:
				const construction = item as IConstruction;
				this._game.constructionService.lvlUpConstruction(
					construction.name,
					1,
					this._leaderPawn.owner.name
				);
				break;
			case item instanceof Invention:
				const invention = item as IInvention;
				this._game.inventionService.build(
					invention.name,
					this._leaderPawn.owner
				);
				break;
			case item instanceof Tile:
				const tile = item as ITile;
				if (this._action === ACTION.EXPLORE) {
					this._game.tileService.explore(tile.id);
				} else {
					const side = this._droppableID.includes("left")
						? "left"
						: "right";
					this._game.tileService.gather(
						[side],
						tile.id,
						this._leaderPawn.owner.name
					);
				}
				break;
			case item instanceof EventCard:
				const eventCard = item as IEventCard;
				this._game.eventService.fullFill(eventCard.name);
				break;
			case item instanceof Beast:
				this._game.beastService.fightBeast(
					this._leaderPawn.owner,
					item as IBeast
				);
				this._game.beastService.removeBeastFromDeck();
				break;
			case item === ACTION.REST:
				this._game.arrangeCampRestService.rest(this._leaderPawn.owner);
				break;
			case item === ACTION.ARRANGE_CAMP:
				this._game.arrangeCampRestService.arrangeCamp(
					this._leaderPawn.owner,
					this._bibleChecked
				);
				break;
		}
	}

	get shouldRollDices() {
		const item = this._item;
		if (
			!item ||
			item === ACTION.REST ||
			item === ACTION.ARRANGE_CAMP ||
			item instanceof EventCard ||
			item instanceof Beast ||
			this._rollDiceResults
		) {
			return false;
		}
		return Boolean(
			item.requiredPawnAmount &&
				item.requiredPawnAmount > this._helperAmount
		);
	}

	private applyRollDiceEffects() {
		const character = this.leaderPawn.owner;
		if (this._rollDiceResults?.hurt.result === "hurt") {
			this._game.characterService.hurt(character, 1, this._action);
		}
		if (this._rollDiceResults?.success.result === "success") {
			this.resolveStatus = RESOLVE_ITEM_STATUS.SUCCESS;
		} else {
			this._game.characterService.incrDetermination(
				character,
				2,
				this._action
			);
			this.resolveStatus = RESOLVE_ITEM_STATUS.FAILURE;
		}
		if (this._rollDiceResults?.mystery.result === "mystery") {
			this._game.adventureService.setCurrentAdventure(this);
		}
	}

	canBibleBeUsed() {
		return (
			this._action === "arrange camp" &&
			this._game.actionService.bibleUses > 0
		);
	}

	set bibleChecked(value: boolean) {
		if (value) {
			if (this.canBibleBeUsed()) {
				this._game.actionService.bibleUses--;
				this._bibleChecked = true;
			}
		} else {
			this._game.actionService.bibleUses++;
			this._bibleChecked = false;
		}
	}
}
