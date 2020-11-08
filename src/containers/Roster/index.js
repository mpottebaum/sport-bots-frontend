import React, { useContext, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import useFetch from '../../hooks/useFetch'
import { rosterAPI, randomRosterAPI } from '../../utils/apiRoutes'
import { TeamContext } from '../../contexts/TeamContext'
import routePaths from '../Router/routePaths'
import { addRoster, clearRoster, swapRosterDesignations } from '../../store/roster/actions'
// import { addBots } from '../../store/bots/actions'

import Button from '../../components/Button'
import PlayersList from './components/PlayersList'
import Layout from '../../components/Layout'

const Roster = () => {
    const { team, toggleRosterSave } = useContext(TeamContext)
    const { loading, fetchData } = useFetch()
    const history = useHistory()
    const roster = useSelector(state => state.roster)
    const dispatch = useDispatch()

    const [ changesMade, setChangesMade ] = useState(false)

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
        if(resp.roster) {
            toggleRosterSave()
            setChangesMade(false)
        }
    }

    const deleteRoster = async () => {
        const resp = await fetchData({
            url: rosterAPI(team.id),
            method: 'DELETE',
        })
        if(resp.message) {
            dispatch(clearRoster())
            toggleRosterSave()
        }
    }

    const playerToSwapHook = useState(null)

    const swapPlayers = secondPlayer => {
        const [ playerToSwap, setPlayerToSwap ] = swapper

        dispatch(swapRosterDesignations({
            ...playerToSwap,
            ...secondPlayer
        }))
        setPlayerToSwap(null)
        setChangesMade(true)
    }

    const swapper = [ ...playerToSwapHook, swapPlayers ]

    const rosterIsGenerated = () => roster.starters && roster.alternates

    return (
        <Layout>
            <div>
                <Button onClick={generateRoster}>CREATE RANDOM ROSTER</Button>
                <Button onClick={() => history.push(routePaths.Bots)} secondary>VIEW ALL PLAYER BOTS</Button>
                {(roster && rosterIsGenerated()) && (
                    <Button onClick={saveRoster} disabled={team.saved_roster && !changesMade}>SAVE ROSTER</Button>
                )}
                {team.saved_roster && (
                    <Button onClick={deleteRoster}>DELETE ROSTER</Button>
                )}
            </div>
            {(roster && rosterIsGenerated()) && (
                <>
                    <h1>Starters</h1>
                    <PlayersList players={roster.starters} swapper={swapper} starter />
                    <h1>Alternates</h1>
                    <PlayersList players={roster.alternates} swapper={swapper} />
                </>
            )}
        </Layout>
    )
}

export default Roster