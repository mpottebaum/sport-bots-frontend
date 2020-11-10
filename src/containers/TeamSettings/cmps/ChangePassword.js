import React, { useState } from 'react'
import styled from 'styled-components'

import Button from '../../../components/Button'
import PasswordInput from '../../../components/PasswordInput'
import ButtonContainer from './ButtonContainer'

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
                <ButtonContainer>
                    <Button type={'submit'} loading={loading} marginTop={15}>
                        CONFIRM
                    </Button>
                    <Button onClick={() => setChangePassword(false)} secondary marginTop={15}>
                        CANCEL
                    </Button>
                </ButtonContainer>
            </ChangeContainer>
        ) : (
            <Button onClick={() => setChangePassword(true)} marginTop={20} secondary>
                CHANGE PASSWORD
            </Button>
        )
    )
}

export default ChangePassword