import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setRemovePlayer } from '../../../store/removePlayer/actions'
import { openModal } from '../../../store/modal/actions'
import modalTypes from '../../Modals/modalTypes'


import Button from '../../../components/Button'

const Player = ({ player, swapper, starter=false }) => {

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

    const swapButtonText = () => playerToSwap ? 'SWITCH' : `CHANGE TO ${starter ? 'ALTERNATE' : 'STARTER'}`

    const onRemoveClick = () => {
        dispatch(setRemovePlayer({
            ...player,
            starter,
        }))
        dispatch(openModal(modalTypes.addBotToRoster))
    }

    return (
        <li>
            <p>{player.name}</p>
            {!hideSwapButton() &&(
                <Button onClick={onSwapClick} >
                    {swapButtonText()}
                </Button>
            )}
            {!playerToSwap && (
                <Button onClick={onRemoveClick}>
                    REMOVE
                </Button>
            )}
        </li>
    )
}


export default Player