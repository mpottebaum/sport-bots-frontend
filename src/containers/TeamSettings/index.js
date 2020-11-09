import React, { useContext, useEffect } from 'react'
import useAuthInputs from '../../hooks/useAuthInputs'
import useFetch from '../../hooks/useFetch'
import { useHistory } from 'react-router-dom'
import routePaths from '../Router/routePaths'
import { teamWithIdAPI } from '../../utils/apiRoutes'
import { TeamContext } from '../../contexts/TeamContext'
import { useDispatch } from 'react-redux'
import { openModal } from '../../store/modal/actions'
import modalTypes from '../Modals/modalTypes'
import { setErrors } from '../../store/errors/actions'

import Layout from '../../components/Layout'
import Button from '../../components/Button'

import TeamItem from './cmps/TeamItem'
import ChangePassword from './cmps/ChangePassword'

const TeamSettings = () => {
    const { team, setTeamFromResp } = useContext(TeamContext)
    const { loading, errors, fetchData } = useFetch()
    const [ { name, email, password }, onChange, resetInputs ] = useAuthInputs()
    const history = useHistory()
    const dispatch = useDispatch()


    useEffect(() => {
        if(errors) {
            dispatch(setErrors(errors))
            dispatch(openModal(modalTypes.Errors))
            resetInputs()
        }
    }, [errors])

    useEffect(() => {
        if(team) {
            resetInputs({
                name: team.name,
                email: team.email,
            })
        }
    }, [team])
    
    const updateTeam = async (name, value) => {
        const body = { team: {
                [name]: value,
            }
        }
        const resp = await fetchData({
            url: teamWithIdAPI(team.id),
            method: 'PUT',
            body
        })

        if(resp.team) {
            setTeamFromResp(resp)
        }
    }

    return (
        <Layout>
            <Button onClick={() => history.push(routePaths.Roster)}>
                VIEW ROSTER
            </Button>
            <TeamItem
                label={'Name'}
                name={'name'}
                inputValue={name}
                teamValue={team && team.name}
                onChange={onChange}
                onSubmit={updateTeam}
                loading={loading}
            />
            <TeamItem
                label={'Email'}
                name={'email'}
                inputValue={email}
                teamValue={team && team.email}
                onChange={onChange}
                onSubmit={updateTeam}
                loading={loading}
            />
            <ChangePassword
                inputValue={password}
                onChange={onChange}
                onSubmit={updateTeam}
                loading={loading}
            />
        </Layout>
    )
}

export default TeamSettings