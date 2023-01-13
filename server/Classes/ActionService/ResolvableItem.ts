import { IConstruction } from "../../../interfaces/ConstructionService/Construction";
import { IInvention } from "../../../interfaces/InventionService/Invention";
import { ITile } from "../../../interfaces/TileService/ITile";
import { IEventCard } from "../../../interfaces/EventService/EventCard";
import { IPawn } from "../../../interfaces/Pawns/Pawn";
import { ACTION, AdventureAction } from "../../../interfaces/ACTION";
import { Construction } from "../ConstructionService/Construction";
import { IGame } from "../../../interfaces/Game";
import { Invention } from "../Inventions/InventionCreator/Invention";
import { Tile } from "../TileService/TileGraph/Tile";
import { EventCard } from "../EventService/EventCardCreator/EventCard";
import { Beast } from "../BeastService/BeastCreator/Beast";
import {
  IResolvableItem,
  Item,
  RESOLVE_ITEM_STATUS,
} from "../../../interfaces/ActionService/IResolvableItem";
import { v4 as uuidv4 } from "uuid";
import {
  ActionDice,
  ActionDiceResults,
} from "../../../interfaces/RollDice/RollDice";
import { RollDiceService } from "../RollDiceService/RollDiceService";
import { isAdventureAction } from "../../../utils/isAdventureAction";

export class ResolvableItem implements IResolvableItem {
  private readonly _item: Item;
  private readonly _leaderPawn: IPawn;
  private readonly _action: ACTION;
  private readonly _game: IGame;
  private _resolved: boolean = false;
  private readonly _id = uuidv4();
  private _helperAmount: number = 0;
  private _reRolledSuccess = false;
  private _reRolledDice = null;

  private readonly _droppableID: string;
  private _resolveStatus: RESOLVE_ITEM_STATUS = RESOLVE_ITEM_STATUS.PENDING;
  private _rollDiceResults: ActionDiceResults | null = null;

  constructor(
    item: Item,
    action: ACTION,
    leaderPawn: IPawn,
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
      itemName: "xD",
      item: itemRenderData,
      id: this._id,
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
    return this._id;
  }

  get item(): Item {
    return this._item;
  }

  get leaderPawn(): IPawn {
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
      this._action
    );
  }

  reRollDice(dice: ActionDice, action: AdventureAction) {
    if (this._rollDiceResults) {
      this._rollDiceResults[dice] = RollDiceService.getActionRollDiceResult(
        action,
        dice
      );
    }
  }

  reRollSuccess() {
    if (!this.shouldReRollSuccess) {
      return;
    }
    if (isAdventureAction(this._action) && this._rollDiceResults) {
      this._rollDiceResults.success = RollDiceService.getActionRollDiceResult(
        this._action,
        "success"
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

    if (this.resolveStatus === RESOLVE_ITEM_STATUS.FAILURE) {
      return;
    }

    this.resolveStatus = RESOLVE_ITEM_STATUS.SUCCESS;
    const item = this._item;
    switch (true) {
      case item instanceof Construction:
        const construction = item as IConstruction;
        this._game.constructionService.lvlUpConstruction(
          construction.name,
          1,
          this._leaderPawn.character.name
        );
        break;
      case item instanceof Invention:
        const invention = item as IInvention;
        this._game.inventionService.build(
          invention.name,
          this._leaderPawn.character
        );
        break;
      case item instanceof Tile:
        const tile = item as ITile;
        if (this._action === ACTION.EXPLORE) {
          this._game.tileService.explore(tile.id);
        } else {
          const side = this._droppableID.includes("left") ? "left" : "right";
          this._game.tileService.gather(
            side,
            tile.id,
            this._leaderPawn.character.name
          );
        }
        break;
      case item instanceof EventCard:
        const eventCard = item as IEventCard;
        this._game.eventService.fullFill(eventCard.id);
        break;
      case item instanceof Beast:
        this._game.beastService.killBeast(this._leaderPawn.character);
        break;
      case item === ACTION.REST:
        this._game.arrangeCampRestService.rest(this._leaderPawn.character);
        break;
      case item === ACTION.ARRANGE_CAMP:
        this._game.arrangeCampRestService.arrangeCamp(
          this._leaderPawn.character
        );
        break;
    }
  }

  get shouldRollDices() {
    const item = this._item;
    if (
      item === ACTION.REST ||
      item === ACTION.ARRANGE_CAMP ||
      item instanceof EventCard ||
      item instanceof Beast ||
      this._rollDiceResults
    ) {
      return false;
    }
    return item.requiredHelperAmount >= this._helperAmount;
  }

  private applyRollDiceEffects() {
    const character = this.leaderPawn.character;
    if (this._rollDiceResults?.hurt.result === "hurt") {
      this._game.characterService.hurt(character, 1, this._action);
    }
    if (this._rollDiceResults?.success.result === "success") {
      this.resolveStatus = RESOLVE_ITEM_STATUS.SUCCESS;
    } else {
      this._game.characterService.incrDetermination(character, 2, this._action);
      this.resolveStatus = RESOLVE_ITEM_STATUS.FAILURE;
    }
    if (this._rollDiceResults?.mystery.result === "mystery") {
      //TODO: pull mystery card.
    }
  }
}
