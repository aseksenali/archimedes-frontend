import React, { ReactElement, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { Column, GridColumnExtension, GroupingState, GroupKey, IntegratedGrouping } from '@devexpress/dx-react-grid'
import {
    Grid,
    TableFixedColumns,
    TableGroupRow,
    TableHeaderRow,
    VirtualTable,
} from '@devexpress/dx-react-grid-material-ui'
import { GroupedData, MedicScheduleRow, ScheduleOutletContext, WeekSchedule } from './types'
import { useLazyGetAllSchedulesBySpecialtyIdQuery } from '../../redux/reducers/scheduleApi'
import {
    BodyComponent,
    CellComponent,
    ContainerComponent,
    GroupCellComponent,
    HeadComponent,
    HeaderCellComponent,
    RootComponent,
    StubCellComponent,
} from '../../components/GridComponents/VirtualTableComponents'
import { useLazyGetAppointmentsBySpecialtyIdQuery } from '../../redux/reducers/appointmentApi'
import { DateTime, Interval } from 'luxon'
import { MedicSchedule } from '../../interfaces/MedicSchedule'
import { AppointmentModel } from '@devexpress/dx-react-scheduler'
import ScheduleLayout, { ScheduleContext } from '../../components/Layout/ScheduleLayout'

const columnExtensions: Array<GridColumnExtension> = [
    { columnName: 'medicName', width: 300 },
]

const leftColumn = [ 'medicName' ]

const ScheduleOverall = () => {
    const [ triggerSchedulesRequest ] = useLazyGetAllSchedulesBySpecialtyIdQuery()
    const [ triggerAppointmentsRequest ] = useLazyGetAppointmentsBySpecialtyIdQuery()
    const data = useContext<ScheduleOutletContext | null>(ScheduleContext)
    const {
        date,
        filters,
        medicsData,
        specialtiesData,
        branchesData,
    } = data ?? {
        date: DateTime.now(),
        filters: {},
        medicsData: undefined,
        specialtiesData: undefined,
        branchesData: undefined,
    }
    const selectedWeek = useMemo(() => {
        return date.startOf('week').until(date.endOf('week'))
            .splitBy({ day: 1 })
            .map(day => day.start.startOf('day').setLocale('ru'))
    }, [ date ])

    const columns: Array<Column> = useMemo(() => [
        { name: 'medicName', title: 'ФИО врача' },
        { name: 'specialtyName', title: 'Специализация' },
        { name: 'firstDay', title: selectedWeek[0].toLocal().toFormat('dd MMMM') },
        { name: 'secondDay', title: selectedWeek[1].toLocal().toFormat('dd MMMM') },
        { name: 'thirdDay', title: selectedWeek[2].toLocal().toFormat('dd MMMM') },
        { name: 'fourthDay', title: selectedWeek[3].toLocal().toFormat('dd MMMM') },
        { name: 'fifthDay', title: selectedWeek[4].toLocal().toFormat('dd MMMM') },
        { name: 'sixthDay', title: selectedWeek[5].toLocal().toFormat('dd MMMM') },
        { name: 'seventhDay', title: selectedWeek[6].toLocal().toFormat('dd MMMM') },
    ], [ selectedWeek ])

    const workingHours = useCallback((scheduleData: MedicSchedule, appointments: Array<AppointmentModel>): WeekSchedule => {
        const intervals = appointments.map(appointment => Interval.fromDateTimes(DateTime.fromISO(appointment.startDate as string).convertToUTC(), DateTime.fromISO(appointment.endDate as string).convertToUTC()))
        return selectedWeek.reduce((result: WeekSchedule, day) => {
            const weekDayNames = [ 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY' ] as Array<keyof typeof result>
            const weekDay = weekDayNames[day.weekday - 1]
            if (day.isHoliday(scheduleData.holidays)) return {
                ...result,
                [weekDay]: {
                    workingHours: 'Выходной',
                    hasFreeWindows: false,
                },
            }
            const specialDay = day.findSpecialDay(scheduleData.specialDays)
            if (specialDay) {
                return {
                    ...result,
                    [weekDay]: {
                        workingHours: `${ specialDay.start.toFormat('T') } - ${ specialDay.end.toFormat('T') }`,
                        hasFreeWindows: appointments && specialDay.difference(...intervals).length !== 0,
                    },
                }
            }
            let tmp = {}
            const schedule = scheduleData.workingDays[weekDay]
            if (!!schedule) {
                const workingDayStart = DateTime.fromISO(schedule.startTime, { zone: 'utc' }).set({
                    year: day.year,
                    month: day.month,
                    day: day.day,
                })
                const workingDayEnd = DateTime.fromISO(schedule.endTime, { zone: 'utc' }).set({
                    year: day.year,
                    month: day.month,
                    day: day.day,
                })
                const workingDay = Interval.fromDateTimes(workingDayStart, workingDayEnd)
                tmp = {
                    ...tmp,
                    [weekDay]: {
                        workingHours: `${ DateTime.fromISO(schedule.startTime, { zone: 'utc' }).toFormat('T') } - ${ DateTime.fromISO(schedule.endTime, { zone: 'utc' }).toFormat('T') }`,
                        hasFreeWindows: appointments && workingDay.difference(...intervals).length !== 0,
                    },
                }
            } else {
                tmp = {
                    ...tmp, [weekDay]: {
                        workingHours: 'Выходной',
                        hasFreeWindows: false,
                    },
                }
            }
            return { ...result, ...tmp }
        }, {
            MONDAY: undefined,
            TUESDAY: undefined,
            WEDNESDAY: undefined,
            THURSDAY: undefined,
            FRIDAY: undefined,
            SATURDAY: undefined,
            SUNDAY: undefined,
        } as WeekSchedule)
    }, [ selectedWeek ])

    const [ groups, setGroups ] = useState<Array<GroupedData> | undefined>()

    const rows: Array<MedicScheduleRow> | undefined = useMemo(() => {
        return groups && groups.flatMap((group) => {
                return group.rows.map(row => {
                    const schedule = row.schedule && row.appointments && workingHours(row.schedule, row.appointments)
                    const medic = row.medic
                    return {
                        medicId: medic.medicId,
                        medicName: medic.medicName,
                        branchId: medic.branch,
                        specialtyId: group.specialtyId,
                        specialtyName: group.specialtyName,
                        firstDay: {
                            schedule: schedule?.MONDAY?.workingHours,
                            hasFreeWindows: schedule?.MONDAY && schedule.MONDAY.hasFreeWindows,
                            medicId: medic.medicId,
                        },
                        secondDay: {
                            schedule: schedule?.TUESDAY?.workingHours,
                            hasFreeWindows: schedule?.TUESDAY && schedule.TUESDAY.hasFreeWindows,
                            medicId: medic.medicId,
                        },
                        thirdDay: {
                            schedule: schedule?.WEDNESDAY?.workingHours,
                            hasFreeWindows: schedule?.WEDNESDAY && schedule.WEDNESDAY.hasFreeWindows,
                            medicId: medic.medicId,
                        },
                        fourthDay: {
                            schedule: schedule?.THURSDAY?.workingHours,
                            hasFreeWindows: schedule?.THURSDAY && schedule.THURSDAY.hasFreeWindows,
                            medicId: medic.medicId,
                        },
                        fifthDay: {
                            schedule: schedule?.FRIDAY?.workingHours,
                            hasFreeWindows: schedule?.FRIDAY && schedule.FRIDAY.hasFreeWindows,
                            medicId: medic.medicId,
                        },
                        sixthDay: {
                            schedule: schedule?.SATURDAY?.workingHours,
                            hasFreeWindows: schedule?.SATURDAY && schedule.SATURDAY.hasFreeWindows,
                            medicId: medic.medicId,
                        },
                        seventhDay: {
                            schedule: schedule?.SUNDAY?.workingHours,
                            hasFreeWindows: schedule?.SUNDAY && schedule.SUNDAY.hasFreeWindows,
                            medicId: medic.medicId,
                        },
                    }
                })
            },
        )
    }, [ groups, workingHours ])

    useEffect(() => {
        if (specialtiesData && medicsData) {
            const groupsInfo: Array<GroupedData> | undefined = specialtiesData.filter(specialty => {
                if (filters.specialtyName.length === 0) return true
                return filters.specialtyName.some(filter => filter === specialty.specialtyName)
            }).map(specialty => {
                return {
                    ...specialty,
                    rows: medicsData
                        .filter(medic => medic.specialties.some(medicsSpecialty => medicsSpecialty === specialty.specialtyId))
                        .map(medic => ({
                            medic,
                        })),
                }
            })
            setGroups(groupsInfo)
        }
    }, [ filters.specialtyName, medicsData, specialtiesData ])

    const onGroupExpand = useCallback(async (expandedGroups: Array<GroupKey>) => {
        const callback = async () => {
            if (groups) {
                const changedGroups: Array<GroupedData & { changed: boolean }> = await Promise.all(expandedGroups.map(expandedGroup => groups.find(group => group.specialtyName === expandedGroup)).map(async (group) => {
                    if (!group) throw Error()
                    if (group && group.rows[0].schedule) return { ...group, changed: false }
                    const { data: appointments } = await triggerAppointmentsRequest({
                        startDate: date.startOf('week').toMillis(),
                        endDate: date.endOf('week').toMillis(),
                        specialtyId: group.specialtyId,
                    })

                    if (medicsData) {
                        const { data: schedules } = await triggerSchedulesRequest(group.specialtyId)
                        if (!appointments || !schedules) throw Error()
                        const rows = medicsData.filter(medic => group.rows.some(row => row.medic.medicId === medic.medicId)).map(medic => {
                            const schedule = schedules.find(schedule => schedule.medicId === medic.medicId)
                            return {
                                medic,
                                schedule,
                                appointments: appointments.filter(appointment => appointment.medicId === medic.medicId),
                            }
                        })
                        return {
                            ...group,
                            rows: rows,
                            changed: true,
                        }
                    } else return { ...group, changed: false }
                }))
                return groups.map(group => {
                    const newGroup = changedGroups.find(changedGroup => changedGroup.changed && changedGroup.specialtyId === group.specialtyId)
                    if (newGroup) return { group: newGroup, changed: true }
                    return { group, changed: false }
                })
            }
        }
        callback().then(result => {
            if (result && result.some(value => value.changed))
                setGroups(result.map(value => value.group))
        })
    }, [ date, groups, medicsData, triggerAppointmentsRequest, triggerSchedulesRequest ])

    const rootComponent = RootComponent as React.ComponentType<any>

    return (
        <Grid
            rows={ rows ? rows : [] }
            columns={ columns }
            getRowId={ (row: MedicScheduleRow) => row.medicId + row.specialtyId }
            rootComponent={ rootComponent }>
            <GroupingState
                grouping={ [ { columnName: 'specialtyName' } ] }
                onExpandedGroupsChange={ onGroupExpand }
            />
            <IntegratedGrouping/>
            <VirtualTable
                height={ 'auto' }
                estimatedRowHeight={ 53 }
                columnExtensions={ columnExtensions }
                messages={ { noData: groups ? 'Загрузка...' : 'Нет данных' } }
                containerComponent={ ContainerComponent }
                cellComponent={ CellComponent }
                headComponent={ HeadComponent }
                bodyComponent={ BodyComponent }
                stubCellComponent={ StubCellComponent }
                stubHeaderCellComponent={ StubCellComponent }/>
            <TableHeaderRow
                cellComponent={ HeaderCellComponent }/>
            <TableGroupRow cellComponent={ GroupCellComponent }/>
            <TableFixedColumns
                leftColumns={ leftColumn }
            />
        </Grid>
    )
}

ScheduleOverall.getLayout = function getLayout(page: ReactElement) {
    return (
        <ScheduleLayout>
            { page }
        </ScheduleLayout>
    )
}

export default ScheduleOverall