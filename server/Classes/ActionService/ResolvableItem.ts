import { IConstruction } from "../../../interfaces/ConstructionService/Construction";
import { IInvention } from "../../../interfaces/InventionService/Invention";
import { ITile } from "../../../interfaces/TileService/ITile";
import { IEventCard } from "../../../interfaces/EventService/EventCard";
import { IBeast } from "../../../interfaces/Beasts/Beast";
import { IPawn, IPawnRenderData } from "../../../interfaces/Pawns/Pawn";
import { ACTION } from "../../../interfaces/ACTION";
import { Construction } from "../ConstructionService/Construction";
import { IGame } from "../../../interfaces/Game";
import { Invention } from "../Inventions/InventionCreator/Invention";
import { Tile } from "../TileService/TileGraph/Tile";
import { EventCard } from "../EventService/EventCardCreator/EventCard";
import { Beast } from "../BeastService/BeastCreator/Beast";
import {
  IResolvableItem,
  Item,
} from "../../../interfaces/ActionService/IResolvableItem";
import { v4 as uuidv4 } from "uuid";

export class ResolvableItem implements IResolvableItem {
  private readonly _item: Item;
  private readonly _leaderPawn: IPawn;
  private readonly _action: ACTION;
  private readonly _game: IGame;
  private _resolved: boolean = false;
  private readonly _id = uuidv4();
  private _rolled = false;
  private readonly _droppableID: string;

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
    return {
      itemName: "xD",
      id: this._id,
      leaderPawn: this._leaderPawn.renderData,
      resolved: this._resolved,
      action: this._action,
      rolled: this._rolled,
    };
  }

  get droppableID(): string {
    return this._droppableID;
  }

  get rolled(): boolean {
    return this._rolled;
  }

  set rolled(value: boolean) {
    this._rolled = value;
  }

  get action(): ACTION {
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

  resolve() {
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
}
