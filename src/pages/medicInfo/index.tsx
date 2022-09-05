import React, { MutableRefObject, ReactElement, useCallback, useMemo, useRef, useState } from 'react'
import { Column, GridColumnExtension } from '@devexpress/dx-react-grid'
import { Grid, TableHeaderRow, VirtualTable } from '@devexpress/dx-react-grid-material-ui'
import {
    BodyComponent,
    ContainerComponent,
    HeadComponent,
    RootComponent,
    StubCellComponent,
} from '../../components/GridComponents/VirtualTableComponents'
import CellComponent from '../../components/GridComponents/VirtualTableComponents/DefaultCellComponent'
import { FiltersList, MedicInfoRow } from './types'
import { useGetMedicsQuery } from '../../redux/reducers/medicApi'
import DefaultHeaderCellComponent
    from '../../components/GridComponents/VirtualTableComponents/DefaultHeaderCellComponent'
import { useGetSpecialtiesQuery } from '../../redux/reducers/specialtyApi'
import TableRow from '../../components/GridComponents/VirtualTableComponents/RowComponent'
import { FilterData } from '../schedule/types'
import { useGetBranchesQuery } from '../../redux/reducers/branchApi'
import styles from './MedicInfo.module.scss'
import Filter from '../../components/Filter'
import { useRouter } from 'next/router'
import MainPageLayout from '../../components/Layout/MainPageLayout'
import { Icon } from '../../components/icons'

const columnExtensions: Array<GridColumnExtension> = [
    { columnName: 'medicIIN', width: 150 },
    { columnName: 'medicName', width: 300 },
    { columnName: 'medicPosition', width: 300 },
]

const initialFilters: FiltersList = {
    branchName: [ 'Калдаякова, 67' ],
    specialtyName: [],
    medicName: [],
    medicIIN: [],
}

const MedicInfo = () => {
    const { data: medics, isLoading: isMedicsLoading, isUninitialized: isMedicsUninitialized } = useGetMedicsQuery()
    const { data: specialties } = useGetSpecialtiesQuery()
    const { data: branches } = useGetBranchesQuery()
    const [ filters, setFilters ] = useState(initialFilters)
    const router = useRouter()
    const specialtyNameRef = useRef<HTMLInputElement>(null)
    const branchRef = useRef<HTMLInputElement>(null)
    const medicNameRef = useRef<HTMLInputElement>(null)
    const medicIINRef = useRef<HTMLInputElement>(null)

    const createTextFilter = useCallback((id: keyof typeof filters, label: string, placeholder: string, width: number, multipleSelect: boolean, possibleItems: Array<string> | undefined, inputRef: MutableRefObject<HTMLInputElement | null>): FilterData => {
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
                    if (id === 'medicName') {
                        const medic = medics && medics.find(medic => medic.medicName === value)
                        await router.push({ pathname: `/medicInfo/${ medic?.medicId }` })
                    } else if (id === 'medicIIN') {
                        const medic = medics && medics.find(medic => medic.medicIIN === value)
                        await router.push({ pathname: `/medicInfo/${ medic?.medicId }` })
                    } else setFilters({ ...filters, ...{ [id]: [ value ] } })
                },
                ...object,
            }
        }
    }, [ filters, medics, router ])

    const filterProps: Array<FilterData & { id: string }> = useMemo(() => ([
        createTextFilter('branchName', 'подразделение', 'Подразделение', 15, false, branches ? branches.map(branch => branch.branchName) : undefined, branchRef),
        createTextFilter('specialtyName', 'специализация', 'Специализация', 19, true, specialties ? specialties.map(specialty => specialty.specialtyName) : undefined, specialtyNameRef),
        createTextFilter('medicName', 'поиск врача', 'Введите ФИО врача', 30, false, medics ? medics.map(medic => medic.medicName) : undefined, medicNameRef),
        createTextFilter('medicIIN', 'ИИН', 'Введите ИИН', 20, false, medics ? medics.map(medic => medic.medicIIN) : undefined, medicIINRef),
    ]), [ branches, createTextFilter, medics, specialties ])

    const onResetFiltersClick = () => setFilters(initialFilters)

    const columns: Array<Column> = useMemo(() => [
        { name: 'medicIIN', title: 'ИИН' },
        { name: 'medicName', title: 'Фамилия Имя Отчество' },
        { name: 'medicPosition', title: 'Должность' },
        { name: 'medicSpecialties', title: 'Специализации', getCellValue: row => row.medicSpecialties.join(', ') },
        {
            name: 'startOfWorkDate',
            title: 'Дата приема на работу',
            getCellValue: row => row.startOfWorkDate.toLocal().toLocaleString({ dateStyle: 'long' }),
        },
        {
            name: 'endOfWorkDate',
            title: 'Дата увольнения',
            getCellValue: row => row.endOfWorkDate?.toLocal().toLocaleString({ dateStyle: 'long' }) ?? '',
        },
    ], [])

    const rows: Array<MedicInfoRow> | undefined = useMemo(() => medics && medics.filter(medic => {
        if (filters.specialtyName.length === 0) return true
        return filters.specialtyName.some(specialty => medic.specialties.map(specialtyId => specialties && specialties.find(specialty => specialty.specialtyId === specialtyId)).some(medicSpecialty => medicSpecialty && specialty === medicSpecialty.specialtyName))
    }).map(medic => ({
        medicId: medic.medicId,
        medicIIN: medic.medicIIN,
        medicName: medic.medicName,
        medicPosition: medic.medicPosition,
        medicSpecialties: medic.specialties.map(specialtyId => specialties && specialties.find(specialty => specialty.specialtyId === specialtyId)?.specialtyName),
        startOfWorkDate: medic.startDate,
        endOfWorkDate: medic.endDate ?? undefined,
    })), [ filters.specialtyName, medics, specialties ])

    const rootComponent = RootComponent as React.ComponentType<any>

    return (
        <>
            <div className={ styles.filter_container }>
                { filterProps.map(filter => <Filter className={ styles.filter } key={ filter.id } { ...filter }/>) }
                <button className={ styles.reset_button } onClick={ onResetFiltersClick }>
                    <Icon icon={ 'cross' } style={ { width: '1em', height: '1em' } }/>
                </button>
            </div>
            <Grid
                rows={ rows ?? [] }
                columns={ columns }
                getRowId={ (row: MedicInfoRow) => row.medicIIN }
                rootComponent={ rootComponent }>
                <VirtualTable
                    height={ 'auto' }
                    estimatedRowHeight={ 53 }
                    columnExtensions={ columnExtensions }
                    messages={ { noData: isMedicsLoading || isMedicsUninitialized ? 'Загрузка...' : 'Нет данных' } }
                    containerComponent={ ContainerComponent }
                    rowComponent={ TableRow }
                    headComponent={ HeadComponent }
                    cellComponent={ CellComponent }
                    bodyComponent={ BodyComponent }
                    stubCellComponent={ StubCellComponent }
                    stubHeaderCellComponent={ StubCellComponent }/>
                <TableHeaderRow
                    cellComponent={ DefaultHeaderCellComponent }/>
            </Grid>
        </>
    )
}

MedicInfo.getLayout = function getLayout(page: ReactElement) {
    return (
        <MainPageLayout>
            { page }
        </MainPageLayout>
    )
}

export default MedicInfo