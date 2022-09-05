import { SearchListProps } from './types'
import React, { useCallback, useMemo, useState } from 'react'
import SearchListItem from './SearchListItem'
import * as styled from './styles'
import { BeneficiaryData } from '../../../redux/reducers/beneficiaryApi'
import { Icon } from '../../icons'

const filter = (query: string, items: Array<BeneficiaryData>): Array<BeneficiaryData> => {
    // prepare query
    query = query.toLowerCase()
    const queryWords = query.trim().split(/\s+/g)
    const queryLength = queryWords.length
    // prepare results
    const matches = [] as Array<BeneficiaryData>
    // search
    items.forEach((item) => {
        const text = item.beneficiaryId.toLowerCase()
        // traverse
        let traverseIndex = 0
        let wordIndex = 0
        let wordLength = 0
        let queryIndex

        for (queryIndex = 0; queryIndex < queryLength; queryIndex++) {
            wordLength = queryWords[queryIndex].length
            wordIndex = text.indexOf(queryWords[queryIndex], traverseIndex)
            if (wordIndex === -1) {
                break
            }
            traverseIndex = wordIndex + wordLength
        }
        // capture
        if (queryIndex === queryLength) {
            matches.push(item)
        }
    })
    return matches
}

const SearchList = (props: SearchListProps) => {
    const inputRef = useCallback((node: HTMLInputElement | null) => {
        if (node) {
            node.focus()
        }
    }, [])

    const [ query, setQuery ] = useState('')

    const filteredItems = useMemo(() => {
        return filter(query, props.items)
    }, [ props.items, query ])

    return (
        <styled.SearchListWrapper>
            {
                props.items.length > 6 &&
                <styled.InputWithIcon>
                    <styled.SearchInput type={ 'text' } value={ query } onChange={ (e) => setQuery(e.target.value) }
                                        ref={ inputRef }/>
                    <Icon icon={ 'search' }
                          style={ {
                              position: 'absolute',
                              fill: 'var(--primary-color)',
                              right: '.5em',
                              width: '1em',
                              height: '1em',
                          } }/>
                </styled.InputWithIcon>
            }
            <styled.SearchListItemsWrapper hasInput={ props.items.length > 6 }>
                { filteredItems.map((item, index) => {
                    return <SearchListItem key={ index }
                                           value={ item } { ...props }/>
                }) }
            </styled.SearchListItemsWrapper>
        </styled.SearchListWrapper>
    )
}

export default SearchList