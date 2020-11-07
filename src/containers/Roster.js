import React, { useContext, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import useFetch from '../hooks/useFetch'
import { rosterAPI, botAPI } from '../utils/apiRoutes'
import { TeamContext } from '../contexts/TeamContext'
import routePaths from './Router/routePaths'
import { addRoster } from '../store/roster/actions'
import { addBots } from '../store/bots/actions'

const Roster = () => {
    const { team } = useContext(TeamContext)
    const { loading, setLoading, fetchData } = useFetch(true)
    const history = useHistory()
    const roster = useSelector(state => state.roster)
    const bots = useSelector(state => state.bots)
    const dispatch = useDispatch()

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        setLoading(true)
        if(!bots) {
            await getBots()
        }
        if(!roster) {
            await getRoster()
        }
        setLoading(false)
    }

    const getRoster = async () => {
        const resp = await fetchData({
            url: rosterAPI(team.id),
        })
        dispatch(addRoster(resp.roster))
    }

    const getBots = async () => {
        const resp = await fetchData({
            url: botAPI(team.id),
        })
        dispatch(addBots(resp.bots))
    }

    return (
        <div>
            <p>Roster</p>
        </div>
    )
}

export default Roster