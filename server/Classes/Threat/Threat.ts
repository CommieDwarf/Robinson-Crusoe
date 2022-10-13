import { IEventCard } from "../../../interfaces/Threat/EventCard";
import {
  EventAssignedCharacters,
  IThreat,
  IThreatRenderData,
  ThreatSpecialEffects,
} from "../../../interfaces/Threat/Threat";
import { ICharacter } from "../../../interfaces/Characters/Character";
import { IGame } from "../../../interfaces/Game";
import { getEventCards } from "../../constants/getEventCards";

interface ThreatSlots {
  left: null | IEventCard;
  right: null | IEventCard;
}

export class Threat implements IThreat {
  get specialEffects(): ThreatSpecialEffects {
    return this._specialEffects;
  }

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

  private readonly _game: IGame;
  private _threatSlots: ThreatSlots = {
    left: null,
    right: null,
  };

  private _assignedCharacters: EventAssignedCharacters = {
    left1: null,
    left2: null,
    right1: null,
    right2: null,
  };

  private _specialEffects: ThreatSpecialEffects = {
    argument: false,
  };

  constructor(game: IGame) {
    this._game = game;
    this._eventCards = getEventCards(game, this);
    this._threatSlots.right = getWreckageCard(game, this);
  }

  private setInitialCard(eventCards: IEventCard[]) {
    const wreckage = eventCards.shift();
    if (!wreckage) {
      throw new Error("eventCards are empty");
    }
    this._threatSlots.right = wreckage;
  }

  pullCard() {
    let card = this._eventCards.shift();
    if (!card) {
      throw new Error("There is no card to pull");
    }
    this._threatSlots.right = card;
    card.triggerEffect();
  }

  moveCardsLeft() {
    this.leftSlot?.triggerThreatEffect();
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

  setSpecialEffect(
    effect: keyof ThreatSpecialEffects,
    value: boolean,
    logSource: string
  ) {
    this._specialEffects[effect] = value;
    if (effect === "argument") {
      const color = value ? "red" : "green";
      const msg = value
        ? "przy zagrożeniu muszą być użyte pionki 2 innych postaci"
        : 'przy zagrożeniu nie muszą już być użyte pionki 2 innych postaci"';
      this._game.chatLog.addMessage(msg, color, logSource);
    }
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
      card.triggerThreatEffect();
      card.triggerEffect();
      card.fullFill(char);
    });
  }
}

import sleep from "../../../utils/sleep";
import {getWreckageCard} from "../../constants/getWreckageCard";
