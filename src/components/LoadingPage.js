import React from 'react'
import styled from 'styled-components'

import robotLogo from '../assets/robot-logo.png'

import { medium } from '../constants/mediaQueries'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
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



const LoadingPage = () => (
    <Container>
        <Image src={robotLogo} />
        <p>Loading...</p>
    </Container>
)

export default LoadingPage