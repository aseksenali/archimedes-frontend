import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { backendUrl } from '../constants/backendConstants'

export const specialtyApi = createApi({
    reducerPath: 'specialtyApi',
    tagTypes: [ 'Specialty' ],
    baseQuery: fetchBaseQuery({ baseUrl: backendUrl }),
    endpoints: builder => ({
        getSpecialties: builder.query<Array<{ specialtyId: string, specialtyName: string }>, void>({
            query: () => 'specialties',
            providesTags: (result) =>
                result ? [
                        ...result.map(() => ({ type: 'Specialty' as const })),
                        { type: 'Specialty', id: 'LIST' },
                    ]
                    : [ { type: 'Specialty', id: 'LIST' } ],
        }),
    }),
})

export const { useGetSpecialtiesQuery } = specialtyApi

export default specialtyApi.reducer