export enum CONFIRM_WINDOW {
    GO_ACTION_PHASE = "GO_ACTION_PHASE",
}

type msg = { [key in keyof typeof CONFIRM_WINDOW]: string }

export const confirmWindowMessages: msg = {
    [CONFIRM_WINDOW.GO_ACTION_PHASE]: "Nie przydziedziłeś wszystkich pionków. Czy na pewno chcesz kontynuować do fazy akcji?"
}
// Case: not all pawns are assigned; player attempts to go to action Phase.

