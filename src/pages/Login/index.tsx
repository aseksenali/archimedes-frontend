import React from 'react'
import LoginData from './types'
import { ButtonItem, Form, RequiredRule, SimpleItem } from 'devextreme-react/form'

const Login = () => {
    const loginInfo: LoginData = {
        login: '',
        password: '',
    }
    const handleSubmit = (e: any) => {
        alert(e.target.value())
        e.preventDefault()
    }

    return (
        <form action={ 'POST' } onSubmit={ handleSubmit }>
            <Form formData={ loginInfo } labelMode={ 'floating' } colCount={ 1 } width={ '30%' }>
                <SimpleItem dataField={ 'login' }>
                    <RequiredRule
                        message={ 'Login cannot be empty' }/>
                </SimpleItem>
                <SimpleItem dataField={ 'password' }
                            editorOptions={ {
                                mode: 'password',
                            } }>
                </SimpleItem>
                <ButtonItem horizontalAlignment={ 'left' } buttonOptions={ {
                    type: 'success',
                    useSubmitBehavior: true,
                    text: 'Login',
                } }></ButtonItem>
            </Form>
        </form>
    )
}
export default Login
