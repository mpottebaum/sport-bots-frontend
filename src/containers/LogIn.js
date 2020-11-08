import React, { useContext, useEffect } from 'react'
import useAuthInputs from '../hooks/useAuthInputs'
import useFetch from '../hooks/useFetch'
import { useHistory } from 'react-router-dom'
import routePaths from './Router/routePaths'
import { authAPI } from '../utils/apiRoutes'
import { TeamContext } from '../contexts/TeamContext'
import { useDispatch } from 'react-redux'
import { openModal } from '../store/modal/actions'
import modalTypes from './Modals/modalTypes'
import { setErrors } from '../store/errors/actions'

import Layout from '../components/LandingLayout'
import TextInput from '../components/TextInput'
import PasswordInput from '../components/PasswordInput'
import Button from '../components/Button'

const LogIn = () => {
    const [ { email, password }, onChange, resetInputs ] = useAuthInputs()
    const { loading, errors, fetchData } = useFetch()
    const { team, setTeamFromResp } = useContext(TeamContext)
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        if(team) {
            history.push(routePaths.Roster)
        }
    }, [team])

    useEffect(() => {
        if(errors) {
            dispatch(setErrors(errors))
            dispatch(openModal(modalTypes.Errors))
            resetInputs()
        }
    }, [errors])

    const onSubmit = async e => {
        e.preventDefault()
        const body = {
            team: {
                email,
                password,
            }
        }
        const resp = await fetchData({
            url: authAPI,
            method: 'POST',
            body,
        })

        if(resp.token) {
            setTeamFromResp(resp)
            history.push(routePaths.Roster)
        }
    }
    
    return (
        <Layout>
            <form onSubmit={onSubmit}>
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
                <Button type={'submit'} marginTop={15} loading={loading}>
                    LOG IN
                </Button>
            </form>
        </Layout>
    )
}

export default LogIn