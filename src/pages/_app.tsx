import { AppProps } from 'next/app'
import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'
import '../styles.css'
import { Provider } from 'react-redux'
import store from '../redux/store'
import Head from 'next/head'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
    const getLayout = Component.getLayout ?? ((page) => page)
    return (
        <>
            <Head>
                <title>My new cool app</title>
            </Head>
            <Provider store={ store }>
                { getLayout(<Component { ...pageProps } />) }
            </Provider>
        </>
    )
}

export default MyApp