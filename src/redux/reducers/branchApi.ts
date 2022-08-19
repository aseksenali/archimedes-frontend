import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

export const branchApi = createApi({
    reducerPath: 'branchApi',
    tagTypes: [ 'Branch' ],
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3304' }),
    endpoints: builder => ({
        getBranches: builder.query<Array<{ branchId: string, branchName: string }>, void>({
            query: () => 'branches',
            providesTags: (result) =>
                result ? [
                        ...result.map(() => ({ type: 'Branch' as const })),
                        { type: 'Branch', id: 'LIST' },
                    ]
                    : [ { type: 'Branch', id: 'LIST' } ],
        }),
    }),
})

export const { useGetBranchesQuery } = branchApi

export default branchApi.reducer