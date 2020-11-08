import React, { useContext, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import useFetch from '../hooks/useFetch'
import { botsAPI } from '../utils/apiRoutes'
import { TeamContext } from '../contexts/TeamContext'
import routePaths from './Router/routePaths'
import { addBots } from '../store/bots/actions'

import Button from '../components/Button'
import Layout from '../components/Layout'

const Bots = () => {
    const { team } = useContext(TeamContext)
    const { loading, fetchData } = useFetch()
    const history = useHistory()
    const bots = useSelector(state => state.bots)
    const dispatch = useDispatch()

    useEffect(() => {
        if(team && !bots) {
            getBots()
        }
    }, [team])

    const getBots = async () => {
        const resp = await fetchData({
            url: botsAPI(team.id),
        })
        if(resp.bots) dispatch(addBots(resp.bots))
    }

    return (
        <Layout>
            <div>
                <Button onClick={() => history.push(routePaths.Roster)} secondary>VIEW ROSTER</Button>
            </div>
            {bots && (
                <ul>
                    {bots.map(bot => <li key={bot.id}>{bot.name}</li>)}
                </ul>
            )}
        </Layout>
    )
}

export default Bots