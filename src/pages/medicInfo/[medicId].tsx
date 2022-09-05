import React, { ReactElement, useCallback, useEffect, useMemo, useState } from 'react'
import { useLazyGetMedicByIdQuery } from '../../redux/reducers/medicApi'
import { MedicData } from '../../interfaces/MedicData'
import styles from './MedicInfo.module.scss'
import MedicNameHeader from '../../components/MedicNameHeader'
import { useGetSpecialtiesQuery } from '../../redux/reducers/specialtyApi'
import MedicEditModalWindow from '../../components/MedicEditModalWindow'
import { useRouter } from 'next/router'
import MainPageLayout from '../../components/Layout/MainPageLayout'
import { Skeleton } from '@mui/material'
import '../../helpers/stringHelper'

const MedicInfoDetails = () => {
    const router = useRouter()
    const [ triggerMedicRequest ] = useLazyGetMedicByIdQuery()
    const { data: specialties } = useGetSpecialtiesQuery()
    const [ medicData, setMedicData ] = useState<MedicData | null>(null)
    const { medicId } = router.query
    const [ isEditModalOpen, setEditModalOpen ] = useState(false)

    const onBackClick = useCallback(() => router.push('/medicInfo'), [ router ])
    const openEditModalWindow = () => setEditModalOpen(true)
    const closeEditModalWindow = () => setEditModalOpen(false)
    const onFormSubmit = (formData: Partial<MedicData>) => {
    }

    useEffect(() => {
        const fetchData = async () => {
            if (medicId) {
                const { data: medic } = await triggerMedicRequest(medicId as string)
                if (medic) {
                    return { medic }
                } else throw Error()
            }
        }
        if (!medicData) {
            fetchData().then(result => result && setMedicData(result.medic))
        }
    })

    const rows = useMemo(() => [
        { name: 'ИИН', value: medicData?.medicIIN },
        { name: 'Пол', value: medicData && (medicData.isMale ? 'мужской' : 'женский') },
        {
            name: 'Дата рождения',
            value: medicData?.dateOfBirth?.toLocal().toLocaleString({ dateStyle: 'long' }) ?? '',
        },
        { name: 'Резидент', value: medicData && medicData.isResident ? 'да' : 'нет' },
        { name: 'Должность', value: medicData?.medicPosition },
        { name: 'Вид документа', value: medicData?.documentType },
        { name: 'Номер документа', value: medicData?.documentNumber },
        { name: 'Домашний телефон', value: medicData?.homePhoneNumber.asPhoneNumber() },
        { name: 'Рабочий телефон', value: medicData?.workPhoneNumber.asPhoneNumber() },
        { name: 'Мобильный телефон', value: medicData?.mobilePhoneNumber.asPhoneNumber() },
        { name: 'Домашний адрес', value: medicData?.address },
        { name: 'E-mail', value: medicData?.email },
        {
            name: 'Дата приема на работу',
            value: medicData?.startDate.toLocal().toLocaleString({ dateStyle: 'long' }),
        },
        {
            name: 'Дата увольнения',
            value: medicData?.endDate?.toLocal().toLocaleString({ dateStyle: 'long' }) ?? '',
        },
        { name: 'Вид занятости', value: medicData?.typeOfWork },
        {
            name: 'Специализации',
            value: medicData?.specialties.map(specialtyId => specialties && specialties.find(specialty => specialty.specialtyId === specialtyId)?.specialtyName).join(', '),
        },
    ] as Array<{ name: string, value: string }>, [ medicData, specialties ])

    return (
        <>
            <MedicNameHeader onBackClick={ onBackClick } onEditClick={ openEditModalWindow }
                             medic={ medicData ?? undefined }/>
            <table style={ { padding: '0 1.5em', width: '70%', height: '70%', color: 'var(--primary-color)' } }>
                <tbody>
                {
                    rows.map(row => (
                        <tr key={ row.name }>
                            <td className={ styles.cell }>{ row.name }:</td>
                            <td>{ row.value === undefined ? <Skeleton width={ 200 }/> : row.value }</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
            { isEditModalOpen && <MedicEditModalWindow isOpen={ isEditModalOpen } onClose={ closeEditModalWindow }
                                                       medic={ medicData ?? undefined } onSave={ onFormSubmit }/> }
        </>
    )
}

MedicInfoDetails.getLayout = function getLayout(page: ReactElement) {
    return (
        <MainPageLayout>
            { page }
        </MainPageLayout>
    )
}

export default MedicInfoDetails