import React, { useState } from 'react'
import styled from 'styled-components'

import Button from '../../../components/Button'
import PasswordInput from '../../../components/PasswordInput'

const ChangeContainer = styled.form`
    max-width: 400px;
`

const ChangePassword = ({
    inputValue = '',
    onChange,
    onSubmit,
    loading,
}) => {
    const [ changePassword, setChangePassword ] = useState(false)

    const onPasswordSubmit = e => {
        e.preventDefault()
        onSubmit('password', inputValue)
        setChangePassword(false)
    }
    return (
        changePassword ? (
            <ChangeContainer onSubmit={onPasswordSubmit}>
                <PasswordInput
                    onChange={onChange}
                    value={inputValue}
                    name={'password'}
                    marginTop={20}
                />
                <Button type={'submit'} loading={loading}>
                    CONFIRM
                </Button>
            </ChangeContainer>
        ) : (
            <Button onClick={() => setChangePassword(true)} marginTop={20}>
                CHANGE PASSWORD
            </Button>
        )
    )
}

export default ChangePassword