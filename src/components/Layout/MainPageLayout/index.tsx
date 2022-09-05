import { Drawer } from 'devextreme-react'
import Header from '../../Header'
import styles from './MainPageLayout.module.scss'
import NavigationMenu from '../../NavigationMenu'
import BeneficiarySearch from '../../BeneficiarySearch'
import React, { PropsWithChildren } from 'react'

const MainPageLayout = (props: PropsWithChildren<any>) => {
    return (
        <>
            <Header/>
            <Drawer
                minSize={ 37 }
                className={ 'drawer' }
                render={ () => <NavigationMenu/> }
                opened={ true }
                revealMode={ 'expand' }
                height={ '90%' }
            >
                <div className={ styles.main_part }>
                    <BeneficiarySearch/>
                    { props.children }
                </div>
            </Drawer>
        </>
    )
}

export default MainPageLayout