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
        const { speed, agility, strength } = addPlayer
        const attributeSum = speed + agility + strength
        const allPlayersOnRoster = [ ...roster.starters, ...roster.alternates ]
        const remainingRoster = allPlayersOnRoster.filter(player => player.id !== removePlayer.id)
        const isAddPlayerValid = remainingRoster.every(player => (
            player.speed + player.agility + player.strength !== attributeSum
        ))
        if(!isAddPlayerValid) {
            dispatch(setErrors(['No two players on your roster can have the same attribute sum']))
            dispatch(openModal(modalTypes.Errors))
            return
        }
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