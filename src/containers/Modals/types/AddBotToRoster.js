import React, { useContext, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import useFetch from '../../../hooks/useFetch'
import { botsAPI } from '../../../utils/apiRoutes'
import { TeamContext } from '../../../contexts/TeamContext'
import { addStarter, addAlternate } from '../../../store/roster/actions'
import { addBots } from '../../../store/bots/actions'

import Modal from '../cmps/Modal'
import Bot from '../cmps/Bot'

const AddBotToRoster = ({ onClose }) => {
    const { team, setRosterChangesMade } = useContext(TeamContext)
    const { loading, fetchData } = useFetch()
    const bots = useSelector(state => state.bots)
    const removePlayer = useSelector(state => state.removePlayer)
    const roster = useSelector(state => state.roster)
    const dispatch = useDispatch()

    useEffect(() => {
        if(team && !bots) {
            getBots()
        }
    }, [])

    const getBots = async () => {
        const resp = await fetchData({
            url: botsAPI(team.id),
        })
        if(resp.bots) dispatch(addBots(resp.bots))
    }

    const addPlayer = addPlayer => {
        const addPlayerToRoster = removePlayer.starter ? addStarter : addAlternate
        dispatch(addPlayerToRoster({
            addPlayer,
            removePlayer
        }))
        setRosterChangesMade(true)
        onClose()
    }

    const availableBots = () => {
        const rosterPlayers = [
            ...roster.starters,
            ...roster.alternates,
        ]
        const rosterLib = rosterPlayers.reduce((acc, player) => {
            return {
                ...acc,
                [player.id]: true,
            }
        }, {})

        return bots.filter(bot => !rosterLib[bot.id])
    }

    return (
        <Modal onClose={onClose} title={'PLAYER BOTS'}>
            <ul>
                {bots && availableBots().map(bot => <Bot bot={bot} addPlayer={addPlayer} />)}
            </ul>
        </Modal>
    )
}

export default AddBotToRoster