import React, { createContext, MutableRefObject, PropsWithChildren, useRef, useState } from 'react'
import styled from './ScheduleLayout.module.scss'
import { FilterData, FiltersList, ScheduleOutletContext } from './types'
import { useGetMedicsQuery } from '../../../redux/reducers/medicApi'
import { useGetSpecialtiesQuery } from '../../../redux/reducers/specialtyApi'
import { useGetBranchesQuery } from '../../../redux/reducers/branchApi'
import { DateTime } from 'luxon'
import MainPageLayout from '../MainPageLayout'
import Filter from '../../Filter'
import { useRouter } from 'next/router'
import { Icon } from '../../icons'

const initialFilters: FiltersList = {
    branchName: [ 'Калдаякова, 67' ],
    specialtyName: [],
    medicName: [],
}

export const ScheduleContext = createContext<ScheduleOutletContext | null>(null)

const ScheduleLayout = (props: PropsWithChildren<any>) => {
    const { data: medicsData } = useGetMedicsQuery()
    const { data: specialtiesData } = useGetSpecialtiesQuery()
    const { data: branchesData } = useGetBranchesQuery()
    const [ date, setDate ] = useState(DateTime.utc().startOf('day'))
    const [ filters, setFilters ] = useState(initialFilters)
    const onDateChange = (date: DateTime) => setDate(date)
    const branchRef = useRef<HTMLInputElement>(null)
    const medicNameRef = useRef<HTMLInputElement>(null)
    const specialtyNameRef = useRef<HTMLInputElement>(null)
    const router = useRouter()

    const createTextFilter = (id: keyof typeof filters, label: string, placeholder: string, width: number, multipleSelect: boolean, possibleItems: Array<string> | undefined, inputRef: MutableRefObject<HTMLInputElement | null>): FilterData => {
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
                onChange: async (value: string) => {
                    const medic = medicsData && medicsData.find(medic => medic.medicName === value)
                    if (id === 'medicName' && medic) await router.push(`/schedule/${ medic.medicId }`)
                    else setFilters({ ...filters, ...{ [id]: [ value ] } })
                },
                ...object,
            }
        }
    }

    const filterProps: Array<FilterData & { id: string }> = [
        createTextFilter('branchName', 'подразделение', 'Подразделение', 15, false, branchesData ? branchesData.map(branch => branch.branchName) : undefined, branchRef),
        createTextFilter('specialtyName', 'специализация', 'Специализация', 19, true, specialtiesData ? specialtiesData.map(specialty => specialty.specialtyName) : undefined, specialtyNameRef),
        createTextFilter('medicName', 'поиск врача', 'Введите ФИО врача', 30, false, medicsData ? medicsData.map(medic => medic.medicName) : undefined, medicNameRef),
        { id: 'dateRange', type: 'week', initialValue: date, selectedDate: date, onChange: onDateChange },
    ]

    const onResetFiltersClick = async () => {
        setFilters(initialFilters)
        setDate(DateTime.utc())
        await router.push('/schedule')
    }

    return (
        <MainPageLayout>
            <div className={ styled.container }>
                { filterProps.map(filter => <Filter className={ styled.filter } key={ filter.id } { ...filter }/>) }
                <button className={ styled.reset_button } onClick={ onResetFiltersClick }>
                    <Icon icon={ 'cross' } style={ { width: '1em', height: '1em' } }/>
                </button>
            </div>
            <ScheduleContext.Provider value={ { filters, date, medicsData, specialtiesData, branchesData } }>
                { props.children }
            </ScheduleContext.Provider>
        </MainPageLayout>
    )
}

export default ScheduleLayout