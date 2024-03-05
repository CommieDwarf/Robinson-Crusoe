export interface PawnOwner<RenderData> {
    getRenderData: () => Omit<RenderData, "pawnService">;
}
