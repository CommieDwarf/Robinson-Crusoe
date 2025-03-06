export interface ICreator<Creation, Type> {
	create: (name: Type) => Creation;
}
