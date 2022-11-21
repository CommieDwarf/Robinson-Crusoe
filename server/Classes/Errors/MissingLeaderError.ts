export class MissingLeaderError extends Error {
  private readonly _itemName: string;
  private readonly _itemType: string;

  constructor(message: string, itemName: string, itemType: string) {
    super(message);
    this.name = "MissingLeaderError";
    this._itemName = itemName;
    this._itemType = itemType;
  }

  get itemType(): string {
    return this._itemType;
  }

  get itemName(): string {
    return this._itemName;
  }
}
