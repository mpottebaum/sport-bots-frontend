import React from 'react'
import useAuthInputs from '../hooks/useAuthInputs'
import useFetch from '../hooks/useFetch'
import { useHistory } from 'react-router-dom'
import routePaths from './Router/routePaths'
import { signUpAPI } from '../utils/apiRoutes'
import { TeamContext } from '../contexts/TeamContext'

import Layout from '../components/LandingLayout'
import TextInput from '../components/TextInput'
import PasswordInput from '../components/PasswordInput'
import Button from '../components/Button'

const SignUp = () => {
    const [ { name, email, password }, onChange ] = useAuthInputs()
    const { loading, fetchData } = useFetch()
    const { setTeamFromResp } = TeamContext

    const onSubmit = async e => {
        e.preventDefault()
        const body = {
            team: {
                name,
                email,
                password,
            }
        }
        const resp = await fetchData({
            url: signUpAPI,
            method: 'POST',
            body,
        })

        if(resp.token) {
            setTeamFromResp(resp)
        }
    }
    
    return (
        <Layout>
            <form onSubmit={onSubmit}>
                <TextInput
                    label={'Name'}
                    name={'name'}
                    onChange={onChange}
                    value={name}
                />
                <TextInput
                    label={'Email'}
                    name={'email'}
                    onChange={onChange}
                    value={email}
                    marginTop={15}
                />
                <PasswordInput
                    label={'Password'}
                    name={'password'}
                    onChange={onChange}
                    value={password}
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