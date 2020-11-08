import React from 'react'

import Button from '../../../components/Button'

const Player = ({ player, swapper, starter=false }) => {

    const [ playerToSwap, setPlayerToSwap, swapPlayers ] = swapper

    const onClick = () => {
        if(!playerToSwap) {
            setPlayerToSwap(addSwapPlayer())
            return
        }
        swapPlayers(addSwapPlayer())
    }

    const addSwapPlayer = () => ({
        [starter ? 'starter' : 'alternate']: player,
    })

    const hideButton = () => playerToSwap && (
        (starter && playerToSwap.starter) || (!starter && playerToSwap.alternate)
    )

    const buttonText = () => playerToSwap ? 'SWITCH' : `CHANGE TO ${starter ? 'ALTERNATE' : 'STARTER'}`

    return (
        <li>
            <p>{player.name}</p>
            {!hideButton() &&(
                <Button onClick={onClick} >
                    {buttonText()}
                </Button>
            )}
        </li>
    )
}


export default Player