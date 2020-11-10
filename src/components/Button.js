import React from 'react'
import styled from 'styled-components'

import { colors } from '../constants/theme'

import Spinner from 'react-bootstrap/Spinner'

const Container = styled.button`
    background-color: ${({ secondary, disabled }) => {
        if(disabled) {
            return colors.disabled
        }
        if(secondary) {
            return colors.secondary
        }
        return colors.primary
    }};
    border: none;
    padding: 10px;
    margin-top: ${({ marginTop }) => marginTop}px;
    margin-bottom: ${({ marginBottom }) => marginBottom}px;
    border-radius: 5px;
    width: 200px;
    font-size: 0.9rem;

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
    marginBottom = 0,
    secondary = false,
    loading = false,
}) => (
    <Container
        onClick={onClick}
        disabled={disabled || loading}
        type={type}
        marginTop={marginTop}
        marginBottom={marginBottom}
        secondary={secondary}
    >
        {loading ? (
            <Spinner size="sm" animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        ) : children}
    </Container>
)

export default Button