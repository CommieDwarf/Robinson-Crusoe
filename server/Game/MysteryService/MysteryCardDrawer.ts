import {
    IMysteryCard,
    MYSTERY_CARD_TYPE,
} from "../../../interfaces/MysteryService/MysteryCard";
import {IMysteryService} from "../../../interfaces/MysteryService/MysteryService";
import {IMysteryCardDrawer} from "../../../interfaces/MysteryService/MysteryCardDrawer";
import {IPlayerCharacter} from "../../../interfaces/Characters/Character";

export class MysteryCardDrawer implements IMysteryCardDrawer {
    private _creature: number;
    private _trap: number;
    private _treasure: number;

    private _mysteryService: IMysteryService;
    private _cardsExcluded: IMysteryCard[] = [];
    private _canFinish: boolean = false;
    private _finished: boolean = false;
    private _max: number;
    private readonly _drawer: IPlayerCharacter;
    private _cardDrewCount: number = 0;

    constructor(
        mysteryService: IMysteryService,
        creature: number,
        trap: number,
        treasure: number,
        drawer: IPlayerCharacter,
        max: number
    ) {
        this._mysteryService = mysteryService;
        this._creature = creature;
        this._trap = trap;
        this._treasure = treasure;
        this._drawer = drawer;
        this._max = max
        console.log(max, "MAX")
    }

    get canFinish(): boolean {
        return this._canFinish;
    }

    get creature(): number {
        return this._creature;
    }

    get trap(): number {
        return this._trap;
    }

    get treasure(): number {
        return this._treasure;
    }

    get canDraw() {
        return (this._trap > 0 || this._creature > 0 || this._treasure > 0) && this._max > this._cardDrewCount;
    }

    get drawer(): IPlayerCharacter {
        return this._drawer;
    }

    get finished(): boolean {
        return this._finished;
    }

    private getCardTypes() {
        const types: MYSTERY_CARD_TYPE[] = [];

        if (this._creature > 0) {
            types.push(MYSTERY_CARD_TYPE.CREATURE);
        }
        if (this._trap > 0) {
            types.push(MYSTERY_CARD_TYPE.TRAP);
        }
        if (this._treasure > 0) {
            types.push(MYSTERY_CARD_TYPE.TREASURE);
        }
        return types;
    }

    private getMysteryCard(types: MYSTERY_CARD_TYPE[]) {
        let cardsExcluded = [];
        let found;
        do {
            let card = this._mysteryService.cardStack.pop();
            if (!card) {
                //TODO: unlikely scenario but i need to handle it in the future.
                throw new Error("there is no card in the stack");
            }
            // @ts-ignore
            if (types.some((type) => type === card.type)) {
                found = card;
            } else {
                cardsExcluded.push(card);
            }
        } while (!found);

        this._cardsExcluded = this._cardsExcluded.concat(cardsExcluded);
        return found;
    }

    public drawCard() {
        this._canFinish = true;
        const types = this.getCardTypes();
        const card = this.getMysteryCard(types);
        this.decrCardType(card.type);
        this._cardDrewCount ++;
        return card;
    }

    private decrCardType(type: MYSTERY_CARD_TYPE) {
        switch (type) {
            case MYSTERY_CARD_TYPE.CREATURE:
                this._creature--;
                break;
            case MYSTERY_CARD_TYPE.TRAP:
                this._trap--;
                break;
            case MYSTERY_CARD_TYPE.TREASURE:
                this._treasure--;
                break;
            default:
                throw new Error("wrong mystery card type: " + type);
        }
    }

    public finish() {
        if (this._canFinish) {
            this._mysteryService.shuffleBackIntoStack(this._cardsExcluded);
            this._finished = true;
        }
    }

  
}
