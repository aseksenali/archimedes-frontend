import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { MedicData } from '../../interfaces/MedicData'
import { DateTime } from 'luxon'
import { backendUrl } from '../constants/backendConstants'

export const medicApi = createApi({
    reducerPath: 'medicApi',
    tagTypes: [ 'MedicData' ],
    baseQuery: fetchBaseQuery({ baseUrl: backendUrl }),
    endpoints: builder => ({
        getMedics: builder.query<Array<MedicData>, void>({
            query: () => 'medics',
            providesTags: (result) =>
                result ? [
                        ...result.map(() => ({ type: 'MedicData' as const })),
                        { type: 'MedicData', id: 'LIST' },
                    ]
                    : [ { type: 'MedicData', id: 'LIST' } ],
            transformResponse: (response: Array<Omit<Omit<MedicData, 'startDate'>, 'endDate'> & { startDate: string, endDate: string }>) =>
                response.map(data => ({
                        ...data,
                        startDate: DateTime.fromISO(data.startDate),
                        endDate: DateTime.fromISO(data.endDate),
                    }),
                ),
        }),
        getMedicById: builder.query<MedicData, string>({
            query: (medicId) => `medics/${ medicId }`,
            providesTags: (result) => [ { type: 'MedicData', id: result && result.medicId } ],
            transformResponse: (response: Omit<Omit<MedicData, 'startDate'>, 'endDate'> & { startDate: string, endDate?: string }) =>
                ({
                    ...response,
                    startDate: DateTime.fromISO(response.startDate),
                    endDate: response.endDate ? DateTime.fromISO(response.endDate) : undefined,
                }),
        }),
    }),
})

export const { useGetMedicsQuery, useLazyGetMedicByIdQuery } = medicApi

export default medicApi.reducer