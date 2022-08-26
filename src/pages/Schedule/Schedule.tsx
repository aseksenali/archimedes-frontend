import React, { MutableRefObject, useRef, useState } from 'react'
import * as styled from './styles'
import { Filter, FiltersList } from './types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { Outlet } from 'react-router'
import { useNavigate } from 'react-router-dom'
import { useGetMedicsQuery } from '../../redux/reducers/medicApi'
import { useGetSpecialtiesQuery } from '../../redux/reducers/specialtyApi'
import { useGetBranchesQuery } from '../../redux/reducers/branchApi'
import { DateTime } from 'luxon'

const initialFilters: FiltersList = {
    branchName: [ 'Калдаякова, 67' ],
    specialtyName: [],
    medicName: [],
}
const Schedule = () => {
    const { data: medicsData } = useGetMedicsQuery()
    const { data: specialtiesData } = useGetSpecialtiesQuery()
    const { data: branchesData } = useGetBranchesQuery()
    const [ date, setDate ] = useState(DateTime.utc().startOf('day'))
    const [ filters, setFilters ] = useState(initialFilters)
    const onDateChange = (date: DateTime) => setDate(date)
    const branchRef = useRef<HTMLInputElement>(null)
    const medicNameRef = useRef<HTMLInputElement>(null)
    const specialtyNameRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()

    const createTextFilter = (id: keyof typeof filters, label: string, placeholder: string, width: number, multipleSelect: boolean, possibleItems: Array<string> | undefined, inputRef: MutableRefObject<HTMLInputElement | null>): Filter => {
        const object = {
            id,
            label,
            placeholder,
            width,
            possibleItems: possibleItems ? possibleItems : [],
            inputRef,
        }
        if (multipleSelect) {
            return {
                type: 'text',
                multipleSelect: true,
                value: filters[id],
                onAddElement: (value) => {
                    setFilters({ ...filters, ...{ [id]: filters[id].concat(value) } })
                },
                onRemoveElement: (value) => {
                    setFilters({ ...filters, ...{ [id]: filters[id].filter(filterValue => filterValue !== value) } })
                },
                ...object,
            }
        } else {
            return {
                type: 'text',
                multipleSelect: false,
                value: filters[id][0],
                onChange: (value: string) => {
                    const medic = medicsData && medicsData.find(medic => medic.medicName === value)
                    if (id === 'medicName' && medic) navigate({ pathname: `/views/schedule/${ medic.medicId }` })
                    else setFilters({ ...filters, ...{ [id]: [ value ] } })
                },
                ...object,
            }
        }
    }

    const filterProps: Array<Filter & { id: string }> = [
        createTextFilter('branchName', 'подразделение', 'Подразделение', 15, false, branchesData ? branchesData.map(branch => branch.branchName) : undefined, branchRef),
        createTextFilter('specialtyName', 'специализация', 'Специализация', 19, true, specialtiesData ? specialtiesData.map(specialty => specialty.specialtyName) : undefined, specialtyNameRef),
        createTextFilter('medicName', 'поиск врача', 'Введите ФИО врача', 30, false, medicsData ? medicsData.map(medic => medic.medicName) : undefined, medicNameRef),
        { id: 'dateRange', type: 'week', initialValue: date, selectedDate: date, onChange: onDateChange },
    ]

    const onResetFiltersClick = () => {
        setFilters(initialFilters)
        setDate(DateTime.utc())
        navigate({ pathname: '/views/schedule' })
    }

    return (
        <>
            <styled.FilterContainer>
                { filterProps.map(filter => <styled.StyledFilter key={ filter.id } { ...filter }/>) }
                <styled.ResetFiltersButton onClick={ onResetFiltersClick }>
                    <FontAwesomeIcon icon={ faTimes }/>
                </styled.ResetFiltersButton>
            </styled.FilterContainer>
            <Outlet context={ { filters, date, medicsData, specialtiesData, branchesData } }/>
        </>
    )
}

export default Schedule