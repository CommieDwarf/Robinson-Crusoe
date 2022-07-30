import ThreatSlotsMap, {
  EventCard as IEventCard,
  ThreatSlotsObj,
} from "../../../interfaces/threatCards";
import IResources from "../../../interfaces/Resources";
import { Resources } from "../AllResources/AllResources";

export class EventCard implements IEventCard {
  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  private readonly _id: number;
  private readonly _name: string;

  constructor(name: string, id: number) {
    this._name = name;
    this._id = id;
  }

  getReward(numberOfPawnsAssigned: number): Map<keyof IResources, number> {
    if (numberOfPawnsAssigned < 1) {
      throw new Error(
        "There must be atleast 1 pawn designated to get the reward"
      );
    }
    return new Resources().amount;
  }

  triggerThreatEffect(game: any) {
    console.log("threat effect");
  }
}

type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

const initialThreatSlots: ThreatSlotsObj = {
  left: null,
  right: null,
};

export class Threat implements IThreat {
  private _threatSlots = new Map(
    Object.entries(initialThreatSlots) as Entries<ThreatSlotsObj>
  );

  private readonly _game: {};

  constructor(game: {}) {
    this._game = game;
  }

  get threatSlots(): ThreatSlotsMap {
    return this._threatSlots;
  }

  get leftSlot(): IEventCard | null {
    const left = this.threatSlots.get("left");
    if (left === undefined) {
      throw new Error("Left slot card is undefined");
    }
    return left;
  }

  get rightSlot(): IEventCard | null {
    const right = this.threatSlots.get("right");
    if (right === undefined) {
      throw new Error("Left slot card is undefined");
    }
    return right;
  }

  get game(): {} {
    return this._game;
  }

  getReward(side: "left" | "right", numOfPawns: number) {
    return this.getEventCardFromSlot(side).getReward(numOfPawns);
  }

  clearThreatSlot(side: "left" | "right") {
    this._threatSlots.set(side, null);
  }

  triggerThreatEffect(side: "left" | "right", game: {}) {
    this.getEventCardFromSlot(side).triggerThreatEffect(game);
  }

  getEventCardFromSlot(slot: "left" | "right") {
    const eventCard = this._threatSlots.get(slot);
    if (!eventCard) {
      throw new Error("There isn't card in slot: " + slot);
    }
    return eventCard;
  }

  moveCardsLeft() {
    const rightCard = this._threatSlots.get("right");
    if (rightCard === undefined) {
      throw new Error("rightCard is undefined for some reason");
    }
    this._threatSlots.set("left", rightCard);
    this._threatSlots.set("right", null);
  }
}
