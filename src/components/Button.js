import React from 'react'
import styled from 'styled-components'

const Container = styled.button`
    background-color: ${({ secondary }) => secondary ? 'gray' : 'blue'};
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

const Button = ({
    children,
    onClick,
    disabled,
    type = 'button',
    marginTop = 0,
    secondary = false,
    loading = false,
}) => (
    <Container
        onClick={onClick}
        disabled={disabled || loading}
        type={type}
        marginTop={marginTop}
        secondary={secondary}
    >
        {loading ? 'Loading' : children}
    </Container>
)

export default Button