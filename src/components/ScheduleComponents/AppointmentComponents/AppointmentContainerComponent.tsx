import * as React from 'react'
import { PropsWithChildren } from 'react'
import { Appointments } from '@devexpress/dx-react-scheduler-material-ui'

const AppointmentContainerComponent = ({
                                           style,
                                           children,
                                       }: PropsWithChildren<Appointments.ContainerProps>) => (
    <div style={ { ...style, width: `calc(${ style.width } + 1%)` } }>
        <div style={ { width: '90%', height: '100%', position: 'absolute' } }>
            { children }
        </div>
    </div>
)

export default AppointmentContainerComponent