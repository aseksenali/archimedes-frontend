import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import {
    AppointmentForm,
    Appointments,
    AppointmentTooltip,
    ConfirmationDialog,
    CurrentTimeIndicator,
    Scheduler,
    WeekView,
} from '@devexpress/dx-react-scheduler-material-ui'
import { AppointmentModel, EditingState, IntegratedEditing, ViewState } from '@devexpress/dx-react-scheduler'
import { useOutletContext, useParams } from 'react-router'
import { ScheduleOutletContext } from '../types'
import { useLazyGetScheduleByMedicIdQuery } from '../../../redux/reducers/scheduleApi'
import { useLazyGetMedicByIdQuery } from '../../../redux/reducers/medicApi'
import { MedicData } from '../../../interfaces/MedicData'
import { MedicSchedule } from '../../../interfaces/MedicSchedule'
import { useNavigate } from 'react-router-dom'
import {
    AppointmentLayerComponent,
    DayScaleEmptyCellComponent,
    RootComponent,
    TimeTableCellComponent,
} from '../../../components/ScheduleComponents'
import ScheduleHeader from './ScheduleHeader'
import DayScaleCellComponent from '../../../components/ScheduleComponents/DayScaleCellComponent'
import MainLayoutComponent from '../../../components/ScheduleComponents/MainLayoutComponent'
import TimeScaleTickCellComponent from '../../../components/ScheduleComponents/TimeScaleTickCellComponent'
import TimeScaleLabelComponent from '../../../components/ScheduleComponents/TimeScaleLabelComponent'
import TimeScaleLayoutComponent from '../../../components/ScheduleComponents/TimeScaleLayoutComponent'
import AppointmentComponent from '../../../components/ScheduleComponents/AppointmentComponents/AppointmentComponent'
import HeaderComponent from '../../../components/ScheduleComponents/AppointmentComponents/HeaderComponent'
import CommandButtonComponent from '../../../components/ScheduleComponents/AppointmentComponents/CommandButtonComponent'
import ContentComponent from '../../../components/ScheduleComponents/AppointmentComponents/ContentComponent'
import AppointmentContentComponent
    from '../../../components/ScheduleComponents/AppointmentComponents/AppointmentContentComponent'
import FormCommandButtonComponent
    from '../../../components/ScheduleComponents/EditFormComponents/CommandButtonComponent'
import { useLazyGetAppointmentsByMedicIdQuery } from '../../../redux/reducers/appointmentApi'
import { BeneficiaryData, useLazyGetBeneficiariesQuery } from '../../../redux/reducers/beneficiaryApi'
import AppointmentContainerComponent
    from '../../../components/ScheduleComponents/AppointmentComponents/AppointmentContainerComponent'
import { DateTime } from 'luxon'
import '../../../helpers/dateHelper'
import FormLayoutComponent from '../../../components/ScheduleComponents/EditFormComponents/FormLayoutComponent'
import CommandLayoutComponent from '../../../components/ScheduleComponents/EditFormComponents/CommandLayoutComponent'

export const BeneficiariesContext = createContext<Array<BeneficiaryData> | undefined>(undefined)

const FormLayoutWrapper = (data: Array<BeneficiaryData>) => (props: AppointmentForm.BasicLayoutProps) => {
    return (
        <BeneficiariesContext.Provider value={ data }>
            <FormLayoutComponent { ...props }/>
        </BeneficiariesContext.Provider>
    )
}

