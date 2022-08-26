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
        getMedicById: builder.query<MedicData, string>({
            query: (medicId) => `medics/${ medicId }`,
            providesTags: (result) => [ { type: 'MedicData', id: result && result.medicId } ],
        }),
    }),
})

export const { useGetMedicsQuery, useLazyGetMedicByIdQuery } = medicApi

export default medicApi.reducer