import {IGame} from "@shared/types/Game/Game";
import {IMoraleService} from "@shared/types/Game/Morale/Morale";
import {INVENTION_NORMAL} from "@shared/types/Game/InventionService/Invention";
import {LOG_CODE} from "@shared/types/Game/ChatLog/LOG_CODE";
import {TERMS} from "@shared/types/Terms/TERMS";

export class MoraleService implements IMoraleService {
    private _lvl = 0;
    private _maxLvl = 3;
    private readonly _minLvl = -3;

    private readonly _game: IGame;
    private _diary: boolean = false;
    private _drums: boolean = false;


    constructor(game: IGame) {
        this._game = game;
    }

    get renderData() {
        return {
            lvl: this._lvl,
        };
    }

    get lvl(): number {
        return this._lvl;
    }

    get diary(): boolean {
        return this._diary;
    }

    set diary(value: boolean) {
        this._diary = value;
    }

    get drums(): boolean {
        return this._drums;
    }

    set drums(value: boolean) {
        this._drums = value;
    }

    lvlUp(amount: number, logSource: string) {
        if (this._lvl < 3) {
            this._lvl += amount;
            this._game.logService.addMessage({
                code: LOG_CODE.MORALE_INCREASED_TO_LVL,
                amount: this._lvl,
                subject1: "",
                subject2: ""
            }, "positive", logSource)

        }
    }

    lvlDown(amount: number, logSource: string) {


        this._game.logService.addMessage({
            code: LOG_CODE.MORALE_DECREASED_TO_LVL,
            amount,
            subject1: "",
            subject2: ""
        }, "negative", logSource)


        const newLvl = this._lvl - amount;
        if (newLvl > this._minLvl) {
            this._lvl = newLvl;
        } else {
            this._lvl = this._minLvl;
            const deficit = Math.abs(newLvl) + this._minLvl;
            this._game.characterService.hurtAllPlayerCharacters(deficit, TERMS.UNFULFILLED_DEMAND)
        }
    }


    public prePhaseEffect() {
        const playerService = this._game.playerService;
        if (playerService.players.length === 1) {
            this.lvlUp(1, "Cieszysz się, że żyjesz");
        }
    }

    public triggerPhaseEffect() {
        const primeCharacter = this._game.playerService.primePlayer.getCharacter();
        let amount = this._lvl;
        if (this._game.inventionService.isBuilt(INVENTION_NORMAL.DIARY)) {
            amount++;
        }
        if (this._game.inventionService.isBuilt(INVENTION_NORMAL.DRUMS)) {
            amount += 2;
        }
        if (amount === 0) {
            return;
        }
        if (amount > 0) {
            this._game.characterService.incrDetermination(primeCharacter, amount, "Morale")
        } else {
            this._game.characterService.decrDeterminationOrGetHurt(primeCharacter, Math.abs(amount), "Morale");
        }
    }
}