const ScheduleDetails = (_: {}) => {
    const { medicId } = useParams<string>()
    const navigate = useNavigate()
    const [ triggerAppointmentsRequest ] = useLazyGetAppointmentsByMedicIdQuery()
    const [ triggerScheduleRequest ] = useLazyGetScheduleByMedicIdQuery()
    const [ triggerMedicRequest ] = useLazyGetMedicByIdQuery()
    const [ triggerBeneficiariesRequest ] = useLazyGetBeneficiariesQuery()
    const [ medic, setMedic ] = useState<MedicData>()
    const [ schedule, setSchedule ] = useState<MedicSchedule>()
    const [ appointments, setAppointments ] = useState<Array<AppointmentModel>>()
    const [ beneficiaries, setBeneficiaries ] = useState<Array<BeneficiaryData>>()
    const { date } = useOutletContext<ScheduleOutletContext>()

    useEffect(() => {
        const fetchData = async () => {
            if (medicId) {
                const { data: schedule } = await triggerScheduleRequest(medicId)
                const { data: medic } = await triggerMedicRequest(medicId)
                const { data: appointments } = await triggerAppointmentsRequest({
                    startDate: date.startOf('week').toJSDate().getTime(),
                    endDate: date.endOf('week').toJSDate().getTime(),
                    medicId,
                })
                const { data: beneficiaries } = await triggerBeneficiariesRequest()
                if (schedule && medic && appointments && beneficiaries) {
                    const newAppointments = appointments.map(appointment => {
                        const beneficiary = beneficiaries.find(beneficiary => beneficiary.beneficiaryId === appointment.beneficiaryId)
                        return {
                            ...appointment,
                            title: beneficiary && beneficiary.fullName,
                            beneficiary: beneficiary,
                            startDate: new Date(appointment.startDate),
                            endDate: appointment.endDate && new Date(appointment.endDate),
                        }
                    })
                    return { schedule, medic, newAppointments, beneficiaries }
                } else throw Error()
            }
        }
        fetchData().then((result) => {
            if (result) {
                setSchedule(result.schedule)
                setMedic(result.medic)
                setAppointments(result.newAppointments)
                setBeneficiaries(result.beneficiaries)
            }
        })
    }, [ date, medicId, triggerAppointmentsRequest, triggerBeneficiariesRequest, triggerMedicRequest, triggerScheduleRequest ])

    const onBackClick = () => navigate('/views/schedule')

    const workingScheduleLimits = useMemo(() => {
            if (schedule) {
                const startHours = [] as Array<DateTime>
                const endHours = [] as Array<DateTime>
                for (const scheduleWeekDay of Object.keys(schedule.workingDays) as Array<keyof typeof schedule.workingDays>) {
                    const week = date.startOf('week').until(date.endOf('week'))
                    if (schedule.specialDays.some(specialDay => week.contains(DateTime.fromISO(specialDay.date)) && DateTime.fromISO(specialDay.date))) {

                    }
                    const workingHours = schedule.workingDays[scheduleWeekDay]
                    if (workingHours !== undefined) {
                        startHours.push(DateTime.fromISO(workingHours.startTime, { zone: 'utc' }))
                        endHours.push(DateTime.fromISO(workingHours.endTime, { zone: 'utc' }))
                    }
                }
                return { startTime: DateTime.min(...startHours).hour, endTime: DateTime.max(...endHours).hour }
            }
            return undefined
        }, [ date, schedule ],
    )

    const isWorkingHours = useCallback((cellStartDate?: Date, cellEndDate?: Date) => {
        if (schedule && cellStartDate && cellEndDate) {
            const startTime = DateTime.fromJSDate(cellStartDate).convertToUTC()
            const isHoliday = startTime.isHoliday(schedule.holidays)
            const specialDaySchedule = startTime.findSpecialDay(schedule.specialDays)
            if (isHoliday) return false
            if (specialDaySchedule) return specialDaySchedule.contains(startTime)
            const workingHours = startTime.findWorkingHours(schedule.workingDays)
            return workingHours ? workingHours.contains(startTime) : false
        } else return true
    }, [ schedule ])

    const timeTableCellComponent = useMemo(() => TimeTableCellComponent(isWorkingHours), [ isWorkingHours ])

    const rootComponent = RootComponent as React.ComponentType<any>
    return (
        <>
            <ScheduleHeader onBackClick={ onBackClick } medic={ medic }/>
            <Scheduler
                rootComponent={ rootComponent }
                data={ appointments }
                locale={ 'ru-RU' }
                firstDayOfWeek={ 1 }>
                <ViewState
                    currentDate={ date.toJSDate() }/>
                <EditingState onCommitChanges={ changes => {
                } }/>
                <IntegratedEditing/>
                <WeekView
                    cellDuration={ schedule ? schedule && schedule.minimalAppointmentPeriod : 30 }
                    startDayHour={ workingScheduleLimits ? workingScheduleLimits.startTime : 0 }
                    endDayHour={ workingScheduleLimits ? workingScheduleLimits.endTime : 24 }
                    timeTableCellComponent={ timeTableCellComponent }
                    dayScaleCellComponent={ DayScaleCellComponent }
                    appointmentLayerComponent={ AppointmentLayerComponent }
                    dayScaleEmptyCellComponent={ DayScaleEmptyCellComponent }
                    layoutComponent={ MainLayoutComponent }
                    timeScaleTickCellComponent={ TimeScaleTickCellComponent }
                    timeScaleLabelComponent={ TimeScaleLabelComponent }
                    timeScaleLayoutComponent={ TimeScaleLayoutComponent }
                />
                <Appointments
                    appointmentComponent={ AppointmentComponent }
                    appointmentContentComponent={ AppointmentContentComponent }
                    containerComponent={ AppointmentContainerComponent }
                />
                <ConfirmationDialog
                    ignoreCancel
                />
                <AppointmentTooltip
                    headerComponent={ HeaderComponent }
                    commandButtonComponent={ CommandButtonComponent }
                    contentComponent={ ContentComponent }
                    showCloseButton
                    showOpenButton
                />
                <AppointmentForm
                    messages={ { commitCommand: 'Сохранить', detailsLabel: 'Детали записи' } }
                    commandButtonComponent={ FormCommandButtonComponent }
                    commandLayoutComponent={ CommandLayoutComponent }
                    basicLayoutComponent={ beneficiaries && FormLayoutWrapper(beneficiaries) }
                />
                <CurrentTimeIndicator
                    shadePreviousCells={ true }
                    shadePreviousAppointments={ true }
                    updateInterval={ 10000 }
                />
            </Scheduler>
        </>
    )
}

export default ScheduleDetails