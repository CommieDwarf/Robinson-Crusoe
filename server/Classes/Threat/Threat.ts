import {IEventCard} from "../../../interfaces/Threat/EventCard";
import {
  EventAssignedCharacters,
  IThreat,
  IThreatRenderData,
  ThreatSpecialEffects,
} from "../../../interfaces/Threat/Threat";
import {EventCard} from "./EventCard";
import {ICharacter} from "../../../interfaces/Characters/Character";
import {IGame} from "../../../interfaces/Game";

interface ThreatSlots {
  left: null | IEventCard;
  right: null | IEventCard;
}

export class Threat implements IThreat {
  get assignedCharacters(): EventAssignedCharacters {
    return this._assignedCharacters;
  }

  private _threatSlots: ThreatSlots = {
    left: null,
    right: new EventCard("supplyCrates", 0, undefined),
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

  moveCardsLeft() {
    this.leftSlot?.effects.triggerThreatEffect();
    this.leftSlot = null;

    this.leftSlot = this.rightSlot;
    this.rightSlot = null;
  }

  private getSlotByCardName = (name: string) => {
    if (this.leftSlot?.name === name) {
      return "left";
    } else if (this.rightSlot?.name === name) {
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

  addCardToTopOfStack(card: unknown) {

  }

  shuffleCardInToStack(card: unknown) {

  }

  switchCardFromTopToBottomOfStack() {
    
  }

  assignCharacter(char: ICharacter, card: "left" | "right") {
  }
}
