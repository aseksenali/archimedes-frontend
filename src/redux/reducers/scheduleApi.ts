import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { MedicSchedule } from '../../interfaces/MedicSchedule'

export const scheduleApi = createApi({
    reducerPath: 'scheduleApi',
    tagTypes: [ 'Schedule' ],
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3304' }),
    endpoints: builder => ({
        getAllSchedules: builder.query<Array<MedicSchedule>, void>({
            query: () => 'schedules?_sort=medicName',
            providesTags: (result) =>
                result ? [
                    ...result.map(() => ({ type: 'Schedule' as const })),
                    { type: 'Schedule', id: 'LIST' },
                ] : [ { type: 'Schedule', id: 'LIST' } ],
        }),
    }),
})

export const { useGetAllSchedulesQuery } = scheduleApi