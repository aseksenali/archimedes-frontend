import React, { useMemo } from 'react'
import styled from './BeneficiarySearch.module.scss'
import { DateTime } from 'luxon'
import { Icon } from '../icons'

const BeneficiarySearch = () => {
    const date = useMemo(() => DateTime.utc().setLocale('ru'), [])
    return (
        <div className={ styled.top_badge }>
            <div className={ styled.search_wrapper }>
                <p>Поиск пациента по ИИН</p>
                <div className={ styled.input_with_icon }>
                    <input className={ styled.search } type={ 'text' }/>
                    <Icon icon={ 'search' } className={ styled.icon }/>
                </div>
            </div>
            <div className={ styled.date_wrapper }>
                <p>Дата: { date.toLocal().toLocaleString({ dateStyle: 'long' }) }</p>
            </div>
        </div>
    )
}

export default BeneficiarySearch