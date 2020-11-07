import React, { useContext, useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch'
import { rosterAPI, botAPI } from '../utils/apiRoutes'
import { TeamContext } from '../contexts/TeamContext'
import { useHistory } from 'react-router-dom'
import routePaths from './Router/routePaths'

const Roster = () => {
    const { team } = useContext(TeamContext)
    const { loading, setLoading, fetchData } = useFetch(true)
    const history = useHistory()
    const [ roster, setRoster ] = useState(null)
    const [ bots, setBots ] = useState(null)

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        if(!bots) {
            await getBots()
        }
        await getRoster()
    }

    const getRoster = async () => {
        const resp = await fetchData({
            url: rosterAPI(team.id),
        })
        setRoster(resp.roster)
    }

    const getBots = async () => {
        const resp = await fetchData({
            url: botAPI(team.id),
        })
        setBots(resp.bots)
    }

    return (
        <div>
            <p>Roster</p>
        </div>
    )
}

export default Roster