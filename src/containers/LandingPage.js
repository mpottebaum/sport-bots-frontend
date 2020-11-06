import React from 'react'
import styled from 'styled-components'

const Layout = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
`

const Graphic = styled.div`
    height: 400px;
    width: 400px;
    background-color: black;
`

const LandingPage = () => (
    <Layout>
        <Graphic />
    </Layout>
)

export default LandingPage