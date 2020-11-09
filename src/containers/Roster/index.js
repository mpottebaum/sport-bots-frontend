import React, { useContext, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { useHistory } from 'react-router-dom'

import useFetch from '../../hooks/useFetch'
import { rosterAPI, randomRosterAPI } from '../../utils/apiRoutes'
import { TeamContext } from '../../contexts/TeamContext'
// import routePaths from '../Router/routePaths'
import { addRoster, clearRoster, swapRosterDesignations } from '../../store/roster/actions'

import Button from '../../components/Button'
import PlayersList from './cmps/PlayersList'
import Layout from '../../components/Layout'
import WithLoader from '../../components/WithLoader'

const Roster = () => {
    const { team, toggleRosterSave, setRosterChangesMade } = useContext(TeamContext)
    const { loading, fetchData } = useFetch()
    const { loading: rosterLoading, fetchData: fetchRoster } = useFetch()
    // const history = useHistory()
    const roster = useSelector(state => state.roster)
    const dispatch = useDispatch()

    useEffect(() => {
        if(!roster) {
            getRoster()
        }
    }, [])

    const getRoster = async () => {
        const resp = await fetchRoster({
            url: rosterAPI(team.id),
        })
        if(resp.roster) dispatch(addRoster(resp.roster))
    }

    const generateRoster = async () => {
        if(team.saved_roster) setRosterChangesMade(true)
        const resp = await fetchRoster({
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
            if(!team.saved_roster) toggleRosterSave()
            setRosterChangesMade(false)
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
        setRosterChangesMade(true)
    }

    const swapper = [ ...playerToSwapHook, swapPlayers ]

    const rosterIsGenerated = () => roster.starters && roster.alternates

    return (
        <Layout>
            <div>
                <Button onClick={generateRoster} loading={loading}>CREATE RANDOM ROSTER</Button>
                {(roster && rosterIsGenerated()) && (
                    <Button onClick={saveRoster} disabled={team.saved_roster && !team.rosterChangesMade} loading={loading}>
                        {team.saved_roster ? 'SAVE ROSTER CHANGES' : 'SAVE ROSTER'}
                    </Button>
                )}
                {team.saved_roster && (
                    <Button onClick={deleteRoster} loading={loading}>DELETE ROSTER</Button>
                )}
            </div>
            {(roster && rosterIsGenerated()) && (
                <WithLoader loading={rosterLoading}>
                    <h1>Starters</h1>
                    <PlayersList players={roster.starters} swapper={swapper} starter />
                    <h1>Alternates</h1>
                    <PlayersList players={roster.alternates} swapper={swapper} />
                </WithLoader>
            )}
        </Layout>
    )
}

export default Roster