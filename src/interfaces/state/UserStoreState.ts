type Tokens = {
    accessToken: string,
    refreshToken: string
}

type UserInfo = {
    sub: string,
    roles: string[],
    name: string,
    phoneNumber: string,
    dateOfBirth: string,
    email: string
}

interface UserStoreState {
    tokens?: Tokens
    isAuthenticated: boolean
}

export type { UserStoreState, Tokens, UserInfo }
