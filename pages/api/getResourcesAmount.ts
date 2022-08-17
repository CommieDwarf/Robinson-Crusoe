import { game } from "../../server/game";

import { parse, stringify, toJSON, fromJSON } from "flatted";

export function getResourcesAmount() {
  const resourcesAmount = {
    owned: Object.fromEntries(game.allResources.owned.amount),
    future: Object.fromEntries(game.allResources.future.amount),
  };
  return toJSON(resourcesAmount);
}