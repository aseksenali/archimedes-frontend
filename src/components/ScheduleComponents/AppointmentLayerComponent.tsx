import { styled } from '@mui/material/styles'
import { PropsWithChildren } from 'react'

const ContainerBase = ({ children, ...restProps }: PropsWithChildren<any>) => {
    return (
        <div { ...restProps }>
            { children }
        </div>
    )
}

const AppointmentLayerComponent = styled(ContainerBase)`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
`

export default AppointmentLayerComponent