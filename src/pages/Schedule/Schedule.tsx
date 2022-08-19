import React, { MutableRefObject, useRef, useState } from 'react'
import * as styled from './styles'
import { Filter, FiltersList } from './types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { Outlet } from 'react-router'
import { possibleWorkTypes } from '../../constants/fakeData'
import { useNavigate } from 'react-router-dom'
import { useGetAllSchedulesQuery } from '../../redux/reducers/scheduleApi'
import { useGetMedicsQuery } from '../../redux/reducers/medicApi'
import { useGetSpecialtiesQuery } from '../../redux/reducers/specialtyApi'
import { useGetBranchesQuery } from '../../redux/reducers/branchApi'

const initialFilters: FiltersList = {
    branchName: [ 'Калдаякова, 67' ],
    workType: [ 'Прием' ],
    specialtyName: [],
    medicName: [],
}
const Schedule = () => {
    const { data: scheduleData, isLoading: isScheduleLoading } = useGetAllSchedulesQuery()
    const { data: medicData, isLoading: isMedicsLoading } = useGetMedicsQuery()
    const { data: specialtiesData, isLoading: isSpecialtiesLoading } = useGetSpecialtiesQuery()
    const { data: branchData, isLoading: isBranchesLoading } = useGetBranchesQuery()
    const [ date, setDate ] = useState(new Date())
    const [ filters, setFilters ] = useState(initialFilters)
    const onDateChange = (date: Date) => setDate(date)
    const branchRef = useRef<HTMLInputElement>(null)
    const medicNameRef = useRef<HTMLInputElement>(null)
    const workTypeRef = useRef<HTMLInputElement>(null)
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
                    if (id === 'medicName') navigate({ pathname: `/views/schedule/details` })
                    else setFilters({ ...filters, ...{ [id]: [ value ] } })
                },
                ...object,
            }
        }
    }

    const filterProps: Array<Filter & { id: string }> = [
        createTextFilter('branchName', 'подразделение', 'Подразделение', 15, false, branchData ? branchData.map(branch => branch.branchName) : undefined, branchRef),
        createTextFilter('workType', 'вид работы', 'Вид работы', 10, false, possibleWorkTypes, workTypeRef),
        createTextFilter('specialtyName', 'специализация', 'Специализация', 19, true, specialtiesData ? specialtiesData.map(specialty => specialty.specialtyName) : undefined, specialtyNameRef),
        createTextFilter('medicName', 'поиск врача', 'Введите ФИО врача', 30, false, medicData ? medicData.map(medic => medic.medicName) : undefined, medicNameRef),
        { id: 'dateRange', type: 'week', initialValue: date, selectedDate: date, onChange: onDateChange },
    ]

    const onResetFiltersClick = () => {
        setFilters(initialFilters)
        setDate(new Date())
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
            <Outlet context={ { filters, date, scheduleData, medicData, specialties: specialtiesData } }/>
        </>
    )
}

export default Schedule