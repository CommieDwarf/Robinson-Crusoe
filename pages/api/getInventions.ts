import { game } from "../../server/game";

import { parse, stringify, toJSON, fromJSON } from "flatted";

export function getInventions() {
  return toJSON(game.inventions);
}