import shuffle from "../../../utils/shuffleArray";
import {
    IInvention,
    INVENTION,
    INVENTION_CASTAWAYS,
    INVENTION_NORMAL,
    INVENTION_PERSONAL,
    INVENTION_STARTER,
} from "../../../interfaces/InventionService/Invention";
import {
    IInventionService,
    IInventionServiceRenderData,
} from "../../../interfaces/InventionService/InventionService";
import {ITileService} from "../../../interfaces/TileService/ITileService";
import {ICharacter} from "../../../interfaces/Characters/Character";
import {IGame} from "../../../interfaces/Game";
import {InventionCreator} from "./InventionCreator/InventionCreator";
import capitalizeFirstLetter from "../../../utils/capitalizeFirstLetter";

export class InventionsService implements IInventionService {
    private _builtInventions: IInvention[] = [];
    // TODO: fixed for the demo
    scenario: "castaways";
    private readonly _inventions: IInvention[];
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

    private getInitialInventions(scenario: "castaways") {
        const starters = Object.values(INVENTION_STARTER);
        const normal = shuffle(Object.values(INVENTION_NORMAL)).slice(0, 5);
        const scenarioInv = Object.values(INVENTION_CASTAWAYS);
        const creator = new InventionCreator(this._game);
        const personal = INVENTION_PERSONAL.FIREPLACE;

        return [...starters, ...normal, ...scenarioInv, personal].map((invention) =>
            creator.create(invention)
        );
    }

    build(name: INVENTION, builder: ICharacter) {
        const invention = this.getInvention(name);
        if (this._builtInventions.includes(invention)) {
            throw new Error("Invention is already has been built " + invention.name);
        }

        this._builtInventions.push(invention);
        invention.isBuilt = true;
        this._game.chatLog.addMessage(
            `stworzono: ${capitalizeFirstLetter(invention.namePL)}`,
            "green",
            builder.namePL
        );
        this.updateLocks();
        this.sortInventionsByBuilt();
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

        return this._tiles.terrainTypesExplored.has(
            invention.requirements.terrainType
        );
    }

    getInvention(name: string): IInvention {
        const invention = this._inventions.find((inv) => inv.name === name);

        if (!invention) {
            throw new Error("Can find invention with specific name: " + name);
        }
        return invention;
    }

    sortInventionsByBuilt() {
        this._inventions.sort((a) => {
            if (a.isBuilt) {
                return -1;
            } else {
                return 1;
            }
        });
    }
}
