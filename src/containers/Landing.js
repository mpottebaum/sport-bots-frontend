import React from 'react'
import { useHistory } from 'react-router-dom'
import routePaths from './Router/routePaths'

import Layout from '../components/LandingLayout'
import Button from '../components/Button'

const LandingPage = () => {
    const history = useHistory()

    return (
        <Layout>
            <Button onClick={() => history.push(routePaths.SignUp)}>
                CREATE NEW TEAM
            </Button>
            <Button onClick={() => history.push(routePaths.LogIn)} marginTop={15}>
                LOG IN
            </Button>
        </Layout>
    )
}


export default LandingPage