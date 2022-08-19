import { Outlet } from 'react-router'
import { Drawer } from 'devextreme-react'
import Header from '../../components/Header/Header'
import * as styled from './styles'
import NavigationList from './NavigationList'
import BeneficiarySearch from '../../components/BeneficiarySearch/BeneficiarySearch'
import React from 'react'

const MainPage = () => {
    const onOpenedChanged = (value: boolean) => {
        console.log(value)
    }

    return (
        <>
            <Header/>
            <Drawer
                minSize={ 37 }
                className={ 'drawer' }
                render={ () => <NavigationList/> }
                opened={ true }
                revealMode={ 'expand' }
                onOpenedChange={ onOpenedChanged }
                height={ '90%' }
            >
                <styled.MainPart>
                    <BeneficiarySearch/>
                    <Outlet/>
                </styled.MainPart>
            </Drawer>
        </>
    )
}

export default MainPage