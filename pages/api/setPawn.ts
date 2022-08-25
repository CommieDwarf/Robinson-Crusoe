import { game } from "../../server/game";

import { fromJSON } from "flatted";

export default function setPawn(json: JSON) {
  const data = fromJSON(json);

  const destinationId = data.destinationId;
  const draggableId = data.draggableId;

  game.setPawn(destinationId, draggableId);
}
