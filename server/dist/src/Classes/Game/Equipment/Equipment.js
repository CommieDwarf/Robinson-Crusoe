"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Equipment = void 0;
const shuffleArray_1 = __importDefault(require("../../../shared/utils/shuffleArray"));
const Item_1 = require("../../../shared/types/Game/Equipment/Item");
const ItemCreator_1 = require("./ItemCreator/ItemCreator");
const LOG_CODE_1 = require("../../../shared/types/Game/ChatLog/LOG_CODE");
class Equipment {
    get renderData() {
        return {
            items: this.items.map((item) => item.renderData),
        };
    }
    constructor(game) {
        this.game = game;
        this._itemCreator = new ItemCreator_1.ItemCreator(game);
        this._stack = (0, shuffleArray_1.default)(Object.values(Item_1.ITEM).filter(item => item !== Item_1.ITEM.STORM_GLASS), game.getRandomNumber);
        this.items = this.getInitialItems(2);
    }
    getInitialItems(amount) {
        const items = [];
        for (let i = 0; i < amount; i++) {
            items.push(this._itemCreator.create(this.popItem()));
        }
        return items;
    }
    popItem() {
        const item = this._stack.pop();
        if (!item) {
            throw new Error("No more items in stack!");
        }
        return item;
    }
    addRandomItem(logSource) {
        const item = this._itemCreator.create(this.popItem());
        this.game.logService.addMessage({
            code: LOG_CODE_1.LOG_CODE.ITEM_GRANTED,
            amount: 1,
            subject1: item.name,
            subject2: ""
        }, "positive", logSource);
        this.items.push(item);
    }
    useItem(item, character) {
        this.getItem(item).use(character);
        this.items = this.filterOutUsed(this.items);
    }
    hasUses(item) {
        return this.getItem(item).hasUses;
    }
    getUses(item) {
        return this.getItem(item).uses;
    }
    hasItem(item) {
        return Boolean(this.items.find((it) => item === it.name));
    }
    getItem(item) {
        const found = this.items.find((it) => {
            return it.name === item;
        });
        if (!found) {
            throw new Error("You don't have equipment item with such scenario: " + item);
        }
        return found;
    }
    filterOutUsed(items) {
        return items.filter((item) => item.hasUses);
    }
}
exports.Equipment = Equipment;
//# sourceMappingURL=Equipment.js.map