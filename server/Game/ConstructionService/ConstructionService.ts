import {CONSTRUCTION, ConstructionCostType} from "../../../interfaces/ConstructionService/Construction";
import {
    IConstructionService,
    IConstructionServiceRenderData,
} from "../../../interfaces/ConstructionService/IConstructionService";
import {IGame} from "../../../interfaces/Game";
import {Construction} from "./Construction";
import i18n from "../../../I18n/I18n";
import {SingleResourceRequirement} from "../../../interfaces/ResourceCommitableItem/ResourceCommittableItem";

const constructionPL = {
    shelter: "schronienie",
    roof: "dach",
    palisade: "palisada",
    weapon: "broń",
};

export class ConstructionService implements IConstructionService {
    private readonly _constructions: Construction[];
    private readonly _game: IGame;

    constructor(game: IGame) {
        this._game = game;
        this._constructions = this.initConstructions();
    }

    get renderData(): IConstructionServiceRenderData {
        return {
            constructions: this._constructions.map(
                (construct) => construct.renderData
            ),
        };
    }

    get constructions(): Construction[] {
        return this._constructions;
    }

    private initConstructions() {
        return Object.entries(CONSTRUCTION).map(([key, value]) => {
            let resource: SingleResourceRequirement<ConstructionCostType>;
            let optionalResource: SingleResourceRequirement<ConstructionCostType> | null = null;
            if (value === CONSTRUCTION.WEAPON) {
                resource = {
                    type: "wood",
                    amount: 1
                }
            } else {
                resource = {
                    type: "wood",
                    amount: 2,
                }
                optionalResource = {
                    type: "leather",
                    amount: 1,
                }
            }
            return new Construction(
                value,
                constructionPL[value],
                value !== "shelter" && value !== "weapon",
                this._game,
                resource,
                optionalResource,
            );
        });
    }

    lvlUpConstruction(construction: CONSTRUCTION, by: number, logSource: string) {
        const construct = this.getConstruction(construction);
        if ((construction === CONSTRUCTION.ROOF
                || construction === CONSTRUCTION.PALISADE)
            && !this.isBuilt(CONSTRUCTION.SHELTER)
        ) {
            return;
        }
        construct.incrementLvl(by);
        this._game.chatLog.addMessage(
            `ulepszono ${i18n.t(`construction.${construct.name}`, {
                context: "accusative",
            })} do poziomu ${construct.lvl}-ego`,
            "green",
            logSource
        );
    }

    lvlDownConstruction(
        construction: CONSTRUCTION,
        by: number,
        logSource: string
    ) {
        const construct = this.getConstruction(construction);
        construct.decrementLvl(by);
        this._game.chatLog.addMessage(
            `Poziom ${i18n.t(`construction.${construct.name}`, {
                context: "genitive",
            })} spadł do poziomu ${construct.lvl}-ego`,
            "red",
            logSource
        );
    }

    lvlDownIfPossible(construction: CONSTRUCTION, by: number, logSource: string) {
        const construct = this.getConstruction(construction);
        const diff = construct.lvl - by;
        const oldLvl = construct.lvl;
        if (diff > 0) {
            construct.decrementLvl(by);
        } else {
            construct.decrementLvl(construct.lvl);
        }
        const newLvl = construct.lvl;
        if (newLvl !== oldLvl) {
            this._game.chatLog.addMessage(
                `Poziom ${i18n.t(`construction.${construct.name}`, {
                    context: "genitive",
                })} spadł do poziomu ${construct.lvl}-ego`,
                "red",
                logSource
            );
        }

    }

    lvlDownOrGetHurt(construction: CONSTRUCTION, by: number, logSource: string) {
        const construct = this.getConstruction(construction);
        const diff = construct.lvl - by;

        if (diff >= 0) {
            this.lvlDownConstruction(construction, by, logSource);
        } else {
            if (construct.lvl !== 0) {
                this.lvlDownConstruction(construction, construct.lvl, logSource);
            }
            this._game.characterService.hurtAllPlayerCharacters(by - construct.lvl, logSource);
        }
    }

    setLvl(construction: CONSTRUCTION, lvl: number) {
        this.getConstruction(construction).lvl = lvl;
        this.updateLocks()

    }

    public setDividedLvlByTwoRoundedDown(construction: CONSTRUCTION, logSource: string) {
        this.setDividedLvlByTwo(construction, logSource, Math.floor)
    }

    public setDividedLvlByTwoRoundedUp(construction: CONSTRUCTION, logSource: string) {
        this.setDividedLvlByTwo(construction, logSource, Math.ceil);
    }

    setDividedLvlByTwo(construction: CONSTRUCTION, logSource: string, roundFunction: (value: number) => number) {
        const construct = this.getConstruction(construction);
        const prevValue = construct.lvl;
        this.setLvl(construction, roundFunction(prevValue / 2))
        if (construct.lvl !== prevValue) {
            this._game.chatLog.addMessage(
                `Poziom ${i18n.t(`construction.${construct.name}`, {
                    context: "genitive",
                })} spadł do poziomu ${construct.lvl}-ego`,
                "red",
                logSource
            );
        }
    }


    unlockConstruction(construction: CONSTRUCTION) {
        this.getConstruction(construction).locked = false;
    }

    lockConstruction(construction: CONSTRUCTION) {
        this.getConstruction(construction).locked = true;
    }

    unlockAllConstructions() {
        this._constructions.forEach(
            (construction) => (construction.locked = false)
        );
    }

    updateLocks() {
        if (this.getConstruction(CONSTRUCTION.SHELTER).lvl > 0 || this._game.tileService.campTile.tileResourceService?.extras.naturalShelter) {
            this.unlockAllConstructions()
        } else {
            [CONSTRUCTION.PALISADE, CONSTRUCTION.ROOF].forEach((construction) => {
                this.lockConstruction(construction)
            })
        }
    }

    isBuilt(construction: CONSTRUCTION) {
        return this.getConstruction(construction).lvl > 0;
    }


    getConstruction(construction: CONSTRUCTION) {
        const construct = this._constructions.find(
            (constr) => constr.name === construction
        );
        if (!construct) {
            throw new Error(
                "Cant find structure with given construction: " + construction
            );
        }
        return construct;
    }

    public switchCommittedResources(construction: CONSTRUCTION) {
        this.getConstruction(construction).switchCommittedResourceType();
    }
}
