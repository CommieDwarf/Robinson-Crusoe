export interface IResourceModifier {
	resource: "food" | "wood";
	causedBy: string;
	modifier: number;
}
