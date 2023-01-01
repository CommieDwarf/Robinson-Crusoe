import {
  IInvention,
  IInventionRenderData,
  INVENTION,
  INVENTION_TYPE,
  InventionRequirements,
} from "../../../../interfaces/InventionService/Invention";
import {
  CHARACTER,
  ICharacter,
} from "../../../../interfaces/Characters/Character";
import { IResources } from "../../../../interfaces/Resources/Resources";
import { Resources } from "../../ResourceService/Resources";
import { IGame } from "../../../../interfaces/Game";

export class Invention implements IInvention {
  protected readonly _name: INVENTION;
  protected _locked = true;
  protected readonly _requirements: InventionRequirements;
  protected readonly _resourceChoice: boolean = false;
  //temporary fixed value
  protected _requiredHelpersModifier = 0;
  protected readonly _type: INVENTION_TYPE;
  protected _committedResources: IResources = new Resources();
  protected _built = false;
  protected _cost: IResources | null;
  protected readonly _belongsTo: CHARACTER | null = null;
  protected readonly _game: IGame;
  protected readonly _usable: boolean = false;
  protected _used: boolean = false;

  constructor(
    name: INVENTION,
    requirements: InventionRequirements,
    type: INVENTION_TYPE,
    cost: IResources | null,
    game: IGame
  ) {
    this._name = name;
    this._requirements = requirements;
    this._type = type;
    this._cost = cost;
    this._game = game;
  }

  get renderData(): IInventionRenderData {
    return {
      name: this.name,
      locked: this.locked,
      requiredHelpersModifier: this.requiredHelpersModifier,
      type: this.type,
      committedResources: this._committedResources.renderData,
      isBuilt: this.isBuilt,
      requiredHelpersAmount: this.requiredHelpersAmount,
    };
  }

  get requiredHelpersAmount() {
    //TODO: implement
    return 0;
  }

  get resourceChoice(): boolean {
    return this._resourceChoice;
  }

  get belongsTo(): CHARACTER | null {
    return this._belongsTo;
  }

  get cost(): IResources | null {
    return this._cost;
  }

  set cost(value: IResources | null) {
    this._cost = value;
  }

  get isBuilt(): boolean {
    return this._built;
  }

  set isBuilt(value: boolean) {
    this._built = value;
  }

  get name(): INVENTION {
    return this._name;
  }

  get locked(): boolean {
    return this._locked;
  }

  set locked(value: boolean) {
    this._locked = value;
  }

  get usable(): boolean {
    return this._usable;
  }

  get used(): boolean {
    return this._used;
  }

  set used(value: boolean) {
    this._used = value;
  }

  get requiredHelpersModifier(): number {
    return this._requiredHelpersModifier;
  }

  set requiredHelpersModifier(value: number) {
    this._requiredHelpersModifier = value;
  }

  get type(): INVENTION_TYPE {
    return this._type;
  }

  get committedResources(): IResources {
    return this._committedResources;
  }

  set committedResources(resources: IResources) {
    this._committedResources = resources;
  }

  get requirements(): InventionRequirements {
    return this._requirements;
  }

  protected getLeader(): ICharacter {
    const leader = this._game.actionSlotService.getPawn(
      "invention-" + this.name + "-leader-0"
    )?.character;
    if (!leader) {
      throw new Error("Couldn't find leader.");
    }
    return leader;
  }

  public onBuild() {
    return;
  }

  public onDestruction() {
    return;
  }

  public onNextRound() {
    return;
  }

  public use(character: ICharacter) {
    return;
  }
}
