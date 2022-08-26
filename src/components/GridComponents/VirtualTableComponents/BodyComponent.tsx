import React, { PropsWithChildren } from 'react'

const BodyComponent = (props: PropsWithChildren<any>) => {
    return (
        <tbody>
        { props.children }
        </tbody>
    )
}

export default BodyComponent