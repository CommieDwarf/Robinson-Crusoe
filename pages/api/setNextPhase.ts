import { gameService } from "../../server/gameService";

export default function setNextPhase() {
  gameService.game.phaseService.goNextPhase();
}
