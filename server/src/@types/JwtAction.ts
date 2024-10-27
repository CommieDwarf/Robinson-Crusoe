

export enum JWT_ACTION {
    ACTIVATION = "activation",
    PASSWORD_RESET = "password reset",
}


export interface JwtTokenContents {
    userId: string,
    action: JWT_ACTION
}