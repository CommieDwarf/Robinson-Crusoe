import {IGame} from "@shared/types/Game/Game";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";
import {uuid} from "uuidv4";
import {
    IObjectPicker,
    Pickable,
    PickableObject,
    PickableRenderData, PickSubject
} from "@shared/types/Game/ObjectPicker/ObjectPicker";
import {Beast} from "../BeastService/BeastCreator/Beast";
import {Invention} from "../Inventions/InventionCreator/Invention";
import {Item} from "../Equipment/ItemCreator/Item";
import {Token} from "../TokenService/Tokens/Token/Token";
import {Character} from "../CharacterService/Characters/Character/Character";


export class ObjectPicker<T extends PickableObject> implements IObjectPicker<T> {


    private readonly _game: IGame;
    private readonly _objects: Pickable<T>[];
    private readonly _picker: IPlayerCharacter;
    private readonly _pickEffect: (object: T) => any;
    private readonly _amount: number;
    private readonly _pickSubject: PickSubject;
    private readonly _id = uuid();

    constructor(game: IGame,
                objects: T[],
                picker: IPlayerCharacter,
                amount: number,
                source: string,
                pickSubject: PickSubject,
                pickEffect: (object: T) => void,
    ) {
        this._game = game;
        this._objects = objects.map((obj) => {
            return {
                id: uuid(),
                object: obj
            }
        })
        this._picker = picker;
        this._pickEffect = pickEffect;
        this._amount = amount;
        this._source = source;
        this._pickSubject = pickSubject
    }

    get id(): string {
        return this._id;
    }

    get source(): string {
        return this._source;
    }

    get objects(): Pickable<T>[] {
        return this._objects;
    }

    get picker(): IPlayerCharacter {
        return this._picker;
    }

    get amount(): number {
        return this._amount;
    }

    get pickSubject(): PickSubject {
        return this._pickSubject;
    }

    get renderData() {
        return {
            objects: this._objects.map((obj) => {
                const renderData = "renderData" in obj.object ? obj.object.renderData : obj.object
                return {
                    object: renderData,
                    id: obj.id
                }
            }) as PickableRenderData<T>[],
            picker: this._picker.renderData,
            amount: this._amount,
            pickSubject: this.pickSubject,
            source: this._source,
            id: this._id,
        }
    }

    private readonly _source: string;


    public pick(id: string | string[]): void {
        if (typeof id === "string") {
            this._pickEffect(this.getObject(id).object);
        } else {
            if (this._amount > id.length) {
                throw new Error(`Picked too many objects. (${id.length})`)
            }
            id.forEach((i) => this._pickEffect(this.getObject(i).object));
        }
    }

    private getObject(id: string): Pickable<T> {
        const obj = this._objects.find((pickable) => pickable.id === id);
        if (!obj) {
            throw new Error("Can't find obj with id: " + id);
        }
        return obj;
    }
}
