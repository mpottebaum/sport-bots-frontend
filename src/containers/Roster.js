import React, { useContext, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import useFetch from '../hooks/useFetch'
import { rosterAPI, randomRosterAPI } from '../utils/apiRoutes'
import { TeamContext } from '../contexts/TeamContext'
import routePaths from './Router/routePaths'
import { addRoster } from '../store/roster/actions'
// import { addBots } from '../store/bots/actions'

import Button from '../components/Button'

const Roster = () => {
    const { team } = useContext(TeamContext)
    const { loading, fetchData } = useFetch()
    const history = useHistory()
    const roster = useSelector(state => state.roster)
    const dispatch = useDispatch()

    useEffect(() => {
        if(!roster) {
            getRoster()
        }
    }, [])

    const getRoster = async () => {
        const resp = await fetchData({
            url: rosterAPI(team.id),
        })
        if(resp.roster) dispatch(addRoster(resp.roster))
    }

    const generateRoster = async () => {
        const resp = await fetchData({
            url: randomRosterAPI(team.id),
        })
        if(resp.roster) dispatch(addRoster(resp.roster))
    }

    return (
        <div>
            <Button onClick={generateRoster}>CREATE RANDOM ROSTER</Button>
            <Button onClick={() => history.push(routePaths.Bots)} secondary>VIEW ALL PLAYER BOTS</Button>
            {roster && (roster.starters && roster.alternates) && (
                <>
                    <h1>Starters</h1>
                    <ul>
                        {roster.starters.map(player => <li>{player.name}</li>)}
                    </ul>
                    <h1>Alternates</h1>
                    <ul>
                        {roster.alternates.map(player => <li>{player.name}</li>)}
                    </ul>
                </>
            )}
        </div>
    )
}

export default Roster