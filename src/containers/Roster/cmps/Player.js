import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setRemovePlayer } from '../../../store/removePlayer/actions'
import { openModal } from '../../../store/modal/actions'
import modalTypes from '../../Modals/modalTypes'


import Button from '../../../components/Button'

const Player = ({ player, swapper, starter=false }) => {

    const { name, speed, strength, agility } = player
    const attributesSum = speed + strength + agility
    const [ playerToSwap, setPlayerToSwap, swapPlayers ] = swapper
    const dispatch = useDispatch()

    const onSwapClick = () => {
        if(!playerToSwap) {
            setPlayerToSwap(addSwapPlayer())
            return
        }
        swapPlayers(addSwapPlayer())
    }

    const addSwapPlayer = () => ({
        [starter ? 'starter' : 'alternate']: player,
    })

    const hideSwapButton = () => playerToSwap && (
        (starter && playerToSwap.starter) || (!starter && playerToSwap.alternate)
    )

    const swapButtonText = () => playerToSwap ? 'SWITCH' : `SET AS ${starter ? 'ALTERNATE' : 'STARTER'}`

    const onRemoveClick = () => {
        dispatch(setRemovePlayer({
            ...player,
            starter,
        }))
        dispatch(openModal(modalTypes.addBotToRoster))
    }

    return (
        <tr>
            <td>{name}</td>
            <td>
                {!hideSwapButton() &&(
                    <Button onClick={onSwapClick} marginBottom={10}>
                        {swapButtonText()}
                    </Button>
                )}
                {!playerToSwap && (
                    <Button onClick={onRemoveClick} secondary>
                        REPLACE
                    </Button>
                )}
            </td>
            <td>{speed}</td>
            <td>{strength}</td>
            <td>{agility}</td>
            <td>{attributesSum}</td>
        </tr>
    )
}


export default Player