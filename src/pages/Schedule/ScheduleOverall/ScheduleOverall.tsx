import React, { useMemo } from 'react'
import { Cell, Root } from '../GridComponents'
import { Column, GridColumnExtension, GroupingState, IntegratedGrouping } from '@devexpress/dx-react-grid'
import {
    Grid,
    TableFixedColumns,
    TableGroupRow,
    TableHeaderRow,
    VirtualTable,
} from '@devexpress/dx-react-grid-material-ui'
import { MedicSchedule } from '../../../interfaces/MedicSchedule'
import { getWeekForDay } from '../../../helpers/DateHelper'
import { useOutletContext } from 'react-router'
import { ScheduleOutletContext } from '../types'
import { workingHours } from './utils'
import { MedicData } from '../../../interfaces/MedicData'

type DaySchedule = {
    schedule?: string
    hasFreeWindows: boolean
    medicId: string
}

type MedicScheduleRow = {
    medicId: string
    medicName: string
    branchId: string
    specialtyName: string
    firstDay: DaySchedule
    secondDay: DaySchedule
    thirdDay: DaySchedule
    fourthDay: DaySchedule
    fifthDay: DaySchedule
    sixthDay: DaySchedule
    seventhDay: DaySchedule
}

const getRows = (date: Date, data: Array<MedicSchedule>, medicData: Array<MedicData>, specialties: Array<{ specialtyId: string, specialtyName: string }>): Array<MedicScheduleRow> => {
    return data.flatMap((value: MedicSchedule) => {
            const schedule = workingHours(date, value)
            const medic = medicData.find(medic => medic.medicId === value.medicId)
            if (!medic) throw Error()
            return value.specialtyIds.map(specialtyId => {
                const specialty = specialties.find(specialty => specialty.specialtyId === specialtyId)
                if (!specialty) throw Error()
                return {
                    medicId: value.medicId,
                    medicName: medic.medicName,
                    branchId: value.branchId,
                    specialtyName: specialty.specialtyName,
                    firstDay: {
                        schedule: schedule.MONDAY,
                        hasFreeWindows: true,
                        medicId: value.medicId,
                    },
                    secondDay: {
                        schedule: schedule.TUESDAY,
                        hasFreeWindows: true,
                        medicId: value.medicId,
                    },
                    thirdDay: {
                        schedule: schedule.WEDNESDAY,
                        hasFreeWindows: true,
                        medicId: value.medicId,
                    },
                    fourthDay: {
                        schedule: schedule.THURSDAY,
                        hasFreeWindows: true,
                        medicId: value.medicId,
                    },
                    fifthDay: {
                        schedule: schedule.FRIDAY,
                        hasFreeWindows: true,
                        medicId: value.medicId,
                    },
                    sixthDay: {
                        schedule: schedule.SATURDAY,
                        hasFreeWindows: true,
                        medicId: value.medicId,
                    },
                    seventhDay: {
                        schedule: schedule.SUNDAY,
                        hasFreeWindows: true,
                        medicId: value.medicId,
                    },
                }
            })
        },
    )
}

const columnExtensions: Array<GridColumnExtension> = [
    { columnName: 'medicName', width: 300 },
]

const leftColumn = [ 'medicName' ]

const HeaderCell = (props: TableHeaderRow.CellProps) => {
    if (props.column.name !== 'medicName')
        return (
            <TableHeaderRow.Cell { ...props } style={ { borderRight: '1px solid #cecece' } }>
                { props.column.title }
            </TableHeaderRow.Cell>
        )
    else return <TableHeaderRow.Cell { ...props }>{ props.column.title }</TableHeaderRow.Cell>
}

const ScheduleOverall = () => {
    const { date, filters, scheduleData, medicData, specialties } = useOutletContext<ScheduleOutletContext>()

    const week = useMemo(() => getWeekForDay(date), [ date ])

    const columns: Array<Column> = useMemo(() => [
        { name: 'medicName', title: 'ФИО врача' },
        { name: 'specialtyName', title: 'Специализация' },
        { name: 'firstDay', title: week[0].toLocaleDateString() },
        { name: 'secondDay', title: week[1].toLocaleDateString() },
        { name: 'thirdDay', title: week[2].toLocaleDateString() },
        { name: 'fourthDay', title: week[3].toLocaleDateString() },
        { name: 'fifthDay', title: week[4].toLocaleDateString() },
        { name: 'sixthDay', title: week[5].toLocaleDateString() },
        { name: 'seventhDay', title: week[6].toLocaleDateString() },
    ], [ week ])

    const rows = useMemo(() => {
        let rows: Array<MedicScheduleRow> | undefined
        if (scheduleData && medicData && specialties) {
            rows = getRows(date, scheduleData, medicData, specialties)
            Object.entries(filters).forEach(([ key, value ]) => {
                    rows = rows!.filter(row => value.length === 0 || value.some(val => {
                            switch (key) {
                                case 'medicName':
                                case 'specialtyName': {
                                    return val === row[key]
                                }
                                case 'workType': {
                                    return true
                                }
                                default:
                                    return true
                            }
                        },
                    ))
                },
            )
        }
        return rows
    }, [ filters, date, medicData, scheduleData, specialties ])

    return (
        <Grid
            rows={ rows ? rows : [] }
            columns={ columns }
            getRowId={ (row: MedicScheduleRow) => row.medicId + row.specialtyName }
            rootComponent={ Root }>
            <GroupingState
                grouping={ [ { columnName: 'specialtyName' } ] }
            />
            <IntegratedGrouping/>
            <VirtualTable
                cellComponent={ Cell }
                columnExtensions={ columnExtensions }
                messages={ { noData: 'Нет данных' } }/>
            <TableHeaderRow cellComponent={ HeaderCell }/>
            <TableGroupRow/>
            <TableFixedColumns
                leftColumns={ leftColumn }
            />
        </Grid>
    )
}

export default ScheduleOverall