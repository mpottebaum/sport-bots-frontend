import React, { useContext, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import useFetch from '../../hooks/useFetch'
import { rosterAPI, randomRosterAPI } from '../../utils/apiRoutes'
import { TeamContext } from '../../contexts/TeamContext'
import routePaths from '../Router/routePaths'
import { addRoster } from '../../store/roster/actions'
// import { addBots } from '../../store/bots/actions'

import Button from '../../components/Button'

const Roster = () => {
    const { team, updateRosterSave } = useContext(TeamContext)
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

    const saveRoster = async () => {
        const starters = roster.starters.map(starter => ({
            bot_id: starter.id,
            designation: 'starter'
        }))
        const alternates = roster.alternates.map(alternate => ({
            bot_id: alternate.id,
            designation: 'alternate'
        }))
        const body = {
            roster: {
                players_attributes: [
                    ...starters,
                    ...alternates
                ]
            }
        }
        const resp = await fetchData({
            url: rosterAPI(team.id),
            method: team.saved_roster ? 'PUT' : 'POST',
            body
        })
        console.log(resp)
        if(resp.roster) updateRosterSave()
    }

    const rosterIsGenerated = () => roster.starters && roster.alternates

    return (
        <div>
            <Button onClick={generateRoster}>CREATE RANDOM ROSTER</Button>
            <Button onClick={() => history.push(routePaths.Bots)} secondary>VIEW ALL PLAYER BOTS</Button>
            {roster && rosterIsGenerated() && (
                <Button onClick={saveRoster}>SAVE ROSTER</Button>
            )}
            {roster && rosterIsGenerated() && (
                <>
                    <h1>Starters</h1>
                    <ul>
                        {roster.starters.map(player => <li key={player.id}>{player.name}</li>)}
                    </ul>
                    <h1>Alternates</h1>
                    <ul>
                        {roster.alternates.map(player => <li key={player.id}>{player.name}</li>)}
                    </ul>
                </>
            )}
        </div>
    )
}

export default Roster