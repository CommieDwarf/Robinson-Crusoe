import { MissingPawnError } from "../../../interfaces/Error/MissingPawnError";

export class MissingLeaderError extends Error implements MissingPawnError {
  private readonly _droppableID: string;

  constructor(droppableID: string) {
    super();
    this._droppableID = droppableID;
  }

  get droppableID() {
    return this._droppableID;
  }
}
