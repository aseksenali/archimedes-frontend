import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { backendUrl } from '../constants/backendConstants'

export const branchApi = createApi({
    reducerPath: 'branchApi',
    tagTypes: [ 'Branch' ],
    baseQuery: fetchBaseQuery({ baseUrl: backendUrl }),
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