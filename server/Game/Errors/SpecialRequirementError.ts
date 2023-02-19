export class SpecialRequirementError extends Error {
  private readonly _name: string;

  constructor(name: string, message: string) {
    super(message);
    this._name = name;
  }

  get name(): string {
    return this._name;
  }
}
