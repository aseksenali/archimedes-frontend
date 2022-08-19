import { ChangeEvent, useState } from 'react'

const useInput = (initialValue: string) => {
    const [ value, setValue ] = useState(initialValue)
    return {
        value,
        setValue,
        reset: () => setValue(''),
        bind: {
            value,
            onChange: (event: ChangeEvent<HTMLInputElement>) => {
                setValue(event.currentTarget.value)
            },
        },
    }
}

export default useInput