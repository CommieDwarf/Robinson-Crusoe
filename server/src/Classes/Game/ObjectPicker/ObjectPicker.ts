import {IGame} from "@shared/types/Game/Game";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";
import {
    IObjectPicker,
    Pickable,
    PickableObject,
    PickableRenderData, PickSubject
} from "@shared/types/Game/ObjectPicker/ObjectPicker";


export class ObjectPicker<T extends PickableObject> implements IObjectPicker<T> {


    private readonly _game: IGame;
    private readonly _objects: Pickable<T>[];
    private readonly _picker: IPlayerCharacter;
    private readonly _pickEffect: (object: T) => any;
    private readonly _secondaryEffect: ((object: T) => any) | undefined;
    private readonly _amount: number;
    private readonly _pickSubject: PickSubject;
    private readonly _id;

    constructor(game: IGame,
                objects: T[],
                picker: IPlayerCharacter,
                amount: number,
                source: string,
                pickSubject: PickSubject,
                pickEffect: (object: T) => void,
                secondEffect?: (object: T) => void,
    ) {
        this._game = game;
        this._objects = objects.map((obj, i) => {
            return {
                id: i.toString(),
                object: obj
            }
        })
        this._picker = picker;
        this._pickEffect = pickEffect;
        this._secondaryEffect = secondEffect;
        this._amount = amount;
        this._source = source;
        this._pickSubject = pickSubject
        this._id = picker.name + source + amount + objects.length
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
                const renderData = typeof obj.object === "object" && "renderData" in obj.object ? obj.object.renderData : obj.object
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
            hasSecondEffect: this.hasSecondEffect()
        }
    }

    private readonly _source: string;


    public pick(id: string | string[], secondaryEffect: boolean): void {
        if (secondaryEffect && !this._secondaryEffect) {
            throw new Error(`This ObjPicker (id: ${this._id}) has no secondaryEffect assigned!`)
        }
        const effect = secondaryEffect ? this._secondaryEffect as typeof this._pickEffect : this._pickEffect;

        if (this._amount === 0) {
            // @ts-ignore
            effect(null as unknown as T);
            return;
        }

        if (typeof id === "string") {
            effect(this.getObject(id).object);
        } else {
            if (this._amount > id.length) {
                throw new Error(`Picked too many objects. (${id.length})`)
            }
            id.forEach((i) => effect(this.getObject(i).object));
        }
    }

    public hasSecondEffect() {
        return Boolean(this._secondaryEffect);
    }

    private getObject(id: string): Pickable<T> {
        const obj = this._objects.find((pickable) => pickable.id === id);
        if (!obj) {
            throw new Error("Can't find obj with id: " + id);
        }
        return obj;
    }
}
