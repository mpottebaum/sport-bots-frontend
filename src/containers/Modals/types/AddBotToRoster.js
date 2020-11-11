import React, { useContext, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import useFetch from '../../../hooks/useFetch'
import { botsAPI } from '../../../utils/apiRoutes'
import { TeamContext } from '../../../contexts/TeamContext'
import { addStarter, addAlternate } from '../../../store/roster/actions'
import { clearRemovePlayer } from '../../../store/removePlayer/actions'
import { addBots } from '../../../store/bots/actions'
import { setErrors } from '../../../store/errors/actions'
import { openModal } from '../../../store/modal/actions'
import modalTypes from '../modalTypes'

import Modal from '../cmps/Modal'
import Table from 'react-bootstrap/Table'
import Bot from '../cmps/Bot'
import WithLoader from '../../../components/WithLoader'
import Button from '../../../components/Button'

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
        return () => dispatch(clearRemovePlayer())
    }, [])

    const getBots = async () => {
        const resp = await fetchData({
            url: botsAPI(team.id),
        })
        if(resp.bots) dispatch(addBots(resp.bots))
    }

    const addPlayer = addPlayer => {
        // get player-to-add's attributes and sum them
        const { speed, agility, strength } = addPlayer
        const attributeSum = speed + agility + strength
        // compile all players on roster in one array
        const allPlayersOnRoster = [ ...roster.starters, ...roster.alternates ]
        // filter out player who is being removed from roster
        const remainingRoster = allPlayersOnRoster.filter(player => player.id !== removePlayer.id)
        // verify player-to-add does not have same attribute sum as any other player already on roster
        const isAddPlayerValid = remainingRoster.every(player => (
            player.speed + player.agility + player.strength !== attributeSum
        ))
        // if player addition is invalid, open error modal and stop process
        if(!isAddPlayerValid) {
            dispatch(setErrors(['No two players on your roster can have the same attribute sum']))
            dispatch(openModal(modalTypes.Errors))
            return
        }
        // determine which designation to add player as and disptach action
        const addPlayerToRoster = removePlayer.starter ? addStarter : addAlternate
        dispatch(addPlayerToRoster({
            addPlayer,
            removePlayer
        }))
        setRosterChangesMade(true)
        onClose()
    }

    const availableBots = () => {
        // compile players on roster and create library of their IDs
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

        // filter out any bots already on roster
        return bots.filter(bot => !rosterLib[bot.id])
    }

    return (
        <Modal onClose={onClose} title={'PLAYER BOTS'}>
            <WithLoader loading={loading}>
                <Button onClick={onClose} secondary>CANCEL</Button>
                <Table responsive='sm' hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>#</th>
                            <th>Speed</th>
                            <th>Strength</th>
                            <th>Agility</th>
                            <th>Attribute Sum</th>
                        </tr>
                    </thead>
                    <tbody>
                            {bots && availableBots().map(bot => <Bot bot={bot} addPlayer={addPlayer} key={bot.id}/>)}
                    </tbody>
                </Table>
            </WithLoader>
        </Modal>
    )
}

export default AddBotToRoster