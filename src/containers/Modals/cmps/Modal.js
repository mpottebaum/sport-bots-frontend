import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    position: fixed;
    height: 100vh;
    width: 100vw;
    z-index: 99;
    background-color: rgba(0,0,0,0.5);
`

const Content = styled.div`
    max-width: 500px;
    max-height: 500px;
    margin: auto;
    background-color: white;
    overflow-y: scroll;
    border-radius: 8px;
`

const Modal = ({ children }) => (
    <Container>
        <Content>
            {children}
        </Content>
    </Container>
)

export default Modal