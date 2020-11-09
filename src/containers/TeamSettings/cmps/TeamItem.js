import React, { useState } from 'react'

import TextInput from '../../../components/TextInput'
import Button from '../../../components/Button'

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
                <Button type={'submit'} marginTop={15} loading={loading}>
                    UPDATE {label.toUpperCase()}
                </Button>
            </form>
        ) : (
            <>
                <h3>{label}: {teamValue}</h3>
                <Button onClick={() => setIsEditing(true)} secondary> EDIT</Button>
            </>
        )
    )
}

export default TeamItem