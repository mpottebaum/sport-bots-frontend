import React, { useState } from 'react'

import TextInput from '../../../components/TextInput'
import Button from '../../../components/Button'
import ButtonContainer from './ButtonContainer'

const TeamItem = ({
    label,
    name,
    inputValue,
    teamValue,
    onChange,
    onSubmit,
    loading,
    spaced = false
}) => {
    const [ isEditing, setIsEditing ] = useState(false)
    const onSubmitForm = async e => {
        e.preventDefault()
        await onSubmit(name, inputValue)
        setIsEditing(false)
    }
    return (
        isEditing ? (
            <form onSubmit={onSubmitForm}>
                <TextInput
                    label={label}
                    name={name}
                    onChange={onChange}
                    value={inputValue}
                    marginTop={spaced ? 15 : 0}
                />
                <ButtonContainer>
                    <Button type={'submit'} marginTop={15} loading={loading}>
                        UPDATE {label.toUpperCase()}
                    </Button>
                    <Button onClick={() => setIsEditing(false)} type={'button'} marginTop={15} secondary>
                        CANCEL
                    </Button>
                </ButtonContainer>
            </form>
        ) : (
            <>
                <h3>{label}: {teamValue}</h3>
                <Button onClick={() => setIsEditing(true)}>EDIT</Button>
            </>
        )
    )
}

export default TeamItem