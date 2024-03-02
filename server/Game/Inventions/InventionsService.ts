import shuffle from "../../../utils/shuffleArray";
import {
    IInvention,
    INVENTION,
    INVENTION_CASTAWAYS,
    INVENTION_NORMAL,
    INVENTION_PERSONAL,
    INVENTION_STARTER,
    INVENTION_TYPE,
} from "../../../interfaces/InventionService/Invention";
import {IInventionService, IInventionServiceRenderData,} from "../../../interfaces/InventionService/InventionService";
import {ITileService} from "../../../interfaces/TileService/ITileService";
import {IGame} from "../../../interfaces/Game";
import {InventionCreator} from "./InventionCreator/InventionCreator";
import capitalizeFirstLetter from "../../../utils/capitalizeFirstLetter";
import {ICharacter} from "../../../interfaces/Characters/Character";

export class InventionsService implements IInventionService {
    private _builtInventions: IInvention[] = [];
    scenario: "castaways";
    private _inventions: IInvention[];
    private _tiles: ITileService;
    private readonly _game: IGame;
    fireplace: boolean = false;

    constructor(scenario: "castaways", tiles: ITileService, game: IGame) {
        this._game = game;
        this.scenario = scenario;
        this._tiles = tiles;
        this._inventions = this.getInitialInventions(scenario);
        this.updateLocks();
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

    private getInitialInventions(scenarioName: "castaways") {
        const starters = Object.values(INVENTION_STARTER);
        const normal = shuffle(Object.values(INVENTION_NORMAL))
        const scenario = Object.values(INVENTION_CASTAWAYS);
        const creator = new InventionCreator(this._game);
        const personal = INVENTION_PERSONAL.FIREPLACE;

        return [...starters, ...normal, ...scenario, personal].map((invention) =>
            creator.create(invention)
        );
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
        this._game.chatLog.addMessage(
            `stworzono: ${capitalizeFirstLetter(invention.namePL)}`,
            "green",
            builder.namePL
        );
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
            if (invention.name === INVENTION_CASTAWAYS.AXE) {
            }
            invention.locked = !(
                this.isInvRequirementMet(invention) &&
                this.isTileTypeRequirementMet(invention) &&
                this.isResourceCostMet(invention)
            );
        });
        this.sortInventions();
    }

    public useInvention(name: string): void {
        const char = this._game.localPlayer.getCharacter();
        this.getInvention(name).use(char);
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

    private isResourceCostMet(invention: IInvention): boolean {
        if (!invention.resourceCost?.type) {
            return true;
        }
        return this._game.resourceService.canAffordResource(
            invention.resourceCost.type,
            invention.resourceCost.amount
        )
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


    getInvention(name: string): IInvention {
        const invention = this._inventions.find((inv) => inv.name === name);
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
        if (invention.isBuilt) sum += 6;
        if (!invention.locked) sum += 3;
        if (invention.inventionType === INVENTION_TYPE.STARTER) sum += 2;
        if (invention.inventionType === INVENTION_TYPE.PERSONAL) sum -= 1;
        return sum;
    }
}
