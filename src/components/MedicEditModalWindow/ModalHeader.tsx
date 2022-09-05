import React from 'react'
import * as styled from './styles'
import { MedicInfoFormData } from './types'
import { Icon } from '../icons'

const ModalHeader = (props: { onCloseClick: () => void, onSaveClick: (data: MedicInfoFormData) => void, formData: MedicInfoFormData }) => {
    return (
        <styled.ModalHeaderWrapper>
            <span>Редактирование информации о враче</span>
            <styled.ButtonWrapper>
                <styled.SaveButton onClick={ () => props.onSaveClick(props.formData) }>Сохранить</styled.SaveButton>
                <styled.CloseButton onClick={ props.onCloseClick }>
                    <Icon icon={ 'cross' } style={ { width: '1em', height: '1em', fill: 'var(--primary-color)' } }/>
                </styled.CloseButton>
            </styled.ButtonWrapper>
        </styled.ModalHeaderWrapper>
    )
}

export default ModalHeader