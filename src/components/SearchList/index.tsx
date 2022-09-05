import React, { useCallback, useMemo, useState } from 'react'
import { SearchListProps } from './types'
import SearchListItem from './SearchListItem'
import BinarySearchTree from '../../helpers/BinarySearchTree'
import styles from './SearchList.module.scss'
import { Icon } from '../icons'

const filter = (query: string, items: Array<string>) => {
    // prepare query
    query = query.toLowerCase()
    const queryWords = query.trim().split(/\s+/g)
    const queryLength = queryWords.length
    // prepare results
    const matches = [] as Array<string>
    // search
    items.forEach((item) => {
        const text = item.toLowerCase()
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
    const createDefaultTree = useCallback((data?: Array<string>) => {
        const tree = new BinarySearchTree<string>((a, b) => {
            if (a > b) return 1
            if (a === b) return 0
            else return -1
        })
        if (data) data.forEach(value => tree.insert(value))
        return tree
    }, [])
    const [ selectedItems, setSelectedItems ] = useState<{ tree: BinarySearchTree<string> }>({ tree: createDefaultTree(props.selectedItems) })
    const [ notSelectedItems, setNotSelectedItems ] = useState<{ tree: BinarySearchTree<string> }>({ tree: createDefaultTree(props.items.filter(value => !selectedItems!.tree.contains(value))) })

    const inputRef = useCallback((node: HTMLInputElement | null) => {
        if (node) {
            node.focus()
        }
    }, [])

    const onItemSelect = useCallback((value: string) => {
        if (props.multipleSelect) {
            props.onItemSelect(value)
            selectedItems.tree.insert(value)
            notSelectedItems.tree.remove(value)
            setSelectedItems({ tree: selectedItems.tree })
            setNotSelectedItems({ tree: notSelectedItems.tree })
        }
    }, [ notSelectedItems, props, selectedItems ])

    const onItemDeselect = useCallback((value: string) => {
        if (props.multipleSelect) {
            props.onItemDeselect(value)
            selectedItems.tree.remove(value)
            notSelectedItems.tree.insert(value)
            setSelectedItems({ tree: selectedItems.tree })
            setNotSelectedItems({ tree: notSelectedItems.tree })
        }
    }, [ notSelectedItems, props, selectedItems ])

    const [ query, setQuery ] = useState('')

    const filteredItems = useMemo(() => {
        return filter(query, selectedItems.tree.root.traverseInOrder()).concat(filter(query, notSelectedItems.tree.root.traverseInOrder()))
    }, [ notSelectedItems.tree.root, query, selectedItems.tree.root ])

    const isSelected = useCallback((value: string): boolean => {
        if (props.multipleSelect) return selectedItems.tree.contains(value)
        return false
    }, [ props.multipleSelect, selectedItems ])

    return (
        <div className={ styles.wrapper }>
            {
                props.items.length > 6 &&
                <div className={ styles.input_with_icon }>
                    <input className={ styles.search_input } type={ 'text' } value={ query }
                           onChange={ (e) => setQuery(e.target.value) }
                           ref={ inputRef }/>
                    <Icon icon={ 'search' }
                          style={ {
                              position: 'absolute',
                              fill: 'var(--primary-color)',
                              right: '.5em',
                              width: '1em',
                              height: '1em',
                          } }/>
                </div>
            }
            <div className={ styles.items_wrapper } style={ { marginTop: props.items.length > 6 ? '.5em' : 0 } }>
                { filteredItems.map((item, index) => {
                    if (props.multipleSelect)
                        return <SearchListItem key={ index }
                                               value={ item } onItemSelect={ onItemSelect } multipleSelect={ true }
                                               onItemDeselect={ onItemDeselect } isSelected={ isSelected(item) }/>
                    else
                        return <SearchListItem key={ index }
                                               value={ item } { ...{ ...props, ...{ isSelected: isSelected(item) } } }/>
                }) }
            </div>
        </div>
    )
}

export default SearchList