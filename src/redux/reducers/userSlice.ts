import PasswordAuthenticationRequest from '../interfaces/PasswordAuthenticationRequest'
import { authorizationServerAddress, client_id } from '../../constants/authConstants'
import RefreshTokenAuthenticationRequest from '../interfaces/RefreshTokenAuthenticationRequest'
import UserInfoRequest from '../interfaces/UserInfoRequest'
import { Tokens, UserInfo, UserStoreState } from '../../interfaces/state/UserStoreState'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import baseQueryWithRefreshToken from '../interfaces/baseQueryWithRefreshToken'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export const createPasswordAuthenticationRequest = (request: PasswordAuthenticationRequest) => ({
    grant_type: 'password',
    client_id,
    ...request,
})

export const createRefreshTokenAuthenticationRequest = (request: RefreshTokenAuthenticationRequest) => ({
    grant_type: 'refresh_token',
    client_id,
    ...request,
})

export const createUserInfoRequest = (request: UserInfoRequest) => ({
    client_id,
    ...request,
})

const initialState: UserStoreState = {
    tokens: undefined,
    isAuthenticated: false,
}

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: baseQueryWithRefreshToken(fetchBaseQuery({ baseUrl: authorizationServerAddress })),
    tagTypes: [ 'User' ],
    endpoints: builder => ({
        login: builder.mutation<Tokens, PasswordAuthenticationRequest>({
            query: (request) => ({
                url: '/token',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                },
                body: new URLSearchParams(createPasswordAuthenticationRequest(request)),
            }),
            transformResponse: (response: { access_token: string, refresh_token: string }): Tokens => ({
                accessToken: response.access_token,
                refreshToken: response.refresh_token,
            }),
        }),
        getUserInfo: builder.query<UserInfo, Pick<Tokens, 'accessToken'>>({
            query: (request) => ({
                url: '/userinfo',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                },
                body: new URLSearchParams(createUserInfoRequest({ access_token: request.accessToken })),
            }),
            transformResponse: (response: Omit<UserInfo, 'phoneNumber' | 'dateOfBirth'> & { phone_number: string, date_of_birth: string }): UserInfo => ({
                ...response,
                phoneNumber: response.phone_number,
                dateOfBirth: response.date_of_birth,
            }),
        }),
    }),
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<Tokens>) => {
            if (action.payload) {
                state.tokens = action.payload
                state.isAuthenticated = true
            }
        },
        logout: (state) => {
            state.tokens = undefined
            state.isAuthenticated = false
        },
    },
})

export const { useLoginMutation, useGetUserInfoQuery } = userApi

export const { setToken, logout } = userSlice.actions
export const selectRefreshToken = (state: RootState): string | undefined => state.user.tokens?.refreshToken
export const selectAccessToken = (state: RootState): string | undefined => state.user.tokens?.accessToken
export const selectIsAuthenticated = (state: RootState): boolean => state.user.isAuthenticated
export default userSlice.reducer