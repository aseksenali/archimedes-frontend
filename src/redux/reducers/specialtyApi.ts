import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

export const specialtyApi = createApi({
    reducerPath: 'specialtyApi',
    tagTypes: [ 'Specialty' ],
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3304' }),
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