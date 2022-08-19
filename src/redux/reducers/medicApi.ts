import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { MedicData } from '../../interfaces/MedicData'

export const medicApi = createApi({
    reducerPath: 'medicApi',
    tagTypes: [ 'MedicData' ],
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3304' }),
    endpoints: builder => ({
        getMedics: builder.query<Array<MedicData>, void>({
            query: () => 'medics',
            providesTags: (result) =>
                result ? [
                        ...result.map(() => ({ type: 'MedicData' as const })),
                        { type: 'MedicData', id: 'LIST' },
                    ]
                    : [ { type: 'MedicData', id: 'LIST' } ],
        }),
    }),
})

export const { useGetMedicsQuery } = medicApi

export default medicApi.reducer