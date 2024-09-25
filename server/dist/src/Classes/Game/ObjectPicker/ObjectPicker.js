"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectPicker = void 0;
class ObjectPicker {
    constructor(game, objects, picker, amount, source, pickSubject, pickEffect, secondEffect) {
        this._game = game;
        this._objects = objects.map((obj, i) => {
            return {
                id: i.toString(),
                object: obj
            };
        });
        this._picker = picker;
        this._pickEffect = pickEffect;
        this._secondaryEffect = secondEffect;
        this._amount = amount;
        this._source = source;
        this._pickSubject = pickSubject;
        this._id = picker.name + source + amount + objects.length;
    }
    get id() {
        return this._id;
    }
    get source() {
        return this._source;
    }
    get objects() {
        return this._objects;
    }
    get picker() {
        return this._picker;
    }
    get amount() {
        return this._amount;
    }
    get pickSubject() {
        return this._pickSubject;
    }
    get renderData() {
        return {
            objects: this._objects.map((obj) => {
                const renderData = typeof obj.object === "object" && "renderData" in obj.object ? obj.object.renderData : obj.object;
                return {
                    object: renderData,
                    id: obj.id
                };
            }),
            picker: this._picker.renderData,
            amount: this._amount,
            pickSubject: this.pickSubject,
            source: this._source,
            id: this._id,
            hasSecondEffect: this.hasSecondEffect()
        };
    }
    pick(id, secondaryEffect) {
        if (secondaryEffect && !this._secondaryEffect) {
            throw new Error(`This ObjPicker (id: ${this._id}) has no secondaryEffect assigned!`);
        }
        const effect = secondaryEffect ? this._secondaryEffect : this._pickEffect;
        if (this._amount === 0) {
            // @ts-ignore
            effect(null);
            return;
        }
        if (typeof id === "string") {
            effect(this.getObject(id).object);
        }
        else {
            if (this._amount > id.length) {
                throw new Error(`Picked too many objects. (${id.length})`);
            }
            id.forEach((i) => effect(this.getObject(i).object));
        }
    }
    hasSecondEffect() {
        return Boolean(this._secondaryEffect);
    }
    getObject(id) {
        const obj = this._objects.find((pickable) => pickable.id === id);
        if (!obj) {
            throw new Error("Can't find obj with id: " + id);
        }
        return obj;
    }
}
exports.ObjectPicker = ObjectPicker;
//# sourceMappingURL=ObjectPicker.js.map