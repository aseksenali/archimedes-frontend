import * as React from 'react'
import { useCallback, useContext, useMemo, useRef } from 'react'
import classNames from 'clsx'
import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui'
import * as styled from './styles'
import { BeneficiariesContext } from '../../../pages/schedule/[medicId]'
import BeneficiaryInput from './BeneficiaryInput'
import { BeneficiaryData } from '../../../redux/reducers/beneficiaryApi'
import '../../../helpers/stringHelper'
import { DateTime } from 'luxon'

const FormLayoutComponent = ({
                                 children,
                                 getMessage,
                                 onFieldChange,
                                 appointmentData,
                                 fullSize,
                             }: AppointmentForm.BasicLayoutProps) => {
    const changeTitle = useCallback(title => onFieldChange({ title }), [ onFieldChange ])
    const changeComment = useCallback(comment => onFieldChange({ comment }), [ onFieldChange ])
    const changeBeneficiary = useCallback(beneficiary => onFieldChange({ beneficiary }), [ onFieldChange ])
    const beneficiaries = useContext<Array<BeneficiaryData> | undefined>(BeneficiariesContext)
    const inputRef = useRef<HTMLInputElement | null>(null)

    const startTime = useMemo(() => DateTime.fromJSDate(appointmentData.startDate as Date).toFormat('HH:mm'), [ appointmentData.startDate ])
    const endTime = useMemo(() => DateTime.fromJSDate(appointmentData.endDate as Date).toFormat('HH:mm'), [ appointmentData.endDate ])

    return (
        <styled.StyledDiv
            className={ classNames({
                fullSize: fullSize,
                halfSize: !fullSize,
            }) }
        >
            <styled.FormWrapper>
                {
                    beneficiaries && (
                        <>
                            <h3>{ getMessage && getMessage('detailsLabel') }</h3>
                            <BeneficiaryInput placeholder={ 'ИИН бенефициара' }
                                              possibleItems={ beneficiaries }
                                              inputRef={ inputRef }
                                              value={ appointmentData.beneficiary }
                                              onChange={ (value) => {
                                                  changeBeneficiary(value)
                                                  changeTitle(value.fullName)
                                              } }/>
                            <label style={ { height: '100%', display: 'flex', alignItems: 'center' } }>Контактный
                                номер:</label>
                            <styled.TextInput type={ 'text' }
                                              value={ appointmentData.beneficiary ? appointmentData.beneficiary.phoneNumber.asPhoneNumber() : '' }
                                              readOnly style={ { width: '10.8em' } }/>
                            <label style={ { height: '100%', display: 'flex', alignItems: 'center' } }>Дата записи:</label>
                            <div>
                                <styled.TextInput type={ 'text' }
                                                  value={ (appointmentData.startDate as Date).toLocaleDateString() }
                                                  readOnly style={ { width: '10.8em' } }/>
                            </div>
                            <label style={ { height: '100%', display: 'flex', alignItems: 'center' } }>Время записи:</label>
                            <div>
                                <styled.TextInput type={ 'text' } value={ startTime } readOnly
                                                  style={ { width: '7em', marginRight: '1em' } }/>
                                -
                                <styled.TextInput type={ 'text' } value={ endTime } readOnly
                                                  style={ { width: '7em', marginLeft: '1em' } }/>
                            </div>
                            <label style={ { height: '2em', display: 'flex', alignItems: 'center' } }>Заметки:</label>
                            <styled.TextArea value={ appointmentData.comment }
                                             onChange={ e => changeComment(e.target.value) } rows={ 11 }></styled.TextArea>
                        </>
                    )
                }
            </styled.FormWrapper>
            { children }
        </styled.StyledDiv>
    )
}

export default FormLayoutComponent