import { game } from "../../server/game";

export default function nextPhase() {
  game.phaseService.goNextPhase();
}
