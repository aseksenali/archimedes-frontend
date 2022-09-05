import React, { Dispatch, SetStateAction, useCallback, useMemo } from 'react'
import * as styled from './styles'
import LabeledInput from '../LabeledInput'
import { MedicInfoFormData } from './types'
import { LabeledInputProps } from '../LabeledInput/types'

const ModalBody = ({
                       formData,
                       updateFormData,
                   }: { formData: MedicInfoFormData, updateFormData: Dispatch<SetStateAction<MedicInfoFormData | undefined>> }) => {
    const [ surname, firstName, middleName ] = useMemo(() => {
        return formData.medicName.split(' ')
    }, [ formData.medicName ])

    const updateSurname = useCallback((value: string) =>
        updateFormData({
            ...formData,
            medicName: [ value, firstName, middleName ].join(' '),
        }), [ firstName, formData, middleName, updateFormData ])
    const updateFirstName = useCallback((value: string) =>
        updateFormData({
            ...formData,
            medicName: [ surname, value, middleName ].join(' '),
        }), [ formData, middleName, surname, updateFormData ])
    const updateMiddleName = useCallback((value: string) =>
        updateFormData({
            ...formData,
            medicName: [ surname, firstName, value ].join(' '),
        }), [ firstName, formData, surname, updateFormData ])

    const leftInputs: Array<LabeledInputProps> = useMemo(() => [
        {
            label: 'Фамилия:',
            inputValue: surname,
            onInputChange: updateSurname,
            inputWidth: '30em',
            inputType: 'text',
            inputPlaceholder: '',
        },
        {
            label: 'Имя:',
            inputValue: firstName,
            onInputChange: updateFirstName,
            inputWidth: '30em',
            inputType: 'text',
            inputPlaceholder: '',
        },
        {
            label: 'Отчество:',
            inputValue: middleName,
            onInputChange: updateMiddleName,
            inputWidth: '30em',
            inputType: 'text',
            inputPlaceholder: '',
        },
        {
            label: 'Должность:',
            inputValue: formData.medicPosition,
            onInputChange: medicPosition => updateFormData({
                ...formData,
                medicPosition,
            }),
            inputWidth: '30em',
            inputType: 'text',
            inputPlaceholder: '',
        },
        {
            label: 'Вид документа:',
            inputValue: formData.documentType,
            onInputChange: documentType => updateFormData({
                ...formData,
                documentType,
            }),
            inputWidth: '30em',
            inputType: 'select',
            selectOptions: [ 'Удостоверение личности', 'Паспорт' ],
            inputPlaceholder: '',
        },
        {
            label: 'Номер документа:',
            inputValue: formData.documentNumber,
            onInputChange: documentNumber => updateFormData({ ...formData, documentNumber }),
            inputWidth: '15em',
            inputType: 'text',
            inputPlaceholder: '',
        },
        {
            label: 'Домашний телефон:',
            inputValue: formData.homePhoneNumber,
            onInputChange: homePhoneNumber => updateFormData({
                ...formData,
                homePhoneNumber,
            }),
            inputWidth: '30em',
            inputType: 'text',
            inputMask: '+9 (999) 999-99-99',
            inputPlaceholder: '+_ (___) ___-__-__',
        },
        {
            label: 'Рабочий телефон:',
            inputValue: formData.workPhoneNumber,
            onInputChange: workPhoneNumber => updateFormData({
                ...formData,
                workPhoneNumber,
            }),
            inputWidth: '30em',
            inputType: 'text',
            inputMask: '+9 (999) 999-99-99',
            inputPlaceholder: '+_ (___) ___-__-__',
        },
        {
            label: 'Мобильный телефон:',
            inputValue: formData.mobilePhoneNumber,
            onInputChange: mobilePhoneNumber => updateFormData({
                ...formData,
                mobilePhoneNumber,
            }),
            inputWidth: '30em',
            inputType: 'text',
            inputMask: '+9 (999) 999-99-99',
            inputPlaceholder: '+_ (___) ___-__-__',
        },
        {
            label: 'E-mail:',
            inputValue: formData.email,
            onInputChange: email => updateFormData({ ...formData, email }),
            inputWidth: '30em',
            inputType: 'text',
            inputPlaceholder: 'example@email.com',
        },
    ], [ firstName, formData, middleName, surname, updateFirstName, updateFormData, updateMiddleName, updateSurname ])
    const rightInputs: Array<LabeledInputProps> = useMemo(() => [
        {
            label: 'ИИН:',
            inputValue: formData.medicIIN,
            onInputChange: medicIIN => updateFormData({ ...formData, medicIIN }),
            inputWidth: '15em',
            inputType: 'text',
            inputPlaceholder: 'ИИН',
        },
        {
            label: 'Пол:',
            inputValue: formData.isMale ? 'Мужской' : 'Женский',
            onInputChange: gender => updateFormData({
                ...formData,
                isMale: gender === 'Мужской',
            }),
            inputWidth: '15em',
            inputType: 'select',
            selectOptions: [ 'Мужской', 'Женский' ],
            inputPlaceholder: '',
        },
        {
            label: 'Дата рождения:',
            inputValue: formData.dateOfBirth,
            onInputChange: dateOfBirth => updateFormData({ ...formData, dateOfBirth }),
            inputWidth: '15em',
            inputType: 'text',
            inputMask: '99-99-9999',
            inputPlaceholder: 'дд-мм-гггг',
        },
        {
            label: 'Резидент:',
            inputValue: formData.isResident ? 'Да' : 'Нет',
            onInputChange: resident => updateFormData({
                ...formData,
                isResident: resident === 'Да',
            }),
            inputWidth: '15em',
            inputType: 'select',
            inputPlaceholder: '',
            selectOptions: [ 'Да', 'Нет' ],
        },
        {
            label: 'Дата приема на работу:',
            inputValue: formData.startDate.replace('-', ''),
            onInputChange: startDate => updateFormData({ ...formData, startDate }),
            inputWidth: '15em',
            inputType: 'text',
            inputMask: '99-99-9999',
            inputPlaceholder: 'дд-мм-гггг',
        },
        {
            label: 'Дата увольнения:',
            inputValue: formData.endDate?.replace('-', '') ?? '',
            onInputChange: endDate => updateFormData({ ...formData, endDate }),
            inputWidth: '15em',
            inputType: 'text',
            inputMask: '99-99-9999',
            inputPlaceholder: 'дд-мм-гггг',
        },
        {
            label: 'Вид занятости:',
            inputValue: formData.typeOfWork,
            onInputChange: typeOfWork => updateFormData({ ...formData, typeOfWork }),
            inputWidth: '15em',
            inputType: 'select',
            inputPlaceholder: '',
            selectOptions: [ 'ГПХ', 'В штате' ],
        },
    ], [ formData, updateFormData ])
    return (
        <styled.ModalBodyWrapper>
            <styled.TwoColumnInputs>
                <styled.InputColumn style={ { width: '60%' } }>
                    { leftInputs.map(input => <LabeledInput { ...input } key={ input.label }/>) }
                </styled.InputColumn>
                <styled.InputColumn style={ { width: '40%' } }>
                    { rightInputs.map(input => <LabeledInput { ...input } key={ input.label }/>) }
                </styled.InputColumn>
            </styled.TwoColumnInputs>
            <LabeledInput label={ 'Адрес:' } inputValue={ formData.address } inputWidth={ '100%' }
                          inputPlaceholder={ 'город, район, улица, дом, номер квартиры' } inputType={ 'text' }
                          onInputChange={ address => updateFormData({ ...formData, address }) }/>

        </styled.ModalBodyWrapper>
    )
}

export default ModalBody