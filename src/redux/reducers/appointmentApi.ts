import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

export const appointmentApi = createApi({
    reducerPath: 'appointmentApi',
    tagTypes: [ 'Appointment' ],
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3304' }),
    endpoints: builder => ({
        getAppointments: builder.query<Array<{ branchId: string, branchName: string }>, void>({
            query: () => 'appointments',
            providesTags: (result) =>
                result ? [
                    ...result.map(() => ({ type: 'Appointment' as const })),
                    { type: 'Appointment', id: 'LIST' },
                ] : [ { type: 'Appointment', id: 'LIST' } ],
        }),
    }),
})

export const { useGetAppointmentsQuery } = appointmentApi

export default appointmentApi.reducer