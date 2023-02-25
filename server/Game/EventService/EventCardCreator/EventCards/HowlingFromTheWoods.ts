import { EventCard } from "../EventCard";
import {
  EVENT_TYPE,
  IEventCard,
} from "../../../../../interfaces/EventService/EventCard";
import { IGame } from "../../../../../interfaces/Game";
import { BeastService } from "../../../BeastService/BeastService";
import { INVENTION_STARTER } from "../../../../../interfaces/InventionService/Invention";
import { EVENT_CARD } from "../../../../../interfaces/EventService/EVENT_CARD";

export class HowlingFromTheWoods extends EventCard implements IEventCard {
  protected readonly _namePL = "wycie od strony lasu";
  protected readonly _resolutionPL = "wyprawa";

  constructor(game: IGame) {
    super(
      EVENT_CARD.HOWLING_FROM_THE_WOODS,
      EVENT_TYPE.BOOK,
      {
        pawns: 1,
        invention: INVENTION_STARTER.FIRE,
        construction: null,
        resource: null,
      },
      game
    );
  }

  triggerEventEffect() {
    const beasts = this._game.beastService.getBeastsFromStack(3);
    const strongestBeast = BeastService.getStrongestBeast(beasts);
    if (strongestBeast) {
      this._game.beastService.addBeastToDeck(strongestBeast);
      this._game.chatLog.addMessage(
        "Najsilniejsza bestia z 3 pierwszych została wtasowana do talii wydarzeń",
        "red",
        this.name
      );
    }
  }

  triggerThreatEffect() {
    // TODO: fight beast from top of the deck.
  }

  fullFill() {
    const leader = this.getLeaderCharacter();
    this._game.characterService.incrDetermination(leader, 2, this.name);
    this._game.beastService.swapDeckTopToBottom();
    this._game.chatLog.addMessage(
      "Bestia została przeniesiona na dno talii",
      "green",
      this.name
    );
  }
}
