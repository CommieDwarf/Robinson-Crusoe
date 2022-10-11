import { IEventCard } from "../../../interfaces/Threat/EventCard";
import {
  EventAssignedCharacters,
  IThreat,
  IThreatRenderData,
  ThreatSpecialEffects,
} from "../../../interfaces/Threat/Threat";
import { EventCard } from "./EventCard";
import { ICharacter } from "../../../interfaces/Characters/Character";
import { IGame } from "../../../interfaces/Game";
import { getEventCards } from "../../constants/eventCards";

interface ThreatSlots {
  left: null | IEventCard;
  right: null | IEventCard;
}

export class Threat implements IThreat {
  get assignedCharacters(): EventAssignedCharacters {
    return this._assignedCharacters;
  }

  set leftSlot(card: IEventCard | null) {
    this._threatSlots.left = card;
  }

  set rightSlot(card: IEventCard | null) {
    this._threatSlots.right = card;
  }

  get leftSlot() {
    return this._threatSlots.left;
  }

  get rightSlot() {
    return this._threatSlots.right;
  }

  get renderData(): IThreatRenderData {
    const leftSlot = this.leftSlot ? this.leftSlot.renderData : null;
    const rightSlot = this.rightSlot ? this.rightSlot.renderData : null;
    return {
      leftSlot,
      rightSlot,
    };
  }

  private _eventCards: IEventCard[];

  private _threatSlots: ThreatSlots = {
    left: null,
    right: null,
  };
  private readonly _game: IGame;

  private _assignedCharacters: EventAssignedCharacters = {
    left1: null,
    left2: null,
    right1: null,
    right2: null,
  };

  specialEffects: ThreatSpecialEffects = {
    argument: false,
  };

  constructor(game: IGame) {
    this._game = game;
    this._eventCards = getEventCards(game, this);
    // this.testEventCards(game);
  }

  pullCard() {
    let card = this._eventCards.pop();
    if (!card) {
      throw new Error("There is no card to pull");
    }
    this._threatSlots.right = card;

    card.effects.triggerEffect();
  }

  moveCardsLeft() {
    // this.leftSlot?.effects.triggerThreatEffect();
    this.leftSlot = null;

    this.leftSlot = this.rightSlot;
    this.rightSlot = null;
  }

  private getSlotByCardName = (name: string) => {
    if (this._threatSlots.left?.name === name) {
      return "left";
    } else if (this._threatSlots.right?.name === name) {
      return "right";
    } else {
      throw new Error("there is no " + name + " card in threat slots");
    }
  };

  getAssignedCharByCardName = (name: string) => {
    const slot = this.getSlotByCardName(name);
    const char =
      this.assignedCharacters[(slot + "1") as keyof EventAssignedCharacters];
    if (!char) {
      throw new Error("Cant find character in slot: " + slot + "1");
    }
    return char;
  };

  addCardToTopOfStack(card: unknown) {}

  shuffleCardInToStack(card: unknown) {}

  switchCardFromTopToBottomOfStack() {}

  assignCharacter(char: ICharacter, card: "left" | "right", slot: number) {
    if (slot > 2) {
      throw new Error("max slot number is 2 - tried to assign: " + slot);
    }

    // @ts-ignore
    this.assignedCharacters[card + slot] = char;
  }

  public async testEventCards(game: IGame) {
    await sleep(2000);
    this._eventCards.forEach((event, i) => {
      console.log(event.name, event.namePL);
    });

    console.log(this._eventCards.length, "length");

    const char = game.allCharacters.getCharacter("cook");

    this._eventCards.forEach((card) => {
      this._threatSlots.left = card;
      card.effects.triggerThreatEffect();
      card.effects.triggerEffect();
      card.effects.fullFill(char);
    });
  }
}

import sleep from "../../../utils/sleep";
