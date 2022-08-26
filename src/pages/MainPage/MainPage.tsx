import { Outlet } from 'react-router'
import { Drawer } from 'devextreme-react'
import Header from '../../components/Header/Header'
import * as styled from './styles'
import NavigationList from './NavigationList'
import BeneficiarySearch from '../../components/BeneficiarySearch/BeneficiarySearch'
import React from 'react'

const MainPage = () => {
    return (
        <>
            <Header/>
            <Drawer
                minSize={ 37 }
                className={ 'drawer' }
                render={ () => <NavigationList/> }
                opened={ true }
                revealMode={ 'expand' }
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