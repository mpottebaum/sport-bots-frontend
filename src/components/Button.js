import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.button`
    background-color: blue;
    border: none;
    padding: 10px;
    margin-top: ${({ marginTop }) => marginTop}px;
    border-radius: 5px;
    width: 200px;

    &:hover {
        cursor: pointer;
        opacity: 0.9;
    }
`

const Button = ({ children, onClick, disabled, marginTop=0 }) => (
    <Container onClick={onClick} disabled={disabled} marginTop={marginTop}>
        {children}
    </Container>
)

export default Button