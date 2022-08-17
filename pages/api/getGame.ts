// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { game } from "../../server/game";
import _ from "lodash";

import { parse, stringify, toJSON, fromJSON } from "flatted";
import { IGame } from "../../interfaces/Game";

// export async function getGame() {
//   return JSON.stringify(circObj, replacerFunc());
// }
