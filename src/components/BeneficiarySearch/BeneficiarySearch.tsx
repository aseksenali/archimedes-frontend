import React, { useMemo } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { DateTime } from 'luxon'

const TopBadgeWrapper = styled.div`
  display: flex;
  background-color: var(--primary-color);
  color: white;
  font-size: 1em;
  height: 53px;
`

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: row;
  color: white;
  font-size: 1.5em;
  justify-content: start;
  align-items: center;
  padding: 0 1.5em;
  width: 80%;

  & > p {
    margin: 0;
  }
`

const SearchInput = styled.input`
  margin-left: 1em;
  background: none;
  border: none;
  color: white;
  width: 100%;
  border-bottom: 1px solid white;
  outline: none;
`

const DateWrapper = styled.div`
  font-size: 1.5em;
  display: flex;
  flex-direction: row;
  align-items: center;

  & > p {
    margin: 0;
  }
`

const BeneficiarySearch = () => {
    const date = useMemo(() => DateTime.utc().setLocale('ru'), [])

    return (
        <TopBadgeWrapper>
            <SearchWrapper>
                <p>Поиск пациента по ИИН</p>
                <div style={ { position: 'relative', width: '60%', flexWrap: 'nowrap', display: 'flex' } }>
                    <SearchInput type={ 'text' }/>
                    <FontAwesomeIcon icon={ faSearch } size={ 'xs' }
                                     style={ { position: 'relative', right: '1.2em' } }/>
                </div>
            </SearchWrapper>
            <DateWrapper>
                <p>Дата: { date.toLocal().toLocaleString({ dateStyle: 'long' }) }</p>
            </DateWrapper>
        </TopBadgeWrapper>
    )
}

export default BeneficiarySearch