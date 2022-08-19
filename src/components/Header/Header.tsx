import React from 'react'
import * as styled from './styles'
import logo from '../../assets/logo.png'

const Header = () => {
    return (
        <styled.HeaderWrapper>
            <img src={ logo } alt={ 'logo' } height={ '60em' }/>
            <styled.HeaderRightSide>
                <styled.UserInfo>
                    <p>Сексенали Севиль Фарман гызы</p>
                    <p>координатор - 990919400051</p>
                </styled.UserInfo>
                <styled.Button>Выйти</styled.Button>
            </styled.HeaderRightSide>
        </styled.HeaderWrapper>
    )
}

export default Header