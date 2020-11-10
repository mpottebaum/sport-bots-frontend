import React from 'react'
import styled from 'styled-components'

import Modal from '../cmps/Modal'
import Button from '../../../components/Button'

const Container = styled.ul`
    li {
        display: block;
    }
`

const Errors = ({ errors, onClose }) => (
    <Modal onClose={onClose} title={'ERRORS'}>
        <Container>
            {errors && (
                errors.map(error => <li>{error}</li>)
            )}
        </Container>
        <Button onClick={onClose}>OK</Button>
    </Modal>
)

export default Errors