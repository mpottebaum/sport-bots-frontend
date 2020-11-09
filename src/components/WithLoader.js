import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 30px;
    width: 100%;
    height: 100%;
`

import Spinner from 'react-bootstrap/Spinner'

const WithLoader = ({ children, loading }) => (
    loading ? (
        <Container>
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        </Container>
    ) : children
)

export default WithLoader