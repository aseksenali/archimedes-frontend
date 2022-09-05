import React, { useState } from 'react'
import ModalWindow from '../ModalWindow'
import { MedicInfoFormData, MedicInfoModalWindowProps } from './types'
import ModalHeader from './ModalHeader'
import ModalBody from './ModalBody'

const MedicEditModalWindow = (props: MedicInfoModalWindowProps) => {
    const [ formData, updateFormData ] = useState<MedicInfoFormData | undefined>(props.medic ? {
        ...props.medic,
        dateOfBirth: props.medic.dateOfBirth?.toFormat('dd-MM-yyyy'),
        startDate: props.medic.startDate?.toFormat('dd-MM-yyyy'),
        endDate: props.medic.endDate?.toISODate(),
    } : undefined)

    if (!formData) return <></>

    return (
        <ModalWindow isOpen={ props.isOpen } onClose={ props.onClose }>
            <ModalHeader formData={ formData } onCloseClick={ props.onClose } onSaveClick={ () => {
            } }/>
            <ModalBody formData={ formData } updateFormData={ updateFormData } { ...props.medic }/>
        </ModalWindow>
    )
}

export default MedicEditModalWindow