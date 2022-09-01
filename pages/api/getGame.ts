// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { game } from "../../server/game";

import { parse, stringify, toJSON, fromJSON } from "flatted";

export default function getGameData() {
  return JSON.stringify(game.renderData);
}
