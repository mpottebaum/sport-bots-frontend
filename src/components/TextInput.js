import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    margin-top: ${({ marginTop }) => marginTop}px;
`
const Label = styled.label``

const Input = styled.input`
    width: 100%;
`

const TextInput = ({ onChange, value, label, name, marginTop=0 }) => (
    <Container marginTop={marginTop}>
        { label && (
            <Label htmlFor={name || label}>{label}</Label>
        )}
        <Input onChange={onChange} value={value} name={name || label} />
    </Container>
)

export default TextInput