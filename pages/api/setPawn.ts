import {game} from "../../server/game";

export interface SetPawnData {
  destinationId: string;
  draggableId: string;
}

export default function setPawn(data: string) {
  const dataObj = JSON.parse(data) as SetPawnData;


  game.setPawn(dataObj.destinationId, dataObj.draggableId);
}
