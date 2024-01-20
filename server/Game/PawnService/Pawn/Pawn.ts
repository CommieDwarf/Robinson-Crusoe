import {IPlayerCharacter} from "../../../../interfaces/Characters/PlayerCharacter";
import {IPawn, IPawnRenderData} from "../../../../interfaces/Pawns/Pawn";
import {v4 as uuid} from "uuid";

export class Pawn implements IPawn {
    protected _draggableId: string;
    protected readonly _character: IPlayerCharacter;

    constructor(character: IPlayerCharacter) {
        this._character = character;
        this._draggableId = character.name + "-pawn-" + uuid();
    }

    get renderData(): IPawnRenderData {
        return this.getRenderData();
    }

    get draggableId(): string {
        return this._draggableId;
    }

    get character(): IPlayerCharacter {
        return this._character;
    }

    protected getRenderData(): IPawnRenderData {
        return {
            draggableId: this.draggableId,
            character: {
                id: this.character.id,
                name: this.character.name,
                namePL: this.character.namePL,
                gender: this.character.gender,
                skills: this.character.skills.map((skill) => skill.renderData),
                determination: this.character.determination,
            },
        };
    }


}
