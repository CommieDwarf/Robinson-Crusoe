import shuffle from "@shared/utils/shuffleArray";
import {
    IInvention,
    INVENTION,
    INVENTION_CASTAWAYS,
    INVENTION_NORMAL,
    INVENTION_PERSONAL,
    INVENTION_STARTER,
    INVENTION_TYPE,
} from "@shared/types/Game/InventionService/Invention";
import {IInventionService, IInventionServiceRenderData,} from "@shared/types/Game/InventionService/InventionService";
import {ITileService} from "@shared/types/Game/TileService/ITileService";
import {IGame} from "@shared/types/Game/Game";
import {InventionCreator} from "./InventionCreator/InventionCreator";
import {ICharacter} from "@shared/types/Game/Characters/Character";
import {LOG_CODE} from "@shared/types/Game/ChatLog/LOG_CODE";
import {IPlayer} from "@shared/types/Game/PlayerService/Player";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";

export class InventionsService implements IInventionService {
    private _builtInventions: IInvention[] = [];
    scenario: "castaways";
    private _inventions: IInvention[];
    private _tiles: ITileService;
    private readonly _game: IGame;
    fireplace: boolean = false;
    private _inventionStack: IInvention[] = [];


    constructor(scenario: "castaways", tiles: ITileService, game: IGame) {
        this._game = game;
        this.scenario = scenario;
        this._tiles = tiles;
        this._inventionStack = this.initStack();
        this._inventions = this.initInventions(scenario);
        this.updateLocks();
        this.sortInventions();
    }

    get renderData(): IInventionServiceRenderData {
        return {
            inventions: this.inventions.map((invention) => invention.renderData),
        };
    }

    get inventions(): IInvention[] {
        return this._inventions;
    }

    get builtInventions(): IInvention[] {
        return this._builtInventions;
    }

    isBuilt(invention: INVENTION) {
        return this.getInvention(invention).isBuilt;
    }

    public addInvention(invention: IInvention) {
        this._inventions.push(invention);
        this.updateLocks();
        this.sortInventions();
    }

    public pickInventionsFromStack(amount: number) {
        return this._inventionStack.slice(-amount);
    }

    public shuffleInventionStack() {
        this._inventionStack = shuffle(this._inventionStack);
    }


    private initInventions(scenarioName: "castaways") {
        const starters = Object.values(INVENTION_STARTER);
        const normal = this.popInventionsFromStack(5);
        const scenario = Object.values(INVENTION_CASTAWAYS);
        const creator = new InventionCreator(this._game);
        const personal = INVENTION_PERSONAL.FIREPLACE;

        return [...normal, ...[...starters, ...scenario, personal].map((invention) =>
            creator.create(invention)
        )];
    }

    private initStack(): IInvention[] {
        const creator = new InventionCreator(this._game);
        return shuffle(Object.values(INVENTION_NORMAL)).map((invention) => {
            return creator.create(invention);
        })
    }

    private popInventionsFromStack(amount: number) {
        let popped: (IInvention | undefined)[] = [];
        for (let i = 0; i < amount; i++) {
            popped.push(this._inventionStack.pop());
        }
        return popped.filter((obj) => obj !== undefined) as IInvention[];
    }

    build(name: INVENTION, builder: ICharacter) {
        const invention = this.getInvention(name);
        if (this._builtInventions.includes(invention)) {
            throw new Error("Invention is already has been built " + invention.name);
        }
        if (name !== INVENTION_CASTAWAYS.MAST) {
            this._builtInventions.push(invention);
            invention.isBuilt = true;
        }

        this._game.logService.addMessage({
            code: LOG_CODE.INVENTION_BUILT,
            subject1: invention.name,
            subject2: "",
            amount: 1,
        }, "positive", builder.name)


        invention.onBuild();
        this.updateLocks();
        this.sortInventions();
    }

    destroy(name: INVENTION) {
        const invention = this.getInvention(name);
        if (!this._builtInventions.includes(invention)) {
            throw new Error("There is no such invention built: " + invention.name);
        }

        this._builtInventions = this._builtInventions.filter((inv) => {
            return inv.name !== invention.name;
        });
        invention.isBuilt = false;
    }

    updateLocks() {
        this._inventions.forEach((invention) => {
            invention.locked = !(
                this.isInvRequirementMet(invention) &&
                this.isTileTypeRequirementMet(invention)
            );
        });
    }

    public useInvention(name: INVENTION, character: IPlayerCharacter): void {
        this.getInvention(name).use(character);
    }

    private isInvRequirementMet(invention: IInvention) {
        if (!invention.requirements || !invention.requirements.inventions) {
            return true;
        }
        let flag = true;
        invention.requirements.inventions.forEach((req) => {
            if (!this._builtInventions.some((inv) => inv.name === req)) {
                flag = false;
            }
        });
        return flag;
    }


    private isTileTypeRequirementMet(invention: IInvention) {
        if (!invention.requirements || !invention.requirements.terrainType) {
            return true;
        }

        return this._tiles.exploredTerrainTypes.has(
            invention.requirements.terrainType
        );
    }

    public resetCardPawns() {
        this._builtInventions.forEach((card) => card.pawnService?.resetFreePawns());
    }


    getInvention(name: INVENTION): IInvention {
        let invention = this._inventions.find((inv) => inv.name === name);
        if (!invention) {
            invention = this._inventionStack.find((inv) => inv.name === name);
        }
        if (!invention) {
            throw new Error("Can find invention with specific name: " + name);
        }
        return invention;
    }

    public onMapExplore() {
        this.updateLocks();
        this.sortInventions();
    }


    private sortInventions() {
        this._inventions = this._inventions.sort((a, b) => {
            return this.getSortWeight(b) - this.getSortWeight(a);
        });
    }

    private getSortWeight(invention: IInvention) {
        let sum = 0;
        if (invention.isBuilt) sum += 10;
        if (!invention.locked) sum += 5;
        if (invention.inventionType === INVENTION_TYPE.STARTER) sum += 2;
        if (invention.inventionType === INVENTION_TYPE.NORMAL) sum += 1;
        return sum;
    }
}
