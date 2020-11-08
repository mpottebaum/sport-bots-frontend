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
        padding-top: 30px;
    }
`

const Layout = ({ children }) => (
    <Container>
        {children}
    </Container>
)

export default Layout