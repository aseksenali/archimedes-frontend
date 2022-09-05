import React from 'react'
import { FilterProps } from './types'
import WeekPicker from '../WeekPicker/WeekPicker'
import TextFilter from '../TextFilter/TextFilter'

const Filter = (props: FilterProps & { className: string }) => {
    switch (props.type) {
        case 'text':
            return (
                <TextFilter { ...props }/>
            )
        case 'week': {
            return (
                <WeekPicker { ...props }/>
            )
        }
        default:
            return (<></>)
    }
}

export default Filter