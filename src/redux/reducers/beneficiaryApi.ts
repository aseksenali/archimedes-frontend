import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { backendUrl } from '../constants/backendConstants'

export type BeneficiaryData = {
    beneficiaryId: string,
    fullName: string,
    phoneNumber: string
}

export const beneficiaryApi = createApi({
    reducerPath: 'beneficiaryApi',
    tagTypes: [ 'BeneficiaryData' ],
    baseQuery: fetchBaseQuery({ baseUrl: backendUrl }),
    endpoints: builder => ({
        getBeneficiaries: builder.query<Array<BeneficiaryData>, void>({
            query: () => 'beneficiaries',
            providesTags: (result) =>
                result ? [
                        ...result.map(() => ({ type: 'BeneficiaryData' as const })),
                        { type: 'BeneficiaryData', id: 'LIST' },
                    ]
                    : [ { type: 'BeneficiaryData', id: 'LIST' } ],
        }),
        getBeneficiaryById: builder.query<BeneficiaryData, string>({
            query: (beneficiaryId) => `beneficiaries/${ beneficiaryId }`,
            providesTags: (result) => [ { type: 'BeneficiaryData', id: result && result.beneficiaryId } ],
        }),
    }),
})

export const { useLazyGetBeneficiariesQuery, useLazyGetBeneficiaryByIdQuery } = beneficiaryApi

export default beneficiaryApi.reducer