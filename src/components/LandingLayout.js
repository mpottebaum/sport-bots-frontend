import React from 'react'
import styled from 'styled-components'

import { medium } from '../constants/mediaQueries'

const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-top: 30px;

    @media (max-width: ${medium}) {
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
    }
`

const Image = styled.div`
    height: 300px;
    width: 300px;
    background-color: black;

    @media (max-width: ${medium}) {
        height: 100px;
        width: 100px;
    }
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 15px;
`

const Layout = ({ children,  }) => (
    <Container>
        <Image />
        <Content>
            {children}
        </Content>
    </Container>
)

export default Layout