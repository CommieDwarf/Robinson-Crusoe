import { game } from "../../server/game";

export interface UnsetPawnData {
  destinationId: string;
  draggableId: string;
}

export default function unsetPawn(data: string) {
  const dataObj = JSON.parse(data) as UnsetPawnData;

  game.unsetPawn(dataObj.destinationId, dataObj.draggableId);
}
