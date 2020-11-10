import React from 'react'
import styled from 'styled-components'

import robotLogo from '../assets/robot-logo.png'

import { medium } from '../constants/mediaQueries'
import { colors } from '../constants/theme'

const Container = styled.div`
    background-color: ${colors.background};
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

const Image = styled.img`
    height: 100px;
    width: 100px;
    object-fit: contain;
    
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
        <Image src={robotLogo} />
        <Content>
            {children}
        </Content>
    </Container>
)

export default Layout