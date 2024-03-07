export interface PawnOwner<RenderData> {
    getPawnOwnerRenderData: () => Omit<RenderData, "pawnService">;
}
