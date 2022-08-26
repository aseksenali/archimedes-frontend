import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { MedicSchedule } from '../../interfaces/MedicSchedule'

export const scheduleApi = createApi({
    reducerPath: 'scheduleApi',
    tagTypes: [ 'Schedule' ],
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3304' }),
    endpoints: builder => ({
        getAllSchedulesBySpecialtyId: builder.query<Array<MedicSchedule>, string>({
            query: (specialtyId) => `schedules?specialtyIds_like=${ specialtyId }`,
            providesTags: (result) =>
                result ? [
                    ...result.map(() => ({ type: 'Schedule' as const })),
                    { type: 'Schedule', id: 'LIST' },
                ] : [ { type: 'Schedule', id: 'LIST' } ],
        }),

        getScheduleByMedicId: builder.query<MedicSchedule, string>({
            query: (medicId) => `schedules/${ medicId }`,
            providesTags: (result) => [ { type: 'Schedule', id: result && result.medicId } ],
        }),
    }),
})

export const { useLazyGetAllSchedulesBySpecialtyIdQuery, useLazyGetScheduleByMedicIdQuery } = scheduleApi