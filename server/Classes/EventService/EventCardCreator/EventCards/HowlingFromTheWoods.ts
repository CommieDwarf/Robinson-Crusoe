import { EventCard } from "../EventCard";
import {
  EVENT_TYPE,
  IEventCard,
} from "../../../../../interfaces/EventService/EventCard";
import { IGame } from "../../../../../interfaces/Game";
import { BeastService } from "../../../BeastService/BeastService";
import { INVENTION_STARTER } from "../../../../../interfaces/InventionService/Invention";

export class HowlingFromTheWoods extends EventCard implements IEventCard {
  constructor(game: IGame) {
    super(
      "howling from the woods",
      EVENT_TYPE.BOOK,
      {
        pawns: 1,
        invention: INVENTION_STARTER.FIRE,
        construction: null,
        resource: {
          wood: 1,
          leather: 1,
          food: 0,
          dryFood: 0,
        },
      },
      game
    );
  }

  triggerEffect() {
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
    const leader = this.getLeaderPawn().character;
    this._game.characterService.incrDetermination(leader, 2, this.name);
    this._game.beastService.swapDeckTopToBottom();
    this._game.chatLog.addMessage(
      "Bestia została przeniesiona na dno talii",
      "green",
      this.name
    );
  }
}
