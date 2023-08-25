import { gameService } from "../../server/gameService";

export default function resolveEventMystery(
) { 
  gameService.game.eventService.resolveEventMystery();
}
