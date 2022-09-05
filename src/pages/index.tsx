import React, { ReactElement } from 'react'
import MainPageLayout from '../components/Layout/MainPageLayout'
import { NextPageWithLayout } from './_app'

const Schedule: NextPageWithLayout = () => {
    return (
        <></>
    )
}

Schedule.getLayout = function getLayout(page: ReactElement) {
    return (
        <MainPageLayout>
            { page }
        </MainPageLayout>
    )
}

export default Schedule