import {MissingPawnError} from "../../types/Error/MissingPawnError";

export class MissingHelperError extends Error implements MissingPawnError {
    private readonly _droppableID: string;

    constructor(droppableID: string) {
        super("Assigned helpers to this action aren't enough");
        this._droppableID = droppableID;
    }

    get droppableID() {
        return this._droppableID;
    }
}
