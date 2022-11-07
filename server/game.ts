import { GameClass } from "./Classes/Game";
import { Pawn } from "./Classes/PawnService/Pawn";

export const game = new GameClass("castaways");

game.structuresService.unlockAllStructs();
game.inventionsService.inventions.forEach((inv) => (inv.locked = false));
