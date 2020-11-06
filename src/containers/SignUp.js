import React from 'react'
import { useHistory } from 'react-router-dom'
import routePaths from './Router/routePaths'

import Layout from '../components/LandingLayout'
import TextInput from '../components/TextInput'
import Button from '../components/Button'

const SignUp = () => {
    return (
        <Layout>
            <form>
                <TextInput
                    label={'Name'}
                />
                <TextInput
                    label={'Email'}
                    marginTop={15}
                />
                <Button type={'submit'} marginTop={15}>
                    CREATE TEAM
                </Button>
            </form>
        </Layout>
    )
}

export default SignUp