import React, { createContext, ReactElement, useContext, useEffect, useMemo, useState } from 'react'
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
import { ScheduleOutletContext } from './types'
import { useLazyGetScheduleByMedicIdQuery } from '../../redux/reducers/scheduleApi'
import { useLazyGetMedicByIdQuery } from '../../redux/reducers/medicApi'
import { MedicData } from '../../interfaces/MedicData'
import { MedicSchedule } from '../../interfaces/MedicSchedule'
import {
    AppointmentLayerComponent,
    DayScaleCellComponent,
    DayScaleEmptyCellComponent,
    MainLayoutComponent,
    RootComponent,
    TimeScaleLabelComponent,
    TimeScaleLayoutComponent,
    TimeScaleTickCellComponent,
    TimeTableCellComponent,
} from '../../components/ScheduleComponents'
import AppointmentComponent from '../../components/ScheduleComponents/AppointmentComponents/AppointmentComponent'
import HeaderComponent from '../../components/ScheduleComponents/AppointmentComponents/HeaderComponent'
import CommandButtonComponent from '../../components/ScheduleComponents/AppointmentComponents/CommandButtonComponent'
import ContentComponent from '../../components/ScheduleComponents/AppointmentComponents/ContentComponent'
import AppointmentContentComponent
    from '../../components/ScheduleComponents/AppointmentComponents/AppointmentContentComponent'
import FormCommandButtonComponent from '../../components/ScheduleComponents/EditFormComponents/CommandButtonComponent'
import { useLazyGetAppointmentsByMedicIdQuery } from '../../redux/reducers/appointmentApi'
import { BeneficiaryData, useLazyGetBeneficiariesQuery } from '../../redux/reducers/beneficiaryApi'
import AppointmentContainerComponent
    from '../../components/ScheduleComponents/AppointmentComponents/AppointmentContainerComponent'
import { DateTime } from 'luxon'
import '../../helpers/dateHelper'
import FormLayoutComponent from '../../components/ScheduleComponents/EditFormComponents/FormLayoutComponent'
import CommandLayoutComponent from '../../components/ScheduleComponents/EditFormComponents/CommandLayoutComponent'
import MedicNameHeader from '../../components/MedicNameHeader'
import { useRouter } from 'next/router'
import ScheduleLayout, { ScheduleContext } from '../../components/Layout/ScheduleLayout'

export const BeneficiariesContext = createContext<Array<BeneficiaryData> | undefined>(undefined)
export const TimeTableScheduleContext = createContext<MedicSchedule | undefined>(undefined)

const FormLayoutWrapper = (data: Array<BeneficiaryData>) => (props: AppointmentForm.BasicLayoutProps) => {
    return (
        <BeneficiariesContext.Provider value={ data }>
            <FormLayoutComponent { ...props }/>
        </BeneficiariesContext.Provider>
    )
}

const ScheduleDetails = (_: {}) => {
    const router = useRouter()
    const { medicId } = router.query
    const [ triggerAppointmentsRequest ] = useLazyGetAppointmentsByMedicIdQuery()
    const [ triggerScheduleRequest ] = useLazyGetScheduleByMedicIdQuery()
    const [ triggerMedicRequest ] = useLazyGetMedicByIdQuery()
    const [ triggerBeneficiariesRequest ] = useLazyGetBeneficiariesQuery()
    const [ medic, setMedic ] = useState<MedicData>()
    const [ schedule, setSchedule ] = useState<MedicSchedule | undefined>()
    const [ appointments, setAppointments ] = useState<Array<AppointmentModel>>()
    const [ beneficiaries, setBeneficiaries ] = useState<Array<BeneficiaryData>>()
    const data = useContext<ScheduleOutletContext | null>(ScheduleContext)

    const { date } = data || { date: DateTime.now() }

    useEffect(() => {
        const fetchData = async () => {
            if (medicId) {
                const { data: schedule } = await triggerScheduleRequest(medicId as string)
                const { data: medic } = await triggerMedicRequest(medicId as string)
                const { data: appointments } = await triggerAppointmentsRequest({
                    startDate: date.startOf('week').toJSDate().getTime(),
                    endDate: date.endOf('week').toJSDate().getTime(),
                    medicId: medicId as string,
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

    const onBackClick = () => router.push('/schedule')

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

    const rootComponent = RootComponent as React.ComponentType<any>
    return (
        <>
            <MedicNameHeader onBackClick={ onBackClick } onEditClick={ () => {
            } } medic={ medic }/>
            <TimeTableScheduleContext.Provider value={ schedule }>
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
                        timeTableCellComponent={ TimeTableCellComponent }
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
            </TimeTableScheduleContext.Provider>
        </>
    )
}

ScheduleDetails.getLayout = function getLayout(page: ReactElement) {
    return (
        <ScheduleLayout>
            { page }
        </ScheduleLayout>
    )
}

export default ScheduleDetails