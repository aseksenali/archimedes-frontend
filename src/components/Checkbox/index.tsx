import React, { forwardRef } from 'react'
import { CheckboxProps } from './types'
import styles from './Checkbox.module.scss'

const Checkbox = forwardRef((props: CheckboxProps, _) => {
    return (
        <div className={ styles.wrapper }>
            <input className={ styles.checkbox } { ...props } checked={ props.checked } type={ 'checkbox' } readOnly/>
            <label className={ styles.label }>
                <svg className={ styles.icon } viewBox="0 0 100 100">
                    <path className="box"
                          d="M82,89H18c-3.87,0-7-3.13-7-7V18c0-3.87,3.13-7,7-7h64c3.87,0,7,3.13,7,7v64C89,85.87,85.87,89,82,89z"/>
                    <polyline className={ styles.check } points="33.5,50.5 44.5,62.5 66.5,40.5 "
                              strokeLinecap={ 'round' }
                              strokeLinejoin={ 'round' }/>
                </svg>
                <span>{ props.label }</span>
            </label>
        </div>
    )
})

export default Checkbox