import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    position: fixed;
    height: 100vh;
    width: 100vw;
    z-index: 99;
    background-color: rgba(0,0,0,0.5);
`

const ModalContainer = styled.div`
    max-width: 500px;
    max-height: 500px;
    margin: auto;
    margin-top: 60px;
    background-color: white;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    padding: 10px;
`

const Close = styled.button`
    border: none;
    align-self: flex-end;

    &:hover {
        cursor: pointer;
    }
`

const Title = styled.h1`
`

const Content = styled.div`
    overflow-y: scroll;
`

const Modal = ({ children, onClose, title }) => (
    <Container onClick={e => e.target.id === 'modal-background' && onClose()} id='modal-background'>
        <ModalContainer>
            <Close onClick={onClose}>x</Close>
            {title && (
                <Title>{title}</Title>
            )}
            <Content>
                {children}
            </Content>
        </ModalContainer>
    </Container>
)

export default Modal