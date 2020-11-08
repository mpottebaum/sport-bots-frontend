import React from 'react'
import styled from 'styled-components'

import { medium } from '../constants/mediaQueries'

const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding-top: 10px;
    
    @media (min-width: ${medium}) {
        flex-direction: row;
        justify-content: center;
        padding-top: 30px;
    }
`

const Image = styled.div`
    height: 100px;
    width: 100px;
    background-color: black;
    
    @media (min-width: ${medium}) {
        height: 300px;
        width: 300px;
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