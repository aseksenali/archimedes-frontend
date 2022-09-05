import React from 'react'
import styles from './Header.module.scss'
import Image from 'next/image'

const Header = () => {
    return (
        <div className={ styles.wrapper }>
            <div style={ { width: 180, height: 56, position: 'relative' } }>
                <Image src={ '/logo.png' } alt={ 'logo' } layout={ 'fill' } objectFit={ 'contain' }/>
            </div>
            <div className={ styles.right_side }>
                <div className={ styles.user_info }>
                    <p>Сексенали Севиль Фарман гызы</p>
                    <p>координатор - 990919400051</p>
                </div>
                <button className={ styles.button }>Выйти</button>
            </div>
        </div>
    )
}

export default Header