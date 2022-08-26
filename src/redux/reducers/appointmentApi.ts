import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { AppointmentModel } from '@devexpress/dx-react-scheduler'
import { DateTime } from 'luxon'
import { AppointmentData } from '../interfaces/types'

export const appointmentApi = createApi({
    reducerPath: 'appointmentApi',
    tagTypes: [ 'Appointment' ],
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3304' }),
    endpoints: builder => ({
        getAppointmentsBySpecialtyId: builder.query<Array<AppointmentData>, { startDate: number, endDate: number, specialtyId: string }>({
            query: ({
                        startDate,
                        endDate,
                        specialtyId,
                    }) => `appointments?startDate_gte=${ startDate }&endDate_lte=${ endDate }&specialtyIds_like=${ specialtyId }`,
            transformResponse: (response: Array<AppointmentData>) => {
                return response.map(appointment => ({
                    ...appointment,
                    startDate: DateTime.fromMillis(appointment.startDate as number).convertFromUTC().toISO(),
                    endDate: DateTime.fromMillis(appointment.endDate as number).convertFromUTC().toISO(),
                }))
            },
            providesTags: (result) =>
                result ? [
                    ...result.map(() => ({ type: 'Appointment' as const })),
                    { type: 'Appointment', id: 'LIST' },
                ] : [ { type: 'Appointment', id: 'LIST' } ],
        }),
        getAppointmentsByMedicId: builder.query<Array<AppointmentModel>, { startDate: number, endDate: number, medicId: string }>({
            query: ({
                        startDate,
                        endDate,
                        medicId,
                    }) => `appointments?startDate_gte=${ startDate }&endDate_lte=${ endDate }&medicId=${ medicId }`,
            transformResponse: (response: Array<AppointmentModel>) => {
                return response.map(appointment => ({
                    ...appointment,
                    startDate: DateTime.fromMillis(appointment.startDate as number).convertFromUTC().toISO(),
                    endDate: DateTime.fromMillis(appointment.endDate as number).convertFromUTC().toISO(),
                }))
            },
            providesTags: (result) =>
                result ? [
                    ...result.map(() => ({ type: 'Appointment' as const })),
                    { type: 'Appointment', id: 'LIST' },
                ] : [ { type: 'Appointment', id: 'LIST' } ],
        }),
    }),
})

export const { useLazyGetAppointmentsByMedicIdQuery, useLazyGetAppointmentsBySpecialtyIdQuery } = appointmentApi

export default appointmentApi.reducer