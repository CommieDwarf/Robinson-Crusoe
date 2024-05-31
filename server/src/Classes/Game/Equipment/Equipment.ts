import shuffle from "@shared/utils/shuffleArray";
import {IEquipment, IEquipmentRenderData,} from "@shared/types/Game/Equipment/Equipment";
import {IItem, ITEM} from "@shared/types/Game/Equipment/Item";
import {IGame} from "@shared/types/Game/Game";
import {ItemCreator} from "./ItemCreator/ItemCreator";
import {LOG_CODE} from "@shared/types/Game/ChatLog/LOG_CODE";
import {ICharacter} from "@shared/types/Game/Characters/Character";

export class Equipment implements IEquipment {
    get renderData(): IEquipmentRenderData {
        return {
            items: this.items.map((item) => item.renderData),
        };
    }

    private _stack = shuffle(Object.values(ITEM).filter(item => item !== ITEM.STORM_GLASS));

    items: IItem[];
    game: IGame;
    private _itemCreator;

    constructor(game: IGame) {
        this.game = game;
        this._itemCreator = new ItemCreator(game);
        this.items = this.getInitialItems(2);
    }

    getInitialItems(amount: number): IItem[] {
        const items = [];
        for (let i = 0; i < amount; i++) {
            items.push(this._itemCreator.create(this.popItem()))
        }

        return items;
    }

    private popItem(): ITEM {
        const item = this._stack.pop();
        if (!item) {
            throw new Error("No more items in stack!")
        }
        return item;
    }

    public addRandomItem(logSource: string) {
        const item = this._itemCreator.create(this.popItem());
        this.game.logService.addMessage({
            code: LOG_CODE.ITEM_GRANTED,
            amount: 1,
            subject1: item.name,
            subject2: ""
        }, "positive", logSource)

        this.items.push(item);
    }

    useItem(item: ITEM, character: ICharacter) {
        this.getItem(item).use(character);
        this.items = this.filterOutUsed(this.items);
    }

    hasUses(item: ITEM) {
        return this.getItem(item).hasUses;
    }

    getUses(item: ITEM) {
        return this.getItem(item).uses;
    }

    public hasItem(item: ITEM) {
        return Boolean(this.items.find((it) => item === it.name))
    }

    public getItem(item: ITEM) {
        const found = this.items.find((it) => {
            return it.name === item;
        });
        if (!found) {
            throw new Error("You don't have equipment item with such name: " + item);
        }
        return found;
    }

    public filterOutUsed(items: IItem[]): IItem[] {
        return items.filter((item) => item.hasUses)
    }
}
