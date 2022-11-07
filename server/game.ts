import { GameClass } from "./Classes/Game";

export const game = new GameClass("castaways");

game.structuresService.unlockAllStructs();
game.inventionsService.inventions.forEach((inv) => (inv.locked = false));
game.beasts.moveBeastFromStackToDeck();
